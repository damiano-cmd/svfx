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

Curently it has the functions: scrollFunctions, Animation, Sequence, typeAnimation, typeCorectionAnimation and ImageSlade.

#
## typeAnimation

This function animates any text that is directly in the p or h tags.
It has only two argument witch are duration and delay and they control the timing of the type animation.
Function header:

`typeAnimation(node, args = {duration:1000, delay:0, once:false})`

## typeCorectionAnimation

This function is simular to the typeAnimation function but it has two more arguments: `corections: []`  and  `playtype: "normal"`.

This function cycles through worlds given in the corections argument and types them on the screen before it erases it and type the next word. It goes on infinitely. 

The playtype arguments can be either `normal` or `pingpong`. Normal is just normal and pingpong make the text alimate the erasing proccess as well.

## typeEncryptFX 
It is simular to the other type functions.
This scrambles the innerText of a element an makes it look corupted/encrypted and then is decrypts the text, few letters at a time. The function header is:

`encryptFX(node, args = {duration:1000, scrambleTime:1000, delay:0, cycles:10, once:false})`

## TYPE ANIMATIONS SUBFUNCTIONS

Every function that has the the type prefix has its subfunctions. If you can these functions with no arguments it returns an array of two functions: one function is to be put in the use directive of the svelte element and the other is to triger the animation. Example:

```
<script>
	import {typeAnimation} from "svfx"
	let [fx, play] = typeAnimation();
</script>

<main>
	<p use:fx={{duration: 500}} >Hello</p>
	<button on:click={play} >PLAY</button>
</main>
```

isnted of:

```
<script>
	import {typeAnimation} from "svfx"
</script>

<main>
	<p use:typeAnimation >Yo sup my nigga how has it been. the last time I saw you you were fucking that bitch jessica. %</p>
</main>
```

So this alows you to have more control over the type animations. This is optional.

#

## Animation

This function returns a function that when called applies a specified animation to the element.

Here is the function header: 

`Animation({name, duration = 1000, delay = 0, timing = "", once = false, reset = false})`

The args are:
 - name - the name of the css keyframes animation.
 - duration - the time duration of the animation.
 - delay - animation delay.
 - timing - animation timing.
 - once - this determans if the function is going to be played only once.
 - reset - this determans if the element is going to return to the css stete before the animation was played.

## Sequence

This function is like animation but you can make sequence out of those animations that is triggered with a function.

Here is the function header: `Sequence({wholeDuration, animations = [], sequencer = "sametime"})`

Explaining the arguments:
  - animations - this is where you make a list of animation function arguments like the name, duation ... so and so.
  - wholdeDuration is not working curenty.
  - sequencer - this argument determans if the sequence of animations are going to be played at the same time (aka. sametime) or one after another (aka. tail).

It returns an array of the animation play triger and the animation functions.

So the code will look somthing like this:
```
<script>
	import {Sequence} from "svfx"

	let s = Sequence({
		sequencer: "tail", 
		animations: [
			{name: "in", duration: 800, delay: 400}, 
			{name: "in"}
		]
	});

  // animTrigger is the animation play trigger 
  // and sq1 and sq2 are the animation applier functions.
	let [animTrigger, [sq1, sq2]] = s;
</script>

<main>
	<button on:click={() => {animTrigger()}} >
      hello
    </button>
	<div class="b" use:sq1></div>
	<div class="b" use:sq2></div>
</main>
```

## ImageSlade

This function needs an empty `div` element and it will make an image slide show.

Function header: 
`ImageSlade(node, args = {images: [], timing: 1000, fadeTiming: 500})`

Explining arguments:
  - node - ref to the empty div.
  - images - links to the images you want to show.
  - timing - the duration of image before switching.
  - fadeTiming - the duration he switching animation. 

#
## scrollFunctions

This function will give the 7 custom event's: 
  - onscreen - will fire when the element is on screen.
  - enterscreen - will fire when element enter's the screen.
  - leavescreen - will fire when the element leaves the screen.
  - entertop / enterbottom - fires when element enter from either top or bottom of the screen.
  - leavetop / leavebottom - fires when element leaves from either top or bottom of the screen.

It also has some arguments: 
  - fromTop - this offset's the screen top by some value in pixels. If you want it to work in percentages you need to turn the value in to a string with specifiend percent value. 
  - fromBottom - same as fromTop but from bottom.
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
