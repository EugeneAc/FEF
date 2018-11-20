// Youtube related functinos

    
function getJSONData(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    try {
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
    } catch (ex) {
        alert(ex.message);
    }
    return Httpreq.responseText;
}

function showVideoListChannel(channelid, writediv, maxnumbervideos, apikey) {
    try {
        document.getElementById(writediv).innerHTML = "";
        var vid = getJSONData("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + channelid + "&maxResults=" + (maxnumbervideos + 1) + "&key=" + apikey);
        var videoinfo = JSON.parse(vid);
        var videos = videoinfo.items;
        var content = "<div class='video-gallery gallery-flex-container'>";
        for (var i = 0; i < videos.length - 1; i++) {
            var videoid = videos[i].id.videoId;
            content += "<div class='gallery-flex-item'>"
                + "<iframe id='player" + i + "'class='youtube-player' src='https://www.youtube.com/embed/" + videoid + "?enablejsapi=1&html5=1' frameborder='0' allow='picture-in-picture;'>"
                + "</iframe>"
                + "</div>";
        }
        content += "</div>";
        document.getElementById(writediv).innerHTML = content;
    } catch (ex) {
        alert(ex.message);
    }
}

function onPlayerStateChange(currentPlyaer) {
    for (var i = 0; i < players.length; i++) {
        var test = players[i].getPlayerState()
        if (players[i].getPlayerState() = 1)
        {
            players[i].stopVideo();
        }
    }
};

var players = new Array();
function onYouTubeIframeAPIReady() {
    var i = 0;
    $('.youtube-player').each(function(){
        test = this;
        players[i] = new YT.Player(this.id, {
            events: {
                'onStateChange': onPlayerStateChange(this)
            }   
    });
    i++;    
  });
}
