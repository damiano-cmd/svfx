import {Animation} from "./Animation"

export function scrollFunctions(node, params = {}) {
  let {
    fromTop = 0, 
    fromBottom = 0, 

    onscreen = false, 
    enterscreen = false,
    leavescreen = false,

    entertop = false,
    leavetop = false,

    leavebottom = false,
    enterbottom = false
  } = params;
  {
    if (onscreen != false && typeof onscreen != "function") {
      onscreen = Animation(onscreen);
    }
    if (enterscreen != false && typeof onscreen != "function") {
      enterscreen = Animation(enterscreen);
    }
    if (leavescreen != false && typeof onscreen != "function") {
      leavescreen = Animation(leavescreen);
    }
    if (entertop != false && typeof onscreen != "function") {
      entertop = Animation(entertop);
    }
    if (leavetop != false && typeof onscreen != "function") {
      leavetop = Animation(leavetop);
    }
    if (leavebottom != false && typeof onscreen != "function") {
      leavebottom = Animation(leavebottom);
    }
    if (enterbottom != false && typeof onscreen != "function") {
      enterbottom = Animation(enterbottom);
    }
  }
  
  let is_scroll_to = false;
  let is_scroll_past = false;
  let is_on_screen = false;

  const handleScroll = () => {

    let scrl = window.innerHeight+window.scrollY-fromBottom;
    let offsetBottom = node.offsetTop+node.clientHeight;

    if (node.offsetTop < scrl && !is_scroll_to) {
      node.dispatchEvent(new CustomEvent("entertop"));
      if (entertop != false) {
        entertop({target: node});
      }
      is_scroll_to = true;
    }
    if (node.offsetTop > scrl && is_scroll_to == true) {
      node.dispatchEvent(new CustomEvent("leavetop"));
      if (leavetop != false) {
        leavetop({target: node});
      }
      is_scroll_to = false;
    }

    if (offsetBottom < window.scrollY-fromTop && !is_scroll_past) {
      node.dispatchEvent(new CustomEvent("leavebottom"));
      if (leavebottom != false) {
        leavebottom({target: node});
      }
      is_scroll_past = true;
    }
    if (offsetBottom > window.scrollY-fromTop && is_scroll_past == true) {
      node.dispatchEvent(new CustomEvent("enterbottom"));
      if (enterbottom != false) {
        enterbottom({target: node});
      }
      is_scroll_past = false;
    }

    if (is_scroll_to && !is_scroll_past) {
      node.dispatchEvent(new CustomEvent("onscreen"));
      if (onscreen != false) {
        onscreen({target: node});
      }
      if (is_on_screen == false) {
        node.dispatchEvent(new CustomEvent("enterscreen"));
        if (enterscreen != false) {
          enterscreen({target: node});
        }
        is_on_screen = true;
      }
    } else if (is_on_screen == true) {
      node.dispatchEvent(new CustomEvent("leavescreen"));
      if (leavescreen != false) {
        leavescreen({target: node});
      }
      is_on_screen = false;
    }

  }

  window.addEventListener("scroll", handleScroll, true);

  return {
    destroy() {
      window.removeEventListener("scroll", handleScroll, true);
    }
  }
}
