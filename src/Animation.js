export function Animation({name, duration = 1000, delay = 0, timing = "", once = false, reset = false}) {
  if (name != undefined) {
    const animationFunction = ({target}) => {
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
    }
    return animationFunction;
  }
}
