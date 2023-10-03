export { match, main }

const match = [
    /^\/cgi-bin/
];
function main(pathname){
    const table = document.querySelectorAll('table')[6];

    const video = document.createElement('video');
    video.height = 360;
    video.width = 203;
    video.setAttribute('autoplay', "true");
    video.setAttribute('muted', "muted");
    video.setAttribute('loop', "");

    const source = document.createElement('source');
    source.src = chrome.runtime.getURL("subway-surfers.mp4")
    source.type = "video/mp4";

    video.appendChild(source);
    video.style.position = 'absolute';
    video.onloadedmetadata = () => {
        video.currentTime = 14;
    }
    //table.firstElementChild.firstElementChild.appendChild(video);
    document.body.appendChild(video);


    document.body.onmousemove = () => { video.play(); };

    // setInterval(() => {
    //     img.style.visibility = (img.style.visibility == "hidden") ? "visible" : "hidden";
    // }, 200);
}