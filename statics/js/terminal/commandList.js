var reqDir = "./statics/js/terminal/commands/";

var CommandList = (function(){
	var CommandList = function(){};

	CommandList.prototype = {
		commands: {},
		register: function(command, func){
			this.commands[command] = func;
		},
		registerAsync: function(command, cmdObj) {
			if(command.constructor === Array) {
				for(var i=0;i<command.length;i++) this.registerAsync(command[i]);
				return;
			}

			(function(command, cmdObj){
				var cmdName = command.replace(/\//gi,'-');

				var newCmd = require([reqDir+cmdName+".js"], function(newCmd){
					this.register(command, newCmd);
					if(cmdObj) newCmd.apply(cmdObj);
				}.bind(this));
			}).call(this, command, cmdObj);
		},
		execute: function(cmdObj) {
			if(this.commands.hasOwnProperty(cmdObj.command)) {
				return this.commands[cmdObj.command].apply(cmdObj);
			}

			try {
				this.registerAsync(cmdObj.command, cmdObj);
			} catch(e) {
				console.log("-bash: "+cmdObj.command+": command not found");
				cmdObj.exit(0);
			}
		}
	};

	return new CommandList;
})();
