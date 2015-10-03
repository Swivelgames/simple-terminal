var CommandQueue = (function(){
	var Constructor = function(){/* return Array.apply(this,arguments); */};

	Constructor.prototype = Object.create(
		Array.prototype || Object.getPrototypeOf(Array.prototype), {
			"push": {
				"writable": false,
				"enumerable": false,
				"configurable": false,
				"value": function(cmd, hush){
					if(typeof hush === "boolean") {
						Array.prototype.push.call(this, cmd);
					} else {
						Array.prototype.push.apply(this, arguments);
					}
					this._executeNext( !!hush || void 0 );
				}
			}
		}
	);

	Constructor.prototype.current = null;
	Constructor.prototype._waiting = false;

	Constructor.prototype._executeNext = function(hush){
		if(this.length<1 || this._waiting) return;
		this._waiting = true;

		var nextCmd = this.splice(0,1)[0];

		if(hush!==true) ActiveTerminal.session.history.push(nextCmd);

		this.current = new Command(nextCmd);
	}

	Constructor.prototype.cmdExit = function(code, dontExecNext) {
		this._waiting = false;
		if(dontExecNext!==true) this._executeNext();
	};

	return Constructor;
})();
