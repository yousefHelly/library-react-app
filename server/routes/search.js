const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/search/:user_id", async (req, res) => {
  const {user_id} = req.params;
  const query = util.promisify(conn.query).bind(conn);
  const saveSearch = util.promisify(conn.query).bind(conn);

  const GetNumberOfBooks = util.promisify(conn.query).bind(conn);

  let search = "";
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  if (req.query.search) {
    // QUERY PARAMS
    req.query.search = req.query.search.replace(/-/g,' ')
    search = `WHERE bookName LIKE '%${req.query.search}%' OR bookDescription LIKE '%${req.query.search}%'`;
  }
  const books = await query(`SELECT * FROM book ${search}`);
  const numberOfBooks = await GetNumberOfBooks(`SELECT COUNT(*) AS 'CountBooks' FROM book ${search}`);

  await saveSearch(`INSERT INTO search_history SET ?`, {search: req.query.search, user_id: user_id, searchDate: date})
  
  books.map((book) => {
    book.image_url = "http://" + req.hostname + ":4000/" + book.image_url;
    book.pdf_url = "http://" + req.hostname + ":4000/" + book.pdf_url;
});
  res.status(200).json({
    books:books,
    numberOfBooks: numberOfBooks,
  });
});

module.exports = router;