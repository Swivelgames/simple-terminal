var Session = (function(){
	var Constructor = function(user, hostname, pwd){
		this.user = user || this.user;
		this.hostname = hostname || this.hostname;
		this.pwd = pwd || window.location.pathname || "/home/"+this.user;
		this.history = [];
	};

	Constructor.prototype = {
		user: (window.location.hash || '#user').substr(1),
		hostname: (window.location.hostname || 'local'),
		pwd: null,
		history: null,
		elevated: false,
		sudoLecture: false
	};

	return Constructor;
})();
