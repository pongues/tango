"use strict";

let clickable=false;
let changed;

let saveTag, closeTag, titleTag, table;
let obj;

function onpageshow(e){
	console.log("onpageshow");
	let title = getTitle();
	console.log(title);
	if(title==null) return;

	obj = data_read(title);
	console.log(obj);
	if(obj==null) return;

	titleTag.value = title;
	table.innerHTML = "";
	for(let i=0; i<obj.table.length; i++){
		let tr = table.insertRow(-1);
		let cells = obj.table[i];
		addTable(tr, cells);
	}
	{
		let rabutton = document.createElement("input");
		rabutton.type = "button";
		rabutton.value = "+";
		rabutton.addEventListener("click", onrabutton, false);
		table.insertRow(-1).insertCell(-1).appendChild(rabutton);
	}

	changed=false;
	clickable=true;
}

function onload(e){
	console.log("onload");

	saveTag = document.getElementById("save");
	closeTag = document.getElementById("close");
	titleTag = document.getElementById("title");
	table = document.getElementById("table");

	saveTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;

		obj.table = new Array();
		for(let i=0; i<table.rows.length-1; i++){
			let tr = table.rows[i];
			let cells = new Array();
			for(let j=1; j<tr.cells.length-1; j++){
				let td = tr.cells[j];
				cells.push(td.children[0].value);
			}
			if(cells.length>0){
				obj.table.push(cells);
			}
		}
		data_write(obj);

		changed=false;
		clickable=true;
	}, false);

	closeTag.addEventListener("click", function(e){
		if(!clickable) return;

		//window.location.href = "./open.html#"+title;
		history.back();
	}, false);
}

function onpagehide(e){
	console.log("onpagehide");
	table.innerHTML = "";
}
window.addEventListener('beforeunload', function(e){
	if(changed){
		e.returnValue = "Changes you made may not be saved.";
	}
}, false);


window.addEventListener("pageshow", onpageshow, false);
window.addEventListener("pagehide", onpagehide, false);
window.addEventListener("popstate", onpageshow, false);
window.addEventListener("load", onload, false);

function onchange(e){
	changed=true;
}

function oncabutton(e){
	let td = e.target.parentNode;
	let tr = td.parentNode;
	let text = document.createElement("input");
	text.type = "text";
	text.addEventListener("change", onchange, false);
	tr.insertCell(td.cellIndex).appendChild(text);
	changed=true;
}

function oncdbutton(e){
	let td = e.target.parentNode;
	let tr = td.parentNode;
	if(td.cellIndex>=3){
		tr.deleteCell(td.cellIndex-1);
		changed=true;
	}
}

function onrdbutton(e){
	let tr = e.target.parentNode.parentNode;
	table.deleteRow(tr.rowIndex);
	changed=true;
}

function onrabutton(e){
	let ptr = e.target.parentNode.parentNode;
	let tr = table.insertRow(ptr.rowIndex);
	addTable(tr, new Array());
	changed=true;
}

function addTable(tr, cells){
	let td1 = tr.insertCell(-1);
	td1.noWrap = true;
	let rabutton = document.createElement("input");
	rabutton.type = "button";
	rabutton.value = "+";
	rabutton.addEventListener("click", onrabutton, false);
	td1.appendChild(rabutton);
	let rdbutton = document.createElement("input");
	rdbutton.type = "button";
	rdbutton.value = "-";
	rdbutton.addEventListener("click", onrdbutton, false);
	td1.appendChild(rdbutton);

	if(cells.length<1){
		let text = document.createElement("input");
		text.type = "text";
		text.addEventListener("change", onchange, false);
		tr.insertCell(-1).appendChild(text);
	}else{
		for(let j=0; j<cells.length; j++){
			let text = document.createElement("input");
			text.type = "text";
			text.value = cells[j];
			text.addEventListener("change", onchange, false);
			tr.insertCell(-1).appendChild(text);
		}
	}

	let td2 = tr.insertCell(-1);
	td2.noWrap = true;
	let cdbutton = document.createElement("input");
	cdbutton.type = "button";
	cdbutton.value = "-";
	cdbutton.addEventListener("click", oncdbutton, false);
	td2.appendChild(cdbutton);
	let cabutton = document.createElement("input");
	cabutton.type = "button";
	cabutton.value = "+";
	cabutton.addEventListener("click", oncabutton, false);
	td2.appendChild(cabutton);
}
