const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/search/:user_id/:page", async (req, res) => {
  const {user_id} = req.params;
  const {page} = req.params;
  minPage = parseInt(page) * 12;
  maxPage = minPage + 12;

  const query = util.promisify(conn.query).bind(conn);
  const saveSearch = util.promisify(conn.query).bind(conn);
  const GetNumberOfBooks = util.promisify(conn.query).bind(conn);

  let search = "";
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  if (req.query.search) {
    // QUERY PARAMS
    req.query.search = req.query.search.replace(/-/g,' ')
    search = `WHERE bookName LIKE '%${req.query.search}%' OR bookDescription LIKE '%${req.query.search}%' ORDER BY bookName ASC
    LIMIT ${minPage}, ${maxPage}`;
  }
  const books = await query(`SELECT * FROM book ${search}`);
  const numberOfBooks = await GetNumberOfBooks(`SELECT COUNT(*) AS 'CountBooks' FROM book WHERE bookName LIKE '%${req.query.search}%' OR bookDescription LIKE '%${req.query.search}%'`);
  const numberOfPages = Math.ceil(numberOfBooks[0].CountBooks / 12); 
  if (page == 0) {
    await saveSearch(`INSERT INTO search_history SET ?`, {search: req.query.search, user_id: user_id, searchDate: date})
  }
  
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