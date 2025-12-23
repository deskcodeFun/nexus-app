const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json())

const con = new Client({
  host: "localhost",
  user: 'postgres',
  port: 5432,
  password: 'pkok4050',
  database: 'demopost'
});

con.connect().then(()=> console.log(`Server run on PORT: ${con.port}`))