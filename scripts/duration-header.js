var count = 0;

export const updateDuration = () => {
    console.log("updateDuration called " + count++ + " times");

    let { watchedList, remainingList } = getVideoTimeList();
    let { watchedTs, remainingTs, totalTs, watchedPercent } = calculateTotalTime(watchedList, remainingList);
    
    if (document.getElementById('duration-header') === null)
        createUI();

    updateUI(watchedTs, remainingTs, totalTs, watchedPercent);
}

const createUI = () => {
    const headerContents = document.querySelector("#page-manager #playlist #header-contents")

    // Create duration header div
    let divDurationHeader = document.createElement("div");
    divDurationHeader.id = "duration-header";
    divDurationHeader.className = "duration-block";
    headerContents.appendChild(divDurationHeader);

    // Create duration-total span, copy from template
    let durationTotal = document.createElement('span');
    durationTotal.id = 'duration-total';
    durationTotal.className = 'duration-details';
    durationTotal.title = "Total playlist duration";
    durationTotal.innerHTML = "Playlist duration: &nbsp;2:54:15";

    // Create duration span
    let durationWatched = document.createElement('span');
    durationWatched.id = 'duration-watched';
    durationWatched.className = 'duration-details';
    durationWatched.title = "Watched / Remaining (watched %)";
    durationWatched.innerHTML = "54:15 / 2:00:00 (20%)";

    // Append duration span to duration header
    let durationHeader = document.getElementById('duration-header');
    durationHeader.appendChild(durationTotal);
    durationHeader.appendChild(durationWatched);
}

export const getVideoTimeList = () => {
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
    let watchedPercent = Math.round(watchedSeconds / totalSeconds * 100);

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

        totalSeconds += seconds;
        totalSeconds += minutes * 60;
        totalSeconds += hours * 60 * 60;
    }

    return totalSeconds;
}

const secondsToTs = (seconds) => {
    let totalHours = Math.floor(seconds / 3600);
    let totalMinutes = Math.floor((seconds - totalHours * 3600) / 60);
    let totalSecondsLeft = seconds - totalHours * 3600 - totalMinutes * 60;

    let zeroPad = (val) => val < 10 ? "0" + val : val;
    let result;

    if (totalHours == 0)
        result = totalMinutes + ":" + zeroPad(totalSecondsLeft);
    else
        result = totalHours + ":" + zeroPad(totalMinutes) + ":" + zeroPad(totalSecondsLeft);
        
    return result;
}

const updateUI = (watchedTs, remainingTs, totalTs, watchedPercent) => {
    let durationTotal = document.getElementById('duration-total');
    let durationWatched = document.getElementById('duration-watched');

    durationTotal.innerHTML = "Playlist duration: " + totalTs;
    durationWatched.innerHTML = watchedTs + " / " + remainingTs + " (" + watchedPercent + "%)";
}