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
function showVideoList(username, writediv, maxnumbervideos, apikey) {
    try {
        document.getElementById(writediv).innerHTML = "";
        var keyinfo = JSON.parse(getJSONData("https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=" + username + "&key=" + apikey));
        var userid = keyinfo.items[0].id;
        var channeltitle = keyinfo.items[0].snippet.title;
        var channeldescription = keyinfo.items[0].snippet.description;
        var channelthumbnail = keyinfo.items[0].snippet.thumbnails.default.url; // default, medium or high
        //channel header
        document.getElementById(writediv).innerHTML += "<div style='width:100%;min-height:90px;'>"
            + "<a href='https://www.youtube.com/user/" + username + "' target='_blank'>"
            + "<img src='" + channelthumbnail + "' style='border:none;float:left;margin-right:10px;' alt='" + channeltitle + "' title='" + channeltitle + "' /></a>"
            + "<div style='width:100%;text-align:center;'><h1><a href='https://www.youtube.com/user/" + username + "' target='_blank'>" + channeltitle + "</a></h1>" + channeldescription + "</div>"
            + "</div>";
        var videoinfo = JSON.parse(getJSONData("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + userid + "&maxResults=" + maxnumbervideos + "&key=" + apikey));
        var videos = videoinfo.items;
        var videocount = videoinfo.pageInfo.totalResults;
        // video listing
        for (var i = 0; i < videos.length; i++) {
            var videoid = videos[i].id.videoId;
            var videotitle = videos[i].snippet.title;
            var videodescription = videos[i].snippet.description;
            var videodate = videos[i].snippet.publishedAt; // date time published
            var videothumbnail = videos[i].snippet.thumbnails.default.url; // default, medium or high
            document.getElementById(writediv).innerHTML += "<hr /><div style='width:100%;min-height:90px;'>"
                + "<a href='https://www.youtube.com/watch?v=" + videoid + "' target='_blank'>"
                + "<img src='" + videothumbnail + "' style='border:none;float:left;margin-right:10px;' alt='" + videotitle + "' title='" + videotitle + "' /></a>"
                + "<h3><a href='https://www.youtube.com/watch?v=" + videoid + "' target='_blank'>" + videotitle + "</a></h3>" + videodescription + ""
                + "</div>";
        }
    } catch (ex) {
        alert(ex.message);
    }
}

function showVideoListChannel(channelid, writediv, maxnumbervideos, apikey) {
    try {
        document.getElementById(writediv).innerHTML = "";
        var vid = getJSONData("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + channelid + "&maxResults=" + (maxnumbervideos + 1) + "&key=" + apikey);
        var videoinfo = JSON.parse(vid);
        var videos = videoinfo.items;
        var videocount = videoinfo.pageInfo.totalResults;
        var content = "<div class='video-gallery'>";
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
            content += "<hr /><div style='width:100%;min-height:90px;'>"
                + "<a href='https://www.youtube.com/watch?v=" + videoid + "' target='_blank'>"
                + "<img src='" + videothumbnail + "' style='border:none;float:left;margin-right:10px;' alt='" + videotitle + "' title='" + videotitle + "' /></a>"
                + "<h3><a href='https://www.youtube.com/watch?v=" + videoid + "' target='_blank'>" + videotitle + "</a></h3>" + videodescription + "<br />"
                + "<span style='color:#738AAD;font-size:Small;'>" + newdate + "</span>"
                + "</div>";
        }
        content += "</div>";
        document.getElementById(writediv).innerHTML = content;
    } catch (ex) {
        alert(ex.message);
    }
}