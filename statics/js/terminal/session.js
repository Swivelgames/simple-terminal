var Session = (function(){
	var Constructor = function(user, hostname, pwd){
		this.user = user || this.user;
		this.hostname = hostname || this.hostname;
		this.pwd = pwd || "/home/"+this.user;
		this.history = [];
	};

	Constructor.prototype = {
		user: 'user',
		hostname: 'local',
		pwd: '~',
		history: null,
		elevated: false,
		sudoLecture: false
	};

	return Constructor;
})();
