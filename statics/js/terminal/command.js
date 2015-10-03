var Command = (function(){
	var Constructor = function(cmd, wait){
		this.origCommand = cmd;

		this.parseCommand(!wait);
	};

	Constructor.prototype = {
		sudo: false,
		params: null,
		command: null,
		origCommand: null,

		pipeResponseTo: null,
		parseCommand: function(exec) {
			var cmd = this.parsePipes(this.origCommand);
			var argsv = this.parseArgs(cmd);
			this.command = this.parseParams(argsv);
			if(exec) this.execute();
		},
		parseParams: function(argsv) {
			if(argsv[0]==="sudo") {
				this.sudo = true;
				argsv.splice(0,1);
				if(argsv.length < 1) {
					argsv.push("sudohelp");
				} else this.displaySudoLecture();
			}
			var ret = argsv.slice(0,1);
			this.params = argsv.slice(1);
			return argsv[0];
		},
		displaySudoLecture: function(){
			if(ActiveTerminal.session.sudoLecture===true) return;
			console.log("We trust you have received the usual lecture from the local System Administrator. It usually boils down to these three things:");
			console.log("\t");
			console.log("\t#1) Respect the privacy of others.");
			console.log("\t#2) Think before you type.");
			console.log("\t#3) With great power comes great responsibility.");
			console.log("\t");
			ActiveTerminal.session.sudoLecture = true;
		},
		parseArgs: function(cmd) {
			return this.argsv = cmd.split(/[ ]+/) || [cmd];
		},
		parsePipes: function(cmd) {
			if(cmd.indexOf("|") > -1) {
				cmd = cmd.substr(0,cmd.indexOf("|"));
				this.pipeResponseTo = this.origCommand.substr(
					this.origCommand.indexOf("|") + 1
				);
				console.bufferStart();
			}
			return cmd;
		},
		execute: function(){
			ActiveTerminal.pausePrompt();

			CommandList.execute(this);
		},
		hasParam: function(lookFor, orEmpty) {
			var opts = this.params;
			if(orEmpty && opts.length < 1) return true;
			return opts.indexOf("--"+lookfor) > -1 || opts.indexOf("-"+lookfor[0]) > -1;
		},
		exit: function(code){
			if(code>=-1) {
				if(this.pipeResponseTo!==null) {
					var output = console.bufferGetCleanEnd();
					var pipeCmd = this.pipeResponseTo;
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
