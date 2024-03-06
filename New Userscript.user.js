// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-06
// @description  
// @author       You
// @match        https://online.bloodontheclocktower.com/play
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bloodontheclocktower.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let volDiv = document.createElement("div")
    volDiv.style.height = "100dvh"
    volDiv.style.width = "100dvw"
    volDiv.style.position = "fixed"
    volDiv.style.top = 0
    volDiv.style.fontSize = "50dvh"
    volDiv.style.display = "flex"
    volDiv.style.justifyContent = "center"
    volDiv.style.alignItems = "center"
    volDiv.style.zIndex = 100
    volDiv.style.visibility = "hidden"
    volDiv.style.pointerEvents = "none"
    document.body.appendChild(volDiv)

    let currentTimeout

    document.addEventListener("wheel", (e) => {
    let els = e.target.parentElement.parentElement.querySelectorAll("div.audio")
    if (els.length == 1 && e.target.tagName == "svg" && e.target.classList[0] == "name") {
        let newVol = Math.round(100*(els[0].children[0].volume - Math.sign(e.deltaY) * 0.05))/100;
        (newVol <= 1 && newVol >= 0) ? els[0].children[0].volume = newVol : newVol = els[0].children[0].volume
        volDiv.innerHTML = Math.round(newVol*100)
        volDiv.style.visibility = "visible"
        clearTimeout(currentTimeout)
        currentTimeout = setTimeout(() => volDiv.style.visibility = "hidden", 1000)
        }
    })

})();