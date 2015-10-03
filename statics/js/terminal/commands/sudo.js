define(function(){
	var __ = window.__ = window.__ || {};
	__.sudo = { "lectureShown": false };

	return function(){
		if(!__.sudo.lectureShown) {
			console.log(`We trust you have received the usual lecture from the local System Administrator. It usually boils down to these three things:

	#1) Respect the privacy of others.
	#2) Think before you type.
	#3) With great power comes great responsibility.

`			);

			__.sudo.lectureShown = true;
		}

		var argsv = this.argsv.slice(1);

		ActiveTerminal.queue.push(argsv.join(" "));

		return this.exit(0);
	};
});
