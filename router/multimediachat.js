const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const middleware=require('../middleware/auth');
const multimediaChatController = require('../controller/multimediachat')



router.post('/sendfile/:groupname',middleware.authentication , upload.single('file') ,multimediaChatController.sendFile);



module.exports = router;