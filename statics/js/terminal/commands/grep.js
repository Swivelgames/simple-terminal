define(function(){
	return function(){
		var match = this.argsv[1];
		var text = this.argsv.slice(2).join(" ");
		var lines = text.split(/\n\r+/);

		for(var i=0;i<lines.length;i++) {
			if(lines[i].match(match)) {
				console.log(lines[i]);
			}
		}

		return this.exit(0);
	};
});
