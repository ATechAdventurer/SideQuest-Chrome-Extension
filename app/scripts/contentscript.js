'use strict';

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function BeatSaver() {
    var checkExist = setInterval(function() {
        if (document.querySelectorAll("div.container.has-footer.side-pad").length) {

            var containerStyle = "display: flex; flex-direction: column-reverse;";
            var buttonStyle = "margin-right:10px; padding: 20px 21px;";
            var callback = function(mutationsList, observer) {
                mutationsList.forEach(function(mutation) {
                    if (document.querySelectorAll("div.beatmap-content").length) {
                        var songs = document.querySelectorAll("div.beatmap-content");

                        songs.forEach((song) => {
                            if (song.querySelectorAll("a.sidequest").length === 0) {
                                var songDownloadURL = song.querySelectorAll(".right a")[0].href;
                                song.querySelectorAll("div.right")[0].before(
                                    htmlToElement(
                                        `<div class="right" style="${containerStyle}"><a class="button sidequest" style="${buttonStyle}" href="sidequest://bsaber#${songDownloadURL}">Download With SideQuest</a></div>`
                                    )
                                )
                            }

                        });
                    }
                });
            }

            var targetNode = document.querySelector("div.container.has-footer.side-pad");
            var config = { attributes: true, childList: true, subtree: true };
            var observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
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

