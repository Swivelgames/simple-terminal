define(function(){
	var __ = window.__ = window.__ || {};
	__.sessions = __.sessions || { "oldSessions": [] };

	return function(){
		if(__.sessions.oldSessions.length > 0) {
			ActiveTerminal.session = __.sessions.oldSessions.pop();
		} else {
			console.warn("-bash: kill: (null) - Operation not permitted");
			console.warn("-bash: kill: (null) - Operation not permitted");
			console.warn("-bash: kill: (null) - Operation not permitted");
			console.warn("-bash: kill: (null) - Operation not permitted");
			console.error("-bash: kill: (null) - unable to kill process for user " + ActiveTerminal.session.user + ": Permission denied.");
			console.log("-bash: logout: -");
			ActiveTerminal.showMotd();

			return this.exit(-5);
		}

		return this.exit(0);
	};
});
