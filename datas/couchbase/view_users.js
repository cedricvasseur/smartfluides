function (doc, meta) {
	if(doc.doctype && doc.doctype == "user") {
  		emit(meta.id,{name: doc.name, address : doc.address+' '+doc.zipcode +' '+doc.town, role:doc.role});
	}
}


function (doc, meta) {
  if(doc.doctype && (doc.doctype == "admin" || doc.doctype == "user" || doc.doctype == "prestataire")) {
    	var adress = doc.address;
    	
    	if(doc.zipcode != null) adress = adress +' ' +doc.zipcode;
    	
    	if(doc.town != null) adress = adress +' ' +doc.town;
      	
      	emit(meta.id,{name: doc.name,email:doc.email, address : address, role:doc.role,photo:doc.photo, thumbnail:doc.thumbnail,phone:doc.phone,mobile:doc.mobile,organization_id:doc.organization_id });
 	}
}