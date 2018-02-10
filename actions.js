const util = require('util')

module.exports = {
	InsertContact : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
		    	//console.log(" input b4 insert " + post);
		    	//console.log(util.inspect(post, false, null))
		    	//console.log("Before Change", JSON.parse(JSON.stringify(post)));
				pool.execute("INSERT INTO contact (email, name, phone, address, city) VALUES (?,?,?,?,?)", [post.email, post.name, post.phone, post.address, post.city], function(err, results){
					//console.log(util.inspect(err, false, null))
					//console.log(util.inspect(results, false, null))
					res.redirect('/');
				});
		    }
		});
	},
	UpdateContact : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				pool.execute("UPDATE contact SET name = ?, phone = ?, address = ?, city = ? WHERE email = ?", [post.name, post.phone, post.address, post.city, post.contactEdit], function(err, results){
					//console.log(util.inspect(err, false, null))
					//console.log(util.inspect(results, false, null))					
					res.redirect('/');
				});
		    }
		});
	},
	DeleteContact : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				pool.execute("DELETE FROM contact WHERE email = ?", [post.contactDel], function(err, results){
					//console.log(util.inspect(err, false, null))
					//console.log(util.inspect(results, false, null))					
					res.redirect('/');
				});
		    }
		});
	},
	LoadContacts : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
		    	var query = "SELECT * FROM lb4b.contact";
		    	if(typeof(req.query.email) != "undefined"){
		    		query += " WHERE email = '"+req.query.email+"'";
		    	}

				pool.execute(query, [], function(err, results){
					var data = [];
					if (results != undefined) {
						//console.log(util.inspect(results, false, null))
						//console.log(util.inspect(results.rows, false, null))
						console.log(util.inspect(results.rows, false, null));
						if (results.rowLength == 1){
							var obj = {};
							//console.log(util.inspect(results.rows[0], false, null));
							results.rows[0].forEach(function(name,value,ts,ttl){
							  		//console.log(util.inspect(name, false, null));
							  		//console.log(util.inspect(value, false, null));
							    	obj[value] = name;
							  	});
							//obj = results.rows;
							//console.log("obj follows");
							//console.log(util.inspect(obj, false, null));
							data.push(obj);
						} else {
							results.rows.forEach(function(row){
								//console.log(util.inspect(row, false, null));
								var obj = {};
							  	row.forEach(function(name,value,ts,ttl){
							  		//console.log(util.inspect(name, false, null));
							  		//console.log(util.inspect(value, false, null));
							    	obj[value] = name;
							  	});
							  	//console.log(util.inspect(obj, false, null));
							  	data.push(obj);
							});
						}
					}
					res.send(data);
				});
		    }
		});
	}
}