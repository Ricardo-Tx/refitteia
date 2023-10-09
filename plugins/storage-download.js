export { match, main, description }

const description = "Adds a download button 💾 to the files in the browse menu.";

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

        const btnDownload = document.createElement('button');
        btnDownload.className = "browse-button";
        btnDownload.textContent = "💾";
        // btnDownload.style.backgroundColor = "Transparent";
        // btnDownload.style.width = "30px";
        // btnDownload.style.height = "20px";

        btnDownload.onclick = () => {
            (async () => {
                const link = tr.children[1].firstChild.href;
                const res = await fetch(link);
                const newBlob = new Blob([await res.blob()]);
        
                const blobUrl = window.URL.createObjectURL(newBlob);
        
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.setAttribute('download', tr.children[1].firstChild.textContent);
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.parentNode.removeChild(downloadLink);
        
                // clean up Url
                window.URL.revokeObjectURL(blobUrl);
            })();
        }

        tr.children[4].appendChild(btnDownload);
    }
}

async function download(){

}