CommandList.register('history', function(){
	var history = ActiveTerminal.session.history;

	if(this.argsv.length > 1 && parseInt(this.argsv[1])==this.argsv[1]) {
		ActiveTerminal.queue.push(history[this.argsv[1]]);
	} else {
		for(var i=0;i<history.length-1;i++) {
			console.log("\t"+i+"\t"+history[i]);
		}
	}

	return 0;
});