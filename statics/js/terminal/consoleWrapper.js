window.console = (function(window, undefined){
	var ConsoleWrapper = {};

	(function(ConsoleWrapper,console){
		for(var x in console) {
			ConsoleWrapper[x] = console[x];
		}
	})(ConsoleWrapper,window.console);

	ConsoleWrapper._original_console = (function(){ return window.console; })();

	ConsoleWrapper._buffer = false;
	ConsoleWrapper._bufferMsgs = [];
	ConsoleWrapper.bufferStart = function(){ ConsoleWrapper._buffer = true; };
	ConsoleWrapper.bufferEnd = function(){ ConsoleWrapper._buffer = false; };
	ConsoleWrapper.bufferClean = function(){ ConsoleWrapper._bufferMsgs = [] };
	ConsoleWrapper.bufferEndFlush = function(){
		ConsoleWrapper._buffer = false;

		var msgs = ConsoleWrapper._bufferMsgs;

		for(var i=0;i<msgs.length;i++) {
			ConsoleWrapper.writeMessage.apply(this, msgs[i]);
		}
	};
	ConsoleWrapper.bufferGetCleanEnd = function(){
		var ret = ConsoleWrapper.bufferGet();
		ConsoleWrapper.bufferClean();
		ConsoleWrapper.bufferEndFlush();
		return ret;
	};
	ConsoleWrapper.bufferGet = function(){
		var msgs = ConsoleWrapper._bufferMsgs;

		var ret = "";
		for(var i=0;i<msgs.length;i++) {
			ret += "\n"+msgs[i][1].join("\n");
		}

		return ret.trim();
	};

	ConsoleWrapper.writeMessage = function(type, args) {
		if(ConsoleWrapper._buffer) {
			ConsoleWrapper._bufferMsgs.push([type, Array.prototype.slice.apply(args)]);
		} else if(window.ActiveTerminal !== void 0) {
			window.ActiveTerminal.writeMessage(type, args);
		}

		if(ConsoleWrapper._original_console[type] !== void 0) {
			ConsoleWrapper._original_console[type].apply(
				ConsoleWrapper._original_console, args
			);
		}
	};

	ConsoleWrapper.error = function(){ return ConsoleWrapper.writeMessage("error",arguments); }
	ConsoleWrapper.info = function(){ return ConsoleWrapper.writeMessage("info",arguments); }
	ConsoleWrapper.log = function(){ return ConsoleWrapper.writeMessage("log",arguments); }
	ConsoleWrapper.warn = function(){ return ConsoleWrapper.writeMessage("warn",arguments); }

	return ConsoleWrapper;
})(window, void 0);
