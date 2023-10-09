export { match, main, description }

const description = "<experimental> Creates up to 4 fields for \\, definitions.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/
];

function main(pathname){
    for(const axis of ["X", "Y"]){
        createDynamicField(axis+'min',      100,         0);
        createDynamicField(axis+'max',      100,         0);
        createDynamicField(axis+'maj',      100,         1);
        createDynamicField(axis+'step',     100,         1);
        createDynamicField(axis+'type',     100,  "Normal");
        createDynamicField(axis+'format',    80, "decimal");
        createDynamicField(axis+'precision', 80,         0);
    }
}

function createDynamicField(name, scaling, newValueDefault,){
    const mainField = document.querySelector(`input[name="${name}"]`);
    if(!mainField){
        return;
    }
    mainField.parentElement.style.width = mainField.width;
    mainField.style.display = 'none';
    
    const contents = mainField.value.split('\\,');

    const buttonSize = 10; // percentage
    var openFields = contents.length;

    const fields = [
        createField(contents[0]),
        createField(contents[1]),
        createField(contents[2]),
        createField(contents[3])
    ];
    update(true);

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = "+";
    button.style.width = String(buttonSize)+"%";
    button.style.height = "20px";
    button.style.verticalAlign = 'bottom';
    button.style.margin = '0px';
    button.style.padding = '0px';
    //button.style.fontSize = '14px';
    // button.style.border = '0px';

    // const span = document.createElement('span');
    // span.textContent = "+";
    // span.style.fontSize = "14px";
    // span.style.verticalAlign = 'middle';
    // span.style.horizontalAlign = 'middle';
    // button.appendChild(span);

    // button.style.fontSize = '10px';
    // button.style.padding = 'middle';
    //button.style.lineHeight = '100%';
    // button.style.lineWidth = '4px';


    for(const f of fields){
        mainField.parentElement.appendChild(f);
    }
    mainField.parentElement.appendChild(button);

    button.onclick = () => {
        openFields = (openFields < 4) ? openFields+1 : 4;
        console.log("PLUS", openFields);
        update(true);
    }

    function update(){
        const newSize = String((100-buttonSize)/openFields*(scaling/100))+"%";
        var values = fields.map(f => f.value).filter(v => v != "");
        for(let i = 0; i < 4; i++){
            fields[i].style.display = (i < openFields) ? '' : 'none';
            if(i < openFields){
                fields[i].style.width = newSize;
            }
            fields[i].value = (i < values.length) ? values[i] : 0;
        }
    }

    function overwrite(){
        mainField.value = fields.map(f => f.value).filter(v => v != "").join('\\,');
    }

    function createField(value){
        const field = document.createElement('input');
        field.type = 'text';
        field.value = value || newValueDefault;    
        // field.style.width = "20%";
        field.style.display = 'none';
        field.style.verticalAlign = 'bottom';
        field.style.height = "20px";

        field.onchange = () => {
            if(field.value == ""){
                openFields = (openFields > 1) ? openFields-1 : 1;
                update(true);
            }
        }

        field.oninput = () => {
            overwrite(false);
        }

        field.onkeydown = ev => {
            if(field.selectionStart != field.selectionEnd){
                return;
            }
            const cursor = field.selectionStart;

            if(cursor == 0 && ev.key == "ArrowLeft" && field.previousSibling){
                field.previousSibling.focus();
            }
            else if(cursor == field.value.length && ev.key == "ArrowRight" && fields.includes(field.nextSibling)){
                field.nextSibling.focus();
            }
        }
        return field;
    }
}