var uploadField = document.getElementById("image");
var button = document.getElementById("buttonImage");


function hasExtension(inputID, exts) {
  var fileName = document.getElementById(inputID).value;
  return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}

uploadField.onchange = function() {
    // console.log(this.files[0].size)
    if(this.files[0].size > 1024 * 1024 * 10 || !hasExtension('image', ['.jpg', '.png', '.gif'])){
       alert("Внимание файл превышает допустимый размер 10 мб или файл не является изображением");
       this.value = "";
       button.disabled = true
    } else {
      button.disabled = false
    }
};

