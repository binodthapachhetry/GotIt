
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
		
		var good_sentence = /(.*)([Cc]ause|[Ss]ymptoms|safe|[Tt]reatment|([Ss]ee|[Cc]all|[Cc]onsult|[Aa]sk) (a|your) doctor if|[Cc]all 911 if|[Ss]ide effect|percent)(.*)/;
		
		var q_found = false; //1 question per paragraph
		var match_counts = [];
		
		for (ii = 0; ii < sentence_ar.length; ii++){
			if (sentence_ar[ii].length > 45 && sentence_ar[ii].length < 250){ //reasonably sized sentences
			
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
			var skip = false;
			if (q_found || /:/.exec(s) != null){
				//skip if we already found a question or this sentence has a colon
				skip = true;
			}
			
			//be wary of cause/symptom sentences - extra check to make sure they are okay
			if (/[Cc]ause/.exec(s) != null && /[Ss]ymptom/.exec(s) != null){
				skip = true;
			}
			if ((/[Cc]ause/.exec(s) != null || /[Ss]ymptom/.exec(s) != null) && (s.length < 60 || s.length > 150)){
				skip = true;
			}
			
			if (!skip && /viral/.exec(s) != null){ //good question to reverse
				reverse = true;
				if (reverse) {
					sentence = s;
					sentence = sentence.replace("viral", "bacterial");
					q_found = true;
					skip = true;
					console.log("REVERSED viral: " + sentence);
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
				}
			}
			
			if (!skip && /bacterial/.exec(s) != null){ //good question to reverse
				reverse = true;
				if (reverse) {
					sentence = s;
					sentence = sentence.replace("bacterial", "viral");
					q_found = true;
					skip = true;
					console.log("REVERSED bacterial: " + sentence);
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
				}
			}
			
			if (!skip && /to \d\d?\d? percent/.exec(s) != null){ //percents are always a good question to reverse
				reverse = true;
				if (reverse) {
					//move around the percents so the statement is false -- if no percents found, skip this question
					if (/(\D\d\d?\d?)\D/.exec(s) != null) {
						matches = /\D(\d\d?\d?) to (\d\d?\d?) percent/.exec(s);
						if (matches[1] > 0 && matches[1] < 100) {
							sentence = s;
							new_num1 = ((matches[1] - 30 + Math.floor(Math.random() * 50)) % 100);
							while (new_num1 % 5 != 0){
								new_num1++;
							}
							sentence = sentence.replace(new RegExp(matches[1]), new_num1.toString()); //tweak percent to make wrong
							
							new_num2 = ((matches[2] - 50 + Math.floor(Math.random() * 70)) % 100);
							while (new_num2 % 5 != 0 || new_num2 < new_num2+5 ){
								new_num++;
							}
							sentence = sentence.replace(new RegExp(matches[2]), new_num2.toString()); //tweak percent to make wrong
							
							q_found = true;
							skip = true;
							console.log("REVERSED percent: " + sentence);
						}
					}
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
				}
			}
			
			if (!skip && /percent/.exec(s) != null){ //percents are always a good question to reverse
				reverse = true;
				if (reverse) {
					//move around the percents so the statement is false -- if no percents found, skip this question
					if (/(\D\d\d?\d?)\D/.exec(s) != null) {
						matches = /\D(\d\d?\d?)\D/.exec(s);
						if (matches[1] > 0 && matches[1] < 100) {
							sentence = s;
							new_num = ((matches[1] + 20 + Math.floor(Math.random() * 40)) % 100);
							while (new_num % 5 != 0){
								new_num++;
							}
							sentence = sentence.replace(new RegExp(matches[1]), new_num.toString()); //tweak percent to make wrong
							q_found = true;
							skip = true;
							console.log("REVERSED percent: " + sentence);
						}
					}
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
				}
			}
			
				//TODO if there are digits, change to other digits
			if (!skip && /\d/.exec(s) != null){
				//move around some digits, good question to reverse
				reverse = true;
				if (reverse) {
					sentence = s;
					sentence = sentence.replace("30s", "20s");
					sentence = sentence.replace("60s", "30s");
					sentence = sentence.replace("40s", "60s");
					digit_matches = /([1-9])[^0s]/.exec(sentence);
					if (digit_matches != null) {
						for (i = 1; i < digit_matches.length; i++){
							sentence = sentence.replace(digit_matches[i], Math.ceil(Math.random()*10).toString());
						}
						
						if (sentence != s) { //some change was made
							console.log("REVERSED digit: " + sentence);
							q_found = true;
							skip = true;
						}
					}
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
				}
			}
			
			if (!skip && /\sunsafe/.exec(s) != null) {
				if (reverse) {
					sentence = s;
					sentence = sentence.replace("unsafe", "safe");
					console.log("REVERSED unsafe: " + sentence);
					q_found = true;
					skip = true;
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
				}
			}
			
			if (!skip && /\ssafe/.exec(s) != null) {
				if (reverse) {
					sentence = s;
					sentence = sentence.replace("safe", "unsafe");
					console.log("REVERSED safe: " + sentence);
					q_found = true;
					skip = true;
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
				}
			}
			
			//if everything has failed up to this point, with a 10% chance make this a simple negated sentence
			if (!skip && Math.random() < .1){
				if (reverse){
					sentence = s;
					if(nlp(sentence).clauses().data().length==1){
						verbCount = nlp(sentence).verbs().data();
						// use nlp compromise library to check if the first verb occurence is negative
						negCount = nlp(sentence).verbs(0).isNegative().length;
						if(negCount==1){
							// if negative make it positive
							sentence = nlp(sentence).sentences(0).toPositive().out();
							console.log("REVERSED positive: " + sentence);
							q_found = true;
							skip = true;
						}else{
							// if positive make it negative
							sentence = nlp(sentence).verbs(0).toNegative().out();
							console.log("REVERSED negative: " + sentence);
							q_found = true;
							skip = true;
						}
					}
				}
				else {
					sentence = s;
					q_found = true;
					skip = true;
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
			// }
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
        $(j_id).css('text-decoration','underline');
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
        $(j_id).css('text-decoration','underline'); // unhide the sentence
        

    },
    confirmButton: "True", // assign "True" string to confirn button
    cancelButton: "False"  // assign "False" string to cancel button
});
}
}