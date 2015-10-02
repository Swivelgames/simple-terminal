var Command = (function(){
	var Constructor = function(cmd, done){
		this.origCommand = cmd;
		this.argsv = cmd.split(/\s+\n?\r?/) || [cmd];
		this.command = this.argsv[0];
		this.arguments = this.argsv;
		this.done = done;

		this.execute();
	};

	Constructor.prototype = {
		execute: function(){
			ActiveTerminal.pausePrompt();

			var ret = CommandList.execute(this, (function(){
				ActiveTerminal.readyPrompt();
				this.done();
			}).bind(this));
			if(ret!==void 0) return this.exit(ret);
		},
		exit: function(code){
			if(code>=-1) {
				ActiveTerminal.readyPrompt();
				ActiveTerminal.queue.cmdExit(code);
			}
		}
	};

	return Constructor;
})();
