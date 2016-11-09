
// A function to use as callback
function doStuffWithDom(domContent) {
	arrayLength = domContent.length;
	for (var i = 0; i < arrayLength; i++) {
		tmp = domContent[i];
		if(typeof tmp === 'string'){
	 	console.log(tmp);
	 	}
	}
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...if it matches, send a message specifying a callback too
    chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    // chrome.tabs.sendMessage(tab.id, doStuffWithDom);

});