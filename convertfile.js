var fs = require('fs');
loadFile();

function loadFile() {
  var txt = "";
  fs.readFile('messages.txt', 'utf8', function (err, data) {
    if (err) throw err;
    txt = data;
    saveFile();
  });

function saveFile(){
  var arr = txt.split(/\r?\n/);
  var obj = {};

  for(var i = 0, j=0; i < arr.length; i++) {
    if(arr[i].length > 0) {
      obj[j] = arr[i];
      j++;
    }
  }

  fs.writeFile('messages.json',  JSON.stringify(obj, null, 2), 'utf-8', function (err, data) {
    if (err) throw err;
  });
}
}
