var CommandList = (function(){
	var CommandList = function(){};

	CommandList.prototype = {
		commands: {},
		register: function(command, func){
			this.commands[command] = func;
		},
		execute: function(cmdObj) {
			if(!this.commands.hasOwnProperty(cmdObj.command)) {
				console.log("-bash: "+cmdObj.command+": command not found");
			} else {
				try {
					return this.commands[cmdObj.command].apply(cmdObj);
				} catch(e) {
					console.error(e);
					return 0;
				}
			}
		}
	};

	return new CommandList;
})();
