function (doc, meta) {
	if(doc.doctype && doc.doctype == "user") {
  		emit(meta.id,{name: doc.name, address : doc.address+' '+doc.zipcode +' '+doc.town, role:doc.role});
	}
}
