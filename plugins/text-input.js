export { match, main, description }

const description = "Makes buttons more responsive.";

const match = [
    /^\/cgi-bin/,
];
function main(pathname){
    const texts = document.querySelectorAll('input[type="text"]')
    
    for(const t of texts){
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