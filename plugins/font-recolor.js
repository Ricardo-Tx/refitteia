export { match, main, description }

const description = "Finds important text and recolors it.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webfplot\d+.cgi$/,
    /^\/cgi-bin\/login$/,
    /^\/cgi-bin\/webreport\d+.cgi$/,
];

function main(pathname, matchIndex){
    for (const font of document.querySelectorAll('font')){
        // if(font.color && (font.color == "#000000" || font.color == "0000")){
        //     //font.setAttribute("color", "#888888");
        //     font.removeAttribute("color");
        //     font.setAttribute('class', "important-text");
        // }
        const span = document.createElement('span');
        span.classList.add("important-text");
        span.innerHTML = font.innerHTML;
        font.parentElement.insertBefore(span, font);
        font.remove();
    }
}