export { match, main, description }

const description = "Turns all line/symbol/color dropdowns in the Plotter into more visual variants.";

const match = [
    /^\/cgi-bin\/webfplot\d+.cgi$/
];
function main(pathname){
    const lineTypes = [
        "<none>",
        "━━━━━━━━━━━━━━━━━",
        "·················",
        "━ ━ ━ ━ ━ ━ ━ ━ ━",
        "━━ ━━ ━━ ━━ ━━ ━━",
        "━·━·━·━·━·━·━·━·━",
        "━━·━━·━━·━━·━━·━━",
        "━··━··━··━··━··━·",
        "╸╸·╸╸·╸╸·╸╸·╸╸·╸╸",
    ];

    const symbolTypes = [
        "<none>",
        "○",
        "□",
        "◊",
        "△",
        "◁",
        "▽",
        "▷",
        "+",
        "×",
        "<8-star>"
    ];
    const colors = [
        "#ffffff",
        "#000000",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#bc8f8f",
        "#dcdcdc",
        "#9400d3",
        "#00ffff",
        "#ff00ff",
        "#ffa500",
        "#7221bc",
        "#670748",
        "#40e0d0",
        "#008b00"
    ];
    const datasets = document.querySelector('input[name="NC"]')?.value;
    if(!datasets){
        return;
    }

    turnIntoColorSwatch("LgFCor");
    for(let i = 1; i <= datasets; i++){
        turnIntoColorSwatch("SCor"+String(i));
        turnIntoColorSwatch("SFCor"+String(i));
        turnIntoColorSwatch("LCor"+String(i));
        turnIntoColorSwatch("StrCor"+String(i));

        turnIntoLineSwatch("Traco"+String(i));

        turnIntoSymbolSwatch("Symbol"+String(i));
    }

    function turnIntoColorSwatch(name){
        const sel = document.querySelector(`select[name="${name}"]`);

        for(const opt of sel.children){
            opt.style.backgroundColor = colors[opt.value];
            opt.textContent = "";
            //console.log(typeof(opt.value));
            //opt.value = String(Number(opt.value)-10);
        }
        for(let i = sel.childElementCount; i < colors.length; i++){
            const opt = document.createElement('option');
            //opt.textContent = colors[i];
            opt.style.backgroundColor = colors[i];
            opt.value = i;
            sel.appendChild(opt);
        }

        sel.appendChild(sel.firstElementChild);

        sel.setAttribute('class', "color-swatch");
        sel.style.backgroundColor = sel.options[sel.selectedIndex].style.backgroundColor;
        sel.onchange = () => {
            sel.style.backgroundColor = sel.options[sel.selectedIndex].style.backgroundColor;
        };
    }

    function turnIntoLineSwatch(name){
        const sel = document.querySelector(`select[name="${name}"]`);
        for(const opt of sel.children){
            opt.textContent = lineTypes[opt.value];
        }
    }

    function turnIntoSymbolSwatch(name){
        const sel = document.querySelector(`select[name="${name}"]`);
        for(const opt of sel.children){
            opt.textContent = symbolTypes[opt.value];
        }
    }
}