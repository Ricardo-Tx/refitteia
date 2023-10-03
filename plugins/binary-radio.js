export { match, main, description }

const description = "Turns all 2 option radio buttons into a checkbox labeled after one.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webreport\d+.cgi$/
];

function main(pathname){

    // Change label
    for(const label of document.querySelectorAll('td[align="center"]')){
        if(label.textContent == "Free/Fix"){
            label.textContent = "Free?";
            label.style.paddingLeft = "10px";
            label.style.paddingRight = "10px";
            break;
        }
    }
    

    // Real deal
    turnIntoCheckbox("Watermark", "left");

    const paramString = document.querySelector('textarea[name="Parameters"]')?.textContent;
    if(!paramString){
        return;
    }
    const paramCount = (paramString.match(/,/g) || []).length + 1;
    
    for(let i = 0; i < paramCount; i++){
        turnIntoCheckbox("F"+String(i), "center");
    }

    function turnIntoCheckbox(name, align){
        const radio = document.querySelectorAll('input[name='+name+']');
        if(!radio.length){
            return;
        }
        const parent = radio[0].parentElement.parentElement;
        if(radio.length > 2){
            return;
        }
        parent.style.color = "transparent";
        parent.setAttribute('align', align);

        for(const r of radio){
            r.style.display = "none";
        }
        // const free = radio[0];
        // const fixed = radio[1];
        // free.style.display = "none";
        // fixed.style.display = "none";

        const tickbox = document.createElement('input');
        tickbox.setAttribute('type', "checkbox");
        tickbox.checked = radio[0].hasAttribute('checked');
        
        tickbox.style.marginLeft = "-10px";
        tickbox.onchange = () => { 
            radio[0].checked = tickbox.checked;
            radio[1].checked = !tickbox.checked;
        }
        parent.appendChild(tickbox);






        return;
        var parents = [];    
        for(const r of document.querySelectorAll('input[type="radio"]')){
            // if(r.value == "Free"){
                //     r.setAttribute("checked", "checked");
                // }
                // else if(r.value == "Fixed"){
                    //     r.removeAttribute("checked");
                    // }
        
            //r.style.display = "none";
            if(!parents.includes(r.parentElement.parentElement)){
                parents.push(r.parentElement.parentElement);
            }
            //console.log(r.parentElement.innerText);
            //r.parentElement.innerText = "";
        }
    
        for(const p of parents){
            const radio = p.querySelectorAll('input[type="radio"]');
            if(radio.length > 2){
                break;
            }
            p.style.color = "transparent";
            p.setAttribute('align', "center");
            const free = radio[0];
            const fixed = radio[1];
            free.style.display = "none";
            fixed.style.display = "none";
    
            const tickbox = document.createElement('input');
            tickbox.setAttribute('type', "checkbox");
            tickbox.checked = free.hasAttribute('checked');
            
            //tickbox.style.marginLeft = "-10px";
            tickbox.onchange = () => { 
                free.checked = tickbox.checked;
                fixed.checked = !tickbox.checked;
            }
            p.appendChild(tickbox);
        }
    }
}