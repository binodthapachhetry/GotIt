function hello() {
   var  name = document.getElementById('info').value;
   alert("Hello " +name);
}

document.getElementById('btn').addEventListener('click', hello);