export { match, main, description }

const description = "Converts SOME latex type inputs into grace. Ex.: 'U_R' -> 'U\\sR\\N'";

const match = [
    /^\/cgi-bin/,
];

function main(pathname){
    for(const t of document.querySelectorAll('input[type="text"]')){
        const oldFunction = t.onblur;

        t.onblur = () => {
            oldFunction();
            t.value = convert(t.value);
        }
    }

    for(const t of document.querySelectorAll('textarea')){
        const oldFunction = t.onblur;

        t.onblur = () => {
            oldFunction();
            t.value = convert(t.value);
        }
    }
}

const conversion = [
    [/\^([^\{])/g, "\\S$\\N"],
    [/\_([^\{])/g, "\\s$\\N"],
    [/\\degree/g, "°"],
    [/\\pm/g, "±"],
    [/\\times/g, "×"],
]

function convert(string){
    var newValue = string;
    for(const conv of conversion){
        for(const match of string.matchAll(conv[0])){

            // console.log(match[1]);
            // console.log(match);
            newValue = newValue.substr(0, match.index) + conv[1].replace("$", match[1]) + newValue.substr(match.index+match[0].length);
        }
    }
    console.log(newValue);
    return newValue;




    for(let i = 0; i < string.length; i++){
        switch(string[i]){
            case '_':
                if(string[i+1] == '{'){
                    const segmentIndex = string.indexOf('}', i+1);
                    if(segmentIndex == -1){
                        break;
                    }
                    newValue += "\\s" + string.substr(i+2, segmentIndex-i-2) + "\\N";
                    i += segmentIndex-i;
                }
                else{
                    newValue += "\\s" + string[i+1] + "\\N";
                    i++;
                }
                break;
            case '^':
                if(t.value[i+1] == '{'){
                    const segmentIndex = string.indexOf('}', i+1);
                    if(segmentIndex == -1){
                        break;
                    }
                    newValue += "\\S" + string.substr(i+2, segmentIndex-i-2) + "\\N";
                    i += segmentIndex-i;
                }
                else{
                    newValue += "\\S" + string[i+1] + "\\N";
                    i++;
                }
                break;
            default:
                newValue += string[i]
                break;
        }
    }
}