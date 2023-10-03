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
    }

    // table.innerText = table.innerText.replace(/\|\-\-/g, "┣━");
    // table.innerText = table.innerText.replace(/\`\-\-/g, "┗━");
}