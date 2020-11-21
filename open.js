"use strict";

var clickable=false;

var editTag, playTag, removeTag, renameTag, exportTag, titleTag, tableTag, toggleTag;
var visible;
var title;

var link;

function onpageshow(e){
	console.log("onpageshow");
	title = getTitle();
	if(title==null) return;

	var obj = data_read(title);
	console.log(obj);
	if(obj==null) return;

	visible=false;
	tableTag.style.display = visible?"":"none";
	toggleTag.value = visible?"非表示":"表示";

	titleTag.value = title;
	tableTag.innerHTML = "";
	for(var i=0; i<obj.table.length; i++){
		var tr = tableTag.insertRow(-1);
		for(var j=0; j<obj.table[i].length; j++){
			var td = tr.insertCell(-1);
			td.innerHTML = strform(obj.table[i][j]);
		}
	}

	var blob = new Blob([obj2str(obj).replace(/\n/g,"\r\n")],{type:"text/plan"});
	link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "tango-" + obj.title + ".txt";

	clickable=true;
}

function onload(e){
	console.log("onload");
	editTag = document.getElementById("edit");
	playTag = document.getElementById("play");
	removeTag = document.getElementById("remove");
	renameTag = document.getElementById("rename");
	exportTag = document.getElementById("export");
	titleTag = document.getElementById("title");
	tableTag = document.getElementById("table");
	toggleTag = document.getElementById("toggle");

	editTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		window.location.href = "./edit.html#"+encodeURIComponent(title);
		clickable=true;
	}, false);

	removeTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;

		if(window.confirm("本当に削除しますか？")){
			data_rm(title);
			//window.location.href = "./";
			history.back();
		}
	}, false);

	renameTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		var dir = data_ls();
		var title_old = title;
		var title_new = window.prompt("題名", title_old);
		if(!title_new){
		}else if(title_new==title_old){
		}else if(dir.indexOf(title_new)<0){
			data_mv(title_old, title_new);
			//window.location.href = "./open.html#"+encodeURIComponent(title_new);
			window.location.replace("./open.html#"+encodeURIComponent(title_new));
		}else{
			window.alert("既に存在します");
		}
		clickable=true;
	}, false);

	exportTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		link.click();
		clickable=true;
	}, false);

	playTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		window.location.href = "./play.html#"+encodeURIComponent(title);
		clickable=true;
	}, false);

	toggleTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		visible = !visible;
		tableTag.style.display = visible?"":"none";
		toggleTag.value = visible?"非表示":"表示";
		clickable=true;
	}, false);
}

function onpagehide(e){
	console.log("onpagehide");
	clickable=false;
}

window.addEventListener("pageshow", onpageshow, false);
window.addEventListener("popstate", onpageshow, false);
window.addEventListener("pagehide", onpagehide, false);
window.addEventListener("load", onload, false);
