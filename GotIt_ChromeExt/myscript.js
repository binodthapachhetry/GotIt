



var docBody = document.getElementsByTagName("body")[0];  
var myBodyElements = docBody.getElementsByTagName("p");
var arr=[]
for (i = 0; i < myBodyElements.length; i++) {
    if(myBodyElements[i].textContent){
        tmp = myBodyElements[i].textContent;
        tmp_ar = tmp.split(".")
        if(tmp_ar.length>1){

            tmp2 = nlp_compromise.text(tmp_ar[0]).negate().text()
            var log = true;

            var btn = document.createElement("button")
            var t = document.createTextNode("?");
            btn.setAttribute('name',i);
            btn.appendChild(t);

            btn.onclick = (function(q,sen,log,i) { 
              return function() { 
                generate(q,sen,log,i);
            }; 
        }(tmp2,tmp_ar[0],log,i));
            myBodyElements[i].appendChild(btn);

            arr.push(tmp2)
        }
    }
}
// chrome.runtime.sendMessage({di:arr})


function generate(qu,sen,log,i){
  qu = qu;
  console.log(i);

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
    var qu_add = qu + '. Press OK for True and Cancel for False'
  var r = confirm(qu_add);
  if (r == false) {
      chrome.runtime.sendMessage({di:"1"})
      var doc_btn = document.getElementsByTagName('button');
      for (j = 0; j < doc_btn.length; j++) {
        if(doc_btn[j].name==String(i)){
            doc_btn[j].disabled = true;
        }
      }

  } else {

  }
  // document.getElementsByTagName(String(i)).prop("disabled",true);
  // x.disabled = true;

  // $('[name=i]').prop("disabled",true);
  // if (r == log){

  // }
  // console.log(x);
}


