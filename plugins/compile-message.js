export { match, main, description }

const description = "Adds ✔/✘ to the function and LaTeX compile messages and colors them accordingly.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    ///^\/cgi-bin\/login$/,
    /^\/cgi-bin\/webreport\d+.cgi$/,
    ///^\/cgi-bin\/webfplot\d+.cgi$/
];

function main(pathname, matchIndex){
    const message = [
        ["Compiled without errors", "Compilation error"],
        ["PDFLaTeX successfully compiled your document", "PDFLaTeX compile error"],
    ];

    var compileTextCheck = false;
    for (const span of document.querySelectorAll('span')){
        if(compileTextCheck){
            break;
        }

        for(let i = 0; i < 2; i++){
            if(!span.textContent.startsWith(message[matchIndex][i])){
                continue;
            }
            //span.setAttribute("color", (i == 0) ? "#00ff00" : "#ff0000");
            span.style.color = (i == 0) ? "#00ff00" : "#ff0000";
            span.textContent += (i == 0 ? " ✔" : " ✘");
            compileTextCheck = true;
            break;
        }

        // if(font.textContent.startsWith(message[matchIndex][0])){
        //     font.setAttribute("color", (i == 0) ? "#00ff00" : "#ff0000");
        //     font.textContent += " ✔";
        //     compileTextCheck = true;
        //     break;
        // }
        // else if(font.textContent.startsWith(message[matchIndex][1])){
        //     font.setAttribute("color", "#ff0000");
        //     font.textContent += " ✘";
        //     compileTextCheck = true;
        //     break;
        // }
    }

    if(compileTextCheck) {
        return;
    }

    var n, walk=document.createTreeWalker(document,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) {
        if(compileTextCheck){
            break;
        }
        for(let i = 0; i < 2; i++){
            if(!n.textContent.startsWith(message[matchIndex][i])){
                continue;
            }
            n.textContent = n.textContent.slice(message[matchIndex][i].length);
            const span = document.createElement('span');
            span.textContent = message[matchIndex][i] + (i == 0 ? " ✔" : " ✘");
            span.style.color = (i == 0) ? "#00ff00" : "#ff0000";

            n.parentElement.insertBefore(span, n);
            compileTextCheck = true;
            break; 
        }
    }
    
}