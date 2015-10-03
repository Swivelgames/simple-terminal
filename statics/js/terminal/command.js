var Command = (function(){
	var Constructor = function(cmd, wait){
		this.origCommand = cmd;

		if(cmd.indexOf("|") > -1) {
			cmd = cmd.substr(0,cmd.indexOf("|"));
			this.pipeResponse = this.origCommand.substr(
				this.origCommand.indexOf("|") + 1
			);
			console.bufferStart();
		}

		this.argsv = cmd.split(/[ ]+/) || [cmd];
		this.command = this.argsv[0];
		this.arguments = this.argsv;

		if(!wait) this.execute();
	};

	Constructor.prototype = {
		pipeResponse: null,
		execute: function(){
			ActiveTerminal.pausePrompt();

			CommandList.execute(this);
		},
		exit: function(code){
			if(code>=-1) {
				if(this.pipeResponse!==null) {
					var output = console.bufferGetCleanEnd();
					var pipeCmd = this.pipeResponse;
					var nextPipe = pipeCmd.indexOf("|");
					if(nextPipe<0) nextPipe = pipeCmd.length;

					var nextCmd = pipeCmd.slice(0, nextPipe);
					var endCmd = pipeCmd.slice(nextPipe);

					var completeCmd = "";
					if(nextCmd.indexOf('%0') > -1) {
						completeCmd = nextCmd.replace('%0', output);
					} else {
						completeCmd = nextCmd + " " + output + " " + endCmd;
					}

					ActiveTerminal.queue.cmdExit(code, true);
					ActiveTerminal.queue.push(completeCmd.trim(), true);
				} else {
					ActiveTerminal.readyPrompt();
					ActiveTerminal.queue.cmdExit(code);
				}
			}
		}
	};

	return Constructor;
})();
