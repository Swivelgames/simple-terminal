define(function(){
	return function(){
		var fileList = ["dunreleased","-site.conf","-unreleased-site.conf"];
		var options = this.argsv[1] || [];

		if(options.indexOf('a') > -1) {
			fileList.splice(0,0,'d.','d..');
		}

		var msg = "";
		for(var i=0;i<fileList.length;i++) {
			var type = fileList[i].slice(0,1);
			var name = fileList[i].slice(1);

			if(options.indexOf('l') > -1) {
				msg += type + "rwxrw-r--\troot:root\t2048\t" + name;
				if(i+1<fileList.length) msg+= "\n\r";
			} else {
				msg += name + "\t";
			}
		}

		console.log(msg);

		return this.exit(0);
	};
});
