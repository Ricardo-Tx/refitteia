export { match, main, description }

const description = "Erases from fields and hides all instances of (public) IP addresses."

const match = [
    ///^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/login$/,
    /^\/cgi-bin\/webreport\d+.cgi$/
];
function main(pathname, matchIndex){
    if(matchIndex == 0){
        var n, walk=document.createTreeWalker(document,NodeFilter.SHOW_TEXT,null,false);
        while(n=walk.nextNode()) {
            var pick = n.nodeValue.match(/[ ](\d+\.){3}\d+[ ]/);
            if(pick){
                n.nodeValue = n.nodeValue.slice(0, pick.index) + n.nodeValue.slice(pick.index+pick[0].length+1);
            }
        }
    }
    else if(matchIndex == 1){
        const affiliation = document.querySelector('textarea[name="Affiliation"]');
        if(affiliation){
            affiliation.textContent = "";
        }
    }
}