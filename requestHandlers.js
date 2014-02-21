var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
 console.log("Request handler 'start' was called.");
 var body =' <html>'+
'<head>'+
'	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> '+
'<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript"></script>'+
'	<script type="text/javascript">'+
'	$(function() {'+
'	var file;'+
'	    $("#fileselect").bind("change", function(e) {'+
'	      var files = e.target.files || e.dataTransfer.files;'+
'	      file = files[0];'+
'	    });'+
'	$("#buttonUpload")'+
'			.click('+
'					function() {'+
'						alert(11111);'+
'						jQuery.ajax({'+
'								url : "http://bcs.duapp.com/pangxinlong/test.txt?'+
'sign=MBO:vPRI2OYEZVunFrD9njDm6qs2:xX2I%2FtU0tHSerfS0E2V%2FTyUNU%2Bc%3D",'+
'								type : "POST",'+
'							  data: function() {'+
'                  var data = new FormData();'+
'                   data.append("upload", file);'+
'                   return data;'+
'               }(),'+
'								contentType: false,'+
'    					                 	processData: false, '+
'								beforeSend : function(xhr) {'+
'									xhr.overrideMimeType("text/plain; charset=x-user-defined");'+
'								}'+
'							}).done(function(data) {'+
'								alert(111);'+
'								if (console && console.log) {'+
'									console.log("Sample of data:", data);'+
'								}'+
'							});'+
'					})'+
'});'+
'	</script>'+
'</head> '+
'<body>'+
'<input type="file" id="fileselect" multiple="multiple">'+
'<button class="button" id="buttonUpload" >Upload</button>'+
'</body>'+
'</html>';
   response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "./tmp/test.txt");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received movie:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.txt", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "img/txt"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
