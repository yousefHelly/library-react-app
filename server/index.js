require("dotenv").config();
//############################################## Express App #######################################
const express = require("express");
const app = express();
//############################################# Global Middleware ##################################
app.use(express.json())
app.use(express.urlencoded({ extended:true })); // TO ACESS URL FORM ENCODED
app.use(express.static('upload'));
const cors = require("cors",{
    origin:'*'
});
app.use(cors()); //Allow HTTP
//############################################### Require Module ###################################
const book = require("./routes/books");
const chapter = require("./routes/chapter");
const author = require("./routes/author");
const field = require("./routes/field");
const reader = require("./routes/reader");
const request = require("./routes/request");
const searchHistory = require("./routes/searchHistory");
const search = require("./routes/search");
const login = require("./routes/login");
//############################################### RUN SERVER ##################################
const PORT = process.env.POST || "4000";
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
    console.log(`SERVER IS RUNNING ON http://${HOST}:${PORT}`);
});
//############################################### API ROUTES ##################################
app.use("", book);
app.use("", chapter);
app.use("", author);
app.use("", field);
app.use("", reader);
app.use("", request);
app.use("", searchHistory);
app.use("", search);
app.use("", login);



