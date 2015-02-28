/******************/
/*    Assets      */
/******************/
var assets = (function () {

    var screenCenter = {
        x: 0,
        y: 0
    };

    var screen = {
        width: 0,
        height: 0
    };

    /**
     *
     */
    function readUrl() {
        //  Artist id
        global.id = (QueryString.id != undefined) ? QueryString.id : 0;
        //  use beacon animation
        if (QueryString.beacon != undefined)
            global.useBeaconAnimation = QueryString.beacon != "false";
        // slider position
        //global.position.x = (QueryString.x != undefined) ? QueryString.x : "left";
        //global.position.y = (QueryString.y != undefined) ? QueryString.y : "top";
        //lock section
        //global.isSectionLock = (QueryString.lock != undefined) ? QueryString.lock : true;

        // read hash
        var hash = window.location.hash;
        if (hash != '') {
            global.currentSection = hash.substring(1, hash.length);
        }

    }

    /**
     *
     * @param obj
     */
    function fullscreen(obj) {
        var $window = $(window);
        screen.width = $window.width();
        screen.height = $window.height();
        screenCenter.x = screen.width / 2;
        screenCenter.y = screen.height / 2;

        $(obj).css("width", screen.width + "px"); // removed min-prefix
        $(obj).css("height", screen.height + "px");
    }

    /**
     *
     */
    function updateUrl() {
        window.location.hash = global.currentSection;
        var params = '&beacon=false';
        $(".owner > a").each(function () {
            var _href = $(this).attr("href");

            var id = _href.substring(_href.indexOf('?'), "?id=0".length);
            //console.log(_href, id);

            $(this).attr("href", id + params + "#" + global.currentSection);
        });
    }

    /**
     *
     */
    function insertNbspIntoCaption() {
        var $caption = $(".caption");
        $caption.each(function(index) {
            var html = $caption.get(index).innerHTML;
            if(html == " " || html == "")
                $caption.get(index).innerHTML = "&nbsp;";
        });
    }

    return {
        readUrl: readUrl,
        updateUrl: updateUrl,
        fullscreen: fullscreen,
        screenCenter: screenCenter,
        screen: screen,
        insertNbspIntoCaption: insertNbspIntoCaption
    }

}());


function test(state) {
    console.log(state);
    console.log("id: " + global.id);
    console.log("useBeaconAnimation: " + global.useBeaconAnimation);
    console.log("position: ", global.position.x, global.position.y);
    console.log("lock: " + global.isSectionLock);
}

/******************/
/*   Template    */
/******************/

/**
 * Template object which build the layout of the page
 * @return  render function
 */

var templateSystem = (function () {

    /**
     * renders the landing page
     */
    function landingPage() {
        sectionRender('templates/landing-page.mst', 'first', content.titles[0].name);
        sectionRender('templates/landing-page.mst', 'second', content.titles[1].name);
        footnote();
        renderBeacon();
    }

    /**
     * renders the home icon
     */
    function home() {
        $.get('templates/homeicon.mst', function (template) {
            var home = Mustache.render(template, content);
            $("section").first().before(home);
        })
    }

    /**
     * Renders a beacon if the global variable useBeaconAnimation is set on true
     */
    function renderBeacon() {
        if (global.useBeaconAnimation) {
            $.get('templates/beacon.mst', function (template) {
                var beacon = Mustache.render(template, content);
                $(".wrapper").append(beacon);

            })
        }
    }

    /**
     * Add the about us and imprint section to the DOM element
     */
    function footnote() {
        $.get('templates/footnote.mst', function (template) {
            var footer = Mustache.render(template, content);
            $('.wrapper').append(footer);
        })
    }

    /**
     * the function renders a template within the HTML section
     *
     * @param templatename the template to be rendered (string)
     * @param type the id of the html section element  (string)
     * @param heading the heading string
     */

    function sectionRender(templatename, type, heading) {

        $.get('templates/section.mst', function (template) {
            var section = Mustache.render(template, {id: type});
            $(".wrapper").append(section);
            $.get(templatename, function (template) {
                    var rendered = Mustache.render(template, content);
                    $("#".concat(type).concat(" .inner")).append(rendered);
                }
            )
        });
        if (heading !== undefined) {
            $.get('templates/headline.mst', function (template) {
                var head = Mustache.render(template, {headline: heading});
                $("#".concat(type).concat(" .inner")).append(head);
            });
        }
    }

    /**
     * Renders the Gallerypage of the project Digital Works
     * 2015
     */

    function renderGalleryPage() {
        sectionRender('templates/avatar.mst', 'first');
        sectionRender('templates/discover.mst', 'second');
        sectionRender('templates/background.mst', 'third');
        sectionRender('templates/gallery.mst', 'fourth');
        home();
    }

    /**
     * checks if a id is in within the url and returns
     * the gallery view of the given id,
     * if no id is in the url or the id is not between 1 and 4
     * the landing page is rendered
     */
    function render() {
        if (global.id >= 1 && global.id <= 4) {
            renderGalleryPage();
        } else {
            landingPage();
        }
    }


    return {
        render: render
    }

}());

