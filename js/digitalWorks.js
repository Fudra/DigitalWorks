/*****************/
/*  navigation   */
/*****************/

/**
 *
 *
 */

var screenPosition = (function () {
    /*
     left-top      right-top
     left-bottom   right-bottom
     */
    /**
     * Contains the current slider position
     * @type {{orientationX: string, orientationY: string}}
     */
    var currentPosition = {
        orientationX: "left",
        orientationY: "top"
    };

    /**
     * contains the last slider position
     * @type {{orientationX: string, orientationY: string}}
     */
    var lastPosition = {
        orientationX: "right",
        orientationY: "bottom"
    };

    /**
     * update the navigation // css class vodoo
     */
    function updateNavigation() {
        //if(!setting.position)

        //  saveLastPosition();
        removePositionToNavigation();
        addPositionToNavigation();
        //   animateSlider();

        /* update Home Icon*/
        updateIcon();
    }

    /**
     *  add the active Slide, based on the current position
     */
    function addPositionToNavigation() {
        if (currentPosition.orientationX == "left" && currentPosition.orientationY == "top")
            $(".one").addClass("active-slide");
        if (currentPosition.orientationX == "right" && currentPosition.orientationY == "top")
            $(".two").addClass("active-slide");
        if (currentPosition.orientationX == "left" && currentPosition.orientationY == "bottom")
            $(".three").addClass("active-slide");
        if (currentPosition.orientationX == "right" && currentPosition.orientationY == "bottom")
            $(".four").addClass("active-slide");
    }

    /**
     * remove the active slide class
     */
    function removePositionToNavigation() {
        if (lastPosition.orientationX === "left" && lastPosition.orientationY === "top")
            $(".one").removeClass("active-slide");
        if (lastPosition.orientationX === "right" && lastPosition.orientationY == "top")
            $(".two").removeClass("active-slide");
        if (lastPosition.orientationX == "left" && lastPosition.orientationY == "bottom")
            $(".three").removeClass("active-slide");
        if (lastPosition.orientationX == "right" && lastPosition.orientationY == "bottom")
            $(".four").removeClass("active-slide");
    }


    /**
     *  save the last state of the slider, before update
     */
    function saveLastPosition() {
        if (lastPosition.orientationX != currentPosition.orientationX)
            lastPosition.orientationX = currentPosition.orientationX;
        if (lastPosition.orientationY != currentPosition.orientationY)
            lastPosition.orientationY = currentPosition.orientationY;
    }

    /**
     * set the y orientation
     * @param state
     */
    function setOrientationY(state) {
        currentPosition.orientationY = state ? "top" : "bottom";
    }

    /**
     * set the x orientation
     * @param state
     */
    function setOrientationX(state) {
        currentPosition.orientationX = state ? "left" : "right";
    }

    /**
     * Home Home
     */
    function updateIcon() {
        if (currentPosition.orientationX == lastPosition.orientationX) return;
        //if(!setting.addHome) return;
        var homeIcon = $('#icon-home');

        if (currentPosition.orientationX == "left")
            homeIcon.removeClass("icon-right").addClass("icon-left");

        if (currentPosition.orientationX == "right")
            homeIcon.removeClass("icon-left").addClass("icon-right");

    }


    return {
        saveLast: saveLastPosition,
        position: currentPosition,
        update: updateNavigation,
        setY: setOrientationY,
        setX: setOrientationX
        /*
         * ,
         updateHome: updateIcon*/
    }
}());

/*****************/
/*    sliders    */
/*****************/

/**
 *
 */

