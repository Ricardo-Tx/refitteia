export { findInfo, generateHeader }

async function findInfo(){
    const url = window.location.href.split('/').slice(0, 5).join('/')+"/calculator.cal";
    const res = await fetch(url);
    const txt = await res.text();

    let obj = {
        "email": null,
        "number": null
    };

    for(const item of txt.split('\n')){
        if(item.startsWith("Nome=")){
            obj.email = item.slice(5).replace("%40", "@");
        }
        else if(item.startsWith("Numero=")){
            obj.number = item.slice(7);
        }
        if(obj.email && obj.number){
            break;
        }
    }

    return obj;
}

function generateHeader(boundary){
    return {
        "content-type": "multipart/form-data; boundary="+boundary,
        //"sec-ch-ua": '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        //"sec-ch-ua-mobile": "?0",
        //"sec-ch-ua-platform": "\"Windows\"",
        "upgrade-insecure-requests": "1"
    };
}