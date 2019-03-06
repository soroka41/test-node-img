const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');
const upload = multer({limit: {
  fileSize: 1024 * 1024 * 10,
}});
const Resize = require('./resize');

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser());

app.use(logger('dev')); 
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async function (req, res) {
  await res.render('index.pug');
})

app.get('/image-list', async function (req, res) {
  await res.redirect('/')
})

app.post('/image-list', upload.single('image'), async function (req, res) {
  if (req.file) {
      // console.log('Загрузка файла...' + req.file.filename);
      var imagePath = path.join(__dirname, '/public/uploads');
      var fileUpload = new Resize(imagePath);
      var fileName = await fileUpload.save(req.file.buffer);
      var uploadStatus = 'Изображение загружено';
  } else {
      // console.log('Файл не загружен');
      var fileName = 'Файл не загружен';
      var uploadStatus = 'Ошибка загрузки файла';
  }
  
  res.render('image-list.pug', { status: uploadStatus, fileName: `Имя файла: ${fileName}`, fileUrl: fileName });
});

app.listen(port, function () {
  console.log('Run serve on port: ' + port )
})

