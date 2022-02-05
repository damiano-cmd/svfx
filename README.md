# svfx

This is a js animation library that animates your commponents using the svelte use: directive.

This is how you use it.

```
  <script>
    import {scrollFunctions, typeAnimation, Animation} from "svfx"
  </script>

  <main>
    <p 
      use:scrollFunctions
      on:enterscreen={Animation({name: "keyframe name"})}
      use:typeAnimation = {{duration: 2000}}
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

Curently it has scrollFunctions, Animation function, typeAnimation and typeCorectionAnimation.

## typeAnimation

This function animates any text that is directly in the p or h tags.
It has only two argument witch are duration and delay and they control the timing of the type animation.
Function header.
`function typeAnimation(node, {duration = 1000, delay = 0})`

## typeCorectionAnimation

This function is simular to the typeAnimation function but it has two more arguments: `corections = []`  and  `play = "normal"`.

This function cycles through worlds given in the corections argument and types them on the screen before it erases it and type the next word. It goes on infinitely. 

The play arguments can be either `normal` or `pingpong`. Normal is just normal and pingpong make the text alimate the erasing proccess as well.

## Animation
This function returns a function that when called applies a specified animation to the element.

Here is the function header: `Animation({name, duration = 1000, delay = 0, timing = "", once = false, reset = false})`

The args are:
 - name - the name of the css keyframes animation.
 - duration - the time duration of the animation.
 - delay - animation delay.
 - timing - animation timing.
 - once - this determans if the function is going to be played only once.
 - reset - this determans if the element is going to return to the css stete before the animation was played.

## scrollFunctions

This function will give the 7 custom event's: 
  - onscreen - will fire when the element is on screen.
  - enterscreen - will fire when element enter's the screen.
  - leavescreen - will fire when the element leaves the screen.
  - entertop / enterbottom - fires when element enter from either top or bottom of the screen.
  - leavetop / leavebottom - fires when element leaves from either top or bottom of the screen.

It also has some arguments: 
  - fromTop - this offset's the screen top by some value
  - fromBottom - this offset's the screen bottom by some value
  - onscreen, enterscreen ... - these are the custom event's specified at the top. Here you put in the animation params just like the Animation function. So insted of this:
    ```
      <p 
        use:scrollFunctions
        on:enterscreen={Animation({name: "keyframe name"})}
      >
    ```
    you can do this:
    ```
      <p 
        use:scrollFunctions = {{
          enterscreen: {name: "keyframe name"}
        }}
      >
    ```