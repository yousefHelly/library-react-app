const router = require('express').Router();
// const adminAuth = require("../middleware/admin");
const conn = require("../db/connection");
const util = require("util");
const { body, validationResult } = require("express-validator");

router.get("/request/:reader_id/:book_id", async (req, res) => { // Get Reader Request to Specific book
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

router.get("/request/:reader_id", async (req, res) => { // Get all Reader Requests
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

router.get("/request", async (req, res) => { // Get all Pending Requests
    const query = util.promisify(conn.query).bind(conn);
    const sql = 
    `SELECT user.userName, user.user_id, book.bookName, book.book_id, book.image_url, book_request.status, book_request.requestDate
    FROM book_request 
    JOIN book ON book.book_id = book_request.book_id 
    JOIN user ON user.user_id = book_request.reader_id
    WHERE book_request.status = "REQUESTED"`
    const request = await query(sql);
    request.map((reqImg) => {
        reqImg.image_url = "http://" + req.hostname + ":4000/" + reqImg.image_url;
    });
    res.status(200).json(request);
});

router.get("/approveRequest", async (req, res) => { // Get All APPROVED Requests
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

router.get("/declineRequest", async (req, res) => { // Get All DECLINED Requests
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

router.get("/getApprovedBooks/:reader_id/:page", async (req, res) => { // Get All APPROVED books To Read

    const {reader_id} = req.params;
    const {page} = req.params;
    minPage = parseInt(page) * 10;
    maxPage = minPage + 10;

    const query = util.promisify(conn.query).bind(conn);
    const GetNumberOfBooks = util.promisify(conn.query).bind(conn);

    const sql = 
    `SELECT book.book_id, bookName, bookDescription, author, field, publicationDate, image_url, pdf_url, Count(*) AS 'CountChapters' 
    FROM book 
    RIGHT JOIN chapter on book.book_id = chapter.book_id
    JOIN book_request ON book.book_id = book_request.book_id
    WHERE book_request.status = 'APPROVED' and book_request.reader_id = ${reader_id}
    GROUP BY chapter.book_id ORDER BY bookName ASC 
    LIMIT ${minPage}, ${maxPage}`

    const books = await query(sql);
    const numberOfBooks = await GetNumberOfBooks(`SELECT COUNT(*) AS 'CountBooks' 
    FROM book JOIN book_request ON book.book_id = book_request.book_id 
    WHERE book_request.status = 'APPROVED' and book_request.reader_id = ${reader_id}`);
    const numberOfPages = Math.ceil(numberOfBooks[0].CountBooks / 10); 

    books.map((book) => {
        book.image_url = "http://" + req.hostname + ":4000/" + book.image_url;
        book.pdf_url = "http://" + req.hostname + ":4000/" + book.pdf_url;
    });

    res.status(200).json({   
        books:books,
        numberOfBooks: numberOfBooks,
        numberOfPages: numberOfPages,
        currentPage:+page
    });
});

router.get("/getRequestedBooks/:reader_id/:page", async (req, res) => { // Get All REQUESTED books for a specific Reader

    const {reader_id} = req.params;
    const {page} = req.params;
    minPage = parseInt(page) * 10;
    maxPage = minPage + 10;
  
    const query = util.promisify(conn.query).bind(conn);
    const GetNumberOfRequests = util.promisify(conn.query).bind(conn);
  
    const sql = 
    `SELECT book.book_id, bookName, bookDescription, author, field, publicationDate, requestDate, status, image_url, pdf_url, Count(*) AS 'CountChapters' 
    FROM book 
    RIGHT JOIN chapter on book.book_id = chapter.book_id
    JOIN book_request ON book.book_id = book_request.book_id
    WHERE book_request.reader_id = ${reader_id}
    GROUP BY chapter.book_id ORDER BY bookName ASC 
    LIMIT ${minPage}, ${maxPage}`
  
    const books = await query(sql);
    const numberOfRequests = await GetNumberOfRequests(`SELECT COUNT(*) AS 'CountRequests' 
    FROM book JOIN book_request ON book.book_id = book_request.book_id 
    WHERE book_request.reader_id = ${reader_id}`);
    const numberOfPages = Math.ceil(numberOfRequests[0].CountRequests / 10); 
  
    books.map((book) => {
        book.image_url = "http://" + req.hostname + ":4000/" + book.image_url;
        book.pdf_url = "http://" + req.hostname + ":4000/" + book.pdf_url;
    });
  
    return res.status(200).json({   
        books:books,
        numberOfRequests: numberOfRequests,
        numberOfPages: numberOfPages,
        currentPage:+page
    });
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

        const query = util.promisify(conn.query).bind(conn);
        query("INSERT INTO book_request SET ?", request);

        return res.status(200).json({
            msg :"Request has been Created",
        });

    } catch(err){
        return res.status(500).json(err);
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
        WHERE reader_id = ${data.reader_id} AND book_id = ${data.book_id}`;
        const query = util.promisify(conn.query).bind(conn);
        await query(sql);

        return res.status(200).json({
            msg: "Request has been Approved",
        });
        
    } catch (err) {
        return res.status(500).json(err);
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
        WHERE reader_id = ${data.reader_id} AND book_id = ${data.book_id}`;
        const query = util.promisify(conn.query).bind(conn);
        await query(sql);

        return res.status(200).json({
            msg: "Request has been Declined",
        });
        
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete("/request/:reader_id/:book_id", async (req, res) => {//delete specific request
    try {
        const data = req.params;
        const query = util.promisify(conn.query).bind(conn);
        await query(`DELETE FROM book_request WHERE reader_id LIKE'%${data.reader_id}%' AND book_id LIKE'%${data.book_id}%'`);
        return res.status(200).json({
          msg: "Request has been Deleted Successfully",
        });
      } catch (err) {
        return res.status(500).json(err);
      }
});

module.exports = router;