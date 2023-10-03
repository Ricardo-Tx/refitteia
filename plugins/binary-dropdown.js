export { match, main, description }

const description = "Turns all on/off, yes/no dropdown menus into checkboxes.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webfplot\d+.cgi$/
];
function main(pathname){
    turnIntoCheckbox("AscaleX", true);
    turnIntoCheckbox("AscaleY", true);
    
    turnIntoCheckbox("Xgrid", false);
    turnIntoCheckbox("Ygrid", false);
    
    turnIntoCheckbox("ErrorBars", true);

    turnIntoCheckbox("ShowTags", true);
    turnIntoCheckbox("Legend", true, "On ");

    const datasets = document.querySelector('input[name="NC"]')?.value;
    if(!datasets){
        return;
    }
    for(let i = 1; i <= datasets; i++){
        turnIntoCheckbox("Hide"+String(i), false, "Show ");
        turnIntoCheckbox("SFill"+String(i), false, " Fill ");
        turnIntoCheckbox("ErrorB"+String(i), true, " Error bars ");
    }
    
    function turnIntoCheckbox(name, positive_first, textBefore = null){
        const sel = document.querySelector('select[name="' + name + '"]');
        if(!sel || sel.children.length > 2){
            return;
        }
        sel.style.display = "none";

        if(textBefore != null){
            const text = document.createTextNode(textBefore);
            sel.parentElement.appendChild(text);
        }

        const tickbox = document.createElement('input');
        tickbox.setAttribute('type', "checkbox");

        // if(sel.children[positive_first ? 0 : 1].selected){
        //     tickbox.setAttribute('checked', "checked");
        // }
        if(sel.selectedIndex == (positive_first ? 0 : 1)){
            tickbox.setAttribute('checked', "checked");
        }
        
        tickbox.onchange = () => {
            const val = tickbox.checked ? 0 : 1;
            sel.options[positive_first ? val : 1 - val].selected = true;
            
            //scaleX.children[tickbox.checked ? 1 : 0].selected = false;
        };
        sel.parentElement.appendChild(tickbox);
    }
}