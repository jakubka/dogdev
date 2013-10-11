(function (w) {
	var P = w.P;
		hwModule = {};

	hwModule.sayHello = function () {
		alert("Hello World");
	}

	// expose module
	P.hwModule = hwModule;

}(this))