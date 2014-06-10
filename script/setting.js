var isExist = function (obj) {
	return (obj && obj !== 'null' && obj !== 'undefined');
}

var notifySettingChange = function(){
chrome.runtime.sendMessage({
	greeting : "settingChange"
}, function (response) {
	//console.log(response);
});
}

var getConfigValue = function (name) {
	if (isExist(name))
		return localStorage.getItem(name);
	else
		return "";
};

var setConfigValue = function (name, val) {
	localStorage.setItem(name, val);
};


var initConfigTextValue = function(idName){
	$('#'+idName).val(getConfigValue(idName));
	$('#'+idName).change(function(){
		setConfigValue(idName,$('#'+idName).val());
	});
};

initConfigTextValue("userId");
initConfigTextValue("passwd");
initConfigTextValue("urlkeys");

$('#switcher').prop('checked', localStorage.getItem("enable") == "true" ? true:false);

var swither = $("#switcher").bootstrapSwitch();

$("#switcher").on('switchChange', function (e, data) {
	console.log("switchChange " + data.value);
	setConfigValue("enable",data.value);
	notifySettingChange();
});
