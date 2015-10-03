define(function(){
	var __ = window.__ = window.__ || {};
	__.sessions = __.sessions || { "oldSessions": [] };

	return function(){
		var newUsername = this.argsv[1];

		if(!newUsername) {
			console.info("Usage: su username");
			return this.exit(0);
		}

		var oldSess = __.sessions.oldSessions.push(ActiveTerminal.session);

		ActiveTerminal.session = new Session(
			newUsername,
			oldSess.hostname,
			oldSess.pwd
		);

		return this.exit(0);
	};
});
