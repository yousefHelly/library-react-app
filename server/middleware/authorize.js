// const conn = require("../db/connection");
// const util = require("util")

// const authorized = async (req, res) => {
//     const query = util.promisify(conn.query).bind(conn); // TO USE AWAIT
//     const{token} = req; 
//     const user = "SELECT * FROM user WHERE token = ?", {token};
//     next();
// }
module.exports = authorized;