export { match, main, description, options }

const description = "Enables dark mode and monospace fonts.";

const options = ["dark", "vanilla"];

const match = [
    /^\/cgi-bin/,
    /^\/home/,
];

function main(pathname){
    // document.body.setAttribute("bgcolor", "#111111");
    // document.body.setAttribute("text", "#ffffff");
    // document.body.setAttribute("vlink", "#4444ff");
    // document.body.setAttribute("alink", "#3333ff");
    // document.body.setAttribute("link", "#aaaaff");
    (async () => {
        const res = await chrome.storage.local.get(["theme"]);

        console.log("THEME", res['theme']);

    })();

    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = chrome.runtime.getURL("styles/dark-style.css");
    document.head.appendChild(link);
}