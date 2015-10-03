define(function(){
	return function(){
		console.log(ActiveTerminal.session.pwd);
		return this.exit(0);
	};
});
