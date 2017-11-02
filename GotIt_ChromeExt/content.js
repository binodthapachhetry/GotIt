chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
      /* Call the specified callback, passing
        the web-pages DOM content as argument */
        document.body.style.cursor = "progress";
        var docBody = document.getElementsByTagName("body")[0];  
  			var myBodyElements = docBody.getElementsByTagName("p");
        	var arr=[]
        	for (i = 0; i < myBodyElements.length; i++) {
        		if(myBodyElements[i].textContent){
        			tmp = myBodyElements[i].textContent;
        			tmp_ar = tmp.split(".")


        			if(tmp_ar.length>1){

                tmp2 = nlp_compromise.text(tmp_ar[0]).negate().text()
                console.log(tmp2);
                var log = true;

                var btn = document.createElement("button")
                var t = document.createTextNode("?");
                btn.appendChild(t);

                btn.onclick = (function(q,sen,log) { 
                  return function() { 
                    generate(q,sen,log);
                  }; 
                }(tmp2,tmp_ar[0],log));
                myBodyElements[i].appendChild(btn);
                
    					 arr.push(tmp2)
    				}
				}
			}
			sendResponse(arr)
     
    }
});

function generate(qu,sen,log){
  qu = qu;
  console.log(sen);

  // $('p').html( $('p').html().replace(/Autism/g, '<strong>hello</strong>') )

  // $( "p:contains(sen)" ).css( "text-decoration", "underline" );
  // $( "p:contains('Autism')" ).css( "text-decoration", "underline" );
  // console.log(id);

// "div:contains('John')"
  var r = confirm(qu);
  if (r == true) {
      x = "You pressed OK!";
      // chrome.browserAction.setBadgeText({text: "10+"});
  } else {
      x = "You pressed Cancel!";
  }
  // if (r == log){

  // }
  console.log(x);
}

function clickHandler(){

    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'test';
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    cancel.innerHTML = 'close';
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
    var message = document.createElement('span');
    message.innerHTML = "This is a test message";
    popup.appendChild(message);                                    
    popup.appendChild(cancel);
    document.body.appendChild(popup);
}

// var timer;
// document.getElementById("topic-summary").addEventListener("scroll", myFunction);

// function myFunction() {

//     document.getElementById("topic-summary").innerHTML = "You scrolled in div.";
    
// }

// function myFunction() {
//     if ( timer ) clearTimeout(timer);
//     timer = setTimeout(function(){
//         console.log("Haven't scrolled in 5000 ms!");
//     }, 5000);
//     // document.getElementById("demo").innerHTML = "You scrolled in div.";
// }
