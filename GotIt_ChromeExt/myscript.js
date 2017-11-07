
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
		
		var potential_sentences = [];
		
		var good_sentence = /(.*)([Cc]ause|[Ss]ymptoms|safe|[Tt]reatment|[Uu]se|([Ss]ee|[Cc]all|[Cc]onsult|[Aa]sk) (a|your) doctor if|[Cc]all 911 if|[Ss]ide effect|percent)(.*)/;
		
		var q_found = false; //1 question per paragraph
		var match_counts = [];
		
		for (ii = 0; ii < sentence_ar.length; ii++){
			if (sentence_ar[ii].length > 40 && sentence_ar[ii].length < 200){ //reasonably sized sentences
			
				if (good_sentence.exec(sentence_ar[ii]) != null){
						potential_sentences.push(sentence_ar[ii]);
				}
			}
		}
		
		//pick one of the good sentences to ask a question about
		
		console.log("Found " + potential_sentences.length + " potential sentences.");
		
		if (potential_sentences.length < 1) { //skip paras with no good question sentences
			continue;
		}
		
		var sentence, question;
		var reverse = (Math.floor(Math.random() * 2) == 0); //whether false is true, chosen randomly; if reverese=true, then false is correct answer
		potential_sentences.forEach(function(s){
			
			
			if (!q_found && /percent/.exec(s) != null){ //percents are always a good question to reverse
				reverse = true;
				if (reverse) {
					console.log("trying to reverse percent.");
					//move around the percents so the statement is false -- if no percents found, skip this question
					if (/(\D\d\d?\d?)\D/.exec(s) != null) {
						matches = /\D(\d\d?\d?)\D/.exec(s);
						if (matches[1] > 0 && matches[1] < 100) {
							console.log("reverse percent");
							sentence = s;
							sentence.replace(matches[1], (matches[1] + 20 + Math.floor(Math.random() * 40)) % 100); //tweak percent to make wrong
							q_found = true;
							if (matches.length > 2) {
								sentence.replace(matches[2], (matches[2] + 20 + Math.floor(Math.random() * 40)) % 100); //if there's another percent, also tweak
							}
						}
					}
				}
				else {
					sentence = s;
					q_found = true;
				}
			}
			
			if (!q_found && /\sunsafe/.exec(s) != null) {
				if (reverse) {
					sentence = s;
					sentence.replace("unsafe", "safe");
					q_found = true;
				}
				else {
					sentence = s;
					q_found = true;
				}
			}
			
			if (!q_found && /\ssafe/.exec(s) != null) {
				if (reverse) {
					sentence = s;
					sentence.replace("safe", "unsafe");
					q_found = true;
				}
				else {
					sentence = s;
					q_found = true;
				}
			}
			
			/*
			if (!q_found && /include/.exec(s) != null) { //there might be a list
				if (/(.*),(.*), (and|or) (.*)/.exec(s) != null) {
					if (reverse) {
						sentence = s;
						matches = /(.*)(includ.*\s)(.*,)(.*,)(and|or)(.*)/.exec(s);
						if (matches.length > 5) {
							sentence.replace(matches[5], "but not");
							q_found = true;
						}
					}
					else {
						sentence = s;
						q_found = true;
					}
				}
				*/
			}
		});
		
		if (!q_found){ //couldn't find a question up to this point, just pick a good sentence and make it a true question
			sentence = potential_sentences[Math.floor(Math.random() * potential_sentences.length)];
			reverse = false;
		}
		
		question = sentence + ".";
		console.log(question)
		var log = true;
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
		
	} //if this is a paragraph
} //whole document for loop
			
			
			
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