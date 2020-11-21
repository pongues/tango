"use strict";

var clickable=false;

var div1, div2;
var titleTag, selectTag, columnTag, startTag, nextTag, output1Tag, output2Tag;
var title;

var first, rows, rowi, col;

function onLoad(e){
	console.log("onload");
	div1 = document.getElementById("div1");
	div2 = document.getElementById("div2");
	titleTag = document.getElementById("title");
	selectTag = document.getElementById("select");
	columnTag = document.getElementById("column");
	startTag = document.getElementById("start");
	nextTag = document.getElementById("next");
	output1Tag = document.getElementById("output1");
	output2Tag = document.getElementById("output2");

	select.selectedIndex = 2;

	title = getTitle();
	if(title==null) return;

	var obj = data_read(title);
	console.log(obj);
	if(obj==null) return;

	titleTag.value = title;

	div2.style.display = "none";

	startTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;

		col = parseInt(column.value)-1;
		rows = new Array();
		var l=obj.table.length;
		switch(select.selectedIndex){
			case 1:
				for(var i=l-1; i>=0; i--) rows.push(i);
				break;
			case 2:
				for(var i=0; i<l; i++) rows.push(i);
				for(var i=l; i>0; i--){
					var j=qrandom(i);
					var t=rows[i-1]; rows[i-1]=rows[j]; rows[j]=t;
				}
				break;
			default:
				for(var i=0; i<l; i++) rows.push(i);
		}
		console.log(rows);
		rows.push(-1);
		first = false;
		rowi = -1;

		div1.style.display = "none";
		div2.style.display = "";

		clickable=true;
	}, false);

	nextTag.addEventListener("click", function(e){
		if(!clickable) return;
		clickable=false;

		if(first){
			var row = rows[rowi];
			var s = "";
			for(var i=0; i<obj.table[row].length; i++){
				s+= strform(obj.table[row][i]) + "<br>";
			}
			output2Tag.innerHTML = s;
			first=false;
		}else{
			rowi++;
			var row = rows[rowi];
			if(row<0){
				output1Tag.innerHTML = "";
				output2Tag.innerHTML = "";
				div1.style.display = "";
				div2.style.display = "none";
			}else{
				output1Tag.innerHTML = strform(obj.table[row][col]);
				output2Tag.innerHTML = "";
			}
			first=true;
		}

		clickable=true;
	}, false);

	clickable=true;
}

window.addEventListener("load", onLoad, false);
