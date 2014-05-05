//Protocol class
var Protocol = function () {
	//client's end 
	this.client = new signals.Signal();
	
};
//one server for our application
Protocol.prototype.server = new signals.Signal();

//conversation
