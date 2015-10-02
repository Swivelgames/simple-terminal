var __ = __ || {};
__.sessions = __.sessions || { "oldSessions": [] };

CommandList.register('ssh', function(){
	var conn = this.argsv[1];

	if(!conn || ["--help","-h","-?","?"].indexOf(conn) > -1) {
		console.info("Usage: ssh username@host");
		return 0;
	}

	var oldSess = ActiveTerminal.session;
	__.sessions.oldSessions.push(oldSess);

	var newSess = conn.split(/\@/);
	ActiveTerminal.session = new Session(
		newSess[0],
		newSess[1],
		"/home/"+newSess[0]+"/"
	);

	console.info("OpenSSH_4.6p1, OpenSSL 0.9.8e 23 Feb 2007");
	console.log("debug1: Reading configuration data /home/"+oldSess.user+"/.ssh/config");
	console.log("debug1: Applying options for "+newSess[1]);
	console.warn("debug1: Connecting to "+newSess[1]+".");

	return 0;
});