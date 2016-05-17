

//update infos

function update_infos(
	email_or_phone, 
	password,
	first_name,
	last_name, callback){

	require('./authentification.js')
	.authenticate_admin(email_or_phone, password, function(err, admin){
		if(err) callback(err, null);
		else{
			require('./admin.js').Admin
			.update({_id : admin._id}, {
				email_or_phone	: email_or_phone, 
				password	: password,
				first_name	: first_name,
				last_name	: last_name}, function(err, numAffected){
				if(err) callback(1, null);
				else{
					findById(admin._id, function(err, admin){
						if(err) callback(2, null); // erreur lors de la recuperation du d'admin
						else callback(null, admin);
					});
				}
			});
		}
	});
}