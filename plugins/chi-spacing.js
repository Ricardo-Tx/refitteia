export { match, main, description }

const description = "Adds a space to the = after χ in the fitter.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/
];
function main(pathname){
    for (const td of document.querySelectorAll('td[valign="middle"]')) {
        if (td.textContent.includes("χ")) {
            td.textContent = td.textContent.replace("=", " = ");
            break;
        }
    }
}