function autoPass() {
	var id = $("input#loginId_Id");
	var pwd = $("input#passwordId");
	var submit = $("button#loginButtonId");
	console.log("try to login in ClearQuest Web Page");
	chrome.runtime.sendMessage({
		greeting : "requestCQpwd"
	}, function (response) {
		//console.log(response);
		if (id.length > 0 && pwd.length > 0 && submit.length > 0) {
			//console.log("auto input now!");
			id.val(response.id);
			pwd.val(response.pwd);
			submit.click();
			console.log("login in WebDMS");
		}
	});

}

setTimeout(function () {
	autoPass();
}, 2000);
