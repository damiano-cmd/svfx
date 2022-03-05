export function Animation(args = {name, duration, delay, timing, once, reset}) {
  let {name = undefined, duration = 1000, delay = 0, timing = "ease", once = false, reset = false} = args;
  if (name != undefined) {
    return ({target = document.createElement()}) => {
      setTimeout(() => {
        target.style.animationName = name;
        target.style.animationDuration = duration.toString() + "ms";
        target.style.animationTimingFunction = timing
        if (!reset) {
          target.style.animationFillMode = "forwards";
        }
        if (!once) {
          setTimeout(() => {
            target.style.animationName = '';
          }, duration);
        }
      }, delay)
    };
  }
}

export function ImageSlade(node, args = {images: [], timing: 1000, fadeTiming: 500}) {

  let {images, timing, fadeTiming} = args;

  let error = false;

  if (node.children.length != 0) {
    error = true;
    alert("You need the element to be empty for the image slide to work!")
  }
  if (images.length < 1) {
    error = true;
    alert("You need to put in some images for the image slide ti work!");
  }

  if (error == false) {


    let imagefornt = document.createElement("img");

    node.style.position = "relative";
    node.style.overflow = "hidden";
    node.style.backgroundSize = "100% 100%";

    imagefornt.setAttribute("src", images[0]);
    node.appendChild(imagefornt);


    switchTransition();
    function switchTransition() {

      node.style.backgroundImage = `url(${images[0]})`;
      setTimeout(() => {
        
        images.push(images.shift());
        imagefornt.setAttribute("src", images[0]);
        imagefornt.style.opacity = "0";


        let it = 0;
        let int = setInterval(() => {
          it += fadeTiming/100;
          imagefornt.style.opacity = it/fadeTiming;
        }, fadeTiming/100);

        setTimeout(() => {
          clearInterval(int);
          imagefornt.style.opacity = 1;
        }, fadeTiming);

        setTimeout(switchTransition, timing+fadeTiming);

      }, 10)
    }

  }

}

export function Sequence({wholeDuration, animations = [], sequencer = "sametime"}) {

  let error = true;
  if (!["sametime", "tail"].includes(sequencer)) {
    console.log("Sequencer is not correct!");
    error = false;
  }

  let sequence = [];
  let elemnts = [];
  let place = 0;

  function run() {
    for (let i = 0; i < elemnts.length; i++) {
      elemnts[i]();
    }
  }

  for (let i = 0; i < animations.length; i++) {

    if (sequencer == "tail") {
      let {duration = 1000, delay = 0} = animations[i];
      if (animations[i]["delay"] != undefined) {
        animations[i].delay += place;
      } else {
        animations[i]["delay"] = place;
      }
      place += duration;
    }
    
    let anim = Animation(animations[i]);

    sequence.push((node) => {
      elemnts.push(() => {
        anim({target: node});
      });
    });

  }

  return [run, sequence];
}