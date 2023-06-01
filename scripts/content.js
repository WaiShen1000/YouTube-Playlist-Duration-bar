const updateDurationPlaying = async () =>
    (await import(chrome.runtime.getURL("scripts/duration-playing.js"))).updateDurationPlaying();

let playingObserverStarted = false;
let playlistObserverStarted = false;

const startObserver = () => {
    // create the observer for whole web page
    const pageManagerObserver = new MutationObserver(mutationsList => {
        // check for #playlist items element
        if (!playingObserverStarted) {
            const playlistElement = document.querySelector('#page-manager > ytd-watch-flexy #playlist #items');

            if (playlistElement) {
                // create the observer for #playlist
                const playingObserver = new MutationObserver(updateDurationPlaying);
                playingObserver.observe(playlistElement, { childList: true, subtree: true });
                playingObserverStarted = true;
                console.log("playlist observer started");
            }
        }

        // playlist contents in /playlist endpoint
        if (!playlistObserverStarted) {
            const playlistContents = document.querySelector('#page-manager [page-subtype="playlist"] #contents #contents #contents')

            if (playlistContents) {
                // create the observer for #playlist
                console.log("playlist here!!!")

                playlistObserverStarted = true;
            }
        }

        if (playingObserverStarted && playlistObserverStarted) {
            // stop observing #page-manager
            pageManagerObserver.disconnect();
            console.log("page-manager observer stopped");
        }
    });

    // start observing #page-manager
    pageManagerObserver.observe(document.documentElement, { childList: true, subtree: true });
    console.log("page-manager observer started");
}

const main = () => {
    updateDurationPlaying();
}

startObserver();
