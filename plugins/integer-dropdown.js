export { match, main, description }

const description = "Turns all text fields that expect an integer into number fields.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webfplot\d+.cgi$/
];
function main(pathname){   
    function selectInit(intbox, sel){
        //intbox.setAttribute('value', sel.selectedIndex);
        intbox.value = sel.selectedIndex;
    }
    function selectUpdate(intbox, sel){
        return () => {
            sel.options[intbox.value].selected = true;
        };
    }
    
    turnIntoIntbox(document.querySelector('select[name="Xstep"]'), 0, 9, null, selectInit, selectUpdate);
    turnIntoIntbox(document.querySelector('select[name="Ystep"]'), 0, 9, null, selectInit, selectUpdate);
    
    turnIntoIntbox(document.querySelector('select[name="Xprecision"]'), 0, 9, null, selectInit, selectUpdate);
    turnIntoIntbox(document.querySelector('select[name="Yprecision"]'), 0, 9, null, selectInit, selectUpdate);


    function textInit(intbox, text){
        intbox.value = Number(text.value);
    }
    function textUpdate(intbox, text){
        return () => {
            text.value = String(intbox.value);
        };
    }

    turnIntoIntbox(document.querySelector('input[name="Num"]'), 0, null, null, textInit, textUpdate);

    turnIntoIntbox(document.querySelector('input[name="DadosFontSize"]'), 10, 200, 10, textInit, textUpdate);

    function turnIntoIntbox(element, min, max, step, initFunc, updateFunc){
        //const sel = document.querySelector('select[name="'+name+'"]');
        const sel = element;
        if(!sel){
            return;
        }

        sel.style.display = "none";
        const intbox = document.createElement('input');
        intbox.setAttribute('type', "number");
        if(min != null){
            intbox.setAttribute('min', min);
        }
        if(max != null){
            intbox.setAttribute('max', max);
        }
        if(step != null){
            intbox.setAttribute('step', step);
        }
        
        //intbox.setAttribute('value', sel.selectedIndex);
        initFunc(intbox, sel);
        
        sel.parentElement.appendChild(intbox);

        // intbox.onchange = () => {
        //     sel.options[intbox.value].selected = true;
        // };
        intbox.onchange = updateFunc(intbox, sel);
        return intbox;
    }
}