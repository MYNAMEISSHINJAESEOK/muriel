var express = require('express');
var router = express.Router();
const department = require('../libs/department.js')

/* GET home page. */

const syntax = {
  title : 'muriel',
  department : department,
}

router.get('/', function(req , res , next ) {
  res.render('index', syntax);
});

module.exports = router;