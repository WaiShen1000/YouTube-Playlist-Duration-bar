const updateDurationPlaying = async () =>
    (await import(chrome.runtime.getURL("scripts/duration-playing.js"))).updateDurationPlaying();

const updateDurationPlaylist = async () =>
    (await import(chrome.runtime.getURL("scripts/duration-playlist.js"))).updateDurationPlaylist();

let playingObserverStarted = false;
let playlistObserverStarted = false;

let timeoutId;

const startObserver = () => {
    // create the observer for whole web page
    const pageManagerObserver = new MutationObserver(mutationsList => {
        // check for #playlist items element
        if (!playingObserverStarted) {
            const playlistElement = document.querySelector('#page-manager > ytd-watch-flexy #playlist #items');

            if (playlistElement) {
                // create the observer for #playlist
                const playingObserver = new MutationObserver(mutationsList => {
                    updateDurationPlaying();
                    
                    // The updateDurationPlaying function will not be triggered after finishing video reordering.
                    // So run the function 2 seconds later to update UI.
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(updateDurationPlaying, 2000);
                });

                playingObserver.observe(playlistElement, { childList: true, subtree: true });
                playingObserverStarted = true;
                console.log("START :: Playing list observer started");
            }
        }

        // playlist contents in /playlist endpoint
        if (!playlistObserverStarted) {
            const playlistContents = document.querySelector('#page-manager [page-subtype="playlist"] #contents #contents #contents')

            if (playlistContents) {
                // create the observer for #playlist
                const playlistObserver = new MutationObserver(mutationsList => {
                    updateDurationPlaylist();   
                });

                playlistObserver.observe(playlistContents, { childList: true, subtree: true });
                playlistObserverStarted = true;
                console.log("START :: Playlist observer started");
            }
        }

        if (playingObserverStarted && playlistObserverStarted) {
            // stop observing #page-manager
            pageManagerObserver.disconnect();
            console.log("END :: #page-manager observer stopped");
        }
    });

    // start observing #page-manager
    pageManagerObserver.observe(document.documentElement, { childList: true, subtree: true });
    console.log("START :: #page-manager observer started");
}

const main = () => {
    updateDurationPlaying();
}

startObserver();
