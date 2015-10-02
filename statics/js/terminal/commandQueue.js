var CommandQueue = (function(){
	var Constructor = function(){ return Array.apply(this,arguments); };

	Constructor.prototype = Object.create(Array.prototype, {
		"push": {
			"writable": false,
			"enumerable": true,
			"value": function(arguments){
				Array.prototype.push.apply(this, arguments);
				this._executeNext();
			}
		}
	});

	Constructor.prototype.current = null;
	Constructor.prototype._waiting = false;

	Constructor.prototype._executeNext = function(){
		if(this.length<1 || this._waiting) return;
		this._waiting = true;

		var nextCmd = this.splice(0,1);

		this.current = new Command(nextCmd, (function(){
			this._waiting = false;
			this._executeNext();
		}).bind(this));
	}

	return Constructor;
})();
