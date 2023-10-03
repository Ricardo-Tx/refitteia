export { match, main, description }

const description = "Aligns some table contents to the left.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webfplot\d+.cgi$/,
    /^\/cgi-bin\/login$/,
    /^\/cgi-bin\/webreport\d+.cgi$/
];

function main(pathname, matchIndex){
    // for(const table of document.querySelectorAll('table')){
    //     console.log(table.getBoundingClientRect());
    // }
    switch(matchIndex){
        case 0:
            prettyTable(8);
            prettyTable(9);
            break;
        case 2:
            const table = document.querySelector('table');
            table.setAttribute('cellspacing', "0");
            table.setAttribute('cellpadding', "0");
            break;
        case 3:
            // for(const table of document.querySelectorAll('table')){
            //     prettyTable(table);
            // }
            //prettyTable(3);
            prettyTable(2);

            break;
    }

    function prettyTable(index){
        const table = !isNaN(index) ? document.querySelectorAll('table')[index] : index;
        //table.setAttribute('cellspacing', "2px");
        for(const td of table.querySelectorAll('td[align="right"]')){
            td.align = "left";
            td.textContent = td.textContent.replace("'s", "");
        }
    
        for(const tr of table.querySelectorAll('tr')){
            for(let i = 1; i < tr.childElementCount; i++){
                tr.children[i].style.paddingLeft = "12px";
            }
            
            //tr.children[2].style.paddingLeft = "12px";
        }
    }
}