define(function(){
	var spinnerInterval = null;
	var $spinner = jQuery(null);

	function startSpinner() {
		var spinChars = ["\\","|","\/","-"];
		var curSpinChar = 0;
		console.log("\\");
		$spinner = ActiveTerminal.container.find('section output').last();
		spinnerInterval = setInterval(function(){
			curSpinChar++;
			if(curSpinChar == spinChars.length) curSpinChar = 0;
			$spinner.text(spinChars[curSpinChar]);
			// Keep it at the bottom
			$spinner.appendTo( ActiveTerminal.container.find('section') );
		},250);
	}

	function stopSpinner() {
		clearInterval(spinnerInterval);
		$spinner.remove();
	}

	return function(){
		console.info("Package Get, v0.1.5\n\n");

		if(this.hasParam("help", true)) {
			console.info("Usage: pkg-get [flags] packageurl");
			console.info("\t");
			console.info("\t-h\t--help\tShow usage info");
			console.info("\t-v\t--verbose\tVerbose output");
			console.info("\t");
			return this.exit(0);
		}

		/* Get Package URL */
		try {
			if(this.hasParam("verbose")) console.log("Analyzing package URL");
			var pkgPath = new URL(this.params.slice().pop());
			if(this.hasParam("verbose")) console.info("Package Url:\t"+pkgPath.href);
		} catch(e) {
			console.error("Error retrieving package: invalid package URL")
			if(this.hasParam("verbose")) console.error(e);
			return this.exit(0);
		}

		/* Get Package Name */
		try {
			if(this.hasParam("verbose")) console.log("Determining package name");
			var pkgName;
			var pkgFilename = pkgPath.pathname.split("/").pop().split('.');
			pkgFilename = pkgFilename.filter(v => v!="");
			if(pkgFilename.length > 1) {
				pkgFilename.pop();
				pkgName = pkgFilename.join(".");
			} else {
				pkgName = pkgFilename[0];
			}
			if(this.hasParam("verbose")) console.info("Package Name:\t"+pkgName);
		} catch(e) {
			console.error("Error retrieving package: could not determine package name")
			if(this.hasParam("verbose")) console.error(e);
			return this.exit(0);
		}

		/* Begin Retrieval of Package */
		console.log("Retrieving package "+pkgName);
		startSpinner();

		(function(pkgName, pkgPath, options){
			if(this.hasParam("verbose")) console.warn("require(GET "+pkgPath+")");
			require([pkgPath.href], function(newCmd){
				if(this.hasParam("verbose")) console.warn("200");
				if(this.hasParam("verbose")) console.log("Registering command");
				var success = false;
				try {
					CommandList.register(pkgName, newCmd);
					console.info("Package successfully installed for this session");
					console.info(pkgName+" --help");
					success = true;
				} catch(e) {
					console.error("Error registering package: try again with --verbose for more info");
					if(this.hasParam("verbose")) console.error(e);
				}
				stopSpinner();
				ActiveTerminal.queue.cmdExit(0, success);
				if(success) ActiveTerminal.queue.push(pkgName+" --help", true);
			}.bind(this), function(err){
				stopSpinner();
				console.error("Error retrieving package: request for package failed in transit");
				if(this.hasParam("verbose")) console.error(err);
				ActiveTerminal.queue.cmdExit(0);
			}.bind(this));
		}).call(this, pkgName, pkgPath, options);

		return this.exit(-2);
	};
});
