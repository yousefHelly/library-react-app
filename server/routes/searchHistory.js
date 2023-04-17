const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/searchHistory/:user_id/:page", async (req, res) => { 
  const {user_id} = req.params;
  const {page} = req.params;
  minPage = parseInt(page) * 25;
  maxPage = minPage + 25;
  const query = util.promisify(conn.query).bind(conn);
  const sql = `SELECT search, searchDate FROM search_history WHERE user_id = '${user_id}' LIMIT ${minPage}, ${maxPage}`;
  const search_history = await query(sql);
  if (search_history.length < 0) {
    res.status(404).json({ msg: "Not Found !" });
  }
  res.status(200).json(search_history);
});
module.exports = router;