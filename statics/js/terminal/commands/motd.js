CommandList.register('motd', function(){
	console.info("Welcome, "+ActiveTerminal.session.user);
	return 0;
});