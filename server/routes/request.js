const router = require('express').Router();
// const adminAuth = require("../middleware/admin");
const conn = require("../db/connection");
const util = require("util");
const { body, validationResult } = require("express-validator");

router.get("/request/:reader_id/:book_id", async (req, res) => { // Get User Requests by his name
    const query = util.promisify(conn.query).bind(conn);
    const data = req.params
    const sql = 
    `SELECT user.userName, book.bookName, book_request.status, book_request.requestDate
    FROM book_request 
    JOIN book ON book.book_id = book_request.book_id 
    JOIN user ON user.user_id = book_request.reader_id 
    WHERE user.user_id = ${data.reader_id} AND book.book_id = ${data.book_id}`

    const request = await query(sql);

    if (!request[0]) {
        res.status(404).json({ status: 'AVAILABLE' , msg: "Request Is Not Found !" });
    }

    res.status(200).json(request[0]);
});

router.get("/request/:reader_id", async (req, res) => { // Get User Requests by his id
    const query = util.promisify(conn.query).bind(conn);
    const {reader_id} = req.params;
    const sql = 
    `SELECT user.userName, user.user_id, book.book_id, book.image_url, book.bookName, book_request.status, book_request.requestDate
    FROM book_request 
    JOIN book ON book.book_id = book_request.book_id 
    JOIN user ON user.user_id = book_request.reader_id 
    WHERE user.user_id = ${reader_id}`

    const request = await query(sql);

    if (!request[0]) {
        return(res.status(404).json({ msg: "No requests for this user" }))
    }
    request.map((reqImg) => {
        reqImg.image_url = "http://" + req.hostname + ":4000/" + reqImg.image_url;
    });
    res.status(200).json(request);
});

router.get("/request", async (req, res) => { // Show Pending Requests
    const query = util.promisify(conn.query).bind(conn);
    const sql = 
    `SELECT user.userName, user.user_id, book.bookName, book.book_id, book.image_url, book_request.status, book_request.requestDate
    FROM book_request 
    JOIN book ON book.book_id = book_request.book_id 
    JOIN user ON user.user_id = book_request.reader_id
    WHERE book_request.status = "Requested"`
    const request = await query(sql);
    request.map((reqImg) => {
        reqImg.image_url = "http://" + req.hostname + ":4000/" + reqImg.image_url;
    });
    res.status(200).json(request);
});

router.get("/approveRequest", async (req, res) => { // Show APPROVED Requests
    const query = util.promisify(conn.query).bind(conn);
    const sql = 
    `SELECT user.userName, user.user_id, book.bookName, book.book_id, book.image_url, book_request.status, book_request.requestDate
    FROM book_request 
    JOIN book ON book.book_id = book_request.book_id 
    JOIN user ON user.user_id = book_request.reader_id
    WHERE book_request.status = "APPROVED"`
    const request = await query(sql);
    request.map((reqImg) => {
        reqImg.image_url = "http://" + req.hostname + ":4000/" + reqImg.image_url;
    });
    res.status(200).json(request);
});

router.get("/declineRequest", async (req, res) => { // Show DECLINED Requests
    const query = util.promisify(conn.query).bind(conn);
    const sql = 
    `SELECT user.userName, user.user_id, book.bookName, book.book_id, book.image_url, book_request.status, book_request.requestDate
    FROM book_request 
    JOIN book ON book.book_id = book_request.book_id 
    JOIN user ON user.user_id = book_request.reader_id
    WHERE book_request.status = "DECLINED"`
    const request = await query(sql);
    request.map((reqImg) => {
        reqImg.image_url = "http://" + req.hostname + ":4000/" + reqImg.image_url;
    });
    res.status(200).json(request);
});


router.post("/request", 
async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const request = {
            reader_id: req.body.reader_id,
            book_id: req.body.book_id,
            requestDate: date,
            status: "REQUESTED",
        }

        const query = util.promisify(conn.query).bind(conn); // TO USE AWAIT
        query("INSERT INTO book_request SET ?", request);

        res.status(200).json({
            msg :"Request has been Created",
        });

    } catch(err){
        res.status(500).json(err);
    }
});

router.put(("/approveRequest/:reader_id/:book_id"), async (req, res) => { // Admin Approve A Request
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = req.params
        const sql = `UPDATE book_request SET status = 'APPROVED' 
        WHERE reader_id LIKE'%${data.reader_id}%' AND book_id LIKE'%${data.book_id}%'`;
        const query = util.promisify(conn.query).bind(conn);
        await query(sql);

        res.status(200).json({
            msg: "Request has been Approved",
        });
        
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put(("/declineRequest/:reader_id/:book_id"), async (req, res) => { // Admin Decline A Request
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = req.params
        const sql = `UPDATE book_request SET status = 'DECLINED' 
        WHERE reader_id LIKE'%${data.reader_id}%' AND book_id LIKE'%${data.book_id}%'`;
        const query = util.promisify(conn.query).bind(conn);
        await query(sql);

        res.status(200).json({
            msg: "Request has been Declined",
        });
        
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete("/request/:reader_id/:book_id", async (req, res) => {//delete specific request
    try {
        const data = req.params;
        const query = util.promisify(conn.query).bind(conn);
        await query(`DELETE FROM book_request WHERE reader_id LIKE'%${data.reader_id}%' AND book_id LIKE'%${data.book_id}%'`);
        res.status(200).json({
          msg: "Request has been Deleted Successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.delete("/request/:reader_id", async (req, res) => {
    try {
        const {reader_id} = req.params;
        const query = util.promisify(conn.query).bind(conn);
        await query("DELETE FROM book_request WHERE reader_id = ?", reader_id);
        res.status(200).json({
          msg: "Requests Delete Successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;