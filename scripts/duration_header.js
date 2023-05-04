export const getDurationHeader = () => {
    console.log("getDurationHeader runned")
    let durationHeader = document.querySelector('#duration-header');

    console.log(durationHeader)
    
    if (durationHeader === null) {
        const topHeader = document.querySelector("#page-manager #playlist #header-top-row")

        let divHeader = document.createElement("div");
        divHeader.id = "duration-header";
        divHeader.style.margin = "5px 0px 0px 5px";
        topHeader.insertAdjacentElement('afterend', divHeader);

        durationHeader = document.querySelector('#duration-header');

        let durationTotal = document.createElement('h3');
        durationTotal.id = 'duration-total';
        durationTotal.innerHTML = "Total";
        durationTotal.style.color = 'white';

        let durationCurrent = document.createElement('h3');
        durationCurrent.id = 'duration-current';
        durationCurrent.innerHTML = "Current";
        durationCurrent.style.color = 'white';

        durationHeader.appendChild(durationTotal);
        durationHeader.appendChild(durationCurrent);
    }

    return durationHeader;
}
