var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'zcyzf',
	database:'nodejs'
});
connection.connect(function(err){
	console.log(err);
});

connection.query('SELECT 1 + 1 AS solution',function(err,rows,fields){
	if(err) throw err;
	console.log('this solution is :' ,rows[0].solution);
});
connection.end();