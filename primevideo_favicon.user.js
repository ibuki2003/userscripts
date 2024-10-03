// ==UserScript==
// @name         Amazon Prime Video favicon changer
// @namespace    https://fuwa.dev
// @version      0.1
// @description  identify prime video tab by favicon
// @author       fuwa
// @match        https://www.amazon.co.jp/gp/video/*
// @match        https://www.amazon.co.jp/Amazon-Video/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    let a=document.createElement("link");
    a.setAttribute("type", "image/jpeg");
    a.setAttribute("rel", "icon");
    a.setAttribute("href","https://fuwa.dev/prime_icon.png");
    document.head.appendChild(a);
}, false);
