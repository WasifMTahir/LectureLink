// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");

var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var div = document.createElement('div');
  document.getElementById("myUL").appendChild(div);
  div.setAttribute('class', 'flexContainer');
  var inp = document.createElement('input');
  inp.setAttribute('type', 'text');
  inp.setAttribute('name', 'fname');
  inp.setAttribute('class', 'textbox');
  div.appendChild(inp);
  var cross = document.createElement('div');
  cross.textContent = "\327";
  cross.setAttribute('class', 'close');
    cross.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
  div.appendChild(cross)
}