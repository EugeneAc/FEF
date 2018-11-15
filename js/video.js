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
        var videocount = videoinfo.pageInfo.totalResults;
        var content = "<div class='video-gallery gallery-flex-container'>";
        for (var i = 0; i < videos.length - 1; i++) {
            var videoid = videos[i].id.videoId;
            var videotitle = videos[i].snippet.title;
            var videodescription = videos[i].snippet.description;
            var videodate = videos[i].snippet.publishedAt; // date time published
            var newdate = new Date(Date.parse((videodate + " (ISO 8601)").replace(/ *\(.*\)/, "")));
            var min = newdate.getMinutes();
            if (min < 10) {
                min = "0" + min;
            }
            if (newdate.getHours() > 12) {
                newdate = newdate.getMonth() + 1 + "/" + newdate.getDate() + "/" + newdate.getFullYear() + " " + (newdate.getHours() - 12) + ":" + min + " PM";
            } else if (newdate.getHours() == 12) {
                newdate = newdate.getMonth() + 1 + "/" + newdate.getDate() + "/" + newdate.getFullYear() + " " + newdate.getHours() + ":" + min + " PM";
            } else {
                newdate = newdate.getMonth() + 1 + "/" + newdate.getDate() + "/" + newdate.getFullYear() + " " + newdate.getHours() + ":" + min + " AM";
            }
            var videothumbnail = videos[i].snippet.thumbnails.default.url; // default, medium or high
            content += "<div class='gallery-flex-item'>"
                + "<iframe id='player" + i + "' src='https://www.youtube.com/embed/" + videoid + "?enablejsapi=1&origin=https://qwerty11aa.github.io/FEF/' frameborder='0' allow='picture-in-picture;'>"
                + "</iframe>"
                + "</div>";
        }
        content += "</div>";
        document.getElementById(writediv).innerHTML = content;
    } catch (ex) {
        alert(ex.message);
    }
}

function onPlayerStateChange() {
    console.log( "ready!" );
  };

$( document ).ready(function() {
    var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player1', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}
});
