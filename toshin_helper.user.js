// ==UserScript==
// @name         Toshin POS Improve
// @namespace    https://fuwa.dev/
// @version      0.1
// @description  How could you make such a stressful website, Nagase Bros Inc?
// @author       ibuki2003
// @match        https://*.toshin.com/*
// @icon         https://www.google.com/s2/favicons?domain=toshin.com
// @grant        none
// ==/UserScript==

(async function() {
  'use strict';

  const USER_ID = '<Your ID>';
  const USER_PASS = '<Your Password>';


  replace_alert();

  await auto_login();


  function replace_alert() {
    window.alert = function(...args) {
      console.log("alert: ", args);
    }
  }

  async function auto_login() {
    if (location.href === 'https://www.toshin.com/pos/') {
        location.href = 'https://pos.toshin.com/SSO1/SSOLogin/StudentLogin.aspx';
        return;
    }

    let dest = '/SSO1/SSOMenu/StudentMenu.aspx';

    const match = location.search.match(/\?aspxerrorpath=(.+)$/);
    if (match) {
      // do nothing
    } else if (![
      '/sso1/ssologin/studentlogin.aspx',
      '/sso1/ssomenu/sessionerror.html',
      '/',
    ].includes(location.pathname.toLowerCase())) {
        console.log(location.pathname.toLowerCase());
        return;
    }

    await login();

    location.href = 'https://pos.toshin.com' + dest;
  }

  async function login() {
    const loginForm = await (await fetch("https://pos.toshin.com/SSO1/SSOLogin/StudentLogin.aspx")).text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(loginForm, "text/html");


    let formData = new FormData();
    formData.append('txtUserID', USER_ID);
    formData.append('txtPassword', USER_PASS);
    formData.append('btnLogin', 'Login');
    formData.append('__VIEWSTATE', doc.getElementById('__VIEWSTATE').value);
    formData.append('__VIEWSTATEGENERATOR', doc.getElementById('__VIEWSTATEGENERATOR').value);
    formData.append('__EVENTVALIDATION', doc.getElementById('__EVENTVALIDATION').value);

    for (const d of formData.entries()) {
      console.log(`${d[0]}: ${d[1]}`);
    }


    const r = await fetch("https://pos.toshin.com/SSO1/SSOLogin/StudentLogin.aspx", {
      "headers": {
        "accept-language": "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
      },
      "referrer": "https://pos.toshin.com/SSO1/SSOLogin/StudentLogin.aspx",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": formData,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    console.log(r);
  }
})();
