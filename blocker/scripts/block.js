console.log("start")

chrome.runtime.sendMessage({action: "getState"}).then(
    (state) => {
        if (state === "ON") {
            block()
            console.log("block")
        }
        else {
            console.log("unblock");
        }
    });

function block() {
    document.addEventListener('cut', e => e.preventDefault(), true);
    document.addEventListener('copy', e => e.preventDefault(), true);
    document.addEventListener('paste', e => e.preventDefault(), true);
    document.body.style.userSelect = "none";
}