export function Animation({name, duration = 1000, delay = 0, timing = "", once = false, reset = false}) {
  if (name != undefined) {
    return ({target}) => {
      target.style.animationName = name;
      target.style.animationDuration = duration.toString() + "ms";
      if (!reset) {
        target.style.animationFillMode = "forwards";
      }
      if (!once) {
        setTimeout(() => {
          target.style.animationName = '';
        }, duration+delay);
      }
    };
  }
}

export function ImageSlade(node, images = [], timing = 1000, fadeTiming = 500) {

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

    }

  }

}
