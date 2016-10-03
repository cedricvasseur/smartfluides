/***************************/
/*      Global Indexes     */
/***************************/

CREATE PRIMARY INDEX `primary-index` ON `smartfluides` USING GSI;

/***************************/
/*          Views          */
/*  _design/smartfluides   */
/***************************/

//files

function (doc, meta) {
  if(doc.doctype && (doc.doctype == "file")) {
        emit(meta.id,doc.type+","+doc.base64);
  }
}

//login_users

function (doc, meta) {
  if(doc.doctype && (doc.doctype == "admin" || doc.doctype == "user" || doc.doctype == "prestataire")) {
        emit(doc.username,doc);
  }
}

//users

function (doc, meta) {
  if(doc.doctype && (doc.doctype == "admin" || doc.doctype == "user" || doc.doctype == "prestataire")) {
        emit(meta.id,doc);
  }
}

//sites

function (doc, meta) {
  if(doc.doctype && (doc.doctype == "site")) {
        emit(meta.id,doc);
  }
}

//tasks

function (doc, meta) {
  if(doc.doctype && (doc.doctype == "task")) {
        emit(doc.user_id,doc);
  }
}

//consumptions

function (doc, meta) {
  if(doc.doctype && (doc.doctype == "consumption")) {
        emit(meta.id,doc);
  }
}
