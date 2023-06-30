var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.delete('/file', (req, res) => {

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {

 
    let path = './' + fields.path; //Concatena a partir do diretório atual
    
    if (fs.existsSync(path)) {

      //unlink remove caminho físico (busca no diretório)
      fs.unlink(path, err => {

        if (err) {

          res.status(400).json({
            err
          });
          
        } else {

          res.json({
            fields
          });

        }

      });

    } 
    
    // else {

    //   res.status(404).json({
    //     error: 'File not found.'
    //   });
  
    // }

  });

});


router.post('/upload', (req, res) => {

  let form = new formidable.IncomingForm({
      uploadDir: './upload',
      keepExtensions: true //Para incluir extensão no arquivo
    });

    form.parse(req, (err, fields, files) => {

      res.json({
        files
      });

    });

});

module.exports = router;
