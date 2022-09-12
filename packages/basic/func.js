// func.js
function show(content) {
  document.querySelector('#app').innerHTML = `Hello, ${content}!`;
}

module.exports = show;