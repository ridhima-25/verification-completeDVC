// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const cors = require('cors');
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Enable CORS for all routes
// app.use(cors());

// app.use(bodyParser.json());

// // MySQL connection setup
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });

// app.post('/store-data', (req, res) => {
//     const data = req.body;
//     // Extract cred_id and remove it from the data object
//     const cred_id = data.id;
//     const cred_sub = JSON.stringify(data.credentialSubject);
//     const query = "INSERT INTO data_store (cred_id, json_data ) VALUES (?,?)";
//     db.query(query,
//          [cred_id, cred_sub],
//         (err, result) => {
//         console.log("query", query);
//         if (err) {
//             console.error('Error storing data:', err);
//             res.status(500).send('Error storing data');
//             return;
//         }
//         res.status(200).send(`Data stored with ID: ${result.insertId}`);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const crypto = require("crypto");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/store-data", (req, res) => {
  const vcData = req.body;

  // Check if required fields are present
  if (!vcData || !vcData.credentialSubject) {
    return res
      .status(400)
      .send("Bad Request: Missing cred_id or credentialSubject");
  }
  console.log("credential Subject : ", vcData.credentialSubject);
  const query = `INSERT INTO dvc_table (credentialId, id , farmerId, farmerName, identifierName, gender, dob, address, landDetails, cropDetails,  issuanceDate, disclaimer, subHash)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?)`;
  const values = [
    vcData.id,
    vcData.credentialSubject.id,
    vcData.credentialSubject.farmerId,
    vcData.credentialSubject.farmerName,
    vcData.credentialSubject.identifierName,
    vcData.credentialSubject.gender,
    vcData.credentialSubject.dob,
    vcData.credentialSubject.address,
    JSON.stringify(vcData.credentialSubject.landDetails),
    JSON.stringify(vcData.credentialSubject.cropDetails),
    vcData.credentialSubject.issuanceDate,
    vcData.credentialSubject.disclaimer,
    Buffer.from(JSON.stringify(vcData.credentialSubject)).toString("base64"),
    // crypto
    //   .createHash("sha256")
    //   .update(JSON.stringify(vcData.credentialSubject))
    //   .digest("base64"),
  ];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error storing data:", err);
      return res.status(500).json({ message: `Error storing data` });
    }
    res
      .status(200)
      .json({ message: `Data stored with ID: ${result.insertId}` });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
