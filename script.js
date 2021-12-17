// HOW TO:
// 0. Have Visual Studio Code and Node.js installed on your computer - if you have issues these could be the most likely things to fix
// 1. Make sure all files are downloaded (you should have this script, a .vscode folder, and a .wikidev folder - some OSes may hide these outside of VSCode)
// 2. Open this directory in VS Code
// 3. Click the "Run and Debug" button
// 4. Click the play button next to "Start Server" in the panel to start the server
// 5. Install the EasyWikiDev userscript from en.wikipedia.org/wiki/User:Ed6767/EasyWikiDev
// 6. Click the new 'Develop' link that appears on the Wikipedia page
// 7. Edit your script! When you save it, any effected pages will reload with the latest version of the script.
// 8. Click the stop button in VS Code to stop the server
// Example script - you can create your user script here
mw.notify("To get started, edit your script.js file and hit save. Then, watch this page magically reload with the updated script.", {
    title: "Hi there! Welcome to EasyWikiDev",
    type: "info",
    autoHide: false,
});