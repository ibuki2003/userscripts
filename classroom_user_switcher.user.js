// ==UserScript==
// @name         classroom redirect user
// @namespace    https://fuwa.dev
// @version      0.1
// @description  try to take over the world!
// @author       Fuwa
// @match        https://classroom.google.com/u/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const target_user_num = 1;

    const result = location.href.match(/com\/u\/(\d+)\/(.*)(authuser=\d+)?/);
    console.log(result);

    if(result) {
        if(result[3])return;
        if(Number.parseInt(result[1]) == target_user_num)return;
        location.href = `https://classroom.google.com/u/${target_user_num}/${result[2]}`;
        //console.log(`https://classroom.google.com/u/${target_user_num}/${result[2]}`);
    }
})();
