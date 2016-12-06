
var docBody = document.getElementsByTagName("body")[0];  
var myBodyElements = docBody.getElementsByTagName("p");
var arr=[]

var count = 1;
for (i = 0; i < myBodyElements.length; i++) {
    if(myBodyElements[i].textContent){
        tmp = myBodyElements[i].textContent;
        tmp_ar = tmp.split(".")
        if(tmp_ar.length>1){



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




// $.confirm({
//     text: "Are you sure you want to delete that comment?",
//     confirm: function() {
//         // delete();
//     },
//     cancel: function() {
//         // nothing to do
//     }
// });
  

  // $( "p:contains(sen)" ).mark(sen);

  // var context = document.querySelectorAll("p")[i];


  // console.log(context);
  // var instance = new Mark(context);
  // instance.mark(sen,{"accuracy":"exactly","debug":true,"diacritics":false});



  // $('p').html( $('p').html().replace(/Autism/g, '<strong>hello</strong>') )

  // $( "p:contains(sen)" ).css( "text-decoration", "underline" );
  // $( "p:contains('Autism')" ).css( "text-decoration", "underline" );
  // console.log(id);

//   bootbox.confirm({
//     closeButton: false,
//     size:'small',
//     message: qu,
//     buttons: {
//         confirm: {
//             label: 'True',
//             className: 'btn-success'
//         },
//         cancel: {
//             label: 'False',
//             className: 'btn-danger'
//         }
//     },
//     callback: function (result) {
//         console.log('This was logged in the callback: ' + result);
//     }
// });

var j_bid = "#"+bid

console.log(j_bid)


$.confirm({
    text: qu,
    title: "True or False",
    confirm: function(button) {
        console.log('pressed confirm');
        $(j_id).css('background-color', 'white');
    },
    cancel: function(button) {
        console.log('pressed cancel');
        chrome.runtime.sendMessage({di:"1"})
        $(j_id).css('background-color', 'white');
        // $(j_bid).prop("disabled",true);
        $(j_bid).remove();
        // caller();

    },
    confirmButton: "True",
    cancelButton: "False"
    // post: true,
    // confirmButtonClass: "btn-danger",
    // cancelButtonClass: "btn-default",
    // dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
});

}

// function call()
//         {
//             popup = alert('Good job!');         
//             setTimeout(wait, 2000);
//         }   
//         function caller()
//         {
//             setInterval(call, 4000);
//         }
//         function wait()
//         {
//             popup.close();
//         }

