
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

var dictionary = {};
var counter = 0;


function handleMessage(request, sender, sendResponse) {
  	console.log("Message from the content script: " + request.di + " " + sender.tab.id);

  	// counter ++;
  	console.log(dictionary);
  	if (!sender.tab.id in dictionary){
  		dictionary[sender.tab.id] = 0; 
  		console.log('replacing 0 to nan');
  	}

  	dictionary[sender.tab.id] = dictionary[sender.tab.id] + 1;
  	chrome.browserAction.setBadgeText({text: String(dictionary[sender.tab.id]),tabId:sender.tab.id});
	chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 100]}); 
	console.log('sending notification');

	var progressPercent = dictionary[sender.tab.id] *(100/request.di)
	var progressPercent_round = Math.round(progressPercent);
	var progressPercent_int = parseInt(progressPercent_round);

	console.log(sender.tab.id);
	console.log(dictionary[sender.tab.id]);
	console.log(progressPercent_round);
	console.log(progressPercent_int);
	
	var opt = {
		  type: "progress",
		  title: "Good job for the correct answer!",
		  message: "Your current progress:",
		  iconUrl: chrome.extension.getURL("studying.png"),
		  priority:2,
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



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

		console.log(dictionary);
		console.log("url:" + changeInfo.url);
		if(changeInfo.url){dictionary[tabId] = 0;}

    	// if (!tabId in dictionary){dictionary[tabId] = 0; }
        chrome.browserAction.setBadgeText({text: String(dictionary[tabId]), tabId: tabId});
        chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 100]}); 

});


chrome.tabs.onCreated.addListener(function(tab) {  

   console.log(dictionary);
   dictionary[tab.id] = 0;
   console.log("Created a dictionary element with key " + tab.id + " and value " + dictionary[tab.id] );
   chrome.browserAction.setBadgeText({text: String(dictionary[tab.id]), tabId: tab.id});
   chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 100]});
});
