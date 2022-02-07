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
    let letter = 0;
    let interval;

    function Type() { 

      let text2 = corections[i].substring(0, letter + 1);
      node.innerHTML = text.replace("%", text2);
      letter++;

      if(text2 === corections[i]) {
        clearInterval(interval);
        if (play == "pingpong") {
          setTimeout(function() {
            interval = setInterval(Delete, duration / corections[i].length / 2);
          }, delay);
        } else {
          
          if(i == (corections.length - 1))
            i = 0;
          else
            i++;
          
          letter = 0;
          setTimeout(function() {
            interval = setInterval(Type, duration / corections[i].length);
          }, delay);
        }
      }
    }

    function Delete() {

      let text2 = corections[i].substring(0, letter + 1);
      node.innerHTML = text.replace("%", text2);
      letter--;

      if(text2 === '') {
        clearInterval(interval);

        if(i == (corections.length - 1))
          i = 0;
        else
          i++;
        
        letter = 0;

        setTimeout(function() {
          interval = setInterval(Type, duration / corections[i].length);
        }, delay);
      }
    }

    setTimeout(() => {
      interval = setInterval(Type, duration / corections[i].length);
    }, delay)
  }
}
