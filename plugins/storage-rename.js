export { match, main, description }
const { upload } = await import(chrome.runtime.getURL("plugins/storage-upload.js"));
const { del } = await import(chrome.runtime.getURL("plugins/storage-delete.js"));
const { findInfo } = await import(chrome.runtime.getURL("storage-utilities.js"));

const description = "Adds a rename button ✏️ to the files in the browse menu.";


const match = [
    /^\/home\/.+/
];
function main(pathname){
    for(const tr of document.querySelector('tbody').children){
        if(tr.childElementCount < 4 || tr.firstChild.tagName == "TH" || tr.children[1].firstChild.textContent == "Parent Directory"){
            continue;
        }

        if(tr.children[3].textContent == "  - "){
            continue;
        }

        const btnRename = document.createElement('button');
        btnRename.style.backgroundColor = "Transparent";
        btnRename.style.width = "30px";
        btnRename.style.height = "20px";
        btnRename.textContent = "✏️";

        btnRename.onclick = () => {
            const found = document.querySelector('input[type="text"]');
            if(found){
                found.parentElement.children[2].style.display = "";
                const eq = tr == found.parentElement;
                found.remove();
                if(eq){
                    return;
                }
                // return;
            }
            const textBox = document.createElement('input');
            textBox.type = 'text';
            textBox.spellcheck = false;
            textBox.value = tr.children[1].textContent;
            textBox.onkeyup = e => {
                console.log(nameExists(textBox.value));
                if(e.key == "Enter" && !nameExists(textBox.value)){
                    (async () => {
                        const link = tr.children[2].firstChild.href;
                        const res = await fetch(link);
                        const newBlob = new Blob([await res.blob()]);

                        const data = await findInfo();

                        const uploadPromise = upload(newBlob, textBox.value, data);
                        const deletePromise = del(tr.children[2].firstChild.textContent, data);

                        await Promise.all([uploadPromise, deletePromise]);

                        window.location.reload();
                    })();
                }
            }
            tr.insertBefore(textBox, tr.children[1]);
            textBox.focus();
            tr.children[2].style.display = 'none';
        }

        tr.children[4].appendChild(btnRename);
    }
}

function nameExists(name){
    for(const tr of document.querySelector('tbody').children){
        if(tr.childElementCount < 4 || tr.firstChild.tagName == "TH"){
            continue;
        }

        if(tr.children[3].textContent == "  - "){
            continue;
        }

        if(name == tr.children[2].textContent || name == tr.children[1].textContent){
            return true;
        }        
    }
    return false;
}