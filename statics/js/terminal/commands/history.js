define(function(){
	return function(){
		var history = ActiveTerminal.session.history;

		if(this.argsv.length > 1 && parseInt(this.argsv[1])==this.argsv[1]) {
			ActiveTerminal.queue.cmdExit(0, true);
			ActiveTerminal.queue.push(history[this.argsv[1]], true);
			return this.exit(-2);
		} else {
			for(var i=0;i<history.length;i++) {
				console.log("\t"+i+"\t"+history[i]);
			}
		}

		return this.exit(0);
	};
});
