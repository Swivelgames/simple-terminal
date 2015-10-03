define(function(){
	return function(){
		console.info("/bin/sh");
		ActiveTerminal.queue.push("motd");
		return this.exit(0);
	};
});
