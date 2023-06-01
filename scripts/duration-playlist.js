let theme;

export const updateDurationPlaylist = () => {
    if (theme === undefined)
        theme = checkTheme();

    let { count, fullList } = getVideoTimeList();
    let totalSeconds = timeListToSeconds(fullList);

    let totalTs = secondsToTs(totalSeconds);

    // console.log('fullList === ', fullList);
    // console.log('video counted === ', count);
    // console.log('totalTs === ', totalTs);
}

const checkTheme = () => {
    return (document.querySelector("[dark]")) ? ("dark") : ("light");
}

const getVideoTimeList = () => {
    let videos = document.querySelector('#page-manager [page-subtype="playlist"] #contents #contents #contents').children
    let ts = "";
    let count = '';
    let fullList = [];

    for (const video of videos) {
        let videoTimeElement = video.querySelector("#text");

        if (videoTimeElement == null || videoTimeElement.innerText == '') {
            ts = "00:00";
        }
        else {
            ts = videoTimeElement.innerText.trim();
        }
        fullList.push(ts);
        count++;
    }
    return { count, fullList };
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