var express = require('express');
var upload = require('../middlewares/uploadMiddleware');

var router = express.Router();

router.post('/upload', upload.single('image'), function(req, res) {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to upload file',
      error: err.message
    });
  }
});

module.exports = router;
