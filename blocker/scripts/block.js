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

    let activityTimer = null;
    let originalColors = new Map();

    function blankScreen() {
        if (activityTimer) clearTimeout(activityTimer);
        if (originalColors.size === 0) saveOriginalColors();
        applyProtectiveStyle();
        activityTimer = setTimeout(restoreOriginalColors, 5000);
    }

    function saveOriginalColors() {
        const bodyStyle = getComputedStyle(document.body);
        originalColors.set('body', {
            color: bodyStyle.color,
            backgroundColor: bodyStyle.backgroundColor
        });

        document.querySelectorAll('*').forEach(element => {
            if (element.textContent && element.textContent.trim() !== '') {
                const style = getComputedStyle(element);
                originalColors.set(element, {
                    color: style.color,
                    backgroundColor: style.backgroundColor
                });
            }
        });
    }

    function restoreOriginalColors() {
        originalColors.forEach((colors, element) => {
            if (element !== 'body') {
                element.style.opacity = 1;
                // document.body.style.color = colors.color;
                // document.body.style.backgroundColor = colors.backgroundColor;
            } else {
                // element.style.color = colors.color;
                // element.style.backgroundColor = colors.backgroundColor;
                
            }
        });
        if (activityTimer) clearTimeout(activityTimer);
    }

    function applyProtectiveStyle() {
        document.querySelectorAll('*').forEach(element => {
            if (element.textContent && element.textContent.trim() !== '') {
                // element.style.color = element.style.backgroundColor;
                element.style.opacity = 0;
            }
        });
        console.log("protected")
    }

    function preventAccessToText(e) {
        let ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && e.key === 'p') {
            restoreOriginalColors()
            return
        }
        if (ctrlKey && e.key === 's') {
            e.preventDefault();
            return
        }
        if (ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            return
        }
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            return
        }
        if (ctrlKey && e.key === 'u') {
            e.preventDefault();
            return
        }
        if (e.key === 'F12') {
            e.preventDefault();
            return
        }
        if (ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return
        }
        if (ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return
        }
    }
}

