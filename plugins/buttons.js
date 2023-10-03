export { match, main, description }

const description = "Makes buttons in dark mode more responsive to the user.";

const match = [
    /^\/cgi-bin\/webffit\d+.cgi$/,
    /^\/home/
];

function main(pathname){
    // for(const btn of [
    //     ...document.querySelectorAll('input[type="submit"]'), 
    //     ...document.querySelectorAll('button')
    // ]){
    //     if(btn.style.backgroundColor == "transparent"){
    //         continue;
    //     }
    //     btn.onmousedown = () => { btn.style.backgroundColor = "#888888"; };
    //     btn.onmouseup = () => { btn.style.backgroundColor = "#666666"; };
    //     btn.onmouseleave = btn.onmouseup;
    // }

}


/*
fetch("https://fitteia-t.vps.tecnico.ulisboa.pt/cgi-bin/login", {
  "headers": {
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundarylj1IkUm8leR3y8eT",
    "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "http://fitteia-t.vps.tecnico.ulisboa.pt/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "------WebKitFormBoundarylj1IkUm8leR3y8eT\r\n
  Content-Disposition: form-data; name=\"ShareEmail\"\r\n\r\n\r\n
  ------WebKitFormBoundarylj1IkUm8leR3y8eT\r\n
  Content-Disposition: form-data; name=\"Selected\"\r\n\r\n./fit/file_name.sav\r\n------WebKitFormBoundarylj1IkUm8leR3y8eT\r\nContent-Disposition: form-data; name=\"Email\"\r\n\r\nricardo.a.teixeira@tecnico.ulisboa.pt\r\n------WebKitFormBoundarylj1IkUm8leR3y8eT\r\nContent-Disposition: form-data; name=\"Projecto\"\r\n\r\nDelete\r\n------WebKitFormBoundarylj1IkUm8leR3y8eT\r\nContent-Disposition: form-data; name=\"Link\"\r\n\r\n32ofIQB0PFKxE19WOsbp8DRyXsriSakEec0PshYri9MGNlX7mMHo\r\n------WebKitFormBoundarylj1IkUm8leR3y8eT\r\nContent-Disposition: form-data; name=\"continue\"\r\n\r\nDelete Selected\r\n------WebKitFormBoundarylj1IkUm8leR3y8eT\r\nContent-Disposition: form-data; name=\".cgifields\"\r\n\r\nSelected\r\n------WebKitFormBoundarylj1IkUm8leR3y8eT--\r\n",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});
*/



// fetch("https://fitteia-t.vps.tecnico.ulisboa.pt/cgi-bin/login", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//     "accept-language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
//     "cache-control": "max-age=0",
//     "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryPcVSyrnKDYuiBoGx",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "cross-site",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1"
//   },
//   "referrer": "http://fitteia-t.vps.tecnico.ulisboa.pt/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"ShareEmail\"\r\n\r\n\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"Selected\"\r\n\r\n./fit/fit-gph.png\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"Selected\"\r\n\r\n./fit/fit-gph.pdf\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"Selected\"\r\n\r\n./fit/fit-gph.eps\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"Selected\"\r\n\r\n./fit/fit-gph.agr\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"Email\"\r\n\r\nricardo.a.teixeira@tecnico.ulisboa.pt\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"Projecto\"\r\n\r\nDelete\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"Link\"\r\n\r\n95oNdvnGBbg2cri2ZFshxhHTJgri9MGNlX7mMHo\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\"continue\"\r\n\r\nDelete Selected\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx\r\nContent-Disposition: form-data; name=\".cgifields\"\r\n\r\nSelected\r\n------WebKitFormBoundaryPcVSyrnKDYuiBoGx--\r\n",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });


