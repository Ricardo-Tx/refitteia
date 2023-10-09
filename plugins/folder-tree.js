export { match, main, description }

const description = "Overhauls the project menu structure and look.";

const match = [
    /^\/cgi-bin\/login/
];

function main(pathname){
    for(const tr of document.querySelectorAll('tr[bgcolor]')){
        tr.removeAttribute('bgcolor');
    }

    const table = document.querySelector('table');
    for(const tr of table.children[0].children){
        tr.children[0].textContent = tr.children[0].textContent
        .replace(/\|\-\-/g, "┣━")
        .replace(/\`\-\-/g, "┗━");
        tr.children[0].style.fontFamily = 'monospace';
        tr.children[0].style.fontSize = "16px";
    }

    const br = document.createElement('br');
    const form = document.querySelector('form');
    form.insertBefore(br, form.children[13]);
    // const backupButton = document.querySelector('input[name="continue"]')
    // backupButton.parentElement.insertBefore(br, backupButton.previousElementSibling);

    // table.innerText = table.innerText.replace(/\|\-\-/g, "┣━");
    // table.innerText = table.innerText.replace(/\`\-\-/g, "┗━");
}