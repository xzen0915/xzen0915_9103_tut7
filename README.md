# xzen0915_9103_tut7

# Quiz 8  - xiaolong Zeng 

__Part 1: Imaging Technique Inspiration__  
_This inspiration came from a programming subject I previously studied called Processing, specifically the random walk algorithm in Processing. By simulating particles emanating from a specific point and gradually diminishing over time until they disappear, this method vividly demonstrates dynamics and fluidity. In team tasks, this approach can be used to dynamically display unique elements of selected artworks, such as color gradients and shape transformations, enhancing visual effects and the viewer's interactive experience._  
[Image1 of inspiration](https://drive.google.com/file/d/1rhdvu0CvBV7rZLc7IyK-ad1CftzxQo2y/view?usp=sharing)  
[Image2 of inspiration](https://drive.google.com/file/d/15ij9szWoAeJG3uZzmmr02133vzfigHDz/view?usp=drive_link)  


__Part 2: Coding Technique Exploration__  
_Processing coding techniques, by simulating a particle system, achieve a visual effect where particles originate from the location clicked by the user. The position of these particles randomly shifts based on the Perlin noise function, simulating a natural movement effect. The color of the particles depends on the pixel colors of the underlying image. Over time, each particle gradually diminishes in size and eventually disappears. It creates a dynamic and interactive visual display, where the motion and color changes of the particles produce a unique artistic effect. Thus, through this technology, we can create smoother and more organic animations._  
[Processing random walk video](https://drive.google.com/file/d/1Dv_sh6xrAtyK3PxZx5uQoi06MOJzTBoH/view?usp=drive_link)  
[Processing code](https://docs.google.com/document/d/1abC0IwF7RyGRdAw8yMCuxAWi4z2M8Ka9/edit?usp=drive_link&ouid=106754159669391581950&rtpof=true&sd=true)





__Creative coding major project - individual part__
_Instructions_
Instructions
When moving the mouse on the screen, it will have a hovering effect on each grid. After aligning the mouse with the grid, you can change the color of the grid by pressing the 'A' key, or you can repeatedly press the 'A' key on a grid until you randomly select the desired color from the four colors of red, blue, yellow, and gray. After running the program for 15 seconds, starting from the top left corner, each grid will generate a color change in sequence. At this time, you can also change the color of the grid that has already undergone a color change by hovering the mouse and using the 'A' key.

_Implementation methods for personal animation_
    Part 1: Animation driven selection
I have chosen Perlin Noise, Interaction, and Time as the animation effects that drive my code. After running the program for 15 seconds, use a noise function to gradually and randomly change the grid color, resulting in a dynamic visual effect. At the same time, the color of the grid can also be changed by using a combination of mouse hovering and the 'A' key.


    Part 2:Animation attributes and their uniqueness
I mainly animated the colors. The color of the grid will dynamically change based on the values generated by Perlin Noise, and can be manually modified by hovering the mouse and pressing the 'A' key. The difference from other team members is that my animation effect remains static for the first 15 seconds and gradually produces color changes afterwards. And another team member mainly focuses on audio, generating a grid based on the rhythm of audio.


    Part 3:Inspiration Sources& Reference Techniques
My animation inspiration and technical references mainly come from the following video tutorials, which mainly provide examples and explanations about P5.js and Perlin Noise:
[The Coding Train - JavaScript setTimeout() Function - p5.js Tutorial](https://www.youtube.com/watch?v=nGfTjA8qNDA)
[The Coding Train - Perlin Noise in p5.js](https://www.youtube.com/watch?v=Qf4dIN99e2w&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD)
[The Coding Train - Noise vs Random in p5.js](https://www.youtube.com/watch?v=YcdldZ1E9gU)
[How to Shuffle a JavaScript Array](https://www.youtube.com/watch?v=Gfx9UV2tpLg)
[How to shuffle an array (Fisher-Yates algorithm) - Inside code](https://www.youtube.com/watch?v=4zx5bM2OcvA)
[How To Shuffle An Array With Javascript](https://www.youtube.com/watch?v=PNJlMyloz7I)


    Part 4:Technical explanation
In the code, I first initialized a grid, with each cell having a default color index. Depending on whether it belongs to a special row, column, or segment, some cells will be assigned different colors. After 15 seconds, the grid color is dynamically changed through a noise function, which maps it to the color index based on the noise value. Users can manually modify cell colors by hovering over the mouse and pressing the 'A' key, using the mouseMoved and keyPressed events.


    Part 5:Code modification
I have added noise driven color change effects on the basis of the original group code, and implemented user interaction functionality through event processing functions. In addition, the drawing logic for large and small blocks has been added, and small blocks are randomly selected and drawn through the shuffle function. 
Shortcomings: Although in this personal code, I also hope it can automatically generate large squares with small squares embedded inside, and added this code, it was not successfully displayed on the page.


    Part 6: Acknowledgement
Thank you ChatGPT for providing me with support in English writing and helping me to sort out the writing logic of the code to some extent.
