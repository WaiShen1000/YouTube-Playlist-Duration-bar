const updateDuration = async () => 
    (await import(chrome.runtime.getURL("scripts/duration-header.js"))).updateDuration();

const startObserver = () => {
    // create the observer for whole web page
    const pageManagerObserver = new MutationObserver(mutationsList => {
        // check for #playlist items element
        const playlistElement = document.querySelector('#page-manager #playlist #items');
        // if it exists
        if (playlistElement) {
            // stop observing #page-manager
            pageManagerObserver.disconnect();

            // create the observer for #playlist
            const playlistObserver = new MutationObserver(update);
            playlistObserver.observe(playlistElement, { childList: true, subtree: true });
            console.log("playlist observer started");
        }
    });

    // start observing #page-manager
    pageManagerObserver.observe(document.documentElement, { childList: true, subtree: true });
    console.log("page-manager observer started");
}

function update() {
    updateDuration();
}

startObserver();
