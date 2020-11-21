"use strict";

let clickable=false;

let create, file;
let listTag;

function onpageshow(e){
	clickable=false;
	document.getElementById("checkbox").checked = false;

	let dir = data_ls();
	console.log(dir);

	if(dir.length>0){
		dir.sort();
		listTag.innerHTML="";
		for(let i=0; i<dir.length; i++){
			let item = document.createElement("div");
			item.innerText = dir[i];
			item.value = encodeURIComponent(item.innerText);
			item.addEventListener("click", function(e){
				if(!clickable) return;
				clickable=false;
				let title = e.target.value;
				console.log(title);
				window.location.href = "./open.html#"+title;
				clickable=true;
			}, false);
			listTag.appendChild(item);
		}
	}
	clickable=true;
}

function onLoad(e){
	create = document.getElementById("create");
	listTag = document.getElementById("list");
	file = document.getElementById("file");

	document.getElementById("create").addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		let dir = data_ls();
		let title = window.prompt("題名");
		if(!title){
		}else if(dir.indexOf(title)<0){
			let obj = data_new();
			obj.title = title;
			data_write(obj);
			window.location.href = "./edit.html#"+encodeURIComponent(title);
		}else{
			window.alert("既に存在します");
		}
		clickable=true;
	}, false);

	file.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;
		window.location.href = "./file.html";
		clickable=true;
	}, false);

	window.addEventListener("pageshow", onpageshow, false);
}

window.addEventListener("load", onLoad, false);
