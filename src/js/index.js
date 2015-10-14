(function (console, $hx_exports) { "use strict";
var module1 = $hx_exports.module1 = $hx_exports.module1 || {};
$hx_exports.module1.sub = $hx_exports.module1.sub || {};
var com = $hx_exports.com = $hx_exports.com || {};
$hx_exports.com.common = $hx_exports.com.common || {};
var Main = function() {
	var doc = window.document;
	this.root = doc.createElement("div");
	this.root.className = "main";
	doc.body.appendChild(this.root);
	var link = doc.createElement("a");
	link.href = "#";
	link.onclick = $bind(this,this.loadContent);
	link.innerText = "Load module";
	this.root.appendChild(link);
};
Main.main = function() {
	require("../index.css");
	var app = new Main();
};
Main.prototype = {
	loadContent: function(_) {
		var _g = this;
		require.ensure(["./module1","../module1.css"],function() {
			require("./module1");
			require("../module1.css");
			_g.moduleLoaded();
		});
		return false;
	}
	,moduleLoaded: function() {
		console.log("Module loaded");
		var module = new module1.Module1();
		this.currentSub = module.sub;
		this.root.appendChild(module.view);
	}
	,moduleFailed: function(name) {
		console.log("Module " + name + " failed");
	}
};
var com_common_BaseModule = $hx_exports.com.common.BaseModule = function() {
	var doc = window.document;
	this.view = doc.createElement("div");
};
var util_Webpack = function() { };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof $hx_scope != "undefined" ? $hx_scope : $hx_scope = {});

//# sourceMappingURL=index.js.map