var Terminal = (function($, window, undefined){
	var Constructor = function(container){
		console.log("Creating terminal");
		this.container = $(container);

		this.init();
	};

	Constructor.prototype = {
		historyIndex: -1,
		__curInput: "",

		tabtab: 0,

		container: null,

		queue: null,
		session: null,

		init: function(){
			this.session = new Session();
			this.queue = new CommandQueue();

			this.initHandlers();

			setTimeout(function(){
				this.readyPrompt();
				this.queue.push("login");
			}.bind(this),500);
		},

		initHandlers: function(){
			this.getInput().get(0).addEventListener('input', function(e){
				e.preventDefault();

				var curVal = this.__curInput = this.getInput().val();

				if( (curVal.match(/\n\r?/) || []).length > 0 ) {
					this.handleInput(e);
				}
			}.bind(this));

			this.getInput().on('focus blur focusin focusout', function(){
				this.getInput().css({ "textIndent": this.getPromptLead().outerWidth() });
			}.bind(this));

			this.getInput().on('keydown', function(e){
				if(e.which===38 || e.which==40) { //up or down
					var history = this.session.history;

					if(e.which===38 && this.historyIndex > 0) this.historyIndex--; //up
					if(e.which==40 && this.historyIndex < history.length) this.historyIndex++; //down

					if(this.historyIndex === history.length) {
						this.getInput().val( this.__curInput );
					} else {
						this.getInput().val( history[this.historyIndex].trim() );
					}
				}

				if(e.which===9) {
					e.preventDefault();

					this.tabtab++;

					if(this.getInput().val()=="") {
						if(this.tabtab>1) this.listCommands();
					}
				} else this.tabtab = 0;

				if(e.which===99 && e.ctrlDown) this.cancelCurrentCommand();
			}.bind(this));

			this.getInput().get(0).addEventListener('copy', this.cancelCurrentCommand.bind(this));
		},

		cancelCurrentCommand: function(){
			if(this.queue.waiting) {
				this.writeMessage('warn', 'Ctrl+C detected...');
				this.queue.cmdExit(-1);
			} else {
				this.writeMessage('command', this.getInput().val() || "");
			}
			this.readyPrompt();
		},

		listCommands: function(){
			this.tabtab = 0;
			this.cancelCurrentCommand();
			this.writeMessage('log', Object.keys(CommandList.commands).join("\t"));
		},

		getInput: function(){ return this.container.find('.commandInput'); },

		getPromptLead: function() { return this.container.find('.prompt-lead'); },

		generatePromptLead: function(){
			return $('<div class="prompt" />').append(
				"[",
				$('<span class="user" />').text( this.session.user ),
				$('<span class="host" />').text( '@' + this.session.hostname ),
				"&nbsp;",
				$('<span class="pwd" />').text( this.session.pwd ),
				"]",
				$('<span class="char" />').html( "#" )
			);
		},

		readyPrompt: function(){
			this.historyIndex = this.session.history.length;

			this.getPromptLead().remove();

			var $input = this.getInput();
			var $lead = this.generatePromptLead().addClass('prompt-lead');
			$lead.insertBefore( $input );
			$input.val("").css({ "position": "static", "left": "none", "textIndent": $lead.outerWidth() });
			$input.focus();
		},

		handleInput: function(e){
			var $input = this.getInput();
			var inputText = $input.val();
			$input.val("");

			this.writeMessage('command', inputText);

			var cmds = inputText.split(/\n\r?(?!$)/);

			for(var i=0;i<cmds.length;i++) {
				var cmd = cmds[i].trim();
				if(cmd!=="") this.queue.push( cmd );
			}

			this.__pendingCmd = "";
		},

		pausePrompt: function(){
			this.getPromptLead().remove();
			this.getInput().css({
				'position': 'absolute',
				'left': '-1000vw'
			}).val("");
		},

		writeMessage: function(type, messages){
			var $outputs = this.container.find('section');
			var $tpl = $('<output data-type="'+type+'" />');

			if(type==="command") {
				$tpl.html( this.generatePromptLead() );
			}

			if(typeof messages === "string") messages = [messages];

			for(var i=0;i<messages.length;i++) {
				$tpl.append(document.createTextNode(messages[i]));
				$outputs.append($tpl);
			}
		}
	};

	return Constructor;
})(jQuery, window, void 0);
