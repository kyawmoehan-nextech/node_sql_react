const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(morgan("dev"));

const PORT = 8000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "react_sql",
});

connection.connect();

connection.on("connect", () => {
  console.log("connect to mysql");
});

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";

app.get("/", (req, res) => {
  res.status("200").json({
    message: "go to /products to see product",
  });
});

app.get("/products", (req, res) => {
  connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/product/add", (req, res) => {
  const { name, price, description } = req.query;
  const INSERT_QUERY = `INSERT INTO  products (name, price, description) VALUES ('${name}',${price}, '${description}')`;
  connection.query(INSERT_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Add product successful");
    }
  });
});

app.get("/product/delete", (req, res) => {
  const { id } = req.query;
  const DELETE_QUERY = `DELETE FROM products WHERE (id = '${id}')`;
  connection.query(DELETE_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Delete product successful");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listen Server Port at ${PORT}`);
});
