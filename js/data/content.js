/**
 * the content of the page
 */
var content = {
    imgfolder: "img",
    beaconToolTip : [
       {quote: 'Mach sichtbar, was vielleicht ohne dich nie wahrgenommen worden wäre.',
        cite: "Robert Bresson" }
    ],
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
                    caption: "",
                    prev: true
                },
                {
                    src: "02_Prozesse.jpg",
                    thumb: "FranzMattuschka-02_Prozesse.jpg",
                    caption: "",
                    prev: false
                },
				{
                    src: "03_Prozesse.jpg",
                    thumb: "FranzMattuschka-03_Prozesse.jpg",
                    caption: "",
                    prev: false
                },
				{
                    src: "04_Prozesse.jpg",
                    thumb: "FranzMattuschka-04_Prozesse.jpg",
                    caption: "",
                    prev: false
                },
				{
                    src: "05_Prozesse.jpg",
                    thumb: "FranzMattuschka-05_Prozesse.jpg",
                    caption: "",
                    prev: false
                }
            ],
            background: [
                {
                    src: 'Programm_Foto_Franz.jpg',
                    thumb: 'Franz_Programmbild.jpg',
                    caption: 'Screenshot vom Programm'
                },
                {
                    src: 'Franz_Interview.mp4',
                    thumb: 'Franz_Videobild.jpg',
                    caption: 'Interview (Video)'
                },
				{
                    src: 'Franz_Auswahl.jpg',
                    thumb: 'FranzMattuschka-I02_Auswahl.jpg',
                    caption: 'Besprechung der entstandenen Fotos'
                },
				{
                    src: 'Franz_Betrieb.jpg',
                    thumb: 'FranzMattuschka-I01_ImBetrieb.jpg',
                    caption: 'Im Betrieb'
                }
            ]
        },
        {
            id: 2,
            name: "Janosch Kunze",
            title: "facing industries",
            quote: "Was ist neben eindrucksvollen Maschinen, dröhnender Geräuschkulisse und sich wiederholenden Bewegungen der Arbeiter noch zu sehen? Was erzählt ein einzelnes Gesicht? Was erzählt ein einzelnes Teil?",
            cite : "",
            short: "janosch",
            avatar: "JanoschKunze-250px.jpg",
            images: [
                {
                    src: "Bild_1.jpg",
                    thumb: "Startseite_Janosch.jpg",
                    caption: "",
                    prev: true
                },
                {
                    src: "Bild_2.jpg",
                    thumb: "Bild_2_thumb.jpg",
                    caption: "",
                    prev: false
                },
                {
                    src: "Bild_3.jpg",
                    thumb: "Bild_3_thumb.jpg",
                    caption: "",
                    prev: false
                },
                {
                    src: "Bild_1.1.jpg",
                    thumb: "Bild_1.1_thumb.jpg",
                    caption: "",
                    prev: false
                },
                {
                    src: "Bild_2.2.jpg",
                    thumb: "Bild_2.2_thumb.jpg",
                    caption: "",
                    prev: false
                },
                {
                    src: "Bild_3.3.jpg",
                    thumb: "Bild_3.3_thumb.jpg",
                    caption: "",
                    prev: false
                }
            ],
            background: [
                {
                    src: 'JanoschKunze_Betrieb.jpg',
                    thumb: 'Janosch_Betrieb.jpg',
                    caption: 'Fotografieren bei Metallbau Süd'
                },

                {
                    src: 'Janosch_Prozess.mp4',
                    thumb: 'Janosch_Prozess_Video.jpg',
                    caption: 'Portraitieren (Video)'
                }
            ]

        },
        {
            id: 3,
            name: "Thomas Hiebert",
            title: "secret works",
            quote: "Am Rande, abseits der Mitte, unter Verschluss befindet sich die Industrie, die für Außenstehende nicht zugänglich ist. SECRET WORKS ist eine fotografische Beobachtung der Berliner Industrie – ein Schritt hinter die Tore des Verborgenen – und versucht diese für die Betrachter in Form einer dokumentarischen Sicht zu öffnen.",
            cite : "",
            short: "thomas",
            avatar: "Thomas-Hiebert-250px.jpg",
            images: [
                {
                    src: "02_MuellerZeiner.jpg",
                    thumb: "Startseite_Thomas.jpg" ,
                    caption: "Müller-Zeiner",
                    prev: true
                },
                {
                    src: "01_PUK.jpg",
                    thumb: "ThomasHiebert-01_PUK.jpg",
                    caption: "PUK-Werke",
                    prev: false
                },
                {
                    src: "03_Bombardier.jpg",
                    thumb: "ThomasHiebert-02_Bombardier.jpg",
                    caption: "Bombardier Henningsdorf",
                    prev: false
                }
            ],
            background: [
                {
                    src: "ThomasHiebert_Bild01.jpg",
                    thumb: "Thomas_Bild01.jpg",
                    caption: "Fotografieren bei Photon Laser"
                },
                {
                    src: "Thomas_Prozess.mp4",
                    thumb: "ThomasH_Video2.jpg",
                    caption: "Entstehungsprozess (Video)"
                },
                {
                    src: 'ThomasHiebert_Bild02.jpg',
                    thumb: 'Thomas_Bild02.jpg',
                    caption: 'Fotografieren bei Photon Laser'
                },
                {
                    src: 'Thomas_Interview.mp4',
                    thumb: 'ThomasH_Video1.jpg',
                    caption: 'Video: Interview'
                }
            ]

        },
        {
            id: 4,
            name: "Regina Loy",
            title: "Im Nebel",
            quote: "An der Industrie in Berlin hat mich am meisten der Aspekt von menschlichen und maschinell durchgeführten Prozessen interessiert. In meiner Serie zeige ich daher Detailaufnahmen von eingewickelten Robotern, bei denen der Betrachter auf den ersten Blick menschliche Formen unter dem Tuch zu erkennen scheint. Ohne mich dabei auf eine der beiden Seiten stellen zu wollen, soll dem Betrachter eine neue Sichtweise des Themas gezeigt werden und er soll zum Nachdenken darüber angeregt werden.",
            cite : "",
            short: "regina",
            avatar: "ReginaLoy-250px.jpg",
            images: [
                {
                    src: 'Regina_01.jpg',
                    thumb: 'ReginaLoy_01.jpg',
                    caption: ' ',
                    prev : false
                },
                {
                    src: 'Regina_02.jpg',
                    thumb: 'ReginaLoy_02.jpg',
                    caption: ' ',
                    prev : false
                },
                {
                    src: 'Startseite_Regina.jpg',
                    thumb: 'Startseite_Regina.jpg',
                    caption: ' ',
                    prev : true
                },
				{
                    src: 'Regina_04.jpg',
                    thumb: 'ReginaLoy_04.jpg',
                    caption: ' ',
                    prev : false
                },
				{
                    src: 'Regina_05.jpg',
                    thumb: 'ReginaLoy_05.jpg',
                    caption: ' ',
                    prev : false
                },
				{
                    src: 'Regina_06.jpg',
                    thumb: 'ReginaLoy_06.jpg',
                    caption: ' ',
                    prev : false
                }
            ],
            background: [
				{
                    src: 'Regina_Bild02.jpg',
                    thumb: 'Regina_thumb2.jpg',
                    caption: 'Fotografieren bei Photon Laser'
                },
                {
                    src: 'Regina Interview.mp4',
                    thumb: 'Interview_thumb.jpg',
                    caption: 'Interview (Video)'
                },
                {
                    src: 'Regina_Bild03.jpg',
                    thumb: 'Regina_thumb3.jpg',
                    caption: 'Konzentriert bei der Arbeit'
                },
                {
                    src: 'Regina_Prozess.mp4',
                    thumb: 'Regina_Prozess_Video.jpg',
                    caption: 'Entstehungsprozess (Video)'
                },
				{
                    src: 'Regina_Stau.mp4',
                    thumb: 'Regina_thumb_stau.jpg',
                    caption: 'Stau im Betrieb (Video)'
                }
            ]
        }
    ],
    /* Bitte folgende Funktion(en) nicht ändern */
    selected: function () {
        return this.id == global.id;
    }
};