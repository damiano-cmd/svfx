export function typeAnimation(node, args = {duration:1000, delay:0, once:false}) {
  let {duration, delay, once} = args;
  let error = false;
  let text;
  let arr;
  let played = false;

  function main() {

    text = node.innerText;
    node.innerText = "";

    if (!error) {

      arr = ["", ...text.split("")];

    }
  }

  function typeFunc() {
    if (arr.length > 0) {
      node.innerText += (arr[0] == " ") ? arr.shift() + arr.shift() : arr.shift();
      setTimeout(typeFunc, duration / text.length);
    }
  }

  function play() {
    if (!played) {
      setTimeout(typeFunc, duration / text.length + delay);
      if (once) played = true;
    }
  }

  if (node != undefined) {
    main();
    if (!error) {
      play();
    }
  } else {
    return [
      (nodeasign, args = {}) => {
        duration = args.duration || 1000;
        delay = args.delay || 0;

        node = nodeasign;
        main();
      },
      play
    ]
  }
  
}

export function typeCorectionAnimation(node, args = {duration:1000, delay:0, corections:[], playtype:"normal"}) {
  let {duration, delay, corections, playtype} = args;
  let error = false;
  let played = false;

  let text;

  let i = 0;
  let letter = 0;
  let interval;

  function main() {

    if (!error) {

      text = node.innerText;
      node.innerText = text.replace("%", "");
      
    }
  }

  function Type() { 

    let text2 = corections[i].substring(0, letter + 1);
    node.innerHTML = text.replace("%", text2);
    letter++;

    if(text2 === corections[i]) {
      clearInterval(interval);
      if (playtype == "pingpong") {
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

  function play() {
    if (!played) {
      setTimeout(() => {
        interval = setInterval(Type, duration / corections[i].length);
      }, delay);
      played = true;
    }
  }

  if (node != undefined) {

    main();

    if (!error) {
      play();
    }

  } else {
    return [
      (nodeasign, args = {}) => {
        duration = args.duration || 1000;
        delay = args.delay || 0;
        corections = args.corections || [];
        playtype = args.playtype || "normal";

        node = nodeasign;
        main();
      },
      play
    ];
  }
}

export function typeEncryptFX(node, args = {duration:1000, scrambleTime:1000, delay:0, cycles:10, once:false}) {
  let {duration, scrambleTime, delay, cycles, once} = args;
  let error = false;
  let chars = "@#$%&qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"
  let orgtxt;
  let skrmtxt;
  let played = false;

  function main() {


    orgtxt = node.innerText;
    skrmtxt = "";

    for (let i = 0; i < orgtxt.length; i++) {
      skrmtxt += chars[Math.floor(Math.random() * chars.length)];
    }

    node.innerText = skrmtxt;

  }

  function scramble() {
    skrmtxt = skrmtxt.split("");

    for (let i = 0; i < Math.floor(skrmtxt.length/2); i++) {
      let index = Math.floor(Math.random() * skrmtxt.length);
      let char = chars[Math.floor(Math.random() * chars.length)];
      skrmtxt[index] = char;
    }

    skrmtxt = skrmtxt.join("");
    node.innerText = skrmtxt;
  }

  function decrypt() {
    let indeses = [];
    for (let i = 0; i < orgtxt.length; i++) {
      indeses.push(i);
    }

    function int() {

      skrmtxt = skrmtxt.split("");

      for (let i = 0; i < orgtxt.length/cycles; i++) {
        let index = Math.floor(Math.random() * indeses.length);
        let indes = indeses[index];
        
        skrmtxt[indes] = orgtxt[indes];
        indeses.splice(index, 1);
      }

      skrmtxt = skrmtxt.join("");
      node.innerText = skrmtxt;
        
      if (indeses.length != 0) {
        setTimeout(int, duration/cycles);
      }
    }

    setTimeout(int, duration/cycles);
  }

  function play() {
    if (!played) {
      setTimeout(() => {
        let int;
        if (scrambleTime != 0) {
          int = setInterval(scramble, scrambleTime/cycles);
        }
        setTimeout(() => {
          clearInterval(int);
          decrypt();
        }, scrambleTime);
      }, delay);
      if (once) played = true;
    }
  }

  if (node != undefined) {

    main();

    play();

  } else {
    return [
      (nodeasign, argss = {}) => {

        duration = argss.duration || 1000;
        delay = argss.delay || 0;
        scrambleTime = argss.scrambleTime || 1000;
        cycles = argss.cycles || 10;

        node = nodeasign;
        main();
      },
      play
    ]
  }
}
