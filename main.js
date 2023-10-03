(async () => {
    // CSS
    // const style = document.createElement('style');
    // fetch(chrome.runtime.getURL("styles/dark-style.css")).then(res => {
    //     res.text().then(txt => {
    //         style.textContent = txt;
    //     });
    // });
    // document.querySelector('head').appendChild(style);

    // chrome.runtime.onMessage.addListener((msg, sender, response) => {
    //     console.log("MESSAGE: ", msg);
    // });

    // const link2 = document.createElement('link');
    // link2.rel = "stylesheet";
    // link2.type = "text/css";
    // link2.href = chrome.runtime.getURL("styles/tooltip.css");
    // document.head.appendChild(link2);

    const pathname = window.location.pathname;
    console.log("PATHNAME:", pathname);

    for(const file of chrome.runtime.getManifest().web_accessible_resources[0].resources){
        if(!file.startsWith("plugin")){
            continue;
        }

        const filename = file.split('/').pop().slice(0, -3);
        const result = await chrome.storage.local.get([filename]);
        if(result[filename] === false){
            continue;
        }

        const src = chrome.runtime.getURL(file);
        const { match, main } = await import(src);
        for(let i = 0; i < match.length; i++){
            const m = match[i];
            if(m instanceof RegExp && pathname.search(m) != -1){
                console.log("RUNNING:", file, "\nMATCH:", m);
                main(pathname, i);
                break;
            }
            else if(pathname === m){
                console.log("RUNNING:", file, "\nSTR EQUAL:", m);
                main(pathname, i);
                break;
            }
        }
    }

    console.log(chrome.browserAction);
})();