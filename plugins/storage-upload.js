export { match, main, upload, description }
const { findInfo, generateHeader } = await import(chrome.runtime.getURL("utilities/storage-utilities.js"));

const description = "Adds a file upload field to the browse menu.";

const match = [
    /^\/home(\/[^\ ]+)\/[^\ \.]*$/
];
function main(pathname){
    // const dirCount = 5-(window.location.pathname.match(/\//g) || []).length;
    // const dir = (dirCount > 1) ? 
    //     [document.querySelector('img[alt="[DIR]"]').parentElement.parentElement.children[1].firstChild.textContent.slice(0,-1)] : 
    //     window.location.href.split('/').slice(5);

    const uploadFile = document.createElement('input');
    uploadFile.type = 'file';
    uploadFile.name = 'UploadFile';
    uploadFile.textContent = "Upload here";
    uploadFile.onchange = () => {
        (async () => {
            await upload(uploadFile.files[0], uploadFile.files[0].name);

            window.location.reload();
        })();
    };
    
    document.body.insertBefore(uploadFile, document.body.children[1]);
    const helpText = document.createElement('p');
    helpText.textContent = "Upload here:";
    document.body.insertBefore(helpText, document.body.children[1]);
}

async function upload(file, filename, userData){
    const dirCount = 5-(window.location.pathname.match(/\//g) || []).length;
    const dir = (dirCount > 1) ? 
        [document.querySelector('img[alt="[DIR]"]').parentElement.parentElement.children[1].firstChild.textContent.slice(0,-1)] : 
        window.location.href.split('/').slice(5);

    const boundary = "----WebKitFormBoundary";
    const data = userData || await findInfo();
    const fname = "../".repeat(dirCount)+filename; 

    const form = new FormData();
    form.append("Nome", data.email);
    form.append("Projecto", dir[0]);
    form.append("submit", "Upload");
    form.append("UploadFile", file, fname);

    await fetch("http://fitteia-t.vps.tecnico.ulisboa.pt/cgi-bin/upload1", {
        "headers": generateHeader(boundary),
        "referrer": "http://fitteia-t.vps.tecnico.ulisboa.pt/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": form,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
}