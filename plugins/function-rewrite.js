export { match, main }

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/
];
function main(pathname){
    // TOO SPECIFIC!!!
    const funcString = document.querySelector('textarea[name="Function"]').textContent;
    
    var components = [];
    const equalIndex = funcString.indexOf("=");
    components.push(funcString(0, equalIndex))
    funcString = funcString.slice(equalIndex+1);

    components.push(funcString);
    console.log(components);
}