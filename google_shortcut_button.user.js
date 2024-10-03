// ==UserScript==
// @name           Google Search shortcut
// @namespace      http://fuwa.dev/
// @description    show lr/tbs btns
// @include        http://*.google.*/search?*
// @include        https://*.google.*/search?*
// @grant          GM_addStyle
// @version        0.0.1
// @license MIT
// ==/UserScript==

(function() {

  GM_addStyle(`
  #search_btns_container {
    border: 1px solid #333;
    border-radius: .5em;
    padding: 1em;
  }
  #search_btns_container a {
    color: inherit;
    border: 1px solid #333;
    border-radius: 0.5em;
    margin: 0.2em;
    padding: 0.4em;
  }
  #search_btns_container a.search_btn_active {
    font-weight: bold;
    background: rgba(255 255 255 / 0.2);;
  }
  `);



  function get_replaced_href(key, value) {
    const p = new URLSearchParams(location.search);
    p.set(key, value);
    return location.origin + location.pathname + '?' + p.toString();
  }

  const entries = {
    'lr': {'ja': 'lang_ja', 'en': 'lang_en', 'all': ''},
    'tbs': {
      'all': '',
      '1h': 'qdr:h',
      '1d': 'qdr:d',
      '1w': 'qdr:w',
      '1m': 'qdr:m',
      '3m': 'qdr:m3',
      '6m': 'qdr:m6',
      '1y': 'qdr:y',
      '3y': 'qdr:y3',
    },
  };

  console.log(location.search);
  if( location.search.indexOf("tbm=") == -1 ){

    const cent = document.getElementById('center_col');
    let targ = cent.nextSibling;
    if (targ === null) {
      targ = document.createElement("div");
      cent.parentNode.appendChild(targ);
    }

    const newDiv = document.createElement("div");
    newDiv.id = 'search_btns_container';

    for (const key in entries) {
      const row = document.createElement('p');
      const current_value = new URLSearchParams(location.search).get(key);
      for (const s in entries[key]) {
        const l = document.createElement('a');
        l.innerText = s;
        l.href = get_replaced_href(key, entries[key][s]);
        if (current_value === entries[key][s]) l.classList.add('search_btn_active');
        row.appendChild(l);
      }
      newDiv.appendChild(row);
    }
    targ.insertBefore(newDiv, targ.firstChild);
  }

})();

