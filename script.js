document.addEventListener('DOMContentLoaded', (event) => {
    const playBtn = document.querySelector('.play-btn');
    const body = document.querySelector('.body');
    const lyricsContainer = document.getElementById('lyrics');

    // Add the audio object for the sound
    const audio = new Audio('Tapestry-BrunoMajor.mp3'); // Change 'song.mp3' to your actual sound file

    const lyrics = [
        { text: "Have you seen the seven oceans?", delay: 0.07 },
        { text: "Or the snow cap of a mountain top?", delay: 0.08 },
        { text: "Or the Northern Lights set in motion?", delay: 0.07 },
        { text: "Or a heartbeat slow to a stop?", delay: 0.17 },

        { text: "Have you read a book by candlelight?", delay: 0.08 },
        { text: "Or heard a leader's call to arms?", delay: 0.11 },
        { text: "Have you ever felt my love burn so bright", delay: 0.12 },
        { text: "Like a fireball in your palm?", delay: 0.1 }, //4th line
        
        { text: "More than all the things that I've seen", delay: 0.12 },
        { text: "You will always be part of my tapestry", delay: 0.09 },
        { text: "More than all the places I've been", delay: 0.13 },
        { text: "You will always be part of my tapestry", delay: 0.08    }, //4th line

        { text: "Have you felt a revolution?", delay: 0.08 },
        { text: "Do you ever sit to stop and pause", delay: 0.08 },
        { text: "Just to take a little moment, mmm", delay: 0.11 },
        { text: "To see what's mine and yours?", delay: 0.1 }, //4th line

        { text: "More than all the things that I've seen", delay: 0.134 },
        { text: "You will always be part of my tapestry", delay: 0.09 },
        { text: "More than all the places I've been", delay: 0.13 },
        { text: "You will always be part of my tapestry", delay: 0.07 }, //4th line

        { text: "These are just lines of latitude", delay: 0.09 },
        { text: "That we made up, drawn upon a map", delay: 0.09 },
        { text: "We could be meeting with more than minds", delay: 0.07 },
        { text: "We could be woven and intertwined", delay: 0.06 }, //4th line

        { text: "More than all the things that I've seen", delay: 0.12 },
        { text: "You will always be part of my tapestry", delay: 0.09 },
        { text: "More than all the places I've been", delay: 0.13 },
        { text: "You will always be part of my tapestry", delay: 0.07 }, //4th line
        
        { text: "...Happy Birthday my love", delay: 0.2},

    ];

    const delays = [5, 4, 3, 
        .5, 3, 3.9, 1.8, 
        2, 1.2, 2.2, 1.7, 
        3, 4.8, 3.5, 3.9,
        2.2, 1, 2.2, 1.7,
        .1, .12, 2.5, .3,
        5.5, 1.2, 2.4, 1.9, 
        .1];

    // Array to specify how many lines each group should have
    const groupSizes = [4, 4, 4, 4, 4, 4, 4, 1];  // Example: first group 3 lines, second group 5 lines, third group 4 lines

     // Set an initial delay before the first line appears
     const initialDelay = 1000; // 3000ms = 3 seconds, adjust as needed

     async function displayLyrics() {
         let currentLine = 0;  // To track which line of lyrics we're on
         let groupDelay = 1000;  // Delay between groups in milliseconds
        // Set the background color for the lyrics container immediately
         lyricsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

         // Wait for the initial delay before starting the lyrics
         await new Promise(resolve => setTimeout(resolve, initialDelay));
 
         for (let groupIndex = 0; groupIndex < groupSizes.length; groupIndex++) {
             let linesInGroup = groupSizes[groupIndex];  // Get the number of lines for this group
             let currentGroup = [];  // Store current group's lines
 
             for (let i = 0; i < linesInGroup && currentLine < lyrics.length; i++, currentLine++) {
                 let line = lyrics[currentLine].text;
                 let charDelay = lyrics[currentLine].delay;
                 
                 // Display each character in the current line
                 for (let char of line) { 
                     lyricsContainer.innerHTML += char;
                     await new Promise(resolve => setTimeout(resolve, charDelay * 1000));
                 }
 
                 // Add a line break after each line
                 lyricsContainer.innerHTML += '\n';

                 if (currentLine === lyrics.length - 1) {
                    // If it's the last line, apply a custom delay for fading out
                    await new Promise(resolve => setTimeout(resolve, 4000)); // Adjust this custom delay
                } else {
                    await new Promise(resolve => setTimeout(resolve, delays[currentLine] * 1000));
                }
            }
             // After showing the lines in the current group, fade out and clear the lyrics
             await fadeOutLyrics(lyricsContainer);
             lyricsContainer.innerHTML = '';  // Clear the container
             await new Promise(resolve => setTimeout(resolve, groupDelay));  // Delay between groups
         }
     }
 
     function fadeOutLyrics(container) {
         return new Promise((resolve) => {
             container.style.transition = 'opacity 1s';  // Fade-out transition of 1 second
             container.style.opacity = '0';  // Set opacity to 0 for fade-out
 
             setTimeout(() => {
                 container.style.opacity = '1';  // Reset opacity to 1 for next group
                 resolve();  // Resolve the promise after the fade-out effect is done
             }, 1000);  // Time for fade-out effect
         });
     }
 
     playBtn.addEventListener('click', () => {
         playBtn.style.display = 'none';
 
         // Play the sound when the play button is clicked
         audio.play();
 
         // Create a new div for the background animation (e.g., video, image, etc.)
         const backgroundFade = document.createElement('div');
         backgroundFade.className = 'background-fade';
         backgroundFade.style.backgroundImage = 'url("./dudu.gif")';
         body.appendChild(backgroundFade);
 
         // Start displaying lyrics
         displayLyrics();
     });
    });