/******************/
/*   add HTML     */
/******************/

var addHTML = (function () {
    function addVerticalSlider() {
        $("section").last()
            .after('<div id="slider-vertical" class="slider slider-vertical"></div>');
    }

    function addHorizontalSlider() {
        $("section").last()
            .after('<div id="slider-horizontal" class="slider slider-horizontal"></div>');
    }

    return {
        addVerticalSlider: addVerticalSlider,
        addHorizontalSlider: addHorizontalSlider
    }
}());


/******************/
/*    beacon      */
/******************/

var beacon = (function () {

    function init() {
        console.log("beacon: " + !global.useBeaconAnimation);
        if (!global.useBeaconAnimation || global.id != 0) {
            console.log("beacon: " +  global.useBeaconAnimation);
            $(".screen").fadeIn(config.wrapperFadeInDuration);
            $(".footnote").fadeIn(config.wrapperFadeInDuration);
            return;
        }

        setTimeout(function () {
            beacon();
        }, config.timeout * 2);

    }

    function beacon() {
        $(".beacon-container").fadeIn(config.beaconFadeInDuration).on("click", function () {
            $(this).fadeOut(config.beaconFadeOutDuration, function () {
                animate();
            });
        });
        $(".beacon-tooltip")
            .delay(config.beaconFadeInDuration + config.beaconToolTipFadeInDelay)
            .fadeIn(config.beaconToolTipFadeInDuration);
    }

    function animate() {

        var timeout = config.sliderAnimDuration * .1;
        animOnTimeout(-50, config.animDividerOnResize * 10, timeout, "#first");
        timeout += config.sliderAnimDuration * 2;

        animOnTimeout(assets.screen.width - slider.slider.width / 2, 1, timeout, "#second");
        timeout += config.sliderAnimDuration * .7;
        animOnTimeout(assets.screenCenter.x, config.animDividerOnResize, timeout, undefined, true);
        timeout += config.animDividerOnResize*3;
        $(".footnote").fadeIn(config.wrapperFadeInDuration);
    }

    function animOnTimeout(target, divider, timeout, show, sliderCenter) {
        setTimeout(function () {
            slider.animateHorizontal(target, divider, show, sliderCenter);
        }, timeout);
    }


    return {
        init: init
    }
}());

