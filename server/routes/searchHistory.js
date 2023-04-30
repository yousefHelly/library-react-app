const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/searchHistory/:user_id/:page", async (req, res) => { 
  const {user_id} = req.params;
  const {page} = req.params;
  minPage = parseInt(page) * 10;
  maxPage = minPage + 10;
  const query = util.promisify(conn.query).bind(conn);
  const GetNumberOfSearches= util.promisify(conn.query).bind(conn);

  const sql = `SELECT search, searchDate FROM search_history WHERE user_id = '${user_id}' LIMIT ${minPage}, ${maxPage}`;
  const search_history = await query(sql);
  const numberOfSearches = await GetNumberOfSearches(`SELECT COUNT(*) AS 'CountSearch' FROM search_history WHERE user_id ='${user_id}'`);
  const numberOfPages = Math.ceil(numberOfSearches[0].CountSearch / 10); 

  res.status(200).json({
    searchHistory:search_history,
    numberOfSearches: numberOfSearches,
    numberOfPages: numberOfPages,
    currentPage: +page
  });
});
module.exports = router;