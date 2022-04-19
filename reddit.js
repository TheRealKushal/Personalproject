// ==UserScript==
// @id           RedditAutoNightMode
// @name         Reddit - Auto Night Mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  At start of page loading, the script basically checks the presense of the user preferences cookie. If it exists, it'll then check the Night Mode setting. If it's disabled or doesn't exist yet, the script will enable it, update the cookie, then reload the page.
// @author       jcunews1
// @match        http://www.reddit.com/*
// @run-at       document-start
// ==/UserScript==

((m, z) => {
  if ((m = document.cookie.match(/(?:; |^)USER=([^;]+)/i)) && !sessionStorage.nightModeForced) {
    try {
      m = JSON.parse(atob(m[1]));
    } catch(z) {}
    z = m.prefs = m.prefs || {};
    if (!z.nightmode) {
      z.nightmode = true;
      document.cookie = "USER=" + btoa(JSON.stringify(m)) + "; path=/; domain=.reddit.com; max-age=63072000"
      location.reload();
    }
    sessionStorage.nightModeForced = true;
  }
})()
