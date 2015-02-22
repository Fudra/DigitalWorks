/**
 * some global variables
 * set by the url string
 */

var global = {
    /**
     * the selected artists id
     * url param: id
     */
    artist: 0,

    /**
     * init an beacon animation on startup
     * url param: beacon
     * default: true
     */
    useBeaconAnimation: true,

    /**
     * the current slider position
     * url param: x & y
     * default: top - left
     */
    position: {
        x: "left",
        y: "top"
    },

    /**
     * lock section
     * url param: lock
     * default: true
     */
    isSectionLock: true,

    /**
     *  the amount of the generated sections
     */
    sections: 0,

    /**
     * the active slider hash
     */
    currentSection: "first"

};