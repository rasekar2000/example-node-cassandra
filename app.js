var express = require('express');
var fs = require('fs');
//var helenus = require('helenus');
var actions = require('./actions');
var hostname = process.env.CASSANDRA_HOST; 
var cassandra = require('cassandra-driver');

// To check the CQL spec in
// https://stackoverflow.com/questions/31502442/check-cql-version-with-cassandra-and-cqlsh?answertab=active#tab-top 

// To connect to the cqlsh
// https://docs.datastax.com/en/dse/5.1/cql/cql/cql_reference/cqlsh_commands/cqlsh.html

const pool = new cassandra.Client({ contactPoints: [hostname], keyspace   : 'myspace',
	timeout    : 6000,
	cqlVersion : '3.4.4'
});

pool.on('error', function(err){
	console.error(err.name, err.message);
});	
var app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/css/*', function (req, res) {
  res.sendfile(__dirname + '/www/css/' + req.params[0]);
});

app.get('/js/*', function (req, res) {
  res.sendfile(__dirname + '/www/js/' + req.params[0]);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/www/index.html');
});

app.post('/contact', function (req, res) {
	if(typeof(req.body.contactEdit) != "undefined"){
		actions.UpdateContact(req, res, pool);
	} else {
		actions.InsertContact(req, res, pool);
	}
});

app.post('/delete', function (req, res) {	
	actions.DeleteContact(req, res, pool);
});

app.get('/loadData', function (req, res) {
	actions.LoadContacts(req, res, pool);
});

app.listen(8181);
console.log('Run in port 8181');
