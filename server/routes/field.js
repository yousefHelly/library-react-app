const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/field/:fieldName/:page", async (req, res) => {
    const {fieldName} = req.params;
    const {page} = req.params;
    const query = util.promisify(conn.query).bind(conn);
    const GetNumberOfBooks = util.promisify(conn.query).bind(conn);

    minPage = parseInt(page) * 12;
    maxPage = minPage + 12;
    const sql =  `SELECT book.book_id, bookName, bookDescription, author, field, publicationDate, image_url, pdf_url, Count(*) AS 'CountChapters' FROM book 
    right join chapter on book.book_id = chapter.book_id WHERE field ='${fieldName}' GROUP BY chapter.book_id ORDER BY bookName ASC
    LIMIT ${minPage}, ${maxPage}`
    const books = await query(sql);

    const numberOfBooks = await GetNumberOfBooks(`SELECT COUNT(*) AS 'CountBooks' FROM book WHERE field ='${fieldName}'`);
    const numberOfPages = Math.ceil(numberOfBooks[0].CountBooks / 12); 

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

module.exports = router;