var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const multer = require('multer');

const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/'})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if(!req.file){
    return res.status(400).json({ error: 'No file uploaded'})
  }

  const metadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }

  res.json(metadata)
})


app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
