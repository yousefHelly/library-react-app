const router = require('express').Router();
const conn = require("../db/connection");
const uploadBookImage = require('../middleware/uploadImages');
const util = require("util");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

router.get("/bookspage/:page", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const GetNumberOfBooks = util.promisify(conn.query).bind(conn);

    const {page} = req.params;
    minPage = parseInt(page) * 20;
    maxPage = minPage + 20;
    const sql = 
    `SELECT bookName, bookDescription, author, field, publicationDate, image_url, pdf_url, book.book_id, Count(*) AS 'CountChapters' FROM book 
    right join chapter on book.book_id = chapter.book_id GROUP BY chapter.book_id
    LIMIT ${minPage}, ${maxPage}`;

    const books = await query(sql);
    const numberOfBooks = await GetNumberOfBooks(`SELECT COUNT(*) AS 'CountBooks' FROM book`);

    books.map((book) => {
        book.image_url = "http://" + req.hostname + ":4000/" + book.image_url;
        book.pdf_url = "http://" + req.hostname + ":4000/" + book.pdf_url;
    });
    res.status(200).json({
      books:books,
      numberOfBooks: numberOfBooks,
    });
});

router.get("/books/:book_id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const sql = 
  `SELECT book.book_id, bookName, bookDescription, author, field, publicationDate, image_url, pdf_url, Count(*) AS 'CountChapters' 
  FROM book RIGHT JOIN chapter ON book.book_id = chapter.book_id  WHERE book.book_id = ? GROUP BY chapter.book_id`
  
  const book = await query(sql, [req.params.book_id,]);
  
  if (!book[0]) {
    res.status(404).json({ msg: "Book Not Found !" });
  }
  book[0].image_url = "http://" + req.hostname + ":4000/" + book[0].image_url;
  book[0].pdf_url = "http://" + req.hostname + ":4000/" + book[0].pdf_url;
  res.status(200).json(book[0]);
});

router.post("/books", 
    uploadBookImage.single("image"),
    body("bookName")
    .isString()
    .withMessage("Please enter a valid book name"),

    body("bookDescription")
    .isString()
    .withMessage("Please enter a valid Description")
    .isLength({min: 20})
    .withMessage("Book description should be at least 20 characters"),
    
    async(req, res) => {
        try {
          const errors = validationResult(req);
          if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
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

          const query = util.promisify(conn.query).bind(conn); // TO USE AWAIT

          const checkNameExists = await query(
            "SELECT * FROM book WHERE bookName = ?", [req.body.bookName]
          );
          if (checkNameExists.length > 0) {
            return res.status(400).json({
              errors: [
                {
                  msg: "Book name already exists !",
                },
              ],
            });
          }

          const book = {
            bookName: req.body.bookName,
            bookDescription: req.body.bookDescription,
            author: req.body.author,
            field: req.body.field,
            publicationDate: req.body.publicationDate,
            image_url: req.file.filename,
          }

        query("INSERT INTO book SET ?", book);
        const Id = await query("SELECT book_id FROM book WHERE bookName = ?", [
          req.body.bookName,
        ]);
        return res.status(200).json({
                msg :"Book created successfully",
                book_id: Id
            });
        } catch(err){
            return res.status(500).json(err);
        }
    }
);

router.put("/updateAll/:book_id", 
    uploadBookImage.single("image"),
    body("bookName")
    .isString()
    .withMessage("Please enter a valid book name"),

    body("bookDescription")
    .isString()
    .withMessage("Please enter a valid description")
    .isLength({min: 20})
    .withMessage("Book Description Should Be At Least 20 Characters"),

    async (req, res) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
    
          const book = await query("SELECT * FROM book WHERE book_id = ?", [
            req.params.book_id,
          ]);
          if (!book[0]) {
            res.status(404).json({ msg: "Book is not found !" });
          }
    
          const bookObj = {
            bookName: req.body.bookName,
            bookDescription: req.body.bookDescription,
            author: req.body.author,
            field: req.body.field,
            publicationDate: req.body.publicationDate,
          };
    
          if (req.file) {
            bookObj.image_url = req.file.filename;
            fs.unlinkSync("./upload/" + book[0].image_url); // delete old image
          }
    
          await query("UPDATE book SET ? WHERE book_id = ?", [bookObj, book[0].book_id]);
    
          res.status(200).json({
            msg: "Book updated successfully",
          });
        } catch (err) {
          res.status(500).json(err);
        }
});

router.put("/addPDF/:book_id", 
    uploadBookImage.single("pdf"),
    async (req, res) => {
        try {
          const {book_id } = req.params;
          const query = util.promisify(conn.query).bind(conn);
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          await query("UPDATE book SET ? WHERE ?", [{pdf_url: req.file.filename}, {book_id  : book_id }]);
    
          res.status(200).json({
            msg: "PDF added Successfully",
          });
        } catch (err) {
          res.status(500).json(err);
        }
      }
);

router.delete("/books/:book_id", async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const book = await query("SELECT * FROM book WHERE book_id = ?", [
        req.params.book_id,
      ]);

      if (!book[0]) {
        res.status(404).json({ msg: "Book is not found !" });
      }
      fs.unlinkSync("./upload/" + book[0].image_url); // delete old image
      await query("DELETE FROM book WHERE book_id = ?", [book[0].book_id]);
      res.status(200).json({
        msg: "Book deleted successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;