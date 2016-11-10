chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing
           the web-pages DOM content as argument */
          	var docBody = document.getElementsByTagName("body")[0];  
  			var myBodyElements = docBody.getElementsByTagName("p");
        	var arr=[]
        	for (i = 0; i < myBodyElements.length; i++) {
        		if(myBodyElements[i].textContent){
        			tmp = myBodyElements[i].textContent;
        			tmp_ar = tmp.split(".")
        			if(tmp_ar.length>1){
                        negated_tmp = nlp_compromise.text(tmp_ar[0]).negate().text()
    					myBodyElements[i].style.backgroundColor = "yellow";
    					arr.push(negated_tmp)
    				}
				}
			}
			sendResponse(arr)
     
    }
});
