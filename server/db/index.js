let mysql = require('mysql2');

const dbconnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'Reviews',
});

const dbconnect = dbconnection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('this is the database');
});

module.exports = dbconnection;