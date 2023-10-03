export { match, main, description, options }

const description = "Enables dark mode and monospace fonts.";

const options = ["dark", "vanilla"];

const match = [
    /^\/cgi-bin/,
    /^\/home/,
];

function main(pathname){
    (async () => {
        const res = await chrome.storage.local.get(["theme"]);
        // console.log("THEME", res['theme']);

        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = chrome.runtime.getURL(`styles/${res['theme']}.css`);
        document.head.appendChild(link);
    })();
}