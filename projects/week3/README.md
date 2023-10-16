## Project 3 Readme

This project is an extension on week 2’s light propagation. Instead of a static result, we now have the process of light traveling in the scene. Each ray has a different color and speed.

To add a ray, you may give the accelerometer a quick push. The initial direction of the ray is decided by the sensor data (can be inaccurate). On each ray hit objects, it will create a random (or from song list) note. The ray’s speed is determined by how fast you push the Arduino. You can create a minimalist picture with sound by creating light with the Arduino in this sketch.

This post helps me with setting up on p5.js analog input. `p5.serialcontrol` app is needed for fowarding data. I was thinking of using gestures instead of Arduino. (e.g. point your finger to dispatch a ray), but that was rather harder than accelerometer setup, but I would like to try out in the future.

#### Results

<img src="https://s2.loli.net/2023/10/16/9PCYaoJA3eqWStF.png" alt="image-20231015214310000" style="zoom:50%;" />

![image-20231015214428740](https://s2.loli.net/2023/10/16/N9vk2LPtbrwnMDX.png)

![image-20231015214600922](https://s2.loli.net/2023/10/16/rNX3CmseInKYpQi.png)

#### Reference

https://medium.com/@yyyyyyyuan/tutorial-serial-communication-with-arduino-and-p5-js-cd39b3ac10ce
