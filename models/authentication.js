


// authentification de l'admin
exports.authenticate_admin = function (email_or_phone, password, callback){
	require('./admin.js').Admin
	.findOne({email_or_phone:email_or_phone}, function(err, admin){
		console.log(admin);
		if(err) console.log(err);
		else if(!admin) callback(1, null); // email_or_phone n'existe pas
		else{
			if(password != admin.password){
				console.log(admin.password);
				callback(2, null);	//password incorect
				console.log("mot de passe incorrect");
			}
			else{
				callback(null, admin);
				console.log("aunthentification reussi");
			}
					
		}
			

	});

}



