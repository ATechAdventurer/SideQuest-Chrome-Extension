'use strict';

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

document.getElementsByTagName('head')[0].appendChild(htmlToElement(`<style>.-sidequest{
    background-image: url('https://i.imgur.com/Hy2oclv.png');
    background-size: 12.814px 15px;
}
.bsaber-tooltip.-sidequest::after {
    content: "Add to SideQuest";
}
.-sidequest-remove{
    background-image: url('https://i.imgur.com/5ZPR9L1.png');
    background-size: 15px 15px;
}
.bsaber-tooltip.-sidequest-remove::after {
    content: "Remove Custom Level";
}</style>`))

var songs = document.querySelectorAll('.bsaber-tooltip.-download-zip');
songs.forEach(function (e) {
    var buttonBar = e.parentElement;
    var songDownloadURL = buttonBar.children[2].getAttribute('href')
    buttonBar.appendChild(htmlToElement(`<a class="action post-icon bsaber-tooltip -sidequest" href="sidequest://bsaber#${songDownloadURL}"></a>`));
});