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
    chrome.runtime.sendMessage({action: "getState"})
        .then(
            state => {
                console.log(state)
                if (state === "ON") {
                    ON()
                }
                else {
                    OFF()
                }
            }
        );


    const subbtn = document.getElementById("submit");
    subbtn.onclick = () => {
        const pswd = document.getElementById("password").value;
        console.log(pswd);
        window.crypto.subtle.digest("SHA-512", new TextEncoder().encode(pswd))
            .then(res => new Uint8Array(res).toBase64())
            .then(pswd_hash => {
                if (pswd_hash !== "1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==") {
                    return
                }
                chrome.runtime.sendMessage({action: "toggleState"})
                    .then(
                        state => OFF()
                    );
            })
    }

    const onbtn = document.getElementById("buttonON")
    onbtn.onclick = () => {
        chrome.runtime.sendMessage({action: "toggleState"})
            .then(
                state => ON()
            );
    }
}
