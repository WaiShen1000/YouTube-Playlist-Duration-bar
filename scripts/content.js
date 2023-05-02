let retryCount = 0;

const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))


function getVideos() {
    items = document.querySelectorAll('div#items[class="playlist-items style-scope ytd-playlist-panel-renderer"]');

    console.log("Trying : "+ retryCount);

    return items[1]
}


function getVideoTime(video) {
    // console.log(video);
    let videoTimeElement = video.querySelector("#text");
    if (videoTimeElement == null) {
        // console.log("videoTimeElement is null");
        return ("00:00");
    }
    else {
        return (videoTimeElement.innerText.trim());
    }
}

function getTotalTime(videos) {
    let timeList = [];

    // a for loop to loop through the videos list and pass to getVideoTime, then store each result in allTimes as list of string
    for (let i = 0; i < videos.length; i++) {
        timeList[i] = getVideoTime(videos[i]);
    }

    return timeList;
}

// function to calculate the total time of timeList
// allTimes = ["1:09:10", "6:09", "00:21" ...]
function calculateTotalTime(timeList) {
    let totalSeconds = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    for (let i = 0; i < timeList.length; i++) {
        let time = timeList[i].split(":");

        if (time.length == 3) {
            hours = parseInt(time[0]);
            minutes = parseInt(time[1]);
            seconds = parseInt(time[2]);
        } else if (time.length == 2) {
            hours = 0;
            minutes = parseInt(time[0]);
            seconds = parseInt(time[1]);
        }

        totalSeconds += seconds;
        totalSeconds += minutes * 60;
        totalSeconds += hours * 60 * 60;
    }

    let totalHours = Math.floor(totalSeconds / 3600);
    let totalMinutes = Math.floor((totalSeconds - totalHours * 3600) / 60);
    let totalSecondsLeft = totalSeconds - totalHours * 3600 - totalMinutes * 60;

    let zeroPad = (val) => val < 10 ? "0" + val : val;
    return (totalHours + ":" + zeroPad(totalMinutes) + ":" + zeroPad(totalSecondsLeft));
}

function insert(totalTime) {
    let span = document.createElement('h1');
    span.className = 'totalTime';
    span.id = 'totalTime';
    span.textContent = "Playlist total : " + totalTime;
    span.style.color = 'white';

    // let div = document.querySelectorAll("#publisher-container > div > yt-formatted-string")
    // let pending = document.querySelectorAll("#publisher-container > div > span")
    let right = document.querySelectorAll("#secondary");
    let below = document.querySelectorAll("#below");

    const totalTimeSpan = document.getElementById("totalTime");
    if (totalTimeSpan != null)
        totalTimeSpan.remove();

    // for (const d of div)
    //     d.appendChild(span);
    
    // for (const s of pending)
    //     s.appendChild(span);
    
    for (const w of right)
        w.insertBefore(span, w.childNodes[0]);
    
    for (const b of below)
        b.insertBefore(span, b.childNodes[0]);
}



function main() {
    let videos = undefined;
    retryCount++;
    videos = getVideos();

    if (videos == undefined && videos.length == 0) {
        console.log("List not found");
        return;
    }

    videos = videos.children;
    console.log(videos);

    let timeList = getTotalTime(videos);
    console.log(timeList);

    let totalTime = calculateTotalTime(timeList);
    console.log(totalTime);

    insert(totalTime);
}

setInterval(main, 5000);

