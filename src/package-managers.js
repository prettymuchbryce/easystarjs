//NameSpace
var EasyStar = EasyStar || {};

//For require.js
if (typeof define === "function" && define.amd) {
	define("easystar", [], function() {
		return EasyStar;
	});
}

//For browserify and node.js
if (typeof module !== 'undefined' && module.exports) {
	module.exports = EasyStar;
}