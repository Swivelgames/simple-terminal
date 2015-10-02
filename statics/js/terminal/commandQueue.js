var CommandQueue = (function(){
	var Constructor = function(){/* return Array.apply(this,arguments); */};

	Constructor.prototype = Object.create(
		Array.prototype || Object.getPrototypeOf(Array.prototype), {
			"push": {
				"writable": false,
				"enumerable": false,
				"configurable": false,
				"value": function(){
					Array.prototype.push.apply(this, arguments);
					this._executeNext();
				}
			}
		}
	);

	Constructor.prototype.current = null;
	Constructor.prototype._waiting = false;

	Constructor.prototype._executeNext = function(){
		if(this.length<1 || this._waiting) return;
		this._waiting = true;

		var nextCmd = this.splice(0,1)[0];

		ActiveTerminal.session.history.push(nextCmd);

		this.current = new Command(nextCmd);
	}

	Constructor.prototype.cmdExit = function(code) {
		this._waiting = false;
		this._executeNext();
	};

	return Constructor;
})();
