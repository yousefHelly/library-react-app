const router = require('express').Router();
const conn = require("../db/connection");
const util = require("util");

router.get("/field/:field", async (req, res) => {
    const {field} = req.params;
    const query = util.promisify(conn.query).bind(conn);
    const sql = `SELECT * from book WHERE field = '${field}'`
    const user = await query(sql);

    res.status(200).json(user);
});

module.exports = router;