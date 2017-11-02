
var docBody = document.getElementsByTagName("body")[0]; // read document 
var myBodyElements = docBody.getElementsByTagName("p"); // read paragraphs
var arr=[]

var count = 1;
butNum = 0;
for (i = 0; i < myBodyElements.length; i++) { // loop over each paragraph
    if(myBodyElements[i].textContent){
        paragraph = myBodyElements[i].textContent;
        sentence_ar = paragraph.split(".")
        console.log(sentence_ar.length)

        if(sentence_ar.length>3){ // skip any paragraph with fewer than 3 lines

            butNum++;

            var id = "Gotit" + String(i);
            var bid = "GotitButn" + String(i);

            myBodyElements[i].id = id;

            myBodyElements[i].setAttribute("data-step",String(count));

            count = count + 1;
            myBodyElements[i].setAttribute("data-intro","Get it, use it.");

            //
            if(nlp(sentence_ar[0]).clauses().data().length==1){
                verbCount = nlp(sentence_ar[0]).verbs().data()
                // use nlp compromise library to check if the first verb occurence is negative
                negCount = nlp(sentence_ar[0]).verbs(0).isNegative().length
                if(negCount==1){
                    // if negative make it positive
                    questtion = nlp(sentence_ar[0]).sentences(0).toPositive().out()
                }else{
                    // if positive make it negative
                    question = nlp(sentence_ar[0]).verbs(0).toNegative().out()
                }
                
                console.log(question)
                var log = true;
                // create a button element
                var btn = document.createElement("button")
                var t = document.createTextNode("?");
                btn.setAttribute('id',bid);
                btn.setAttribute('class','confirm')
                btn.appendChild(t);
                // on click listener for the button
                btn.onclick = (function(q,sen,log,bid,id) { 
                  return function() { 
                    console.log('mouseclick!!');
                    generate(q,sen,log,bid,id);
                };

        }(question,sentence_ar[0],log,bid,id));
            myBodyElements[i].appendChild(btn);
            arr.push(question)
        }
    }

    }
}

// hide the sentence in the paragraph while question is generated
function generate(qu,sen,log,bid,id){
  console.log(sen);
  var new_sen = "<span>"+sen+"</span>"
  document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace(sen,new_sen)
  var j_id = "#"+id+" span"
  $(j_id).css('background-color', 'black');

var j_bid = "#"+bid

console.log(j_bid)

// on click listener for true and false options
$.confirm({
    text: qu, // question
    title: "True or False",
    confirm: function(button) {
        console.log('pressed confirm');
        $(j_id).css('background-color', 'white'); // unhide the sentence
        $(j_bid).remove(); // remove the question mark
    },
    cancel: function(button) {
        console.log('pressed cancel');
        chrome.runtime.sendMessage({di:butNum})   // since in this case, false is the correct answer, pass it to background.js
        $(j_id).css('background-color', 'white'); // unhide the sentence
        $(j_bid).remove(); // remove the question mark

    },
    confirmButton: "True", // assign "True" string to confirn button
    cancelButton: "False"  // assign "False" string to cancel button
});

}