var slider = (function () {

    var dragV = null;
    var dragH = null;

    var draggieV = null;
    var draggieH = null;

    var dragPosY = 0;
    var dragPosX = 0;

    var dragXWidth = 0;
    var dragYHeight = 0;

    var screenCenter = {
        X: 0,
        Y: 0
    };


    /**
     *
     */
    function getDragPosition() {
        dragPosX = screenCenter.X - dragXWidth;
        dragPosY = screenCenter.Y - dragYHeight;
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragMoveH(instance, event, pointer) {
        moveH(instance.position.x);
    }

    /**
     *
     * @param x
     */
    function moveH(x) {
        dragPosX = x + dragXWidth;
        screenPosition.saveLast();
        screenPosition.setX(screenCenter.X < dragPosX);
        screenPosition.update();
        setSectionPos();
        checkSliderPositionHorizontal(dragXWidth);
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragMoveV(instance, event, pointer) {
        moveV(instance.position.y)
    }

    /**
     *
     * @param y
     */
    function moveV(y) {
        dragPosY = y + dragYHeight;
        screenPosition.saveLast();
        screenPosition.setY(screenCenter.Y < dragPosY);
        screenPosition.update();
        setSectionPos();
        checkSliderPositionVertical(dragYHeight);
    }

    /**
     *
     */
    function setSectionPos() {
        var per = getPercentage();
        var first = "inset(0% " + per.verticalInverted + "% " + per.horizontalInverted + "%  0% )";
        var second = "inset(0% 0% " + per.horizontalInverted + "% " + per.vertical + "% )";
        var third = "inset(" + per.horizontal + "% " + per.verticalInverted + "% 0%  0% )";
        var fourth = "inset(" + per.horizontal + "% 0% 0% " + per.vertical + "%)";
        $(".first").css("-webkit-clip-path", first);
        $(".second").css("-webkit-clip-path", second);
        $(".third").css("-webkit-clip-path", third);
        $(".fourth").css("-webkit-clip-path", fourth);
    }

    /**
     *
     * @returns {{vertical: number, verticalInverted: number, horizontal: number, horizontalInverted: number}}
     */
    function getPercentage() {
        var main = $(".main");
        var widthPos = dragPosX / main.width() * 100;
        var heightPos = dragPosY / main.height() * 100;
        return {
            vertical: widthPos,
            verticalInverted: 100 - widthPos,
            horizontal: heightPos,
            horizontalInverted: 100 - heightPos
        };
    }

    /**
     * ok
     * @param height
     */
    function checkSliderPositionVertical(height) {
        var dv = $('#draggable-v');
        if (dragPosY - height < height)
            dv.addClass("draggable-top");
        else if (dv.hasClass("draggable-top"))
            dv.removeClass("draggable-top");

        if (dragPosY + height > ($(".main").height() - height))
            dv.addClass("draggable-bottom");
        else if (dv.hasClass("draggable-bottom")) {
            dv.removeClass("draggable-bottom");
        }
    }

    /**
     *
     * @param width
     */
    function checkSliderPositionHorizontal(width) {
        var dh = $('#draggable-h');
        if (dragPosX - width < width)
            dh.addClass("draggable-left");
        else if (dh.hasClass("draggable-left"))
            dh.removeClass("draggable-left");

        if (dragPosX + width > ($(".main").width() - width))
            dh.addClass("draggable-right");
        else if (dh.hasClass("draggable-right")) {
            dh.removeClass("draggable-right");
        }
    }

    function onDragEndV(instance, event, pointer){
        updateLockPosition();
        animV(instance.position.y);
    }

    function onDragEndH(instance, event, pointer){
        updateLockPosition();
        animH(instance.position.x);
    }


    /**
     * Q & D
     */
    function updateLockPosition() {
        if(!setting.isScreenLock) return;

        var pos = screenPosition.position;
        var lock = setting.lockScreen;

        /*
         left-top      right-top
         left-bottom   right-bottom
         */

        draggieH.enable();
       // $("#draggable-h").toggle(setting.toggleSliderTime);
        $("#draggable-h").fadeIn(setting.toggleSliderTime, function() {
            // todo
        });
        draggieV.enable();
       // $("#draggable-v").toggle(setting.toggleSliderTime);
        $("#draggable-v").fadeIn(setting.toggleSliderTime, function() {
            // todo
        });

        /**
         *   x c
         *   0 x
         */

        if (pos.orientationX == "right" && pos.orientationY == "top") {
            console.log("right-top");
            if ( lock.orientationY == "top" && lock.orientationX == "left") {
                draggieH.disable();
                //$("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })
            }
            if ( lock.orientationY == "bottom"  && lock.orientationX == "right") {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })
            }
        }

        /**
         *   x 0
         *   c x
         */

        if(pos.orientationX == "left" && pos.orientationY == "bottom") {
            if (lock.orientationY == "top" && lock.orientationX == "left") {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })
            }
            if (lock.orientationY == "bottom"  && lock.orientationX == "right") {
                draggieH.disable();
               // $("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })
            }
        }

        /**
         *   c x
         *   x 0
         */
        if (pos.orientationX == "left" && pos.orientationY == "top" ) {
            if (lock.orientationY == "bottom" && lock.orientationX == "left") {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })
            }
            if (lock.orientationY == "top" && lock.orientationX == "right") {
                draggieH.disable();
               // $("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })

            }
        }

        /**
         *   0 x
         *   x c
         */

        if( pos.orientationX == "right" && pos.orientationY == "bottom") {
            if ( lock.orientationY == "top" && lock.orientationX == "right") {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })
            }
            if ( lock.orientationY == "bottom"  && lock.orientationX == "left") {
                draggieH.disable();
               // $("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function() {
                    // todo
                })
            }
        }
    }

    /**
     * @param currentX
     */
    function animH(currentX) {
        if (screenCenter.X < currentX) {
            var l = screenCenter.X * 2 - dragXWidth*2;
            $("#draggable-h").animate({
                left: l
            }, {
                duration: setting.sliderAnimDuration,
                easing: "linear",
                step: function (now, fx) {
                    console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosX = now+dragXWidth;
                    setSectionPos();
                    checkSliderPositionHorizontal(dragXWidth);
                }
            });
        }
        else {
           // var l = screenCenter.X * 2 - dragXWidth;
            $("#draggable-h").animate({
                left: 0
            }, {
                duration: setting.sliderAnimDuration,
                easing: "linear",
                step: function (now, fx) {
                    console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosX = now+dragXWidth;
                    setSectionPos();
                    checkSliderPositionHorizontal(dragXWidth);
                }
            });
        }
    }

    function animV(currentY) {
        console.log(screenCenter.Y < currentY);
        if (screenCenter.Y < currentY) {
            var b = screenCenter.Y * 2 - dragYHeight*2;
            $("#draggable-v").animate({
                top: b
            }, {
                duration: setting.sliderAnimDuration,
                easing: "linear",
                step: function (now, fx) {
                    console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosY = now+dragYHeight;
                    setSectionPos();
                    checkSliderPositionVertical(dragYHeight);
                }
            });
        }
        else {
            // var l = screenCenter.X * 2 - dragXWidth;
            $("#draggable-v").animate({
                top: 0
            }, {
                duration: setting.sliderAnimDuration,
                easing: "linear",
                step: function (now, fx) {
                    console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosY = now+dragYHeight;
                    setSectionPos();
                    checkSliderPositionVertical(dragYHeight);
                }
            });
        }
    }


    /**
     *
     */
    function init() {
        if (setting.slideVertical) {
            dragV = document.querySelector('#draggable-v');

            draggieV = new Draggabilly(dragV, {
                axis: 'y',
                containment: '.main'
            });

            draggieV.on('dragMove', onDragMoveV);
            draggieV.on('dragEnd', onDragEndV);

            dragYHeight = $('#draggable-v').height() / 2;
        }

        if (setting.slideHorizontal) {
            dragH = document.querySelector('#draggable-h');

            draggieH = new Draggabilly(dragH, {
                axis: 'x',
                containment: '.main'
            });

            draggieH.on('dragMove', onDragMoveH);
            draggieH.on('dragEnd',onDragEndH);

            dragXWidth = $('#draggable-h').width() / 2;
        }

        // $('#draggable-h').css("left", dragPosX);
        //  $("#draggable-v").css("top", dragPosY);
    }

    function updateCenter() {
        var main = $('.main');
        screenCenter.X = main.width() / 2;
        screenCenter.Y = main.height() / 2;
    }

    return {
        register: init,
        getPos: getDragPosition,
        screenCenter: screenCenter,
        updateCenter: updateCenter
    }

}());


