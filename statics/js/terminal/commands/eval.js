define(function(){
	return function(){
		console.log( JSON.stringify( (new Function("return "+this.argsv.slice(1).join(" "))).apply(this)) );
		return this.exit(0);
	};
});
