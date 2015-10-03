define(function(){
	var __ = window.__ = window.__ || {};
	__.sessions = __.sessions || { "oldSessions": [] };

	return function(){
		if(__.sessions.oldSessions.length > 0) {
			ActiveTerminal.session = __.sessions.oldSessions.pop();
		} else {
			console.info("-bash: logout");

			setTimeout(function(){
				ActiveTerminal.readyPrompt();
				ActiveTerminal.queue.cmdExit(0, true);
				ActiveTerminal.queue.push("login", true);
			}.bind(this),1000);

			ActiveTerminal.queue.splice(0,1e10);
			return this.exit(-2);
		}

		return this.exit(0);
	};
});
