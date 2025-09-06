let state = "ON"

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: state,
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getState") {
        sendResponse(state);
    } 

    if (request.action === "toggleState") {
        state = state === "ON" ? "OFF" : "ON";
        chrome.action.setBadgeText({
            text: state,
        });
        sendResponse(state)
    }
});

