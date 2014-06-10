/*!
 * This file is chrome extension background js file.
 * @author <a href="mailto:mastorzzz@gmail.com">Zhang Zhen</a>
 * @version 0.1
 * 
 * Thanks for MazeNL77 shared his icon.
 * The icon link is: http://www.iconarchive.com/show/I-like-buttons-3a-icons-by-mazenl77/Cute-Ball-Logoff-icon.html
 * 
 * This extension is freeware, enjoy your worktime with it. Thanks for using.
 * 
 */

var urlKeywords = [];
var enableAutoPass = false;

var loadUrlKeywords = function () {
	var s = localStorage.getItem("urlkeys");
	urlKeywords = s.split(";");
	enableAutoPass = localStorage.getItem("enable");
}

var isClearquestWebPage = function (url) {
	for (var i in urlKeywords) {
		if (url.indexOf("/" + urlKeywords[i] + "/") >= 0)
			return true;
	}
	return false;
}
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
	if (request.greeting == 'settingChange') {
		loadUrlKeywords();
	} else if (request.greeting == 'requestCQpwd' && enableAutoPass) {
		sendResponse({
			id : localStorage.getItem("userId"),
			pwd : localStorage.getItem("passwd"),
		});
	}
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
	if (info.status == 'complete' && enableAutoPass && isClearquestWebPage(tab.url)) {
		chrome.tabs.executeScript(tabId, {
			file : 'lib/jquery-1.11.0.min.js'
		});
		chrome.tabs.executeScript(tabId, {
			file : 'passport.js'
		});
	}
});
