export { match, main, del, description }
const { findInfo, generateHeader } = await import(chrome.runtime.getURL("utilities/storage-utilities.js"));

const description = "Adds a delete button 🗑️ to the files and folders in the browse menu.";

const match = [
    /^\/home(\/[^\ ]+)\/[^\ \.]*$/
];
function main(pathname){
    for(const tr of document.querySelector('tbody').children){
        if(tr.childElementCount < 4 || tr.firstChild.tagName == "TH" || tr.children[1].firstChild.textContent == "Parent Directory"){
            continue;
        }
    
        const btnDelete = document.createElement('button');
        btnDelete.className = "browse-button";
        btnDelete.textContent = "🗑️";
        // btnDelete.style.backgroundColor = "Transparent";
        // btnDelete.style.width = "30px";
        // btnDelete.style.height = "20px";

        btnDelete.onclick = () => {
            const dirCount = 7-(window.location.href.match(/\//g) || []).length;
            const dir = (dirCount > 1) ? [document.querySelector('img[alt="[DIR]"]').parentElement.parentElement.children[1].firstChild.textContent.slice(0,-1)] : window.location.href.split('/').slice(5);    

            (async () => {
                // const boundary = "----WebKitFormBoundary";
                // //const dir = tr.children[1].firstChild.href.split('/').slice(5);
                // const data = await findInfo();
                // const filename = (dirCount > 1) ? "../"+tr.children[1].firstChild.href.split('/').pop() : tr.children[1].firstChild.href.split('/').slice(6).join('/'); 
                // console.log(filename);

                // const form = new FormData();
                // form.append("ShareEmail", "");
                // // form.append("Selected", './'+dir.slice(1).join('/'));
                // form.append("Selected", './'+filename);
                // form.append("Email", data.email);
                // form.append("Projecto", dir[0]);
                // form.append("Link", data.number);
                // form.append("continue", "Delete Selected");
                // form.append(".cgifields", "Selected");

                // await fetch("https://fitteia-t.vps.tecnico.ulisboa.pt/cgi-bin/login", {
                //     "headers": generateHeader(boundary),
                //     "referrer": "http://fitteia-t.vps.tecnico.ulisboa.pt/",
                //     "referrerPolicy": "strict-origin-when-cross-origin",
                //     "body": form,
                //     "method": "POST",
                //     "mode": "cors",
                //     "credentials": "omit"
                // });
                await del(tr.children[1].firstChild.textContent);

                window.location.reload();
            })();
        }

        tr.children[4].appendChild(btnDelete);
    }
}

async function del(filename){
    const dirCount = 5-(window.location.pathname.match(/\//g) || []).length;
    const dir = (dirCount > 1) ? [document.querySelector('img[alt="[DIR]"]').parentElement.parentElement.children[1].firstChild.textContent.slice(0,-1)] : window.location.pathname.split('/').slice(3);    

    const boundary = "----WebKitFormBoundary";
    const data = await findInfo();
    let fname = ((dirCount > 1) ? "../" : "./"+window.location.pathname.split('/').slice(4).join('/'))+filename;
    if(fname.endsWith('/')){
        fname = fname.slice(0,-1);
    }

    const form = new FormData();
    form.append("ShareEmail", "");
    form.append("Selected", fname);
    form.append("Email", data.email);
    form.append("Projecto", dir[0]);
    form.append("Link", data.number);
    form.append("continue", "Delete Selected");
    form.append(".cgifields", "Selected");

    await fetch("https://fitteia-t.vps.tecnico.ulisboa.pt/cgi-bin/login", {
        "headers": generateHeader(boundary),
        "referrer": "http://fitteia-t.vps.tecnico.ulisboa.pt/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": form,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
}