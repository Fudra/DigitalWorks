/**
 * the content of the page
 */
var content = {
    imgfolder: "img",
    beaconToolTip : "click me!",
    footnote : [
        {id: 'imprint', name: "Imprint"},
        {id: 'about', name: "About Us!"}
    ],
    titles: [
        {name: "SURFACE"},
        {name: "SOUSFACE"}
    ],
    artists: [
        {
            id: 1,
            name: "Franz Mattuschka",
            title: "Prozesse",
            quote: "Neue Arten des Sehens und Wissens bedürfen neuer Technologien, wie umgekehrt neue Technologien neue Formen des Sehens und Wissens voraussetzen.",
            cite : "Maurizio Lazzerato",
            short: "franz",
            avatar: "Franz-Mattuschka-250px.jpg",
            images: [
                {
                    src: "01_Prozesse.jpg",
                    thumb: "Startseite_Franz.jpg",
                    caption: "prozesse 1",
                    prev: true
                },
                {
                    src: "02_Prozesse.jpg",
                    thumb: "FranzMattuschka-02_Prozesse.jpg",
                    caption: "prozesse 2",
                    prev: false
                }
            ],
            background: [
                {
                    src: 'Programm_Foto_Franz.jpg',
                    thumb: 'Franz_Programmbild.jpg',
                    caption: ''
                },
                {
                    src: 'Franz_Interview.mp4',
                    thumb: 'Franz_Videobild.jpg',
                    caption: ''
                }
            ]
        },
        {
            id: 2,
            name: "Janosch Kunze",
            title: "Facing Industries",
            quote: "some janosch quotes",
            cite : "Maurizio Lazzerato",
            short: "janosch",
            avatar: "JanoschKunze-250px.jpg",
            images: [
                {
                    src: "01-thumb.jpg",
                    thumb: "Startseite_Janosch.jpg",
                    caption: "",
                    prev: true
                },
                {
                    src: "1.jpg",
                    thumb: "01.jpg",
                    caption: "",
                    prev: false
                }
            ],
            background: [
                {
                    src: '4.jpg',
                    thumb: '4.jpg',
                    caption: ''
                },
                {
                    src: '5.jpg',
                    thumb: '5.jpg',
                    caption: ''
                }
            ]

        },
        {
            id: 3,
            name: "Thomas Hiebert",
            title: "Secret Works",
            quote: "some quote",
            cite : "Maurizio Lazzerato",
            short: "thomas",
            avatar: "Thomas-Hiebert-250px.jpg",
            images: [
                {
                    src: "02_MuellerZeiner_01.jpg",
                    thumb: "Startseite_Thomas.jpg" ,
                    caption: "",
                    prev: true
                },
                {
                    src: "03_Bombardier.jpg",
                    thumb: "03_Bombardier.jpg",
                    caption: "",
                    prev: false
                }
            ],
            background: [
                {
                    src: "01_PUK.jpg",
                    thumb: "01_PUK.jpg",
                    caption: ""
                },
                {
                    src: "02_muellerZeiner.jpg",
                    thumb: "01_PUK.jpg",
                    caption: ""
                },
                {
                    src: 'Franz_Interview.mp4',
                    thumb: 'FranzM_Interview_Video.jpg',
                    caption: 'Das Video'
                }
            ]

        },
        {
            id: 4,
            name: "Regina Loy",
            title: "Mensch und Maschine",
            quote: "An der Industrie in Berlin hat mich am meisten der Aspekt von menschlichen und maschinell durchgeführten Prozessen interessiert. In meiner Serie zeige ich daher Detailaufnahmen von eingewickelten Robotern, bei denen der Betrachter auf den ersten Blick menschliche Formen unter dem Tuch zu erkennen scheint. Ohne mich dabei auf eine der beiden Seiten stellen zu wollen, soll dem Betrachter eine neue Sichtweise des Themas gezeigt werden und er soll zum Nachdenken darüber angeregt werden.",
            cite : "",
            short: "regina",
            avatar: "ReginaLoy-250px.jpg",
            images: [
                {
                    src: 'Startseite_Regina.jpg',
                    thumb: 'Startseite_Regina.jpg',
                    caption: 'Startseite',
                    prev : true
                },
                {
                    src: 'Regina2.jpg',
                    thumb: 'Regina2.jpg',
                    caption: 'Video',
                    prev : false
                },
                {
                    src: 'Regina3.jpg',
                    thumb: 'Regina3.jpg',
                    caption: 'Entspannt Fotografieren',
                    prev : false
                }
            ],
            background: [
                {
                    src: 'Regina1.jpg',
                    thumb: 'Regina1.jpg',
                    caption: 'Fotografieren bei Photon Laser'
                },
                {
                    src: 'Regina2.jpg',
                    thumb: 'Regina2.jpg',
                    caption: 'Video'
                },
                {
                    src: 'Regina3.jpg',
                    thumb: 'Regina3.jpg',
                    caption: 'Entspannt Fotografieren'
                },
                {
                    src: 'Regina3.jpg',
                    thumb: 'Regina3.jpg',
                    caption: 'Entspannt Fotografieren'
                },
                {
                    src: 'Regina3.jpg',
                    thumb: 'Regina3.jpg',
                    caption: 'Entspannt Fotografieren'
                }
            ]
        }
    ],
    /* Bitte folgende Funktion(en) nicht ändern */
    selected: function () {
        return this.id == global.id;
    }
};