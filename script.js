const { Pool, Client } = require('pg')


const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'reviewsdb',
  password: '',
  port: 5432,
})



pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res, 'running')
  pool.end()
})

module.exports = pool;

// const client = new Client({
//   user: 'dbuser',
//   host: 'localhost',
//   database: 'reviewsdb',
//   password: '',
//   port: 3211,
// })

// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })



// module.exports = {
//   query:(text, params, callback) => {
//     return pool.query(text, params, callback);
//   },
//   connect: (err, client, done) => {
//     return pool.connect(err, client, done);
//   },
// };

// const { Pool, Client } = require('pg')
// // pools will use environment variables
// // for connection information
// const pool = new Pool()
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// // you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()
// // clients will also use environment variables
// // for connection information
// const client = new Client()
// await client.connect()
// const res = await client.query('SELECT NOW()')
// await client.end()