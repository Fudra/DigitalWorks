var discover = (function () {

    var startPosition = 0;//135;
    var currentTrigger = 0;//39;
    var stopTrigger = 0;

    var timings = [];
    timings[0] = 0.1;
    timings[1] = 9.92;
    timings[2] = 18.48;
    timings[3] = 27.28;
    timings[4] = 36.72;
    timings[5] = 51.66;
    timings[6] = 59;


    function init() {
        // todo: dinge
        addElements();
        play();
    }

    function addElements() {
        /*
         var html = document.createElement('div');
         html.id = "popup-wrapper";
         var beaconcontainer = document.createElement('div');
         beaconcontainer.className = "beacon";
         for(var i = 1; i <= 3; i++){
         var beacon = document.createElement('div');
         beacon.className = "ping ping"+i;
         beaconcontainer.append(beacon);
         }
         var popup = document.createElement('div');
         popup.className = "popup popstart click";
         popup.append(beaconcontainer);
         html.append(popup);

         var vidwrap = document.createElement('div');
         vidwrap.id = "videowrapper";
         var vid = document.createElement('div');
         vid.id = "videoplayer";
         vid.className ="jp-jplayer";
         vidwrap.append(vid);

         $(".discover").append(html).append(vidwrap);
         */

        var beacon = '<div id="popup-wrapper">' +
            '<div class="popup popstart click">' +
            '<div class="beacon-container">' +
            '<div class="beacon" >' +
            '<div class="ping ping1"></div>' +
            '<div class="ping ping2"></div>' +
            '<div class="ping ping3"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var vidwrap = '<div id="videowrapper">' +
            '<div id="videoplayer" class="jp-jplayer"></div>' +
            '</div>';

        $(".discover").html(beacon).append(vidwrap);
    }

    function play() {
        $("#videoplayer").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "Mensch & Maschine",
                    m4v: "img/regina/reginavideo.mp4",
                    poster: "img/regina/poster.jpg"
                }).jPlayer("pause", startPosition);

            },
            loadeddata: function () {
                var videoWidth = $("#videowrapper").first().width();
                console.log(videoWidth);
                $(".discover").width(videoWidth);
                $("#popup-wrapper").width(videoWidth);
                $(".discover").css("opacity", "1");

            },
            swfPath: "../../dist/jplayer",
            supplied: "m4v",
            size: {
                width: "auto",
                height: "100%"
                //cssClass: "jp-video-360p"
            },
            volume: 0.9,
            preload: "meta"
        });

        $('.click').click(function () {
            $('#videoplayer').jPlayer('play');
            $('.popup').fadeOut(500);

        });

        $('#videoplayer').bind($.jPlayer.event.timeupdate, function (event) {

            $('.slider-unten').width(event.jPlayer.status.currentPercentAbsolute + '%');

            if ((event.jPlayer.status.currentTime) >= timings[currentTrigger]) {
                fireTrigger(currentTrigger);
                currentTrigger++;

            }
        });
    }

    function fireTrigger(trigger) {
        switch (trigger) {
            case 0:
//				$('.popup').fadeOut(500);
//				$('#videobox').animate({backgroundColor: 'rgb(96, 125, 104);'}, 50);
//				$('#player1').hide();
//				$('#player2').show();
//                $('#lyrics1 p').html(lyrics[5]).fadeIn(1000);

                break;

            case 1:
                $('#videoplayer').jPlayer('pause');
                $('.popup').removeClass('popstart')
                    .addClass('popeins')
                    .delay(1000).fadeIn(500);
                break;

            case 2:
                $('#videoplayer').jPlayer('pause');
                $('.popup').removeClass('popeins')
                    .addClass('popzwei')
                    .delay(1000).fadeIn(500);
                break;

            case 3:
                $('#videoplayer').jPlayer('pause');
                $('.popup').removeClass('popzwei')
                    .addClass('popdrei')
                    .delay(1000).fadeIn(500);
                break;
            case 4:
                $('#videoplayer').jPlayer('pause');
                $('.popup').removeClass('popdrei')
                    .addClass('popvier')
                    .delay(1000).fadeIn(500);
                break;
            case 5:
                $('#videoplayer').jPlayer('pause');
                $('.popup').removeClass('popvier')
                    .addClass('popfuenf')
                    .delay(1000).fadeIn(500);
                break;
            case 6:
                $('.popup-photo').fadeIn(2000);
                break;

            default:
                break;
        }

    }

    function resize() {
        // todo: dinge
    }

    return {
        init: init,
        resize: resize
    }

}());


