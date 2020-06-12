const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const fs = require("fs");
var cors = require("cors");

const transactions = require("./routes/transactions");
const connDB = require("../config/db");

const app = express();
app.use(express.json());

// allow cross-origin request
app.use(cors());

const config = "./config/config.env";
//console.log(fs.existsSync(`${__dirname}/routes/transactions.js`));

dotenv.config({ path: config });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connDB();

const PORT = process.env.PORT || 5000;

app.use("/api/v1/transactions", transactions);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

/**
 * Exercise:
 * - Read “index.html.template” file
 *  - On the request, read user browser information such as device (let’s check if user is mobile, tablet or desktop) and language (in en-gb form) (don’t tell the candidate to use headers, correct ones are “User-Agent” and “Accept-Language”, candidate can use any library to parse “User-Agent”)
 *  - Return read template file with replaced “{{device}}” with user device info and “{{language}}” with user preferred language
 */
