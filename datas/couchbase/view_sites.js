function (doc, meta) {
  if(doc.doctype && (doc.doctype == "site")) {
      	emit(meta.id,{
      		name: doc.name,
      		type:doc.type,
      		address: doc.address, 
      		photo:doc.photo, 
      		thumbnail:doc.thumbnail,
      		organization_id:doc.organization_id 
      	});
 	}
}
