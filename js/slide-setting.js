
var setting  = (function() {
    return {

        /**
         * setzt die Startposition des Scriptes,
         * sollte in location div Tag die Klasse "top-left" oder "top-right" vorhanden sein,
         * so werden die einstellungen überschrieben.
         */
        startScreen: {
            orientationX: "right",
            orientationY: "top" /* bottom position not supported*/
        },

        /**
         *  fügt die Position und das HomeIcon zu der aktuellen Slides hinzu ( unten rechts )
         */
        addHome: true,

        /**
         * fügt den vertikalen Slide Balken hinzu
         */
        slideVertical: true,

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
        isScreenLock: true,

        /**
         * Zeigt einen Beacon und beginnt mit der Anfagsanimation
         * TODO: Anfangsanimation noch nicht implementiert
         */
        showBeacon: false,

        /**
         * Blendet den Beacon nach x ms ein
         */
        showBeaconAfter: 2000,

        /**
         * Blendet den Beacon Text nach x ms ein
         */
        showBeaconTooltipAfter : 8000,

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
         *  Zeit in ms, die der Slider braucht, um zur seite zu Animieren
         */
        sliderAnimDuration : 800,

        /**
         * dev test
         */
        startScreenAnimDuration: 5000
    }
})();
