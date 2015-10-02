var Terminal = (function($, window, undefined){
	var Constructor = function(container){
		console.log("Creating terminal");
		this.container = $(container);

		this.init();
	};

	Constructor.prototype = {
		container: null,

		queue: null,
		session: null,

		init: function(){
			this.queue = new CommandQueue();
			this.session = new Session();

			this.initHandlers();
			this.readyPrompt();
		},

		initHandlers: function(){
			this.getInput().get(0).addEventListener('input', function(e){
				e.preventDefault();

				if(
					(
						$(e.srcElement).val().match(/\n\r?/) || []
					).length > 0
				) {
					this.handleInput(e);
				}
			}.bind(this));
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
			this.getPromptLead().remove();
			this.generatePromptLead().addClass('prompt-lead').insertBefore( this.getInput().show() );
		},

		handleInput: function(e){
			var $input = this.getInput();
			var inputText = $input.val();
			$input.val("");

			this.writeMessage('command', inputText);

			var cmds = inputText.split(/\n\r?(?!$)/);

			for(var i=0;i<cmds.length;i++) {
				this.queue.push( cmds[i] );
			}
		},

		pausePrompt: function(){
			this.getPromptLead().remove();
			this.getInput().hide().val("");
		},

		writeMessage: function(type, messages){
			var $outputs = this.container.find('section');
			var $tpl = $('<output data-type="'+type+'" />');

			if(type==="command") {
				$tpl.html( this.generatePromptLead() );
			}

			for(var i=0;i<messages.length;i++) {
				$tpl.append(document.createTextNode(messages[i]));
				$outputs.append($tpl);
			}
		}
	};

	return Constructor;
})(jQuery, window, void 0);
