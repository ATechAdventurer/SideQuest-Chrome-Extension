'use strict';

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function BeatSaver() {
    var checkExist = setInterval(function() {
        if (document.querySelectorAll("div.beatmap-content").length) {
            var songs = document.querySelectorAll("div.beatmap-content");

            songs.forEach((song) => {
                var songID = song.previousElementSibling.firstElementChild.src.split("/")[4];
                var songDownloadURL = `https://beatsaver.com/api/download/key/${songID}`;
                song.firstElementChild.appendChild(
                    htmlToElement(
                        `<a class="button" style="margin-top: 10px;" href="sidequest://bsaber#${songDownloadURL}">Download With SideQuest</a>`
                    )
                )
            });
            clearInterval(checkExist);
        }
    }, 100);
}

function BSaber() {
    console.log("Found BSaber")
    document.getElementsByTagName('head')[0].appendChild(htmlToElement(
        '   <style>.-sidequest{  ' +
        '       background-image: url("https://i.imgur.com/Hy2oclv.png");  ' +
        '       background-size: 12.814px 15px;  ' +
        '   }  ' +
        '   .bsaber-tooltip.-sidequest::after {  ' +
        '       content: "Add to SideQuest";  ' +
        '   }  ' +
        '   .-sidequest-remove{  ' +
        '       background-image: url("https://i.imgur.com/5ZPR9L1.png");  ' +
        '       background-size: 15px 15px;  ' +
        '   }  ' +
        '   .bsaber-tooltip.-sidequest-remove::after {  ' +
        '       content: "Remove Custom Level";  ' +
        '  }</style>  '
        ))

    var songs = document.querySelectorAll('.bsaber-tooltip.-download-zip');
    songs.forEach(function (e) {
        var buttonBar = e.parentElement;
        var songDownloadURL = buttonBar.children[2].getAttribute('href')

        buttonBar.appendChild(htmlToElement(`<a class="action post-icon bsaber-tooltip -sidequest" href="sidequest://bsaber#${songDownloadURL}"></a>`));
    });
}

if(location.href.includes("bsaber.com")){
    BSaber()
}else if(location.href.includes("beatsaver.com")){
    BeatSaver()
}

