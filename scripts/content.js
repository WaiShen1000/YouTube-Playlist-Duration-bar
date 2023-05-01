let retryCount = 0;

const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))


function getVideos() {
    items = document.querySelectorAll('div#items[class="playlist-items style-scope ytd-playlist-panel-renderer"]');

    retryCount++;
    console.log("Trying : "+ retryCount);

    return items[1]
}


async function getVideoTime(video) {
    console.log(video);
    let videoTime = video.querySelector("#text").textContent;
    return(videoTime);
}

async function getTotalTime(videos) {
    let allTimes = [];

    // a for loop to loop through the videos list and pass to getVideoTime, then store each result in allTimes as list of string
    for (let i = 0; i < videos.length; i++) {
        allTimes[i] = getVideoTime(videos[i]);
    }

    console.log(typeof allTimes[0]);
}


const main = async () => {
    let videos;

    while (videos == undefined && retryCount < 10) {
        videos = getVideos();
        await sleep(1000);
    }
    videos = videos.children;

    getTotalTime(videos);
}
main();
setInterval(main, 15000);