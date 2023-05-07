export const getVideoTimeList = () => {
    let videos = document.querySelector("#page-manager #playlist #items").children

    let timeList = [];

    // a for loop to loop through the videos list and pass to getVideoTime, then store each result in allTimes as list of string
    for (let i = 0; i < videos.length; i++) 
        timeList[i] = getVideoTime(videos[i]);
    // console.log(timeList);
    return timeList;
}

const getVideoTime = (video) => {
    // console.log(video);
    // console.log(video.querySelector("#text"));
    let videoTimeElement = video.querySelector("#text");

    if (videoTimeElement == null || videoTimeElement.innerText == '') {
        return ("00:00");
    }
    else {
        return (videoTimeElement.innerText.trim());
    }
}

