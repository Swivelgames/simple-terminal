var Session = (function(){
	var Constructor = function(user, hostname, pwd){
		this.user = user || this.user;
		this.hostname = hostname || this.hostname;
		this.pwd = pwd || this.pwd;
	};

	Constructor.prototype = {
		user: 'visitor',
		hostname: 'local',
		pwd: '~'
	};

	return Constructor;
})();
