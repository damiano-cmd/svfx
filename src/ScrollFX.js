export function scrollShow(node, 
  {animation = "", animateOnce = true, showAt = 100, hideAt = 100}
) {

  let defaultStyle = "opacity: 0;";
  if (!node.attributes.style) {
    node.style.opacity = 0;
  } else {
    defaultStyle = node.attributes.style.nodeValue;
  }

  const handleScroll = () => {
    if (node.offsetTop < window.scrollY+(window.innerHeight*(showAt/100))) {
      node.style.position = "relative";
      node.style.animation = animation;
      node.style.opacity = 1;
    }
    if (
        (node.offsetTop > window.scrollY+(window.innerHeight*(hideAt/100))) 
        && 
        animateOnce == false
      ) 
    {
      node.attributes.style.nodeValue = defaultStyle;
    }
  }
  handleScroll();
  window.addEventListener("scroll", handleScroll);
}