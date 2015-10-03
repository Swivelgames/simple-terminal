define(function(){
	return function(){
		if(this.hasParam("help")) {
			console.info("Usage: dance");
			return this.exit(0);
		}

		var style = document.createElement('style');

		style.innerHTML = `
			@-webkit-keyframes LetsGetCrazyAndDance {
			    0%{background-position:9% 0%}
			    50%{background-position:92% 100%}
			    100%{background-position:9% 0%}
			}
			@-moz-keyframes LetsGetCrazyAndDance {
			    0%{background-position:9% 0%}
			    50%{background-position:92% 100%}
			    100%{background-position:9% 0%}
			}
			@keyframes LetsGetCrazyAndDance {
			    0%{background-position:9% 0%}
			    50%{background-position:92% 100%}
			    100%{background-position:9% 0%}
			}

			form.terminal,
			form.terminal label {
				background: linear-gradient(247deg, #37474f, #6c8c9b, #295368, #3e7c9b, #a2d1e8);
				background-size: 1000% 1000%;

				-webkit-animation: LetsGetCrazyAndDance 14s ease infinite;
				-moz-animation: LetsGetCrazyAndDance 14s ease infinite;
				animation: LetsGetCrazyAndDance 14s ease infinite;
			}
		`;

		$('body').append(style);

		this.exit(0);
	};
});
