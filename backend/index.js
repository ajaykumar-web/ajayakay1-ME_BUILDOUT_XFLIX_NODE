const app = require("./app.js");
const mongoose = require("mongoose");
const config = require("./config/config");

const DB_URI = config.mongoose.url;
const PORT = config.port;
mongoose.connect(DB_URI).then(()=> {console.log("DB connect successfully")})
app.listen(PORT,()=> {
    console.log("Server listing at port no. 8082")
})
