var Command = (function(){
	var Constructor = function(cmd, done){
		this.origCommand = cmd;
		this.argsv = cmd.split(/\n\r?/g);
		this.done = done;

		this.execute();
	};

	Constructor.prototype = {
		execute: function(){
			ActiveTerminal.pausePrompt();

			var argsv = this.argsv.slice();
			console.log("Command: "+argsv.splice(0,1));
			console.log("Args: "+(argsv.join(", ")));
			console.log("Done analyzing");

			ActiveTerminal.readyPrompt();

			this.done();
		}
	};

	return Constructor;
})();
