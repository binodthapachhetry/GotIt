
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

// // When the browser-action button is clicked...
// chrome.browserAction.onClicked.addListener(function (tab) {
//     // ...if it matches, send a message specifying a callback too
//     chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
//     // chrome.tabs.sendMessage(tab.id, doStuffWithDom);

// });


// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//     chrome.tabs.sendMessage(tabs.id, {text: 'report_back'}, doStuffWithDom);  
// });

var counter = 0;

function handleMessage(request, sender, sendResponse) {
  	console.log("Message from the content script: " + request.di);

  	counter ++;
  	chrome.browserAction.setBadgeText({text: String(counter)});

	chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 100]}); 
  // sendResponse({response: "Response from background script"});
}



chrome.runtime.onMessage.addListener(handleMessage);

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//    console.log('tab changed');
// }); 


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     function(tabId, changeInfo, tab){
//         if(!changeInfo.url) return; // URL did not change
//         // Might be better to analyze the URL to exclude things like anchor changes

//         /* ... */
//         chrome.browserAction.setBadgeText({text: String(0), tabId: tab.id});
//     };
// });

// chrome.browserAction.setBadgeText({text: "1"});

// chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 100]});


// var timer;
// document.getElementById("myDIV").addEventListener("scroll", myFunction);

// function myFunction() {
// 	if ( timer ) clearTimeout(timer);
// 	timer = setTimeout(function(){
//         console.log("Haven't scrolled in 5000 ms!");
//     }, 5000);
//     // document.getElementById("demo").innerHTML = "You scrolled in div.";
// }

// document.scroll(function() {
//     clearTimeout($.data(this, 'scrollTimer'));
//     $.data(this, 'scrollTimer', setTimeout(function() {
//         // do something
//         console.log("Haven't scrolled in 5000 ms!");
//     }, 5000));
// });