var __ = __ || {};
__.sessions = __.sessions || { "oldSessions": [] };

CommandList.register('su', function(){
	var newUsername = this.argsv[1];

	if(!newUsername) {
		console.info("Usage: su username");
		return 0;
	}

	var oldSess = __.sessions.oldSessions.push(ActiveTerminal.session);

	ActiveTerminal.session = new Session(
		newUsername,
		oldSess.hostname,
		oldSess.pwd
	);

	return 0;
});