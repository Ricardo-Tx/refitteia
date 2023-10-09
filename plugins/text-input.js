export { match, main, description }

const description = "Makes buttons more responsive.";

const match = [
    /^\/cgi-bin/,
];
function main(pathname){
    for(const t of document.querySelectorAll('input[type="text"]')){
        t.setAttribute('spellcheck', false);


        t.style.fontFamily = isNaN(t.value.split('\\,')[0]) ? "monospace" : "courier";
        
        const unfocusCol = t.style.borderColor;
        t.onfocus = () => {
            t.style.borderColor = "white";
        };
        
        t.onblur = () => {
            t.style.borderColor = unfocusCol;
        };
    }
}