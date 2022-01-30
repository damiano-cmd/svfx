export function typeAnimation(node, duration = 1000, delay = 0) {
  let error = false;

  if (!["H1", "H2", "H3", "H4", "H5", "H6", "P"].includes(node.nodeName)) {
    error = true;
    alert("typeAnimation can only be used on text html tags!!");
  }

  if (!error) {

    let text = node.innerText;
    node.innerText = "";

    setTimeout(() => {
      let arr = text.split("");
      let int = setInterval(() => {
          if (arr.length > 0) {
            node.innerText += (arr[0] == " ") ? arr.shift() + arr.shift() : arr.shift();
          } else {
            stop();
          }
        }, duration / text.length);
      function stop() {
        clearInterval(int);
      }
    }, delay)

  }
}