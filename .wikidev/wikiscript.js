// The user script that runs on the client side - this was thrown together in a couple hours
// Apache 2.0/CC-BY-SA
// (c) 2021 User:Ed6767

let hasRecievedFirstMessage = false;

const currentSkin = mw.config.get("skin");

const portletLinkSelector = {
	'vector': 'a > span',
	'monobook': 'a',
	'timeless': 'a'
}

const currentPortletLinkSelector = portletLinkSelector[currentSkin];

const currentPageLink = mw.util.addPortletLink(
    'p-personal',
    '#',
    "Develop",
    "developLink",
    null, null, // ones we don't need
    '#pt-preferences' // put before preferences
);

currentPageLink.onclick = () => {
    if (hasRecievedFirstMessage) {
        stopDeveloperMode();
        window.location.reload(); // Clear the indev script
    } else {
        runDeveloperMode();
    }
}

function stopDeveloperMode() {
    localStorage.setItem('EasyWikiDev', 'disabled');
    currentPageLink.querySelector(currentPortletLinkSelector).innerText = "Develop";
}

function runDeveloperMode() {
    currentPageLink.querySelector(currentPortletLinkSelector).innerText = "Stop Developing";

    // Create the localstorage note
    localStorage.setItem('EasyWikiDev', 'enabled');

    try {
        // Connect to the websocket at ws://localhost:6767
        const ws = new WebSocket("ws://localhost:6767");

        ws.onerror = e => { throw e; };

        ws.onclose = () => {
            mw.notify("EasyWikiDev: Websocket closed. The server may not be running, else try enabling developer mode again.", {
                title: "Socket closed",
                type: "error",
                autoHide: false,
            });
            stopDeveloperMode();
        }

        // When the websocket receives a message, it will run this function
        ws.onmessage = e => {
            if (!hasRecievedFirstMessage) {
                hasRecievedFirstMessage = true;

                // The message is the script.js file
                // It's just a string, so we can just eval it
                eval(e.data);
            } else {
                window.location.reload();
            }
            
        }

    } catch (error) {
        console.error(error);
        mw.notify("EasyWikiDev: An error occured. Make sure the server is running, then check the Javascript console for more info.", {
            title: "Error",
            type: "error",
            autoHide: false,
        });
        stopDeveloperMode();
    }
}

// If present, run the developer mode
if (localStorage.getItem('EasyWikiDev') === 'enabled') {
    runDeveloperMode();
}
