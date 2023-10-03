export { match, main, description }

const description = "Makes textarea elements more interactive and removes spellcheck.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webreport\d+.cgi$/
];
function main(pathname){
    for(const ta of document.getElementsByTagName('textarea')){
        ta.setAttribute("spellcheck", false);
        
        const unfocusCol = ta.style.borderColor;
        ta.onfocus = () => {
            ta.style.borderColor = "white";
        }
        
        ta.onblur = () => {
            ta.style.borderColor = unfocusCol;
        }
    }

    // const dados = document.querySelector('[name="Dados"]');
    // dados.style.color = "#cccccc";
    // dados.style.outline = "none";
    // dados.setAttribute("spellcheck", false);
}