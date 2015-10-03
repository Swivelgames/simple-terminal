define(function(){
	return function(){
		(new Function(this.argsv.slice(1).join(" "))).apply(this);
		return this.exit(0);
	};
});
