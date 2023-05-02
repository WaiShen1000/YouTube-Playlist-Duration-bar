let retryCount = 0;

const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))


function getVideos() {
    items = document.querySelectorAll('div#items[class="playlist-items style-scope ytd-playlist-panel-renderer"]');

    retryCount++;
    console.log("Trying : "+ retryCount);

    return items[1]
}


function getVideoTime(video) {
    console.log(video);
    let videoTimeElement = video.querySelector("#text");
    if (videoTimeElement == null) {
        console.log("videoTimeElement is null");
        return ("00:00");
    }
    else {
        return(videoTimeElement.innerText.trim());
    }
}

function getTotalTime(videos) {
    let allTimes = [];

    // a for loop to loop through the videos list and pass to getVideoTime, then store each result in allTimes as list of string
    for (let i = 0; i < videos.length; i++) {
        allTimes[i] = getVideoTime(videos[i]);
    }

    console.log(allTimes);
}


const main = async () => {
    let videos = undefined;

    while (videos == undefined && retryCount < 10) {
        videos = getVideos();
        await sleep(1000);
    }
    videos = videos.children;

    getTotalTime(videos);
}
main();
setInterval(main, 15000);