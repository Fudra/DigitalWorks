var setting = (function () {

    return {

        /**
         * setzt die Startposition des Scriptes,
         * sollte in body Tag die Klasse "top-left" oder "top-right" vorhanden sein,
         * so werden die einstellungen überschrieben.
         */
        startScreen: {
            orientationX: "left",
            orientationY: "top" /* bottom position not supported*/
        },

        /**
         * blendet das Impressum und About Us ein
         */

        showImprintAndAboutUs: true,

        /**
         *  fügt die Position des aktuellen Slides hinzu ( unten rechts )
         */
        addHome: false,

        /**
         * fügt den vertikalen Slide Balken hinzu
         */
        slideVertical: false,

        /**
         * fügt den horizontalen Slide Balken hinzu
         */
        slideHorizontal: true,

        /**
         *  gibt die position an, welcher der 4 Bildschirme gesperrt sein soll
         *  default right-bottom
         */
        lockScreen: {
            orientationX: "right",
            orientationY: "bottom"
        },

        /**
         * Sperrt den oben genannten Bildschirm
         */
        isScreenLock: false,

        /**
         * Zeigt einen Beacon und beginnt mit der Anfagsanimation
         */
        showBeacon: !true,

        /**
         * Blendet den Beacon nach x ms ein
         */
        showBeaconAfter: 2000,

        /**
         * Blendet den Beacon Text nach x ms ein
         */
        showBeaconTooltipAfter: 8000,

        /**
         * Die Zeit, die für das einblenden benötigt wird in ms
         * Benutzt in: Becaon
         */
        fadeInTime: 3000,

        /**
         * Die Zeit, die für das Ausblenden benötigt wird in ms
         * Benutzt in: Becaon
         */
        fadeOutTime: "slow",

        /**
         Ein/Ausblendzeit des Sliders
         */
        toggleSliderTime: "slow",


        /**
         * Die Easing Funktion der Slider
         * siehe: http://jqueryui.com/easing/
         */
        sliderEasing: "easeOutCubic",

        /**
         *  Zeit in ms, die der Slider braucht, um zur seite zu Animieren
         */
        sliderAnimDuration: 800,

        /**
         *  Animation die Slider beim Starten
         */
        startAnimEasing : "easeOutCubic",

        /**
         * dev test
         */
        startScreenAnimDuration: 100
    }
})();
