function cleanArr(arr){ return arr.filter(n => { return n != "" }); }

define(function(){
	return function(){
		var ActiveSession = ActiveTerminal.session;
		var user = ActiveSession.user;
		var homedir = "/home/"+user;
		var dest = this.argsv[1].replace("~","/home/").replace(/\/+/,"/");

		if(this.argsv[1] == "~" || this.argsv[1] == "~/") {
			dest = homedir;
		}

		if(dest.substr(0,1) != "/") {
			dest = ActiveSession.pwd + "/" + dest;
		}
		dest = (new URL("file:///"+dest.replace(/\/+/ig,'/'))).pathname;
		if(dest.substr(-1)=="/" && dest!=="/") dest = dest.substr(0, dest.length - 1);

		if(dest===ActiveSession.pwd) return this.exit(0);

		if(dest.indexOf("/home/") == 0) {
			var nextSlash = dest.indexOf("/",6);
			var destUser = dest.substring(6, nextSlash > -1 ? nextSlash : void 0);

			if(user != destUser
			&& !this.sudo
			&& user != "root"
			&& !ActiveSession.elevated) {
				console.warn("-bash: cd: Permission denied");
				return this.exit(0);
			}
		}

		ActiveSession.pwd = dest;

		return this.exit(0);
	};
});
