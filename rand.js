"use strict";

var mt19937 = new MersenneTwister19937();
mt19937.init_genrand(new Date().getTime());

function qrandom(a){
	var l = mt19937.genrand_int31();
	return l%a;
}
