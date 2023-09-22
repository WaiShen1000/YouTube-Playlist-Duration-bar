let permissionNeeded = {
    origins: ["*://www.youtube.com/*"],
};

document.addEventListener('DOMContentLoaded', function () {
    var grantButton = document.getElementById('grantButton');

    grantButton.addEventListener('click', function () {
        chrome.permissions.request(permissionNeeded);
    });

    chrome.permissions.contains(permissionNeeded, function (granted) {
        // The callback argument will be true if the user granted the permissions.
        if (granted) {
            grantButton.disabled = true;
            grantButton.innerText = "Granted";
        }
    });
});