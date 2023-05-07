var count = 0;

export const getDurationHeader = () => {
    count++;
    console.log(count)
    
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
    divHeader.style.margin = "5px 10px 0px 0px";
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
    durationWatched.title = "Watched / Unwatched (watched %)";
    durationWatched.innerHTML = "54:15 / 2:00:00 (20%)";


    durationHeader = document.getElementById('duration-header');
    durationHeader.appendChild(durationTotal);
    durationHeader.appendChild(durationWatched);

    return durationHeader
}