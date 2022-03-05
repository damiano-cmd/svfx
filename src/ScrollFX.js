import {Animation} from "./Animation"

export function scrollFunctions(node, params = {
    fromTop: 0, 
    fromBottom: 0, 
    onscreen: undefined, 
    enterscreen: undefined, 
    leavescreen: undefined, 
    entertop: undefined, 
    leavetop: undefined, 
    leavebottom: undefined, 
    enterbottom: undefined
}) {
  let {
    fromTop, 
    fromBottom, 

    onscreen, 
    enterscreen,
    leavescreen,

    entertop,
    leavetop,

    leavebottom,
    enterbottom
  } = params;
  if (onscreen != undefined && typeof onscreen != "function") {
    onscreen = Animation(onscreen);
  }
  if (enterscreen != undefined && typeof enterscreen != "function") {
    enterscreen = Animation(enterscreen);
  }
  if (leavescreen != undefined && typeof leavescreen != "function") {
    leavescreen = Animation(leavescreen);
  }
  if (entertop != undefined && typeof entertop != "function") {
    entertop = Animation(entertop);
  }
  if (leavetop != undefined && typeof leavetop != "function") {
    leavetop = Animation(leavetop);
  }
  if (leavebottom != undefined && typeof leavebottom != "function") {
    leavebottom = Animation(leavebottom);
  }
  if (enterbottom != undefined && typeof enterbottom != "function") {
    enterbottom = Animation(enterbottom);
  }
  
  let is_scroll_to = false;
  let is_scroll_past = false;
  let is_on_screen = false;

  const handleScroll = () => {

    let scrl;
    let offsetTop;

    if (typeof fromBottom == "string")
    {
      let fromBottomP = window.innerHeight*(parseInt(fromBottom)/100);
      scrl = window.innerHeight+window.scrollY-fromBottomP;
    } else {
      scrl = window.innerHeight+window.scrollY-fromBottom;
    }

    if (typeof fromTop == "string")
    {
      let fromTopP = window.innerHeight*(parseInt(fromTop)/100)
      offsetTop = window.scrollY+fromTopP;
    } else {
      offsetTop = window.scrollY+fromTop;
    }

    let offsetBottom = node.offsetTop+node.clientHeight;
    
    if (node.offsetTop < scrl && !is_scroll_to) {
      node.dispatchEvent(new CustomEvent("entertop"));
      if (entertop != undefined) {
        entertop({target: node});
      }
      is_scroll_to = true;
    }
    if (node.offsetTop > scrl && is_scroll_to == true) {
      node.dispatchEvent(new CustomEvent("leavetop"));
      if (leavetop != undefined) {
        leavetop({target: node});
      }
      is_scroll_to = false;
    }

    if (offsetBottom < offsetTop && !is_scroll_past) {
      node.dispatchEvent(new CustomEvent("leavebottom"));
      if (leavebottom != undefined) {
        leavebottom({target: node});
      }
      is_scroll_past = true;
    }
    if (offsetBottom > offsetTop && is_scroll_past == true) {
      node.dispatchEvent(new CustomEvent("enterbottom"));
      if (enterbottom != undefined) {
        enterbottom({target: node});
      }
      is_scroll_past = false;
    }

    if (is_scroll_to && !is_scroll_past) {
      node.dispatchEvent(new CustomEvent("onscreen"));
      if (onscreen != undefined) {
        onscreen({target: node});
      }
      if (is_on_screen == false) {
        node.dispatchEvent(new CustomEvent("enterscreen"));
        if (enterscreen != undefined) {
          enterscreen({target: node});
        }
        is_on_screen = true;
      }
    } else if (is_on_screen == true) {
      node.dispatchEvent(new CustomEvent("leavescreen"));
      if (leavescreen != undefined) {
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
