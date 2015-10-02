var CommandList = (function(){
	var CommandList = function(){};

	CommandList.prototype = {
		commands: {},
		register: function(command, func){
			this.commands[command] = func;
		},
		execute: function(cmdObj, done) {
			if(!this.commands.hasOwnProperty(cmdObj.command)) {
				console.log("-bash: "+cmdObj.command+": command not found");
			} else {
				try {
					var exitCode = this.commands[cmdObj.command].apply(cmdObj);
					if(exitCode===-5) return;
				} catch(e) {
					console.error(e);
				}
			}

			done(exitCode);
		}
	};

	return new CommandList;
})();
