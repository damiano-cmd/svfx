# svfx

This is a js animation library that animates your commponents using the svelte use: directive.

This is how you use it.

```
  <script>
    import {scrollFX, typeFX} from "svfx"

    // or

    import {scrollShow} from "svfx/src/scrollFX"
    import {typeAnimation} from "svfx/src/typeFX"
  </script>

  <main>
    <p 
      use:scrollFX.scrollShow = {{animation: "in 3s"}}  
      use:typeFX.typeAnimation={2000}
    >
      Hello
    </p>
  </main>

  <style>
    @keyframes -global-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  </style>
```

Curently it only has scollShow and typeAnimation.

## typeAnimation

This function animates any text that is directly in the p or h tags.
It has only two argument witch are duration and delay and they control the timing of the type animation.
Function header.
`function typeAnimation(node, time = 1000)`

## scrollShow 

This function will make any tag animate when you scoll to it so it is visible.
Function header:
`function scrollShow(node, {animation = "", animateOnce = true, showAt = 100, hideAt = 100})`

Let me explain these arguments:
  - animation - css animation name durration delay etc...
  - animateOne - detemens if the animation will run only when one time after you scroll to it.
  - showAt - offset from the top of the screen in percentages that is the offset at witch the animateion will play.
  - hideAt - offset from the top of the screen in percentages that determens at what offset to reset the animation to play again. animateOne disables this.