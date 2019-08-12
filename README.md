Have you ever wanted to play one musical scale of kazoos but lacked the willpower to spend $10 on a kazoo?

Well, this is where Kazoo Bandcamp comes in!

How it works:
1. Add a kazoo with the + icon
2. Modify the time range to whatever you want that is not 0,0
3. Click the Play button. And the lovely and not ever annoying sound of a kazoo will grace your ears.
4. Add more kazoos for more fun!


Technical challenges:
1. Initial learning of React. This is my first project I did with it. As a result, there were some architectural choices that I would have done differently had this been started over.
2. Figuring out how to make the sound 'gapless'. IE in an Audio javascript object, using the Audio.loop() does not seamlessly restart the sound playing from start to finish. There is a very small gap. There were a couple options I tried (talked about at bottom, messed up readme formatting) In addition, a lot of time was spent trying to figure out how to loop audio so it wouldn't sound 'jumpy'. I was originally kind of eyeballing a .5 sec or so area of my original .wav files. But, after playing around I found that using 1 wave (IE like a sinusoidal wave from -1 to 1 to -1 would be 1 wave) repeated over and over worked fine.
3. Getting the sound UI to a point I liked. This includes updating the state as well as graphical implementations. Fun challenges like trying to figure out pausing with my original implementation and moving the current time so that the music was correctly corresponding to the UI.
4. The Music Sheet. This was largely just learning SCSS which for me wasn't that bad. Implementing the javascript for it was also a little complex. I feel that it could be simplified from what it is.
5. *STILL WORKING ON, only 5 / 7 of the notes (A,B,C,D,E,F,G of which I have A,D,E,F,G) were available from my online search. I do not have an ear for music and would not be able to safely say if a note is B or A. I think this could be solved by looking at the wave structure of a A note vs a B notes and manipulating an A note to look like a B / C.

Technical Stack:
React, SCSS, Javascript, CSS, HTML

*
 A. https://github.com/Hivenfour/SeamlessLoop , I found it still didn't make it seamless regardless of the title. This was actually a common theme with a couple github projects I tried.
    
B. WebAudio, It works. However, the 'download / decode' time for it was not usable. (https://bugs.chromium.org/p/chromium/issues/detail?id=424174)
    
C. Native Audio Object but with setInterval to check if the song is about at it's end. This is in itself a more precise .loop implementation where I could set the interval time to something small. I wasn't sure how costly this would be on computers though with a large amount of notes.
    
D. Native Audio Object but with a 3 min Loop. This is what I ended up doing. Technically, if someone had a note go for 3 minutes without interruption there could be an issue as the Audio.loop would cause a gap, however I assume that this wouldn't happen.
