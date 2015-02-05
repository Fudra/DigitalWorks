/*****************/
/*    sliders    */
/*****************/

/**
 *
 */
var slider = (function () {

    var dragV = document.querySelector('#draggable-v');
    var dragH = document.querySelector('#draggable-h');

    var dragPosY = 0;
    var dragPosX = 0;

    /**
     *
     * @type {Window.Draggabilly}
     */
    var draggieV = new Draggabilly(dragV, {
        axis: 'y',
        containment: '.main'
    });

    /**
     *
     * @type {Window.Draggabilly}
     */
    var draggieH = new Draggabilly(dragH, {
        axis: 'x',
        containment: '.main'
    });

    /**
     *
     */
    function getDragPosition() {
        dragPosX = $('.main').width() / 2 - $('#draggable-h').width() / 2;
        dragPosY = $('.main').height() / 2 - $('#draggable-v').height() / 2;
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragMoveH(instance, event, pointer) {
        var v = $('#draggable-h').width() / 2;
        dragPosX = instance.position.x + v;
        var centerWidth = $(".main").width() / 2;
        screenPosition.saveLast();
        screenPosition.setX(centerWidth < dragPosX);
        screenPosition.update();
        setSectionPos();
        checkSliderPositionHorizontal(v);
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragMoveV(instance, event, pointer) {
        var h = $('#draggable-v').height() / 2;
        dragPosY = instance.position.y + h;
        var centerHeight = $(".main").height() / 2;
        screenPosition.saveLast();
        screenPosition.setY(centerHeight < dragPosY);
        screenPosition.update();
        setSectionPos();
        checkSliderPositionVertical(h);
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
        var widthPos = dragPosX / $(".main").width() * 100;
        var heightPos = dragPosY / $(".main").height() * 100;
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

        if (dragPosX + width> ($(".main").width() - width))
            dh.addClass("draggable-right");
        else if (dh.hasClass("draggable-right")) {
            dh.removeClass("draggable-right");
        }
    }

    /**
     *
     */
    function init() {
        // $('#draggable-h').css("left", dragPosX);
        //  $("#draggable-v").css("top", dragPosY);

        draggieV.on('dragMove', onDragMoveV);
        draggieH.on('dragMove', onDragMoveH);
    }

    return {
        register: init,
        getPos: getDragPosition
    }

}());

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
     * TODO
     */
    function animateSlider() {
        if (currentPosition.orientationX == lastPosition.orientationX) return;

        if (currentPosition.orientationX == "left") {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        }
        if (currentPosition.orientationX == "right") {

        }
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
     *
     */
    function updateIcon() {
        if (currentPosition.orientationX == lastPosition.orientationX) return;
        if (currentPosition.orientationX == "left") {
            $('#icon-home').removeClass("icon-right").addClass("icon-left");
        }

        if (currentPosition.orientationX == "right") {
            $('#icon-home').removeClass("icon-left").addClass("icon-right");
        }
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
/*      init     */
/*****************/

/* init functions on document ready */

$(window).ready(function () {
    slider.register();
    slider.getPos();
    //screenPosition.update();
    fullscreen.setTo(".main");
});

$(window).resize(function () {
    fullscreen.setTo(".main");
});


/********/
/*  TODO */
/*
         Snapping
         seiten ausblendbar
         Bugfixes
 */

