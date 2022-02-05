export function typeAnimation(node, params = {}) {
  let {duration = 1000, delay = 0} = params;
  let error = false;
  
  let text = node.innerText;
  node.innerText = "";

  if (!["H1", "H2", "H3", "H4", "H5", "H6", "P"].includes(node.nodeName)) {
    error = true;
    alert("typeAnimation can only be used on text html tags!!");
  }

  if (!error) {

    let arr = ["", ...text.split("")];

    function typeFunc() {
      if (arr.length > 0) {
        node.innerText += (arr[0] == " ") ? arr.shift() + arr.shift() : arr.shift();
        setTimeout(typeFunc, duration / text.length);
      }
    }

    setTimeout(typeFunc, duration / text.length + delay);

  }
}

export function typeCorectionAnimation(node, {duration = 1000, delay = 0, corections = [], play = "normal"}) {
  let error = false;

  if (!["H1", "H2", "H3", "H4", "H5", "H6", "P"].includes(node.nodeName)) {
    error = true;
    alert("typeAnimation can only be used on text html tags!!");
  }

  let time = delay;
  switch (play) {
    case "pingpong": 
      time += duration*2+delay;
      break;
    case "normal":
      time += duration+delay;
      break;
    default:
      error = true;
      alert("play argument is not a valid play state!");
  }

  if (!error) {

    let text = node.innerText;
    node.innerText = text.replace("%", "");
    let i = 0;

    const corloop = () => {
      let arr = ["", ...corections[i].split("")];
      let corection = "";
      
      let int = setInterval(() => {
        if (arr.length > 0) {
          corection += (arr[0] == " ") ? arr.shift() + arr.shift() : arr.shift();
          node.innerText = text.replace("%", corection);
        } else {
          clearInterval(int);
        }
      }, duration / arr.length)
    
      if (play == "pingpong") {
        setTimeout(() => {
          arr = corection.split("");
          let int2 = setInterval(() => {
            if (arr.length > 0) {
              arr.pop();
              node.innerText = text.replace("%", arr.join(""));
            } else {
              clearInterval(int2);
            }
          }, duration / arr.length)
        }, duration+delay)
      }
    
      i++;
      if (i >= corections.length) {
        i = 0;
      }
    }

    corloop()
    setInterval(corloop, time);
  }
}