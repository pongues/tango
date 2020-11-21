"use strict";

function getTitle(){
	return decodeURIComponent(location.hash.substr(1));
}

function data_rm(title){
	var key = "tango-list" + title;
	localStorage.removeItem(key);
}

function data_mv(title_old, title_new){
	var key_old = "tango-list" + title_old;
	var key_new = "tango-list" + title_new;
	var str_old = localStorage.getItem(key_old);
	var obj = str2obj(str_old);
	obj.title = title_new;
	var str_new = obj2str(obj);
	localStorage.setItem(key_new, str_new);
	localStorage.removeItem(key_old);
}

function data_ls(){
	var dir = new Array();
	for(var i=0,l=localStorage.length; i<l; i++){
		var key = localStorage.key(i);
		if(key.substring(0, 10)=="tango-list"){
			dir.push(key.substring(10));
		}
	}
	return dir;
}

function data_read(title){
	var key = "tango-list" + title;
	for(var i=0,l=localStorage.length; i<l; i++){
		if(localStorage.key(i)==key){
			var str = localStorage.getItem(key);
			var obj = str2obj(str);
			return obj;
		}
	}
	return null;
}

function data_write(obj){
	if(!obj.title) return;
	var key = "tango-list" + obj.title;
	var str = obj2str(obj);
	localStorage.setItem(key, str);
}

function data_new(){
	var obj = new Object();
	obj.title = "";
	obj.table = new Array();
	return obj;
}

function str2obj(str){
	var obj = new Object();
	var rows = str.split('\n');
	obj.title = rows[1];
	obj.table = new Array();
	for(var i=2; i<rows.length; i++){
		if(rows[i]!=""){
			var cells = rows[i].split('\t');
			obj.table.push(cells);
		}
	}
	return obj;
}

function obj2str(obj){
	var str = new String();
	str += "1\n";
	str += obj.title + '\n';
	for(var i=0; i<obj.table.length; i++){
		str += obj.table[i].join('\t') + '\n';
	}
	return str;
}

function strform(s){
	var stack = new Array;
	var t = "";
	for(var i=0, l=s.length; i<l; i++){
		if(s[i]=='&'){
			t+="&amp;";
		}else if(s[i]=='<'){
			t+="&lt;";
		}else if(s[i]=='>'){
			t+="&gt;";
		}else if(s[i]==';'){
			if(stack.length>0) t+=stack.pop();
		}else if(s[i]=='#'){
			if(i+1<l){
				if(s[i+1]=='n'){
					t+="<br/>";
				}else if(s[i+1]=='e'){
					if(i+2<l){
						if(s[i+2]=='0'){
							if(i+3<l){
								switch(s[i+3]){
									case '1': t+= "<span style=\"font-weight: bold;\">"; stack.push("</span>"); break;
									case '3': t+= "<span style=\"font-style: italic;\">"; stack.push("</span>"); break;
									case '4': t+= "<span style=\"text-decoration: underline;\">"; stack.push("</span>"); break;
								}
								i++;
							}
						}else if(s[i+2]=='3'){
							if(i+3<l){
								switch(s[i+3]){
									case '1': t+="<span style=\"color: red;\">"; stack.push("</span>"); break;
									case '2': t+="<span style=\"color: green;\">"; stack.push("</span>"); break;
									case '3': t+="<span style=\"color: yellow;\">"; stack.push("</span>"); break;
									case '4': t+="<span style=\"color: blue;\">"; stack.push("</span>"); break;
									case '5': t+="<span style=\"color: magenta;\">"; stack.push("</span>"); break;
									case '6': t+="<span style=\"color: cyan;\">"; stack.push("</span>"); break;
									case '7': t+="<span style=\"color: white;\">"; stack.push("</span>"); break;
								}
								i++;
							}
						}else if(s[i+2]=='4'){
							if(i+3<l){
								switch(s[i+3]){
									case '0': t+="<span style=\"background-color: black;\">"; stack.push("</span>"); break;
									case '1': t+="<span style=\"background-color: red;\">"; stack.push("</span>"); break;
									case '2': t+="<span style=\"background-color: green;\">"; stack.push("</span>"); break;
									case '3': t+="<span style=\"background-color: yellow;\">"; stack.push("</span>"); break;
									case '4': t+="<span style=\"background-color: blue;\">"; stack.push("</span>"); break;
									case '5': t+="<span style=\"background-color: magenta;\">"; stack.push("</span>"); break;
									case '6': t+="<span style=\"background-color: cyan;\">"; stack.push("</span>"); break;
								}
								i++;
							}
						}
						i++;
					}
				}else if(s[i+1]=='z'){
					if(i+2<l){
						switch(s[i+2]){
							case '1': t+="&#9312;"; break;
							case '2': t+="&#9313;"; break;
							case '3': t+="&#9314;"; break;
							case '4': t+="&#9315;"; break;
							case '5': t+="&#9316;"; break;
							case '6': t+="&#9317;"; break;
							case '7': t+="&#9318;"; break;
							case '8': t+="&#9319;"; break;
							case '9': t+="&#9320;"; break;
						}
						i++;
					}
				}else if(s[i+1]=='s'){
					t+="<span style=\"border: 1px solid;\">";
					stack.push("</span>");
				}else switch(s[i+1]){
					case '#': t+="#"; break;
					case ';': t+=";"; break;
					case '~': t+="&sim;"; break;
					case 'y': t+="&harr;"; break;
				}
				i++;
			}
		}else{
			t+=s[i];
		}
	}
	while(stack.length>0) t+=stack.pop();
	return t;
}
