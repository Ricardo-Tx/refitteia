export { match, main, description }

const description = "Adds a small preview of the result of format and precision options.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/cgi-bin\/webfplot\d+.cgi$/
];
function main(pathname){   
    addTip("Xformat", "Xprecision", Math.PI, "π");
    addTip("Yformat", "Yprecision", Math.E, "𝑒");

    function addTip(formatName, precisionName, constant, constString){
        const format = document.querySelector('select[name="'+formatName+'"]');
        const precision = document.querySelector('select[name="'+precisionName+ '"]')?.nextElementSibling;

        if(!format || !precision){
            return;
        }

        for(const opt of format.children){
            opt.textContent = opt.textContent[0].toUpperCase() + opt.textContent.slice(1);
        }

        const sup = document.createElement('sup');
        const text = document.createTextNode("");
        precision.parentElement.appendChild(text); 
        precision.parentElement.appendChild(sup);
        precision.parentElement.style.color = "#444444";
        precision.parentElement.style.fontSize = "10";
        editText();

        format.onchange = editText;

        const oldFunction = precision.onchange;
        precision.onchange = () => {
            oldFunction();
            editText();
        };

        function editText(){
            //const pVal = precision.valueAsNumber+(precision.valueAsNumber ? 2 : 1);
            // const pVal = Math.max(precision.valueAsNumber, 1);
            const pVal = precision.valueAsNumber;
            const fVal = format.options[format.selectedIndex].value;

            const power = Math.pow(10, pVal);
            switch(fVal){
                case "decimal":
                    text.nodeValue = ` ${constString} = ${Math.round(constant * power) / power}`;
                    sup.textContent = "";
                    break;
                case "power":
                    text.nodeValue = ` ${constString} = 10`;
                    sup.textContent = String(Math.round(Math.log10(constant) * power) / power);
                    break;
                case "scientific":
                    text.nodeValue = ` ${constString} = ${Math.round(constant * power) / power}×10`;
                    sup.textContent = "0";
                    break;
            }
        }
    }
}