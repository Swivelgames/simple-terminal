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

			CommandList.execute(this);
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
