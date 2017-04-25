if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
	var roomId = location.hash.substring(location.hash.lastIndexOf('/') + 1);
	if(location.origin.indexOf('beta') === -1) {
		window.location.href = 'http://fanpa.yinyuetai.com/anchor.html?roomId=' + roomId;
	} else {
		window.location.href = 'http://fanpa.beta.yinyuetai.com:9091/anchor.html?roomId=' + roomId;
	}
}