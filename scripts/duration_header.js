var count = 0;

export const updateDuration = () => {
    let { watchedList, remainingList } = getVideoTimeList();
    let { watchedTs, remainingTs, totalTs, watchedPercent } = calculateTotalTime(watchedList, remainingList);
    console.log(watchedTs, remainingTs, totalTs, watchedPercent);
    let durationHeader = getDurationHeader();
    updateUI(watchedTs, remainingTs, totalTs, watchedPercent);
}

export const getDurationHeader = () => {
    console.log(++count);
    
    // Try get duration header
    let durationHeader = document.getElementById('duration-header');

    // If duration header doesn't exist, create it
    if (durationHeader === null) 
        return createUI(durationHeader);
    else
        return durationHeader;
}

const createUI = (durationHeader) => {
    const topHeader = document.querySelector("#page-manager #playlist #header-top-row")

    // Create duration header div
    let divHeader = document.createElement("div");
    divHeader.id = "duration-header";
    divHeader.style.margin = "10px 10px 0px 0px";
    divHeader.style.border = "1px solid #555";
    divHeader.style.borderRadius = "10px";
    divHeader.style.backgroundColor = "rgba(211, 211, 211, 0.1)";
    topHeader.insertAdjacentElement('afterend', divHeader);

    // Create duration header content template
    let durationHeaderContentTemplate = document.createElement('span');
    durationHeaderContentTemplate.innerHTML = "Total";
    durationHeaderContentTemplate.style.color = 'white';
    durationHeaderContentTemplate.style.margin = "5px 15px 5px 5px";
    durationHeaderContentTemplate.style.color = "#b3b3b3";
    durationHeaderContentTemplate.style.fontSize = "1.75em";
    durationHeaderContentTemplate.style.display = "block";
    durationHeaderContentTemplate.style.fontWeight = "bold";
    durationHeaderContentTemplate.style.textAlign = "center";

    // Create duration-total span, copy from template
    let durationTotal = durationHeaderContentTemplate.cloneNode(true);
    durationTotal.id = 'duration-total';
    durationTotal.title = "Total playlist duration";
    durationTotal.innerHTML = "Playlist duration: &nbsp;2:54:15";

    // Create duration span, copy from template
    let durationWatched = durationHeaderContentTemplate.cloneNode(true);
    durationWatched.id = 'duration-watched';
    durationWatched.title = "Watched / Remaining (watched %)";
    durationWatched.innerHTML = "54:15 / 2:00:00 (20%)";


    durationHeader = document.getElementById('duration-header');
    durationHeader.appendChild(durationTotal);
    durationHeader.appendChild(durationWatched);

    return durationHeader
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
    console.log(watchedSeconds, remainingSeconds, totalSeconds);

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