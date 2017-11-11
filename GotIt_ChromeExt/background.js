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

var dictionary = {}; // dictionary to store url and score pair
var counter = 0;

// handle the message passed after correct answer
function handleMessage(request, sender, sendResponse) {
  	console.log("Message from myscript.js: " + request.di + " " + sender.tab.id);
	// console.log(dictionary);
	  
  	if (!sender.tab.id in dictionary){
  		dictionary[sender.tab.id] = 0; 
  		console.log('replacing 0 to nan');
  	}

  	dictionary[sender.tab.id] = dictionary[sender.tab.id] + 1;
  	chrome.browserAction.setBadgeText({text: String(dictionary[sender.tab.id]).concat("/",String(request.di)),tabId:sender.tab.id});
	chrome.browserAction.setBadgeBackgroundColor({"color": "black"}); 
	console.log('sending notification');
	
	// progress bar
	var progressPercent = dictionary[sender.tab.id] *(100/request.di)
	var progressPercent_round = Math.round(progressPercent);
	var progressPercent_int = parseInt(progressPercent_round);

	console.log(dictionary[sender.tab.id]);
	console.log(request.di);
	console.log(dictionary[sender.tab.id]);
	console.log(progressPercent_round);
	console.log(progressPercent_int);
	
	var opt = {
		  type: "progress",
		  title: "Good job for the correct answer!",
		  message: "Your current progress:",
		  iconUrl: chrome.extension.getURL("studying.png"),
		  priority:0,
		  isClickable:false,
		  progress: progressPercent_int
		}
	chrome.notifications.create("notify1",opt,cb);
	console.log("message sent?");

	function cb(){
		console.log("pop-up done");
	}
	
}


chrome.runtime.onMessage.addListener(handleMessage);

// if user updates the current tab, handle it
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		console.log(dictionary);
		console.log("url:" + changeInfo.url);
		if(changeInfo.url){dictionary[tabId] = 0;}
		dictionary[tab.id] = 0;
    	// if (!tabId in dictionary){dictionary[tabId] = 0; }
        chrome.browserAction.setBadgeText({text: String(dictionary[tabId]), tabId: tabId});
        chrome.browserAction.setBadgeBackgroundColor({"color": "black"}); 
});

// when new tab is opened, re-initialize the app icon for that tab
chrome.tabs.onCreated.addListener(function(tab) {  
   console.log(dictionary);
   dictionary[tab.id] = 0;
   console.log("Created a dictionary element with key " + tab.id + " and value " + dictionary[tab.id] );
   chrome.browserAction.setBadgeText({text: String(dictionary[tab.id]), tabId: tab.id});
   chrome.browserAction.setBadgeBackgroundColor({"color": "black"});
});