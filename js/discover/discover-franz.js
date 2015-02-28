/**
 * Created by Simon on 25.02.2015.
 */

var discover = (function () {
    var parentWidth = 1024;
    var scaleFactor;
    var elemCnt = 30;
    var elemWidth = 50;
    var progress = new Array(elemCnt);

    function init() {
        var container = document.createElement("div");
        container.className = "discover-container";
        $('.discover').append(container);
        for (var i = 1; i <= progress.length; i++) {
            var div = document.createElement('div');
            div.style.left = (i - 1) * elemWidth + 'px';
            div.className = 'hovdiv';
            div.id = i;

            var img = new Image();
            if (i < 10) {
                img.src = 'img/franz/discover/0' + i + '.png';
            }
            else {
                img.src = 'img/franz/discover/' + i + '.png';
            }

            //TODO Classen setzen nicht inline left und ersetze hide and show mit add bootstrap class
            img.className = 'snip';

            if (i > 1) {
                img.style.left = '-' + elemWidth + 'px';
            }

            $('.discover-container').append(div);
            $('.hovdiv').last().prepend(img);


        }
        addhovermotion();
        // inner
        align();
        scaleFactor = parentWidth / (elemCnt * elemWidth);
      //  scaleImg(scaleFactor);
      //  scaleSnip(w / (elemCnt * elemWidth));
        resize();

    }

    function resize() {
        var width = $(".discover-container").parent().css("width");
       // var parentWidth = $(".discover-container").parent().parent().css("width");
        var resizeFactor = parseInt(width) /parentWidth; //parseInt(parentWidth);
        console.log(width,resizeFactor);
        align();

        scaleImg(scaleFactor*resizeFactor);
      //  scaleSnip(resizeFactor);


    }

    function scaleSnip(x) {
        $(".hovdiv").css("transform", "scale(" + x + ")");
    }

    function scaleImg(x) {
        $(".discover-container").css("transform", "scale(" + x + ")");
    }

    function align() {
        var imgwidth = $(".discover").width();
        console.log("screen:",assets.screen.width,imgwidth);
        var left = (assets.screen.width - imgwidth)/2;
        $(".discover-container").css("left",left+"px");


    }


    function addhovermotion() {
        $('.hovdiv').on('mouseover', function (event) {
            $(this).find('img').show();
            var id = $(this).attr("id");
            progress[id - 1] = true;
            updateProgress();
        }).on('mouseout', function (event) {
            $(this).find('img').hide();
        });
    }

    function updateProgress() {
        var progressStatus = 0;
        var percentage = 0;
        for (var i = 0; i < progress.length; i++) {
            if (progress[i]) {
                progressStatus++;
                percentage = progressStatus / progress.length * 100;
               // console.log(percentage);
                progressBar(percentage);
            }
        }
    }


    function progressBar(progress) {
        $(".progressbar").css("width", progress + "%");
        if (progress == 100) {
            $(".progressbar").css("background", "#00ff00");
        }
    }


    return {
        init: init,
        resize: resize
    }

}());


