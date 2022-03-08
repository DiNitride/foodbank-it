let mysql = require('mysql')
let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "foodbank"
})

conn.connect()

conn.query('SELECT * FROM logins', (error, results, fields) => {
  if (error) { throw error }
  console.log(results)
})

conn.end()