/**
 * Created by Simon on 25.02.2015.
 */

var discover = (function () {

    var progress = new Array(30);

    function init() {
        for (var i = 1; i <= progress.length; i++) {
            var div = document.createElement('div');
            div.style.left = (i - 1) * 50 + 'px';
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
                img.style.left = '-50px';
            }

            $('.discover').append(div);
            $('.hovdiv').last().prepend(img);


        }
        addhovermotion();
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
                console.log(percentage);
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
        init: init
    }

}());


