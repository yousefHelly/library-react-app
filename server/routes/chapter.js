const router = require('express').Router();
const { json } = require('body-parser');
const conn = require("../db/connection");
const util = require("util");
const { body, validationResult } = require("express-validator");

router.get("/chapter", async (req, res) => { // Get All 
    const query = util.promisify(conn.query).bind(conn);
    const sql = "SELECT title, chapterDescription FROM chapter";
    const chapters = await query(sql);
    return res.status(200).json(chapters);
});

router.get("/chapter/:book_id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const {book_id} = req.params;
    const sql = `SELECT chapter_id, title, chapterDescription FROM book JOIN chapter ON book.book_id = chapter. book_id WHERE book.book_id =${book_id}`;
    const chapters = await query(sql);
    if (!chapters[0]) {
      return res.status(404).json({ msg: "Chapter is not found !" });
      }
      return res.status(200).json(chapters);
});

router.post("/chapter",     
    body("title")
    .isString()
    .withMessage("Please enter a valid title"),

    body("chapterDescription")
    .isString()
    .withMessage("Please enter a valid description")
    .isLength({min: 10})
    .withMessage("Chapter description should be at least 10 characters"),

    async(req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

    const query = util.promisify(conn.query).bind(conn);
    const GetBook = util.promisify(conn.query).bind(conn);
    const GetChapterId = util.promisify(conn.query).bind(conn);

    const book = req.body.bookName;
    const getBookId = await GetBook(`SELECT book_id FROM book WHERE bookName = '${book}'`);

    const chapter = {
      title: req.body.title,
      chapterDescription: req.body.chapterDescription,
      book_id: getBookId[0].book_id
    }

    query("INSERT INTO chapter SET ?", chapter);
    const chapterId = await GetChapterId("SELECT chapter_id FROM chapter WHERE title = ? and chapterDescription = ? ",
     [req.body.title, req.body.chapterDescription]);
     return res.status(200).json({
            chapter_id: chapterId,
            msg :"Chapter created successfully",
        });
    } catch(err){
      return res.status(500).json(err);
    }
});

router.put("/chapter/:chapter_id",
    body("title")
    .isString()
    .withMessage("Please enter a valid title"),

    body("chapterDescription")
    .isString()
    .withMessage("Please enter a valid description")
    .isLength({min: 10})
    .withMessage("Chapter description should be at least 10 characters"),

    async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const chapter = await query("SELECT * FROM chapter WHERE chapter_id = ?", [
        req.params.chapter_id,
      ]);

      if (!chapter[0]) {
        return res.status(404).json({ msg: "Chapter is not found !" });
      }

      const GetBook = util.promisify(conn.query).bind(conn);
      const book = req.body.bookName;
      const getBookId = await GetBook(`SELECT book_id FROM book WHERE bookName = '${book}'`);

      const chapterObj = {
        title: req.body.title,
        chapterDescription: req.body.chapterDescription,
        book_id: getBookId[0].book_id
      };

      await query("UPDATE chapter SET ? WHERE chapter_id = ?", [chapterObj, chapter[0].chapter_id]);

      return res.status(200).json({
        msg: "Chapter updated successfully",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
});

router.delete("/chapter/:chapter_id", async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const chapter = await query("SELECT * FROM chapter WHERE chapter_id = ?", [
        req.params.chapter_id,
      ]);

      if (!chapter[0]) {
        return res.status(404).json({ msg: "Chapter is not found !" });
      }

      await query("DELETE FROM chapter WHERE chapter_id = ?", [chapter[0].chapter_id]);
      return res.status(200).json({
        msg: "Chapter deleted successfully",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
});

module.exports = router;