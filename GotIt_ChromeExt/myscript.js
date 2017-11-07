
var docBody = document.getElementsByTagName("body")[0]; // read document 
var myBodyElements = docBody.getElementsByTagName("p"); // read paragraphs
var arr=[]

var count = 1;
butNum = 0;
for (i = 0; i < myBodyElements.length; i++) { // loop over each paragraph
    if(myBodyElements[i].textContent){
        paragraph = myBodyElements[i].textContent;
        sentence_ar = paragraph.split(".")
        //console.log(sentence_ar.length)

       if(sentence_ar.length < 2) // skip any paragraph with fewer than 3 lines
		   continue;

		butNum++;

		var id = "Gotit" + String(i);
		var bid = "GotitButn" + String(i);

		myBodyElements[i].id = id;

		myBodyElements[i].setAttribute("data-step",String(count));

		count = count + 1;
		myBodyElements[i].setAttribute("data-intro","Get it, use it.");

		// ---- NLP
		// TODO JOSH - instead, find a sentence in the paragraph that makes a good question
		
		var sentences = [] //deprecated?
		
		var regexs = [];
		regexs.push(/(.*)[Cc]ause(.*)\./);
		regexs.push(/(.*)[Ss]ymptoms(.*)/);
		regexs.push(/(.*)[^\w][Ii]f[^\w](.*),(.*)\./);
		regexs.push(/(.*)[Tt]reatment(.*)\./);
		regexs.push(/([Ss]ee|[Cc]all|[Cc]onsult|[Aa]sk) (a|your) doctor if(.*)\./);
		regexs.push(/(.*)call 911 if(.*)\./);
		regexs.push(/(.*)[Ss]ide effect(.*)\./);
		regexs.push(/(.*)percent(.*)\./);
		
		var q_found = false; //1 question per paragraph
		var match_counts = [];
		
		for (ii = 0; ii < sentence_ar.length; ii++){
			if (sentence_ar[ii].length > 40 && sentence_ar[ii].length < 200 && !q_found){ //reasonably sized sentences
			
				match_counts = [];
				for (j = 0; j < regexs.length; j++){
				
					if (regexs[j].exec(sentence_ar[ii]) != null && !q_found){
						match_counts.push(j);
					}
				}
				if (match_counts.length > 0 && match_counts.length < 3) {
					var randomIndex = Math.floor(Math.random() * match_counts.length);
					var match = regexs[match_counts[randomIndex]].exec(sentence_ar[ii]);
					var subject = match[1];
					console.log("Subject: " + subject);
					var predicate = match[2];
					console.log("predicate: " + predicate);
					if (match.size > 2){
						var p2 = match[3];
						console.log("p2: " + p2);
					}
					var s = sentence_ar[ii] + ".";
					sentences.push();
					console.log("Sentence found: " + s);
					console.log("Using regex" + j);
					
					q_found = true;
					question = s;
					console.log(question)
					var log = true;
					var reverse = false; //whether false is true
					// create a button element
					var btn = document.createElement("button");
					btn.style.background='#000000'; //document.getElementById("button") ?
					btn.style.color = '#FFFFFF';
					var t = document.createTextNode("?");
					btn.setAttribute('id',bid);
					btn.setAttribute('class','confirm')
					btn.appendChild(t);
					// on click listener for the button
					btn.onclick = (function(q,sen,log,bid,id) { 
					  return function() { 
						console.log('mouseclick!!');
						generate(q,sen,log,bid,id, reverse);
					};
					}(question,sentence_ar[0],log,bid,id));
						myBodyElements[i].appendChild(btn);
						arr.push(question);
					break;
				}
			}
		}
			
			
			
			/* //PREVIOUS NLP
			if(nlp(sentence_ar[0]).clauses().data().length==1){
				verbCount = nlp(sentence_ar[0]).verbs().data()
				// use nlp compromise library to check if the first verb occurence is negative
				negCount = nlp(sentence_ar[0]).verbs(0).isNegative().length
				if(negCount==1){
					// if negative make it positive
					question = nlp(sentence_ar[0]).sentences(0).toPositive().out()
				}else{
					// if positive make it negative
					question = nlp(sentence_ar[0]).verbs(0).toNegative().out()
				}
				*/
				
				
	}
}

// hide the sentence in the paragraph while question is generated
function generate(qu,sen,log,bid,id, reverse){
  console.log(sen);
  var new_sen = "<span>"+sen+"</span>"
  document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace(sen,new_sen)
  var j_id = "#"+id+" span"
  $(j_id).css('background-color', 'black');

var j_bid = "#"+bid;

console.log(j_bid);

if (reverse) {

// on click listener for true and false options
$.confirm({
    text: qu, // question
    title: "True or False",
    confirm: function(button) {
        console.log('pressed confirm');
        $(j_id).css('background-color', 'white');
    },
    cancel: function(button) {
        console.log('pressed cancel');
        chrome.runtime.sendMessage({di:butNum})   // since in this case, false is the correct answer, pass it to background.js
        $(j_id).css('background-color', 'white'); // unhide the sentence
        $(j_bid).remove(); // remove the question mark on correct

    },
    confirmButton: "True", // assign "True" string to confirn button
    cancelButton: "False"  // assign "False" string to cancel button
});
}
else {
	// on click listener for true and false options
$.confirm({
    text: qu, // question
    title: "True or False",
    confirm: function(button) {
        console.log('pressed confirm');
		chrome.runtime.sendMessage({di:butNum})   // since in this case, true is the correct answer, pass it to background.js
        $(j_id).css('background-color', 'white');
        $(j_bid).remove(); // remove the question mark on correct
    },
    cancel: function(button) {
        console.log('pressed cancel');
        $(j_id).css('background-color', 'white'); // unhide the sentence

    },
    confirmButton: "True", // assign "True" string to confirn button
    cancelButton: "False"  // assign "False" string to cancel button
});
}
}