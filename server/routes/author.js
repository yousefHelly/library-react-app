const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/getAllAuthors/:page", async (req, res) => { 
    const query = util.promisify(conn.query).bind(conn);
    const {page} = req.params;
    minPage = parseInt(page) * 20;
    maxPage = minPage + 20;
    const sql = `SELECT author, COUNT(*) AS 'Number Of Books' FROM book GROUP BY 
    author ORDER BY author ASC LIMIT ${minPage}, ${maxPage}`;

    const authors = await query(sql);
    res.status(200).json(authors);
});

router.get("/getAuthor/:author", async (req, res) => { // GET AUTHOR'S BOOKS
    const query = util.promisify(conn.query).bind(conn);
    const {author} = req.params;
    const sql = `SELECT bookName, bookDescription, field from book WHERE author LIKE '%${author}%'`
    const authorName = await query(sql);

    if (!authorName[0]) {
        res.status(404).json({ msg: "Author is not found !" });
      }
    res.status(200).json(authorName);
});
module.exports = router;