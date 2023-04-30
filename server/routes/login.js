const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const conn = require("../db/connection");
const util = require("util");
// LOG IN
router.post(
  "/login", 
  body("email").isEmail().withMessage("Please enter a valid E-mail"),
  body("password")
    .isLength({min:8})
    .withMessage("Password should be at least 8 characters"),
  async(req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const q = util.promisify(conn.query).bind(conn); 

      const query = util.promisify(conn.query).bind(conn);
      const checkEmail = await query("SELECT * FROM user WHERE email = ?", [req.body.email]);

      if (checkEmail.length == 0) {
        return res.status(400).json({
          errors: [
            { 
              login:false,
              msg: "Wrong Email",
            },
          ],
        });
      }
      
      if (checkEmail[0].password == req.body.password) {
        const checkActivation = await q("SELECT status FROM user WHERE user_id = ?", [checkEmail[0].user_id])
        if (checkActivation[0].status == "INACTIVE") {
          return res.status(400).json({
            errors: [
              { 
                login:false,
                msg: "Your Account is Inactivated",
              },
            ],
          });
        }
        checkEmail[0].image_url = "http://" + req.hostname + ":4000/" + checkEmail[0].image_url
        return res.json({
          login:true,
          user:{
            ...checkEmail[0],
          },
          msg: "Logged Successfully"
        });
      }
      else {
        return res.status(400).json({
          errors: [
            { 
              login:false,
              msg: "Wrong Password",
            },
          ],
        });
      }

    } catch(err) {
      res.status(500).json({err: err});
    }
  }
);
module.exports = router;