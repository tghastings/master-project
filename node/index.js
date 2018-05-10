// SELECT
//   UNIX_TIMESTAMP(time) as time_sec,
//   used as value,
//   function_name as metric
// FROM application_1
// WHERE $__timeFilter(time)
// ORDER BY time ASC

const express = require('express')
const mysql = require('mysql');
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "metrics"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => res.send('Final Master Project! w00t.'))

app.post('/', function (req, res) {
  var appName = req.body.application_name
  var functionName = req.body.function_name
  var usage = req.body.usage
  submitDatatoDatabase(appName, functionName, usage)
  res.send('Sent to database')
})

function submitDatatoDatabase(application_name, function_name, usage) {
  var that = this;
  var sql = "INSERT INTO "+application_name+" (function_name, used) VALUES ?";
  var values = [
    [function_name, usage]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

app.listen(80, () => console.log('App is listening on port 80!'))