/******************/
/*    slider      */
/******************/
var slider = (function () {

    var slider = {
        horizontal: "",
        vertical: "",
        width: 0,
        height: 0
    };

    /**
     * set the  slider position to the css and update home icon
     * @param slider
     * @param pos
     */
    function moveSlider(slider, pos) {
        $(slider).css(pos);
        updateHomeIcon();
    }

    /**
     * register the vertical slider
     */
    function registerVertical() {
        var selector = "#slider-vertical";
        moveSlider(selector, {"left": "0px", "top": "0px"});

        var element = document.querySelector(selector);
        slider.vertical = new Draggabilly(element, {
            axis: 'y',
            containment: '.wrapper'
        });

        slider.vertical.on("dragMove", onDragMoveVertical);
        slider.vertical.on("dragEnd", onDragEndVertical);

        slider.height = $(selector).height();
    }

    /**
     * register the horizontal slider
     */
    function registerHorizontal() {
        var selector = "#slider-horizontal";
        moveSlider(selector, {"left": "0px", "top": "0px"});

        var element = document.querySelector(selector);
        slider.horizontal = new Draggabilly(element, {
            axis: 'x',
            containment: '.wrapper'
        });

        slider.width = $(selector).width();

        slider.horizontal.on("dragMove", onDragMoveHorizontal);
        slider.horizontal.on("dragEnd", onDragEndHorizontal);
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragMoveHorizontal(instance, event, pointer) {
        moveHorizontal(instance.position.x);
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragEndHorizontal(instance, event, pointer) {
        if (global.position.x == "right")
            animateHorizontal(0);
        else
            animateHorizontal(assets.screen.width - slider.width);
    }

    /**
     * the horizontal Slider behavior
     * @param position
     */
    function moveHorizontal(position) {
        var width = position + slider.width / 2;
        moveSlider("#first", {"width": width + "px"});
        moveSlider("#third", {"width": width + "px"});

        $("#slider-horizontal").removeClass("slider-right slider-left");

        global.position.x = (position < assets.screenCenter.x) ? "right" : "left";
        checkCurrentSliderPosition();

        showAll();

        // check if slider is right
        if (position >= assets.screen.width - slider.width) {
            $("#slider-horizontal").addClass("slider-right");
            hideAllAndShowCurrent();
        }

        // check if slider is left
        if (position <= slider.width) {
            $("#slider-horizontal").addClass("slider-left");
            hideAllAndShowCurrent();
        }

        assets.updateUrl();
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragMoveVertical(instance, event, pointer) {
        moveVertical(instance.position.y);
    }

    /**
     *
     * @param instance
     * @param event
     * @param pointer
     */
    function onDragEndVertical(instance, event, pointer) {
        if (global.position.y == "bottom")
            animateVertical(0);
        else
            animateVertical(assets.screen.height);
    }

    /**
     * the vertical slider behavior
     * @param position
     */
    function moveVertical(position) {
        var height = position + slider.height / 2;
        moveSlider("#first", {"height": height + "px"});
        moveSlider("#second", {"height": height + "px"});

        $("#slider-vertical").removeClass("slider-top slider-bottom");

        global.position.y = (position < assets.screenCenter.y) ? "bottom" : "top";
        checkCurrentSliderPosition();

        showAll();

        if (position >= assets.screen.height - slider.height) {
            $("#slider-vertical").addClass("slider-bottom");
            hideAllAndShowCurrent();
        }
        if (position <= slider.height) {
            $("#slider-vertical").addClass("slider-top");
            hideAllAndShowCurrent();
        }

        assets.updateUrl();
    }

    /**
     * check the current slider position and updates the global.currentSection
     */
    function checkCurrentSliderPosition() {
        if (global.position.y == "top") {
            global.currentSection = (global.position.x == "left") ? "first" : "second";
        }
        if (global.position.y == "bottom") {
            global.currentSection = (global.position.x == "left") ? "third" : "fourth";
        }
    }

    /**
     * hide all sections and reveal the active one
     */
    function hideAllAndShowCurrent() {
        $("section").addClass("hide");
        $("#" + global.currentSection).removeClass("hide");
    }

    /**
     *  show all sections
     */
    function showAll() {
        $("section").removeClass("hide");
    }


    /**
     *
     * @param target
     */
    function animateVertical(target, divider) {
        var div = (divider !== undefined) ? divider : 1;
        $("#slider-vertical").animate({
            top: target
        }, {
            duration: config.sliderAnimDuration / div,
            easing: config.sliderEasing,
            step: function (now, fx) {
                moveVertical(now);
            }
        });
    }

    /**
     *
     * @param target
     */
    function animateHorizontal(target, divider, showOnComplete, sliderCenter) {
        var div = (divider !== undefined) ? divider : 1;
        $("#slider-horizontal").animate({
            left: target
        }, {
            duration: config.sliderAnimDuration / div,
            easing: config.sliderEasing,
            step: function (now, fx) {
                moveHorizontal(now);
            },
            complete: function () {
                if (showOnComplete !== undefined) {
                    $(showOnComplete).show();
                }
                if(sliderCenter !== undefined  && sliderCenter) {
                    $("#slider-horizontal").addClass("slider-left slider-right");
                }
            }
        });
    }


    /**
     * slider registration
     */
    function registerSlider() {
        if (global.sections == 2) {
            addHTML.addHorizontalSlider();
            registerHorizontal();
        } else if (global.sections == 4) {
            addHTML.addVerticalSlider();
            registerVertical();
            addHTML.addHorizontalSlider();
            registerHorizontal();
        }
    }

    /**
     * init slider Elements
     */
    function initElements() {
        if (global.sections == 2) {
            var amt = "0px";
            if (global.currentSection === "first") {
                moveHorizontal(assets.screen.width - slider.width / 2);
                amt = assets.screen.width - slider.width + "px";
            }
            if (global.currentSection === "second") {
                moveHorizontal(slider.width / 2);
            }
            moveSlider("#slider-horizontal", {"left": amt});
        }

        if (global.sections == 4) {
            var x = "0px";
            var y = "0px";
            if (global.currentSection === "first") {
                moveHorizontal(assets.screen.width - slider.width / 2);
                moveVertical(assets.screen.height - slider.height / 2);
                x = assets.screen.width - slider.width + "px";
                y = assets.screen.height - slider.height + "px";
            }
            if (global.currentSection === "second") {
                moveHorizontal(slider.width / 2);
                moveVertical(assets.screen.height - slider.height / 2);
                y = assets.screen.height - slider.height + "px";
            }
            if (global.currentSection === "third") {
                moveHorizontal(assets.screen.width - slider.width / 2);
                moveVertical(slider.height / 2);
                x = assets.screen.width - slider.width + "px";
                y = assets.screen.height - slider.height + "px";
            }
            if (global.currentSection === "fourth") {
                moveHorizontal(slider.width / 2);
                moveVertical(slider.height / 2);
            }
            moveSlider("#slider-horizontal", {"left": x});
            moveSlider("#slider-vertical", {"top": y});
        }
    }

    /**
     * update the home icon based on the current Section
     */
    function updateHomeIcon() {
        var slide = "." + global.currentSection;
        $(".navigation .position").removeClass("active-slide");
        $(".navigation .position" + slide).addClass("active-slide");
    }

    /**
     * init Function supports only 2 or 4 section elements
     * @returns {{init: init}}
     */
    function init() {
        var $section = $("section");
        global.sections = $section.length;

        registerSlider();
        initElements();
    }

    return {
        slider: slider,
        init: init,
        moveHorizontal: moveHorizontal,
        animateVertical: animateVertical,
        animateHorizontal: animateHorizontal
    }
}());


/******************/
/*   key inputs   */
/******************/

var keyControl = (function () {

    function register(target) {
        $(target).keydown(function (event) {

            //check if lightbox is open
            if (config.lockKeyEventsOnOpenLightBox) {
                var displayTyp = $(config.lightBoxContainerClass).css('display');
                if (displayTyp != "none")
                    return;
            }

            switch (event.keyCode) {
                case 27 :
                   // console.log("ESC Pressed");
                    break;
                case 37 :
                    //console.log("Left Pressed");
                    slider.animateHorizontal(0);
                    break;
                case 38 :
                    //console.log("Up Pressed");
                    slider.animateVertical(0);
                    break;
                case 39 :
                    //console.log("Right Pressed");
                    slider.animateHorizontal(assets.screen.width - slider.slider.width);
                    break;
                case 40 :
                    //console.log("Down Pressed");
                    slider.animateVertical(assets.screen.height - slider.slider.height);
                    break;
            }
        });
    }

    return {
        register: register
    }
}());


/******************/
/*  Query String  */
/******************/

var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            query_string[pair[0]] = [query_string[pair[0]], pair[1]];
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();


/******************/
/* document ready */
/*    & resize    */
/******************/
$(function () {
    //test url: ?id=1&lock=false&x=bottom&y=right&beacon=false
    assets.readUrl();

    templateSystem.render();

    // init main
    setTimeout(function () {

        assets.fullscreen(".wrapper");
        assets.fullscreen(".mask");
        assets.insertNbspIntoCaption();
        slider.init();
       // assets.update();
        beacon.init();
        keyControl.register("body");
        // discover
        discover.init();

    }, config.timeout)
});

$(window).resize(function () {
    assets.fullscreen(".wrapper");
    assets.fullscreen(".mask");

    // reset Slider

    if (global.position.y == "bottom")
        slider.animateVertical(0, config.animDividerOnResize);
    else
        slider.animateVertical(assets.screen.height - slider.slider.height / 2, config.animDividerOnResize);

    if (global.position.x == "right")
        slider.animateHorizontal(0, config.animDividerOnResize);
    else
        slider.animateHorizontal(assets.screen.width - slider.slider.width / 2, config.animDividerOnResize);

    //resize Gallery
    discover.resize();
});