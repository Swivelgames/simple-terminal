define(function(){
	return function(){
		console.info("Welcome, "+ActiveTerminal.session.user);
		return this.exit(0);
	};
});
