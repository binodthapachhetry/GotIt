
var docBody = document.getElementsByTagName("body")[0];  
var myBodyElements = docBody.getElementsByTagName("p");
var arr=[]

var count = 1;
butNum = 0;
for (i = 0; i < myBodyElements.length; i++) {
    if(myBodyElements[i].textContent){
        tmp = myBodyElements[i].textContent;
        tmp_ar = tmp.split(".")
        if(tmp_ar.length>1){

            butNum++;

            var id = "Gotit" + String(i);
            var bid = "GotitButn" + String(i);

            myBodyElements[i].id = id;

            myBodyElements[i].setAttribute("data-step",String(count));

            count = count + 1;
            myBodyElements[i].setAttribute("data-intro","Get it, use it.");
            tmp2 = nlp_compromise.text(tmp_ar[0]).negate().text()
            var log = true;

            var btn = document.createElement("button")
            // btn.style.background = 'white';
            var t = document.createTextNode("?");
            btn.setAttribute('id',bid);
            btn.setAttribute('class','confirm')
            btn.appendChild(t);

            btn.onmouseover = (function(q,sen,log,bid,id) { 
              return function() { 
                console.log('mouseover!!');
                generate(q,sen,log,bid,id);
            }; 
        }(tmp2,tmp_ar[0],log,bid,id));
            myBodyElements[i].appendChild(btn);

            arr.push(tmp2)
        }
    }
}


function generate(qu,sen,log,bid,id){
  console.log(sen);
  var new_sen = "<span>"+sen+"</span>"
  document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace(sen,new_sen)
  var j_id = "#"+id+" span"
  $(j_id).css('background-color', 'black');

var j_bid = "#"+bid

console.log(j_bid)


$.confirm({
    text: qu,
    title: "True or False",
    confirm: function(button) {
        console.log('pressed confirm');
        $(j_id).css('background-color', 'white');
        $(j_bid).remove();
    },
    cancel: function(button) {
        console.log('pressed cancel');
        chrome.runtime.sendMessage({di:butNum})
        $(j_id).css('background-color', 'white');
        // $(j_bid).prop("disabled",true);
        $(j_bid).remove();
        // caller();

    },
    confirmButton: "True",
    cancelButton: "False"
});

}



