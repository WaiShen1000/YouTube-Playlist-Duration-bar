let count = 0;
let theme;

let divDurationBlock;
let divDurationProgress;
let divTotalBlock;
let durationTotal;
let divCurrentBlock;
let durationWatched;
let durationPercent;
let durationRemaining;

export const updateDurationPlaying = () => {
    // console.log("updateDuration called " + count++ + " times");
    console.log(getNumberOfVideo())
    if (theme === undefined)
        theme = checkTheme();

    let { watchedList, remainingList } = getVideoTimeList();
    let { watchedTs, remainingTs, totalTs, watchedPercent } = calculateTotalTime(watchedList, remainingList);

    if (document.getElementById('duration-block') === null) {
        createUiELement();
        appendUiElement();
    }

    updateUI(watchedTs, remainingTs, totalTs, watchedPercent);
}

const createUiELement = () => {
    // <div Outer duration block
    divDurationBlock = document.createElement("div");
    divDurationBlock.setAttribute(theme, "");
    divDurationBlock.id = "duration-block";
    divDurationBlock.className = "duration-block";

    // <div> Progress bar
    divDurationProgress = document.createElement("div");
    divDurationProgress.setAttribute(theme, "");
    divDurationProgress.id = "duration-progress";
    divDurationProgress.className = "duration-progress";

    // <div> Inner total block
    divTotalBlock = document.createElement("div");
    divTotalBlock.id = "total-block";
    divTotalBlock.style.display = "flex";
    // divTotalBlock.className = "current-block";

    // <Span> Total: 
    durationTotal = document.createElement('span');
    durationTotal.setAttribute(theme, "");
    durationTotal.id = 'duration-total';
    durationTotal.className = 'duration-content';
    durationTotal.title = "Total playlist duration";

    // <div> Inner current block
    divCurrentBlock = document.createElement("div");
    divCurrentBlock.id = "current-block";
    divCurrentBlock.className = "current-block";

    // <Span> Watched time
    durationWatched = document.createElement('span');
    durationWatched.setAttribute(theme, "");
    durationWatched.id = 'duration-watched';
    durationWatched.className = 'current-content';
    durationWatched.title = "Time watched";

    // <Span> watched percent
    durationPercent = document.createElement('span');
    durationPercent.setAttribute(theme, "");
    durationPercent.id = 'duration-percent';
    durationPercent.className = 'current-content';
    durationPercent.title = "Watched %";

    // <Span> Remaining time
    durationRemaining = document.createElement('span');
    durationRemaining.setAttribute(theme, "");
    durationRemaining.id = 'duration-remaining';
    durationRemaining.className = 'current-content';
    durationRemaining.title = "Time remaining";
}

const appendUiElement = () => {
    // Append duration span to duration header
    const headerContents = document.querySelector("#page-manager #playlist #header-contents")
    headerContents.appendChild(divDurationBlock);

    divDurationBlock.appendChild(divDurationProgress);
    divDurationBlock.appendChild(divTotalBlock);
    divDurationBlock.appendChild(divCurrentBlock);

    divTotalBlock.appendChild(durationTotal);
    
    divCurrentBlock.appendChild(durationWatched);
    divCurrentBlock.appendChild(durationPercent);
    divCurrentBlock.appendChild(durationRemaining);
}

const checkTheme = () => {
    return (document.querySelector("[dark]")) ? ("dark") : ("light");
}

const getNumberOfVideo = () => {
    let current = document.querySelector("#page-manager #playlist #header-contents #publisher-container > div > yt-formatted-string > span:nth-child(1)").innerHTML
    let total = document.querySelector("#page-manager #playlist #header-contents #publisher-container > div > yt-formatted-string > span:nth-child(3)").innerHTML
    console.log(current)
    console.log(total)
    return [current, total]
}

const getVideoTimeList = () => {
    let videos = document.querySelector("#page-manager #playlist #items").children
    let ts = "";
    let isWatched = true;
    let watchedList = [];
    let remainingList = [];

    for (const video of videos) {
        if (isWatched == true && video.querySelector("#index").innerText === "▶")
            isWatched = false;

        let videoTimeElement = video.querySelector("#text");

        if (videoTimeElement == null || videoTimeElement.innerText == '') {
            ts = "00:00";
        }
        else {
            ts = videoTimeElement.innerText.trim();
        }

        if (isWatched)
            watchedList.push(ts);
        else
            remainingList.push(ts);
    }
    return { watchedList, remainingList };
}

const calculateTotalTime = (watchedList, remainingList) => {
    let watchedSeconds = timeListToSeconds(watchedList);
    let remainingSeconds = timeListToSeconds(remainingList);
    let totalSeconds = watchedSeconds + remainingSeconds;
    let watchedPercent = 0;
    if (totalSeconds > 0)
        watchedPercent = Math.round(watchedSeconds / totalSeconds * 100);

    let watchedTs = secondsToTs(watchedSeconds);
    let remainingTs = secondsToTs(remainingSeconds);
    let totalTs = secondsToTs(totalSeconds);

    return { watchedTs, remainingTs, totalTs, watchedPercent };
}

const timeListToSeconds = (timeList) => {
    let totalSeconds = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    for (const ts of timeList) {
        let time = ts.split(":");

        if (time.length == 3) {
            hours = parseInt(time[0]);
            minutes = parseInt(time[1]);
            seconds = parseInt(time[2]);
        } else if (time.length == 2) {
            hours = 0;
            minutes = parseInt(time[0]);
            seconds = parseInt(time[1]);
        }

        totalSeconds += seconds + (minutes * 60) + (hours * 60 * 60);
    }

    return totalSeconds;
}

const secondsToTs = (seconds) => {
    let totalHours = Math.floor(seconds / 3600);
    let totalMinutes = Math.floor((seconds - totalHours * 3600) / 60);
    let totalSecondsLeft = seconds - totalHours * 3600 - totalMinutes * 60;

    let zeroPad = (val) => (val < 10) ? ("0" + val) : (val);

    if (totalHours == 0)
        return totalMinutes + ":" + zeroPad(totalSecondsLeft);
    else
        return totalHours + ":" + zeroPad(totalMinutes) + ":" + zeroPad(totalSecondsLeft);
}

const updateUI = (watchedTs, remainingTs, totalTs, watchedPercent) => {
    durationTotal.innerHTML = "Total: " + totalTs;
    durationWatched.innerHTML = watchedTs;
    durationRemaining.innerHTML = remainingTs;
    durationPercent.innerHTML = watchedPercent + "%";
    divDurationProgress.style.width = watchedPercent + "%";
}