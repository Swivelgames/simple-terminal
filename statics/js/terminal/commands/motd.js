CommandList.register('motd', function(){
	ActiveTerminal.pausePrompt();
	console.info("/bin/sh");

	setTimeout('console.warn("-bash: kill: (null) - Operation not permitted");', 500);
	setTimeout('console.warn("-bash: kill: (null) - Operation not permitted");', 2000);
	setTimeout('console.log("# login");', 2250);
	setTimeout('console.log("-bash: login: unknown user");', 3500);
	setTimeout('console.info("Welcome, "+ActiveTerminal.session.user);', 4000);
	setTimeout(function(){
		ActiveTerminal.readyPrompt();
		ActiveTerminal.getInput().focus();
		this.exit(0);
	}.bind(this), 4150);
});