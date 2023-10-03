(async () => {
    const template = document.querySelector('tr');

    for(const file of chrome.runtime.getManifest().web_accessible_resources[0].resources){
        if(!file.startsWith("plugin")){
            continue;
        }

        const table = document.querySelector('table');
        const instance = template.cloneNode(true);
        instance.style.display = "";
        const filename = file.split('/').pop().slice(0, -3);
        instance.children[1].children[0].textContent = filename+".js";

        const { description, options } = await import(chrome.runtime.getURL(file));
        if(description){
            instance.children[1].children[3].textContent = description;
        }

        const checkbox = instance.children[0].children[0];
        const sel = instance.children[1].children[1];

        let result = await chrome.storage.local.get([filename]);
        if(result === null){
            obj = {};
            obj[filename] = options ? options[1] : true;
            await chrome.storage.local.set(obj);
            result = obj;
        }
        if(result[filename] === false){
            checkbox.removeAttribute('checked');
        }
        // else if(result[filename] !== true){
        // }
        
        if(options){
            sel.style.display = checkbox.checked ? "" : "none";
            for(const opt of options){
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                sel.appendChild(option);
            }
            sel.value = result[filename];
        }

        // if(result[filename] === false){
        //     checkbox.removeAttribute('checked');

        // }

        if(options){
            sel.onchange = () => {
                (async () => {
                    obj = {};
                    obj[filename] = sel.options[sel.selectedIndex].value;
                    await chrome.storage.local.set(obj);
                    
                    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
                    await chrome.tabs.sendMessage(tab.id, obj);
                })();
            };
        }

        // const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        // await chrome.tabs.sendMessage(tab.id, result[filename]);
        checkbox.onchange = () => {
            (async () => {
                if(options){
                    sel.style.display = checkbox.checked ? "" : "none";
                    if(checkbox.checked){
                        sel.value = options[0];
                    }
                }

                obj = {};
                obj[filename] = options ? (checkbox.checked ? sel.value : false) : checkbox.checked;
                await chrome.storage.local.set(obj);
                
                // const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
                // await chrome.tabs.sendMessage(tab.id, obj);
            })();
        };

        table.appendChild(instance);
    }

    template.remove();
})();

// document.querySelector('button').onclick = () => {
//     (async () => {
//         const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//         await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
//     })();
// };