/*****************/
/*  fullscreen   */
/*****************/

var fullscreen = (function () {
    function setTo(obj) {
        var width = $(window).width();
        var height = $(window).height();

        $(obj).css("min-width", width + "px");
        $(obj).css("min-height", height + "px");
    }

    return {
        setTo: setTo
    }

}());


/*****************/
/*   add HTML    */
/*****************/

var addHTML = (function () {
    function addPosition() {
        $("section").last()
            .after('<nav class="navigation">' +
            '<div class="position one"></div>' +
            '<div class="position two"></div>' +
            '<div class="position three"></div>' +
            '<div class="position four"></div>' +
            '<a href="index.html"><div class="homelink"></div></a>'+
            '<div class="title">' +
            '<h2 class="header artist-name">Franz Mattuschka</h2>' +
            '<h3 class="header artist-title">Prozesse</h3>' +
            '</div>' +
            '</nav>');
    }

    function addVertical() {
        $("section").last()
            .after('<div id="draggable-v" class="draggable draggable-vertical"></div>');
    }

    function addHorizontal() {
        $("section").last()
            .after('<div id="draggable-h" class="draggable draggable-horizontal"></div>');
    }

    function addHomeIcon() {
        $("section").first()
            .before('<a href="#">' +
            '<span id="icon-home" class="glyphicon glyphicon-align-left icon-home icon-rotate icon-right"></span>' +
            '</a>');
    }

    function createBeacon () {
        $("section").first()
            .before('<section class="beacon-container" style="display: none";>' +
            '<div class="beacon" >' +
            '<div class="ping ping1"></div>' +
            '<div class="ping ping2"></div>' +
            '<div class="ping ping3"></div>' +
            '</div>' +
            '</section>');

        $(".beacon-container")
            .after('<section class="beacon-container">' +
            '<div class="beacon-tooltip" style="display: none;">click me!</div>' +
            '</section>');

        setTimeout(function() {
            $(".beacon-container").fadeIn(setting.fadeInTime, function() {
                // todo
            })
        }, setting.showBeaconAfter);

        setTimeout(function() {
            $(".beacon-tooltip").fadeIn(setting.fadeInTime, function() {
                // todo
            })
        }, setting.showBeaconAfter+setting.showBeaconTooltipAfter);

        $(".beacon-container").click(function() {
            $(this).fadeOut(setting.fadeOutTime, function() {
                // TODO: Animation complete.
            });
        });
    }

    return {
        addPosition: addPosition,
        addVertical: addVertical,
        addHorizontal: addHorizontal,
        addHomeIcon: addHomeIcon,
        addBeacon : createBeacon
    }

}());


/*****************/
/*      init     */
/*****************/

/* init functions on document ready */

$(window).ready(function () {

    fullscreen.setTo(".main");

    if (setting.showBeacon)
        addHTML.addBeacon();

    if (setting.addHome)
        addHTML.addPosition();

    if (setting.slideVertical)
        addHTML.addVertical();

    if (setting.slideHorizontal)
        addHTML.addHorizontal();

    slider.register();
    slider.getPos();
    //screenPosition.update();

    slider.updateCenter();
});

$(window).resize(function () {
    fullscreen.setTo(".main");
    slider.updateCenter();
});


/********/
/*  TODO */
/*
 Snapping
 seiten ausblendbar
 Bugfixes
 */

