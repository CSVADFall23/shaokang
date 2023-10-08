## Project 2 Readme

This project is to depict light propagation (or Ray Tracing) in 2D settings. For simplicity, I only involves **reflect** and **refract** in the project. 

![](https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/04/16224940/Reflection-Of-Light-1-1024x640.png)

The pattern is generated with following logic:

* First generate 2 kinds of objects (tile-based distribution), circle and cross.
* The initial ray is situated at the center, with a random initial direction
* The ray bounces around in the scene, on each intersection with objects, it may reflect or refract on a probability basis.
* The ray diminishes after 100 bounces.



The motive of doing this is I find ray reflection creates symmetry, and it’s interesting to see how the pattern differs even with slight change to the initial condition (say, the ray direction).  Another plus is when you print the pattern with AxiDraw, you will see the “ray path” is being mimicked by the robot arm.



#### Some intermediate results:

<img src="https://s2.loli.net/2023/10/08/fJbsHztSGoXVPNg.png" alt="截屏2023-10-06 09.45.07" style="zoom: 25%;" /><img src="https://s2.loli.net/2023/10/08/dGH98ncCis6wJQZ.png" alt="截屏2023-10-06 02.35.07" style="zoom:25%;" />

<img src="https://s2.loli.net/2023/10/09/reIMNbUoDzZpYBE.png" alt="截屏2023-10-06 10.05.05" style="zoom:25%;" />

> Random light bounces creates some interesting pattern, which is “serendipity” (I hate this word though.)



#### Final Pick

<img src="https://s2.loli.net/2023/10/09/zKAuaybIFNjv24k.png" alt="image-20231008141330470" style="zoom:50%;" />

> The first pattern has 10x10 grid, ray was trapped in some of the circles.
>
> The second pattern has 3x3 grid, with higher variance in circle’s radius.



#### File Structures

* Plug-in named [p5-svg]["https://unpkg.com/p5.js-svg@1.5.1"] is used to save the result in svg format.
* `rays.js` includes the data structures needed
  * `vec2` to store 2D point information
  * `ray` 
  * `line`
  * `circle`
* `trace.js` includes the basic recursive ray tracing
* `sketch.js` includes the world settings and calling ray tracing, and file IO.
