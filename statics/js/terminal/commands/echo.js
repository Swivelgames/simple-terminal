define(function(){
	return function(){
		var text = this.argsv.slice(1).join(" ");
		(new Function(`
			console.log(`+text+`);
		`)).apply(this);
		return this.exit(0);
	};
});
