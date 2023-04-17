const router = require('express').Router();
const conn = require("../db/connection");
const uploadUserImage = require('../middleware/uploadImages');
const util = require("util");
const { body, validationResult } = require("express-validator");
//const bcrypt = require("bcrypt");
const fs = require("fs");

router.get("/reader", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const sql = "SELECT userName, user_id, email, password, phone, status, image_url FROM user WHERE type = 'READER' ORDER BY userName ASC ";
    const user = await query(sql);
    user.map((user) => {
        user.image_url = "http://" + req.hostname + ":4000/" + user.image_url;
    });
      res.status(200).json(user);
});


router.get("/reader/:user_id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const user = await query("SELECT userName, email, password, phone, status, image_url FROM user WHERE user_id = ?", [
      req.params.user_id,
    ]);
    if (!user[0]) {
      res.status(404).json({ msg: "User is not found !" });
    }
    user[0].image_url = "http://" + req.hostname + ":4000/" + user[0].image_url;
    res.status(200).json(user[0]);
});

router.post("/reader", 
  uploadUserImage.single("image"),

  body("email")
  .isEmail()
  .withMessage("Please enter a valid E-mail"),

  body("userName")
    .isString()
    .withMessage("please enter a valid name"),

  body("password")
  .isLength({min: 8})
  .withMessage("Password should be at least 8 characters"),

  async(req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const query = util.promisify(conn.query).bind(conn); 
    const checkEmailExists = await query(
      "SELECT * FROM user WHERE email = ?", [req.body.email]
    );
    
    if (checkEmailExists.length > 0) {
      res.status(400).json({
        errors: [
          {
            msg: "This E-mail already exists !",
          },
        ],
      });
    }

    if(!req.file){
      return res.status(400).json({ 
          errors: [
              {
                  msg: "Image Is Required",
              },
          ] ,
      });
    }

    const user = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      status:req.body.status,
      image_url: req.file.filename,
      type:'READER'
    };

    await query("INSERT INTO user SET ?", user);
    delete user.password;
    res.status(200).json(user);

  } catch(err){
      res.status(500).json({err: err});
  }
});

router.put("/inactiveReaderAccount/:user_id", async (req, res) => {
    try {
        const {user_id} = req.params;
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

      await query("UPDATE user SET ? WHERE ?", [{status: "INACTIVE"}, {user_id : user_id}]);

      res.status(200).json({
        msg: "User account inactivated",
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put("/activeReaderAccount/:user_id", async (req, res) => {
      try {
          const {user_id} = req.params;
          const query = util.promisify(conn.query).bind(conn);
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }

        await query("UPDATE user SET ? WHERE ?", [{status: "ACTIVE"}, {user_id : user_id}]);
  
        res.status(200).json({
          msg: "User account activated",
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.put("/reader/:user_id", uploadUserImage.single("image"), async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await query("SELECT * FROM user WHERE user_id = ?", [
        req.params.user_id,
      ]);
      if (!user[0]) {
        res.status(404).json({ msg: "User is not found !" });
      }

      const userObj = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        status:req.body.status,
        type:'READER'
      };

      if (req.file) {
        fs.unlinkSync("./upload/" + user[0].image_url); // delete old image
      }

      await query("UPDATE user SET ? WHERE user_id = ?", [userObj, user[0].user_id]);

      res.status(200).json({
        user:{
          ...userObj,
          image_url : "http://" + req.hostname + ":4000/" + req.file.filename
        },
        msg: "User updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete("/reader/:user_id", async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("SELECT * FROM user WHERE user_id = ?", [
        req.params.user_id,
      ]);

      if (!user[0]) {
        res.status(404).json({ msg: "User is not found !" });
      }
      fs.unlinkSync("./upload/" + user[0].image_url); // delete old image
      await query("DELETE FROM user WHERE user_id = ?", [user[0].user_id]);
      res.status(200).json({
        msg: "User has been deleted successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;