//interface

function ON() {
    const on = document.getElementById("ON");
    const off = document.getElementById("OFF");
    on.classList.remove(["hide"])
    off.classList.add(["hide"])
}

function OFF() {
    const on = document.getElementById("ON");
    const off = document.getElementById("OFF");
    on.classList.add(["hide"])
    off.classList.remove(["hide"])
}

window.onload = () => {
    chrome.runtime.sendMessage({action: "getState"}).then(
            state => {
                if (state === "ON") {
                    ON()
                }
                else {
                    OFF()
                }
            }
        );


    const subbtn = document.getElementById("submit");
    const pswd = document.getElementById("password") 
    subbtn.onclick = () => {
        if (pswd.value !== "1234") {
            return
        }
        chrome.runtime.sendMessage({action: "toggleState"}).then(
            state => OFF()
        );
    }

    const onbtn = document.getElementById("buttonON")
    onbtn.onclick = () => {
        chrome.runtime.sendMessage({action: "toggleState"}).then(
            state => ON()
        );
    }
}

