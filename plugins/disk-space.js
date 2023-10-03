export { match, main, description }

const description = "Adds a filling bar below disk space info, and a warning when space is exceeded.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webfplot\d+.cgi$/,
    /^\/cgi-bin\/webreport\d+.cgi$/
];
function main(pathname){
    const td = document.querySelector('tr').children.item(1);
    
    const percent = Math.floor(parseFloat(td.textContent.match(/\([ ]*(\d+\.\d+)%\)/)[1]));

    if(percent < 100){
        const bgBar = document.createElement('div');
        bgBar.style.width = "100%";
        bgBar.style.height = "10px";
        bgBar.style.background = "#aaaaaa";
        bgBar.style.marginTop = "6px";
        //bgBar.style.display = "block";
        td.appendChild(bgBar);

        //td.textContent = td.textContent.replace("( ", "(");

        const fgBar = document.createElement('div')
        fgBar.style.width = String(percent)+"%";
        fgBar.style.height = "10px";
        fgBar.style.background = "#ffffff";
        bgBar.appendChild(fgBar); 
    }
    else {
        const fullText = document.createElement('span');
        fullText.textContent = "!!! FULL !!!"
        fullText.setAttribute('class', 'storage-full-text');
        // fullText.style.color = "#990000";
        // fullText.style.fontSize = "14px";
        // fullText.style.fontWeight = "bolder";
        // fullText.style.fontStyle = "italic";
        
        td.children[0].appendChild(document.createElement('br'));
        td.children[0].appendChild(fullText);
    }
    
}