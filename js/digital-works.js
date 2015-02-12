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
        if (currentPosition.orientationX == "left" && currentPosition.orientationY == "top") {
            $(".one").addClass("active-slide");
        }

        if (currentPosition.orientationX == "right" && currentPosition.orientationY == "top") {
            $(".two").addClass("active-slide");
        }

        if (currentPosition.orientationX == "left" && currentPosition.orientationY == "bottom") {
            $(".three").addClass("active-slide");
        }

        if (currentPosition.orientationX == "right" && currentPosition.orientationY == "bottom") {
            $(".four").addClass("active-slide");
        }
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
        cookie.create("side", currentPosition.orientationX , 1);
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


    var sliderPosition = {
        x: "right",
        y: "top"
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
     * setzt die Maske der einzelnen sections
     */
    function setSectionPos() {
        var per = getPercentage();
        var first = "inset(0% " + per.verticalInverted + "% " + per.horizontalInverted + "%  0% )";
        var second = "inset(0% 0% " + per.horizontalInverted + "% " + per.vertical + "% )";
        var third = "inset(" + per.horizontal + "% " + per.verticalInverted + "% 0%  0% )";
        var fourth = "inset(" + per.horizontal + "% 0% 0% " + per.vertical + "%)";

        //console.log("first: " + first);
        //console.log("second: " + second);
        $(".first").css("-webkit-clip-path", first);
        $(".second").css("-webkit-clip-path", second);
        $(".third").css("-webkit-clip-path", third);
        $(".fourth").css("-webkit-clip-path", fourth);

        updateSectionVisibility();
    }

    /**
     *
     * @returns {{vertical: number, verticalInverted: number, horizontal: number, horizontalInverted: number}}
     */
    function getPercentage() {
        var main = $(".main");

        var widthPos = setting.slideHorizontal ? (dragPosX / main.width() * 100) : 99.9;
        var heightPos = setting.slideVertical ? (dragPosY / main.height() * 100) : 99.9;

        return {
            vertical: widthPos,
            verticalInverted: 100 - widthPos,
            horizontal: heightPos,
            horizontalInverted: 100 - heightPos
        };
    }

    /**
     * Prüft ob sich der Slider Oben oder Unten befindet
     * @param height
     */
    function checkSliderPositionVertical(height) {
        var dv = $('#draggable-v');
        if (dragPosY - height < height) {
            dv.addClass("draggable-top");
            sliderPosition.y = "bottom";
        }
        else if (dv.hasClass("draggable-top")) {
            dv.removeClass("draggable-top");
            sliderPosition.y = "";
        }


        if (dragPosY + height > ($(".main").height() - height)) {
            dv.addClass("draggable-bottom");
            sliderPosition.y = "top";

        }

        else if (dv.hasClass("draggable-bottom")) {
            dv.removeClass("draggable-bottom");
            sliderPosition.y = "";

        }
    }

    /**
     * Prüft ob sich der Slider Links oder Rechts befindet
     * @param width
     */
    function checkSliderPositionHorizontal(width) {
        var dh = $('#draggable-h');
        if (dragPosX - width < width) {
            dh.addClass("draggable-left");
            sliderPosition.x = "right";
        }

        else if (dh.hasClass("draggable-left")) {
            dh.removeClass("draggable-left");
            sliderPosition.x = "";
        }

        if (dragPosX + width > ($(".main").width() - width)) {
            dh.addClass("draggable-right");
            sliderPosition.x = "left";
        }

        else if (dh.hasClass("draggable-right")) {
            dh.removeClass("draggable-right");
            sliderPosition.x = "";
        }
    }


    /**
     * TODO Q & D
     */
    function updateSectionVisibility() {
//        console.log(sliderPosition.x , sliderPosition.y);
        var fadetime = 100;
        if (!setting.slideVertical) {
            if (sliderPosition.x == "left") {
                $("#first").fadeOut(fadetime);
                $("#second").fadeIn(fadetime);
            } else if (sliderPosition.x == "right") {
                $("#first").fadeIn(fadetime);
                $("#second").fadeOut(fadetime);
            } else {
                $("#first").fadeIn(fadetime);
                $("#second").fadeIn(fadetime);
                $("#third").fadeOut(fadetime);
                $("#fourth").fadeOut(fadetime);
            }
        }
        else {
            if (sliderPosition.y == "top" && sliderPosition.x == "left") {
                $("#first").fadeIn();
                $("#second").fadeOut();
                $("#third").fadeOut();
                $("#fourth").fadeOut();
            } else if (sliderPosition.y == "top" && sliderPosition.x == "right") {
                $("#first").fadeOut();
                $("#second").fadeIn();
                $("#third").fadeOut();
                $("#fourth").fadeOut();
            } else if (sliderPosition.y == "bottom" && sliderPosition.x == "left") {
                $("#first").fadeOut();
                $("#second").fadeOut();
                $("#third").fadeIn();
                $("#fourth").fadeOut();
            } else if (sliderPosition.y == "bottom" && sliderPosition.x == "right") {
                $("#first").fadeOut();
                $("#second").fadeOut();
                $("#third").fadeOut();
                $("#fourth").fadeIn();
            } else {
                $("#first").fadeIn();
                $("#second").fadeIn();
                $("#third").fadeIn();
                $("#fourth").fadeIn();
            }
        }
    }

    function onDragEndV(instance, event, pointer) {
        updateLockPosition();
        animV(instance.position.y);
    }

    function onDragEndH(instance, event, pointer) {
        updateLockPosition();
        animH(instance.position.x);
    }


    /**
     * Q & D
     */
    function updateLockPosition() {
        if (!setting.isScreenLock) return;

        var pos = screenPosition.position;
        var lock = setting.lockScreen;

        /*
         left-top      right-top
         left-bottom   right-bottom
         */

        if (setting.slideHorizontal) {
            draggieH.enable();
            // $("#draggable-h").toggle(setting.toggleSliderTime);
            $("#draggable-h").fadeIn(setting.toggleSliderTime, function () {
                // todo
            });
        }
        if (setting.slideVertical) {
            draggieV.enable();
            // $("#draggable-v").toggle(setting.toggleSliderTime);
            $("#draggable-v").fadeIn(setting.toggleSliderTime, function () {
                // todo
            });
        }

        /**
         *   x c
         *   0 x
         */

        if (pos.orientationX == "right" && pos.orientationY == "top") {

            if (lock.orientationY == "top" && lock.orientationX == "left" && setting.slideHorizontal) {
                draggieH.disable();
                //$("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function () {
                    // todo
                })
            }
            if (lock.orientationY == "bottom" && lock.orientationX == "right" && setting.slideVertical) {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function () {
                    // todo
                })
            }
        }

        /**
         *   x 0
         *   c x
         */

        if (pos.orientationX == "left" && pos.orientationY == "bottom") {

            if (lock.orientationY == "top" && lock.orientationX == "left" && setting.slideVertical) {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function () {
                    // todo
                })
            }
            if (lock.orientationY == "bottom" && lock.orientationX == "right" && setting.slideHorizontal) {
                draggieH.disable();
                // $("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function () {
                    // todo
                })
            }
        }

        /**
         *   c x
         *   x 0
         */
        if (pos.orientationX == "left" && pos.orientationY == "top") {

            if (lock.orientationY == "bottom" && lock.orientationX == "left" && setting.slideVertical) {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function () {
                    // todo
                })
            }
            if (lock.orientationY == "top" && lock.orientationX == "right" && setting.slideHorizontal) {
                draggieH.disable();
                // $("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function () {
                    // todo
                })
            }
        }

        /**
         *   0 x
         *   x c
         */

        if (pos.orientationX == "right" && pos.orientationY == "bottom") {

            if (lock.orientationY == "top" && lock.orientationX == "right" && setting.slideVertical) {
                draggieV.disable();
                //$("#draggable-v").toggle(setting.toggleSliderTime);
                $("#draggable-v").fadeOut(setting.toggleSliderTime, function () {
                    // todo
                })
            }
            if (lock.orientationY == "bottom" && lock.orientationX == "left" && setting.slideHorizontal) {
                draggieH.disable();
                // $("#draggable-h").toggle(setting.toggleSliderTime);
                $("#draggable-h").fadeOut(setting.toggleSliderTime, function () {
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
            var l = screenCenter.X * 2 - dragXWidth * 2;
            $("#draggable-h").animate({
                left: l
            }, {
                duration: setting.sliderAnimDuration,
                easing: setting.sliderEasing,
                step: function (now, fx) {
                    //console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosX = now + dragXWidth;
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
                easing: setting.sliderEasing,
                step: function (now, fx) {
                    //console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosX = now + dragXWidth;
                    setSectionPos();
                    checkSliderPositionHorizontal(dragXWidth);
                }
            });
        }
    }

    function animV(currentY) {
        // console.log(screenCenter.Y < currentY);
        if (screenCenter.Y < currentY) {
            var b = screenCenter.Y * 2 - dragYHeight * 2;
            $("#draggable-v").animate({
                top: b
            }, {
                duration: setting.sliderAnimDuration,
                easing: setting.sliderEasing,
                step: function (now, fx) {
                    //console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosY = now + dragYHeight;
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
                easing: setting.sliderEasing,
                step: function (now, fx) {
                    //console.log(fx.elem.id + " " + fx.prop + ": " + now);
                    dragPosY = now + dragYHeight;
                    setSectionPos();
                    checkSliderPositionVertical(dragYHeight);
                }
            });
        }
    }

    function updateCenter() {
        var main = $('.main');
        screenCenter.X = main.width() / 2;
        screenCenter.Y = main.height() / 2;
    }


    function setStartPosition() {
        // console.log("setStartPosition");
        updateCenter();
        // console.log("screen : " +  screenCenter.X*2 + " "  + screenCenter.Y*2);

        if (setting.startScreen.orientationX == "left" && setting.startScreen.orientationY == "top") {
            //console.log("left-top");
            if (setting.slideVertical) {
                //console.log("slideVertical");
                var b = screenCenter.Y * 2 - dragYHeight * 2;
                $("#draggable-v").animate({
                    top: b
                }, {
                    duration: setting.startScreenAnimDuration,
                    easing: "linear",
                    step: function (now, fx) {
                        console.log(fx.elem.id + " " + fx.prop + ": " + now);
                        dragPosY = now + dragYHeight;
                        setSectionPos();
                        checkSliderPositionVertical(dragYHeight);
                        screenPosition.saveLast();
                        screenPosition.setY(screenCenter.Y < dragPosY);
                        screenPosition.update();
                    }
                });
            }

            if (setting.slideHorizontal) {
                //console.log("slideHorizontal");
                var l = screenCenter.X * 2 - dragXWidth * 2;
                $("#draggable-h").animate({
                    left: l
                }, {
                    duration: setting.startScreenAnimDuration,
                    easing: "linear",
                    step: function (now, fx) {
                        //console.log(fx.elem.id + " " + fx.prop + ": " + now);
                        dragPosX = now + dragXWidth;
                        //console.log("currentDragPoxX: " + dragPosX);
                        setSectionPos();
                        checkSliderPositionHorizontal(dragXWidth);
                        screenPosition.saveLast();
                        screenPosition.setX(screenCenter.X < dragPosX);
                        screenPosition.update();
                    }
                });
            }
        }

        if (setting.startScreen.orientationX == "right" && setting.startScreen.orientationY == "top") {
            //console.log("right-top");
            if (setting.slideVertical) {
                var b = screenCenter.Y * 2 - dragYHeight * 2;
                $("#draggable-v").animate({
                    top: b
                }, {
                    duration: setting.startScreenAnimDuration,
                    easing: "linear",
                    step: function (now, fx) {
                        //console.log(fx.elem.id + " " + fx.prop + ": " + now);
                        dragPosY = now + dragYHeight;
                        setSectionPos();
                        checkSliderPositionVertical(dragYHeight);
                        screenPosition.saveLast();
                        screenPosition.setY(screenCenter.Y < dragPosY);
                        screenPosition.update();
                    }
                });
            }

            if (setting.slideHorizontal) {
                $("#draggable-h").animate({
                    left: 0
                }, {
                    duration: setting.startScreenAnimDuration,
                    easing: "linear",
                    step: function (now, fx) {
                        //console.log(fx.elem.id + " " + fx.prop + ": " + now);
                        dragPosX = now + dragXWidth;
                        setSectionPos();
                        checkSliderPositionHorizontal(dragXWidth);
                        screenPosition.saveLast();
                        screenPosition.setX(screenCenter.X < dragPosX);
                        screenPosition.update();
                    }
                });
            }
        }
    }

    /**
     * use only one Slider
     */
    function useOneSlider() {
        if (!setting.slideVertical) {
            dragPosY = (screenCenter.Y * 2) - dragYHeight;
        }
        if (!setting.slideHorizontal) {
            dragPosX = screenCenter.X * 2 - dragXWidth;
        }

        //console.log(dragPosY);

        setSectionPos();
    }

    /**
     * TODO::
     */
    function updateProgressOnDiscover(progress) {

        // position oben rechts -> discover page
        if (screenPosition.position.orientationX == "right" && screenPosition.position.orientationY == "top") {
            // progress element hinzufügen
            if ((".main").has(".progress")) {
                // update progressbar
                $(".progress").css("width", progress + "%");
            }
            else
                $("section").after('<div class="progress basic-color"></div>');
            // wenn 100% enable screen lock
            // update
            if (progress == 100) {
                setting.isScreenLock = false;
                updateLockPosition();
            }

        }
        else {
            // progress element entfernen
            $(".progress").remove();
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
            draggieH.on('dragEnd', onDragEndH);

            dragXWidth = $('#draggable-h').width() / 2;
        }
        setStartPosition();
        // $('#draggable-h').css("left", dragPosX);
        //  $("#draggable-v").css("top", dragPosY);
    }

    /**
     * Animation, nachdem auf dem Beacon geklickt wurde.
     */
    function animateOnStartUp() {
        $(".first").fadeIn(setting.fadeInTime, function () {
            $(".location").animate({
                width: $(".main").width()
            }, {
                duration: (setting.sliderAnimDuration * 1.473),
                easing: setting.startAnimEasing,
                step: function (now, fx) {
                    setMaskOnStartUp(now);
                },
                complete: function () {
                    $(".second").css("display", "block");
                    $(this).animate({
                        width: $(".main").width() / 2
                    }, {
                        duration: (setting.sliderAnimDuration * 1),
                        easing: setting.startAnimEasing,
                        step: function (now, fx) {
                            setMaskOnStartUp(now);
                        },
                        complete: function () {
                            $(".draggable").css("left", screenCenter.X - $(".draggable").width() / 2)
                                .addClass("draggable-right")
                                .fadeIn(setting.fadeInTime, function () {
                                    // todo
                                    console.log("LegoMeisterLP");
                                })
                        }
                    });
                }
            });
        })
    }

    function setMaskOnStartUp(value) {
        var per = value / $(".main").width() * 100;
        per = per < 0.5 ? .5 : per;
        per = per > 99.5 ? 99.5 : per;
        var first = "inset(0% " + (100 - per) + "% 0% 0% )";
        var second = "inset(0% 0% 0% " + per + "% )";

        //console.log("first: " + first);
        //console.log("second: " + second);
        $(".first").css("-webkit-clip-path", first);
        $(".second").css("-webkit-clip-path", second);
    }


    return {
        register: init,
        getPos: getDragPosition,
        screenCenter: screenCenter,
        updateCenter: updateCenter,
        useOneSlider: useOneSlider,
        animateOnStartUp: animateOnStartUp,
        updateProgressOnDiscover: updateProgressOnDiscover,
        sliderPosition: sliderPosition
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
            '<a href="index.html"><div class="homelink"></div></a>' +
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

    function createBeacon() {
        $("section").css("display", "none").first()
            .before('<section class="beacon-container" style="display: none">' +
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

        setTimeout(function () {
            $(".beacon-container").fadeIn(setting.fadeInTime, function () {
                // todo
            })
        }, setting.showBeaconAfter);

        setTimeout(function () {
            $(".beacon-tooltip").fadeIn(setting.fadeInTime, function () {
                // todo
            })
        }, setting.showBeaconAfter + setting.showBeaconTooltipAfter);

        $(".beacon-container").click(function () {
            $(".beacon-container").fadeOut(setting.fadeOutTime, function () {
                // TODO: Animation complete.
                slider.animateOnStartUp();
            });
        });

        $(".draggable").css("display", "none");
    }

    function createImprintAndAboutUs() {
        // TODO:
        $("section").last()
            .after(
            '<span class="footnote imprint"><a href="../imprint.html">Impressum</a></span>' +
            '<span class="footnote about"><a href="../about.html">About Us</a></span>');
    }


    return {
        addPosition: addPosition,
        addVertical: addVertical,
        addHorizontal: addHorizontal,
        addHomeIcon: addHomeIcon,
        addBeacon: createBeacon,
        addImprintAndAboutUs: createImprintAndAboutUs
    }

}());


/*****************/
/*     COOKIE    */
/*****************/
var cookie = {
    create: function (name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    read: function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }
};

/*****************/
/*      init     */
/*****************/

/* init functions on document ready */

$(window).ready(function () {


    slider.updateProgressOnDiscover(30);
    fullscreen.setTo(".main");
    slider.updateCenter();
    slider.sliderPosition.x = setting.startScreen.orientationX == "left" ? "right" : "left";
    slider.sliderPosition.y = setting.startScreen.orientationY == "top" ? "bottom" : "top";

    console.log("setting:  ", setting.startScreen.orientationX, setting.startScreen.orientationY);

   // if ($(".location").hasClass("top-left")) {
    if ( cookie.read("side") == "left") {
        setting.startScreen.orientationX = "left";
        setting.startScreen.orientationY = "top";
    }

    //if ($(".location").hasClass("top-right")) {
    if ( cookie.read("side") == "right") {
        setting.startScreen.orientationX = "right";
        setting.startScreen.orientationY = "top";
    }

    if (setting.addHome)
        addHTML.addPosition();

    if (setting.slideVertical)
        addHTML.addVertical();
    else
        slider.useOneSlider();

    if (setting.slideHorizontal)
        addHTML.addHorizontal();
    else
        slider.useOneSlider();

    if (setting.showBeacon)
        addHTML.addBeacon();

    if (setting.showImprintAndAboutUs)
        addHTML.addImprintAndAboutUs();


    slider.register();
    slider.getPos();
    //screenPosition.update();
});

$(window).resize(function () {
    fullscreen.setTo(".main");
    slider.updateCenter();
});
