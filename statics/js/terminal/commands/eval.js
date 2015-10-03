define(function(){
	return function(){
		var pretty = false;
		var argOffset = 1;
		if(this.argsv[1]=="--pretty") {
			pretty = true;
			argOffset++;
		}
		var output = (new Function("return "+this.argsv.slice(argOffset).join(" "))).apply(this);
		var logText = JSON.stringify(output, null, pretty ? "\t" : null);
		console.log(logText);
		return this.exit(0);
	};
});
