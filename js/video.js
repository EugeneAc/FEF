// Youtube related functinos
var youtubeVideoCreator = (function () {
    function getJSONData(yourUrl) {
        var Httpreq = new XMLHttpRequest();
        try {
            Httpreq.open("GET", yourUrl, false);
            Httpreq.send(null);
        } catch (ex) {
            alert(ex.message);
        }
        return Httpreq.responseText;
    };
    
    var showVideoListChannel = function(channelid, maxnumbervideos, apikey) {
        try {
            var vid = getJSONData("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" 
            + channelid 
            + "&maxResults=" + (maxnumbervideos + 1) 
            + "&key=" + apikey);
            var videoinfo = JSON.parse(vid);
            var videos = videoinfo.items;
            var content = "<div class='video-gallery gallery-flex-container'>";
            for (var i = 0; i < videos.length - 1; i++) {
                var videoid = videos[i].id.videoId;
                content += "<div class='gallery-flex-item'>"
                    + "<iframe data-array-index='"+i+"' id='Player" + i + "'class='youtube-video' src='https://www.youtube.com/embed/" + videoid + "?enablejsapi=1&html5=1&showinfo=0&controls=0' frameborder='0' allow='picture-in-picture;'>"
                    + "</iframe>"
                    + "</div>";
            }
            content += "</div>";
            return content;
        } catch (ex) {
            alert(ex.message);
        }
    };

    return {
        addVideosToElementById : showVideoListChannel
    }
})();

document.getElementById("videos").innerHTML = youtubeVideoCreator.addVideosToElementById("UCC552Sd-3nyi_tk2BudLUzA", 6, "AIzaSyDqU1azV11Vf_ebUzVr3OnebiRrx5ChiQo");


(function() {
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
  window.onscroll = function () { scrollFunction() };
};

function onPlayerStateChange(player_index){
    return function(event) {
        players.forEach(function(item, i, players) {
            var palyerState = players[i].getPlayerState();
            var currentPlayerState = players[player_index].getPlayerState();
            if(palyerState == 1 && currentPlayerState == 1 && i!=player_index) {
                players[i].stopVideo();
            }
            });
        }
}
})();

function scrollFunction() {
    if ($(window).scrollTop() < 1500) {
        players.forEach(function(item, i, players) {
            if(players[i].getPlayerState() == 1) {
                var playerId = '#Player'+i;
                $(playerId).addClass('fixedposition');
            }
        });
    } else {
        players.forEach(function(item, i, players) {
            var playerId = '#Player'+i;
            if($(playerId).hasClass('fixedposition')) {
                $(playerId).removeClass('fixedposition');
            }
        });
        }
}
