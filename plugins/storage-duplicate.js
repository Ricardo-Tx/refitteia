export { match, main, description }
const { upload } = await import(chrome.runtime.getURL("plugins/storage-upload.js"));

const description = "Adds a duplicate button 📑 to the files in the browse menu.";

const match = [
    /^\/home(\/[^\ ]+)\/[^\ \.]*$/
];
function main(pathname){
    for(const tr of document.querySelector('tbody').children){
        if(tr.childElementCount < 4 || tr.firstChild.tagName == "TH" || tr.children[1].firstChild.textContent == "Parent Directory"){
            continue;
        }

        if(tr.children[3].textContent == "  - "){
            continue;
        }

        const btnDuplicate = document.createElement('button');
        btnDuplicate.className = "browse-button";
        btnDuplicate.textContent = "📑";

        // btnDuplicate.style.backgroundColor = "Transparent";
        // btnDuplicate.style.width = "30px";
        // btnDuplicate.style.height = "20px";

        btnDuplicate.onclick = () => {
            (async () => {
                const link = tr.children[1].firstChild.href;
                const res = await fetch(link);
                const newBlob = new Blob([await res.blob()]);
                const baseName = tr.children[1].firstChild.textContent;
                const newName = baseName.split('.').slice(0,-1).join('.')+"_copy."+baseName.split('.').pop();

                await upload(newBlob, newName);
    
                window.location.reload();
            })();
        }

        tr.children[4].appendChild(btnDuplicate);
    }
}