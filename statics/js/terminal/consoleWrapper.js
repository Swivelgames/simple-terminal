window.console = (function(window, undefined){
	var ConsoleWrapper = {};

	(function(ConsoleWrapper,console){
		for(var x in console) {
			ConsoleWrapper[x] = console[x];
		}
	})(ConsoleWrapper,window.console);

	ConsoleWrapper._original_console = (function(){ return window.console; })();

	ConsoleWrapper.writeMessage = function(type, args) {
		if(window.ActiveTerminal !== void 0) {
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
