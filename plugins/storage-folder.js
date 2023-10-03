export { match, main, description }

const description = "Adds a size button 🔎 to the folders in the browse menu and a helpful label.";

const match = [
    /^\/home\/.+/
];
function main(pathname){
    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', "Content-Security-Policy");
    meta.setAttribute('content', "upgrade-insecure-requests");
    document.querySelector('head').appendChild(meta);

    let hasFolder = false;
    for(const tr of document.querySelector('tbody').children){
        if(tr.childElementCount < 4 || tr.firstChild.tagName == "TH" || tr.children[1].firstChild.textContent == "Parent Directory"){
            continue;
        }

        if(tr.children[3].textContent != "  - "){
            continue;
        }

        // tr.setAttribute('class', "tooltip-container");
        // const tooltip = document.createElement('p');
        // tooltip.textContent = "tooltip";
        // tooltip.setAttribute('class', "tooltip-text");

        const btnSize = document.createElement('button');
        btnSize.style.backgroundColor = "Transparent";
        btnSize.style.width = "30px";
        btnSize.style.height = "20px";
        btnSize.textContent = "🔎";

        btnSize.onclick = () => {
            load(tr);
            btnSize.remove();
        }

        tr.children[4].appendChild(btnSize);


        // if(tr.children[3].textContent == "  - "){
        //     hasFolder = true;
        //     break;
        // }
    }

    const helpText = document.createElement('p');
    helpText.textContent = "🗑️ — delete\u00A0\u00A0\u00A0💾 — download\u00A0\u00A0\u00A0📑 — duplicate\u00A0\u00A0\u00A0✏️ — rename\u00A0\u00A0\u00A0 🔎 — size";
    document.body.insertBefore(helpText, document.body.children[1]);
    //document.body.insertBefore(document.createElement('br'), document.body.children[1]);

    // if(hasFolder){
    //     const storageBtn = document.createElement('button');
    //     storageBtn.textContent = "Folder storage";
    //     storageBtn.onclick = () => {
    //         storageBtn.hidden = true;
    //         load();
    //     }
    //     document.body.insertBefore(storageBtn, document.body.children[2]);
    // }
}

async function load(tableRow){
    const link = tableRow.children[1].firstChild.href;
    const res = await getHTML(link);
    const sizes = await extractFiles(res, link);
    const total = totalSize(sizes);
    tableRow.children[3].textContent = byteFormat(total);
}

async function getHTML(url){
    const parser = new DOMParser();
    const response = await fetch(url, {
        method: 'GET', 
        mode: 'no-cors', 
        headers: {'Content-Type': 'application/json'}
    });
    const text = await response.text();
    return parser.parseFromString(text, "text/html");
    // console.log()
    // then(res => {
    //     res.text().then(text => {
    //         console.log(parser.parseFromString(text, "text/html"));
    //     });
    // });
}

async function extractFiles(html, baseURL){
    const table = html.querySelector('table').firstElementChild;
    //const table = document.querySelector('table').children[0].;
    const sizes = [];
    for(let i = 3; i < table.childElementCount-1; i++){
        const size = table.children[i].children[3].innerText.trimEnd().trimStart();
        if(size == "-"){
            const newURL = baseURL+"/"+table.children[i].children[1].children[0].textContent;
            const subHTML = await getHTML(newURL);
            const subSizes = await extractFiles(subHTML);
            sizes.push(subSizes);
        }
        else {
            sizes.push(size);
        }
    }
    return sizes;
}

function totalSize(arr){
    return arr.reduce((acc, cur) => {
        if(typeof(cur) == 'string'){
            switch(cur.slice(-1)){
                case 'K':
                    return acc + Number(cur.slice(0, -1))*1e3;
                case 'M':
                    return acc + Number(cur.slice(0, -1))*1e6;
                default:
                    return acc + Number(cur);
            }
        }
        else{
            return acc + totalSize(cur);
        }
    }, 0);
}

function byteFormat(num){
    if(num > 1e6){
        if(num > 1e7){
            return String(Math.round(num/1e6))+"M";
        }
        else{
            return String(Math.round(num/1e5)/10)+"M";
        }
    }
    else if(num > 1e3){
        if(num > 1e4){
            return String(Math.round(num/1e3))+"K";
        }
        else{
            return String(Math.round(num/1e2)/10)+"M";
        }
    }
    else{
        return String(num);
    }
}
