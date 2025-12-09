console.log("start")


chrome.runtime.sendMessage({ action: "getState" }).then(
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
    let activityTimer = null;

    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('paste', e => e.preventDefault());
    document.addEventListener('contextmenu', e => e.preventDefault());

    document.addEventListener('keydown', e => {
        preventAccessToText(e)
        blankScreen()
    });
    document.addEventListener('mousemove', blankScreen);
    document.addEventListener('click', blankScreen);
    document.addEventListener('touchstart', blankScreen);
    document.addEventListener('scroll', blankScreen);
    document.body.style.userSelect = "none";

    window.addEventListener('beforeprint', restoreVisible);


    function blankScreen() {
        if (activityTimer) clearTimeout(activityTimer);
        applyProtectiveStyle();
        activityTimer = setTimeout(restoreVisible, 3000);
    }

    function restoreVisible() {
        document.querySelectorAll('*').forEach((element) => {
            if (element !== 'body') {
                element.style.opacity = 1;
            }
        });
        if (activityTimer) clearTimeout(activityTimer);
    }

    function applyProtectiveStyle() {
        document.querySelectorAll('*').forEach(element => {
            if (element.textContent && element.textContent.trim() !== '') {
                element.style.opacity = 0;
            }
        });
    }

    function preventAccessToText(e) {
        let ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && e.key === 's') {
            e.preventDefault();
        }
        if (ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
        }
        if (e.key === 'PrintScreen') {
            e.preventDefault();
        }
        if (ctrlKey && e.key === 'u') {
            e.preventDefault();
        }
        if (e.key === 'F12') {
            e.preventDefault();
        }
        if (ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
        }
        if (ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
        }
    }
}

