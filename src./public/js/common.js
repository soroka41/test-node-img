var uploadField = document.getElementById("image");
var button = document.getElementById("buttonImage");

uploadField.onchange = function() {
    // console.log(this.files[0].size)
    if(this.files[0].size > 1024 * 1024 * 10){
       alert("Внимание файл превышает допустимый размер 10 мб");
       this.value = "";
       button.disabled = true
    } else {
      button.disabled = false
    }
};

