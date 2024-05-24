var multer = require('multer');
var path = require('path');

// Set up storage engine
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/images');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize upload
var upload = multer({ storage: storage });

module.exports = upload;
