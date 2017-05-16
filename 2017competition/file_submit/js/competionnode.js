var mysql=require('mysql');
var http=require('http');

http.createServer({
	
})



var connection=mysql.createConnection({
	host :'localhost',
	port:3306,
	user:'root',
	password:'zcyzf'
	database:'competition'
});
connection.connect(function(err){
	console.log(err);
});
