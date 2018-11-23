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
                + "<iframe data-array-index='"+i+"' id='Player" + i + "'class='youtube-video' src='https://www.youtube.com/embed/" + videoid + "?enablejsapi=1&html5=1' frameborder='0' allow='picture-in-picture;'>"
                + "</iframe>"
                + "</div>";
        }
        content += "</div>";
        document.getElementById(writediv).innerHTML = content;
    } catch (ex) {
        alert(ex.message);
    }
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

players = new Array();
window.onYouTubeIframeAPIReady = function(){
    var i=0;
        $('.youtube-video').each(
  function() {
    players[i] = new YT.Player($(this).attr('id'), 
    { 
      videoId: $(this).attr('id'), 
      events: { 'onStateChange': onPlayerStateChange($(this).data('arrayIndex')) }
    });
    i++;
  });
};

    function onPlayerStateChange(player_index){
        return function(event) {
            players.forEach(function(item, i, players) {
                var palyerState = players[i].getPlayerState();
                var currentPlayerState = players[player_index].getPlayerState();
                if(palyerState == 1 && currentPlayerState == 1 && i!=player_index) {
                    players[i].stopVideo()
                }
                });
            }
    }
