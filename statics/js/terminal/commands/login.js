define(function(){
	var __ = window.__ = window.__ || {};
	__.sessions = __.sessions || { "oldSessions": [] };

	return function(){
		var newUsername = this.argsv[1];

		if(newUsername) {
			var oldSess = __.sessions.oldSessions[
				__.sessions.oldSessions.push(ActiveTerminal.session) - 1
			];

			ActiveTerminal.session = new Session(newUsername, oldSess.hostname);

			console.log("\t");
		}

		console.info("/bin/sh");
		ActiveTerminal.queue.cmdExit(0, true);
		ActiveTerminal.queue.push("motd", true);
		return this.exit(-2);
	};
});
