const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/getAllAuthors/:page", async (req, res) => { 
    const query = util.promisify(conn.query).bind(conn);
    const GetNumberOfAuthors= util.promisify(conn.query).bind(conn);
    const {page} = req.params;
    minPage = parseInt(page) * 12;
    maxPage = minPage + 12;
    const sql = `SELECT author, COUNT(*) AS 'NumberOfBooks' FROM book GROUP BY 
    author ORDER BY author ASC LIMIT ${minPage}, ${maxPage}`;
    const authors = await query(sql);
    const numberOfAuthors = await GetNumberOfAuthors(`SELECT COUNT(*) AS 'CountAuthors' FROM book`);
    const numberOfPages = Math.ceil(numberOfAuthors[0].CountAuthors / 12); 
    return res.status(200).json({
        authors:authors,
        numberOfAuthors: numberOfAuthors,
        numberOfPages: numberOfPages,
        currentPage:+page
      });
});
router.get("/getAllAuthors", async (req, res) => { // GET ALL AUTHORS "just name"
  const query = util.promisify(conn.query).bind(conn);
  const sql = `SELECT DISTINCT author from book ORDER BY author ASC`
  const author = await query(sql);

  return res.status(200).json(author);
});
router.get("/getAuthor/:author/:page", async (req, res) => { // GET AUTHOR'S BOOKS
    const {author} = req.params;
    const {page} = req.params;

    minPage = parseInt(page) * 12;
    maxPage = minPage + 12;
    
    const query = util.promisify(conn.query).bind(conn);
    const GetNumberOfBooks = util.promisify(conn.query).bind(conn);

    const sql = `SELECT book.book_id, bookName, bookDescription, author, field, publicationDate, image_url, pdf_url, Count(*) AS 'CountChapters' FROM book 
    right join chapter on book.book_id = chapter.book_id WHERE author ='${author}' GROUP BY chapter.book_id ORDER BY bookName ASC
    LIMIT ${minPage}, ${maxPage}`
    const books = await query(sql);

    const numberOfBooks = await GetNumberOfBooks(`SELECT COUNT(*) AS 'CountBooks' FROM book WHERE author ='${author}'`);
    const numberOfPages = Math.ceil(numberOfBooks[0].CountBooks / 12); 

    books.map((book) => {
      book.image_url = "http://" + req.hostname + ":4000/" + book.image_url;
      book.pdf_url = "http://" + req.hostname + ":4000/" + book.pdf_url;
    });

    return res.status(200).json({
      books:books,
      numberOfBooks: numberOfBooks,
      numberOfPages: numberOfPages,
      currentPage:+page
    });
});
module.exports = router;