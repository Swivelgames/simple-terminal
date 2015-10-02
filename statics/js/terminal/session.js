var Session = (function(){
	var Constructor = function(user, hostname, pwd){
		this.user = user || this.user;
		this.hostname = hostname || this.hostname;
		this.pwd = pwd || this.pwd;
		this.history = [];
	};

	Constructor.prototype = {
		user: 'null',
		hostname: 'local',
		pwd: '~',
		history: null
	};

	return Constructor;
})();
