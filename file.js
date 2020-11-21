"use strict";

var clickable=false;

var div1, div2;
var fileTag, decideTag, titleTag, importTag, cancelTag, tableTag;
var file_reader;

var obj;

function onLoad(e){
	div1 = document.getElementById("div1");
	div2 = document.getElementById("div2");
	fileTag = document.getElementById("file");
	titleTag = document.getElementById("title");
	importTag = document.getElementById("import");
	cancelTag = document.getElementById("cancel");
	tableTag = document.getElementById("table");

	div2.style.display = "none";

	file_reader = new FileReader();

	file_reader.addEventListener("load", function(e){
		var str = file_reader.result.replace(/\r\n?/g,'\n');
		obj = str2obj(str);
		titleTag.value = obj.title;
		tableTag.innerHTML = "";
		for(var i=0; i<obj.table.length; i++){
			var tr = tableTag.insertRow(-1);
				for(var j=0; j<obj.table[i].length; j++){
				var td = tr.insertCell(-1);
				td.innerHTML = strform(obj.table[i][j]);
			}
		}
		div1.style.display = "none";
		div2.style.display = "";
		clickable=true;
	}, false);


	file_reader.addEventListener("error", function(e){
		alert("error");
		clickable=true;
	}, false);

	fileTag.addEventListener("change", function(e){
		if(!clickable) return;
		clickable=false;

		var files = fileTag.files;
		if(files.length<1) return;
		var file = files[0];
		console.log(file);

		file_reader.readAsText(file);
	}, false);

	importTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		var dir = data_ls();
		var title = titleTag.value;
		if(!title){
		}else if(dir.indexOf(title)<0){
			obj.title = title;
			data_write(obj);
			//window.location.href = "./open.html#"+encodeURIComponent(title);
			window.location.replace("./open.html#"+encodeURIComponent(title));
		}else{
			window.alert("同じ題名が既に存在します");
		}
		clickable=true;
	}, false);

	cancelTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		div1.style.display = "";
		div2.style.display = "none";
		clickable=true;
	}, false);

	clickable=true;
}

window.addEventListener("load", onLoad, false);
