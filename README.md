# EasyWikiDev
Develop Wikipedia userscripts quickly with Visual Studio Code

## Warning
This project is quite basic and was made in a couple hours, however I've tested it and it should work, if not open an issue or pull request - they're appreciated!
A tutorial video is coming soon.

## Get started in 10 steps
1. Install the userscript [here](https://en.wikipedia.org/wiki/User:Ed6767/EasyWikiDev.js) - note the "Develop" link that now appears next to your preferences link
2. Make sure you have [Visual Studio Code](https://code.visualstudio.com/Download) and [NodeJS](https://nodejs.org/en/) installed
3. Open Visual Studio Code and under "Start" click "Clone Git Repository"
4. In the prompt that shows, enter `https://github.com/wikimedia-gadgets/EasyWikiDev`
5. Select a new folder to develop your user script from. When asked if you would like to open the cloned repository, click "open".
6. Click "Yes, I trust all the authors" to enable editing.
7. On the left sidebar of Visual Studio Code, click "Run and Debug"
8. In the run and debug pane, the play button next to "Start Server" to start the development server
9. Click "Develop" to load your script. You should see the welcome message.
10. Now, try editing `script.js`. As soon as you hit save, the page should reload and the latest version of the script will be loaded.
11. To release your script, simply copy the contents of `script.js` to your Wiki. You do not need to keep the demo code.

If you have any issues or errors, read them and try to fix them first, then ask for help or report a bug here.

## Limitations
This project only works on single page scripts and gadgets. It can't load more than one script locally yet - although I might add this functionality in the near future.
