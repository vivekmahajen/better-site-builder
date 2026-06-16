// Aastha Bhakti Radio — devotional music catalog (8 languages, 16+ artists, 80+ songs).
// `src`/`youtube` are null in this concept build; the player runs in simulated mode.
// Wire real audio by setting NEXT_PUBLIC_RADIO_CDN and using lib/radio/audioManager.

export const BHAKTI_CATALOG = {
  Hindi: {
    label: "हिन्दी", flag: "🇮🇳", color: "#E8710A",
    artists: [
      { id: "hindi-jukebox", name: "T-Series Bhakti Sagar", native: "टी-सीरीज़ भक्ति सागर", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "hjb-1", title: "Morning Time Bhajans — Gulshan Kumar", dur: "1:00:00", deity: "Various", mood: "Aarti", yt: "4k3ZRQ5Hi6c" },
        { id: "hjb-2", title: "Devi Bhakti Bhajans Collection", dur: "1:00:00", deity: "Durga", mood: "Devotional", yt: "ZouPmUdokBQ" },
        { id: "hjb-3", title: "Best Aarti Collection", dur: "45:00", deity: "Various", mood: "Aarti", yt: "Jldmqxpr_pA" },
        { id: "hjb-4", title: "Morning Bhajans Vol. 2", dur: "1:00:00", deity: "Various", mood: "Devotional", yt: "Hg1eB_p0PKU" },
      ] },
      { id: "lata-mangeshkar", name: "Lata Mangeshkar", native: "लता मंगेशकर", icon: "🎤", specialty: "Bhajans, Aartis, Classical Devotional", songs: [
        { id: "lm-001", title: "Aayega Aane Wala", dur: "4:12", deity: "Bhagwan", mood: "Serene" },
        { id: "lm-002", title: "Jai Mata Di", dur: "5:30", deity: "Durga", mood: "Devotional" },
        { id: "lm-003", title: "Saraswati Vandana", dur: "3:48", deity: "Saraswati", mood: "Meditative" },
        { id: "lm-005", title: "Raghupati Raghav Raja Ram", dur: "4:50", deity: "Rama", mood: "Uplifting", yt: "wAKbx2pX9Xs" },
        { id: "lm-006", title: "Vaishnav Jan To", dur: "5:18", deity: "Vishnu", mood: "Meditative", yt: "Mndy6HG00jE" },
      ] },
      { id: "anuradha-paudwal", name: "Anuradha Paudwal", native: "अनुराधा पौडवाल", icon: "🕉️", specialty: "Shiv Bhajans, Mata Bhajans, Chalisa", songs: [
        { id: "ap-001", title: "Om Jai Jagdish Hare", dur: "5:22", deity: "Vishnu", mood: "Aarti", yt: "T0fAznO9RKw" },
        { id: "ap-002", title: "Shiv Chalisa", dur: "8:10", deity: "Shiva", mood: "Sacred", yt: "pY3SzZuKxWw" },
        { id: "ap-003", title: "Jai Ambe Gauri", dur: "4:35", deity: "Durga", mood: "Aarti", yt: "z_f0foDcR7s" },
        { id: "ap-004", title: "Sukhkarta Dukhaharta", dur: "3:55", deity: "Ganesha", mood: "Aarti", yt: "kWXw00N76oM" },
        { id: "ap-006", title: "Hanuman Chalisa", dur: "9:45", deity: "Hanuman", mood: "Uplifting", yt: "AETFvQonfV8" },
        { id: "ap-007", title: "Lakshmi Chalisa", dur: "7:30", deity: "Lakshmi", mood: "Sacred" },
        { id: "ap-008", title: "Shri Hanuman Amritwani", dur: "35:00", deity: "Hanuman", mood: "Sacred", yt: "52P_CbO30k4" },
        { id: "ap-009", title: "Hanuman Chalisa (Anuradha Paudwal)", dur: "9:50", deity: "Hanuman", mood: "Uplifting", yt: "8NLvyzLI-Hg" },
      ] },
      { id: "narendra-chanchal", name: "Narendra Chanchal", native: "नरेंद्र चंचल", icon: "🪔", specialty: "Mata Bhajans, Jagrata", songs: [
        { id: "nc-001", title: "Chalo Bulawa Aaya Hai", dur: "5:08", deity: "Durga", mood: "Devotional", yt: "x6mbse1gRTw" },
        { id: "nc-003", title: "Sheranwali Aao", dur: "4:45", deity: "Durga", mood: "Devotional" },
        { id: "nc-004", title: "Tu Hi Durga Tu Hi Kali", dur: "5:20", deity: "Durga", mood: "Uplifting" },
      ] },
      { id: "anup-jalota", name: "Anup Jalota", native: "अनूप जलोटा", icon: "🌸", specialty: "Bhajans, Kabir, Classical", songs: [
        { id: "aj-001", title: "Aisi Lagi Lagan", dur: "6:22", deity: "Krishna", mood: "Serene", yt: "a-HaUyDP0Ko" },
        { id: "aj-002", title: "Ek Radha Ek Meera", dur: "5:45", deity: "Krishna", mood: "Bhakti" },
        { id: "aj-004", title: "Sita Ram Sita Ram", dur: "4:30", deity: "Rama", mood: "Meditative" },
      ] },
    ],
  },
  Telugu: {
    label: "తెలుగు", flag: "🇮🇳", color: "#7F77DD",
    artists: [
      { id: "spb-telugu", name: "S.P. Balasubrahmanyam", native: "ఎస్.పి. బాలసుబ్రహ్మణ్యం", icon: "🎶", specialty: "Annamacharya Keertanas, Venkateswara", songs: [
        { id: "spb-002", title: "Govinda Govinda Hari Govinda", dur: "4:18", deity: "Krishna", mood: "Devotional", yt: "gH6LrIpNpCs" },
        { id: "spb-003", title: "Srinivasa Govinda", dur: "6:05", deity: "Venkateswara", mood: "Bhakti", yt: "vGbTEJoVoE8" },
        { id: "spb-004", title: "Om Namo Venkatesaya", dur: "7:12", deity: "Venkateswara", mood: "Sacred" },
        { id: "spb-005", title: "Sri Rama Rama Rameti", dur: "4:55", deity: "Rama", mood: "Chant" },
        { id: "spb-006", title: "Venkateswara Suprabhatam (SPB)", dur: "22:00", deity: "Venkateswara", mood: "Sacred", yt: "9wFXSlXlMFA" },
        { id: "spb-007", title: "Annamacharya Keerthanalu Vol.3", dur: "30:00", deity: "Venkateswara", mood: "Classical", yt: "jBajYqnL4fo" },
      ] },
      { id: "ms-subbulakshmi", name: "M.S. Subbulakshmi", native: "ఎమ్.ఎస్. సుబ్బులక్ష్మి", icon: "🪷", specialty: "Suprabhatam, Sahasranamam", songs: [
        { id: "ms-001", title: "Venkateshwara Suprabhatam", dur: "12:30", deity: "Venkateswara", mood: "Sacred", yt: "krGYd5tZe0A" },
        { id: "ms-002", title: "Vishnu Sahasranamam", dur: "28:45", deity: "Vishnu", mood: "Sacred", yt: "KD62AN_SG9M" },
        { id: "ms-003", title: "Bhaja Govindam", dur: "8:20", deity: "Krishna", mood: "Classical", yt: "X95Z4c72JO0" },
        { id: "ms-004", title: "Venkateswara Suprabhatam (Morning)", dur: "24:00", deity: "Venkateswara", mood: "Sacred", yt: "evQ_lULfWC4" },
      ] },
    ],
  },
  Tamil: {
    label: "தமிழ்", flag: "🇮🇳", color: "#1D9E75",
    artists: [
      { id: "kj-yesudas", name: "K.J. Yesudas", native: "கே.ஜே. யேசுதாஸ்", icon: "🌟", specialty: "Harivarasanam, Sabarimala", songs: [
        { id: "kj-001", title: "Harivarasanam (Sabarimala)", dur: "7:20", deity: "Ayyappa", mood: "Sacred", yt: "xItVs07WLsk" },
        { id: "kj-002", title: "Guruvaayurappan", dur: "5:45", deity: "Krishna", mood: "Devotional" },
        { id: "kj-003", title: "Saranam Saranam Ayyappa", dur: "6:10", deity: "Ayyappa", mood: "Bhakti" },
        { id: "kj-005", title: "Muruganukku Arohara", dur: "5:30", deity: "Murugan", mood: "Uplifting" },
      ] },
      { id: "tms-tamil", name: "T.M. Soundararajan", native: "டி.எம். சௌந்தரராஜன்", icon: "🎵", specialty: "Kandha Sashti Kavasam, Murugan", songs: [
        { id: "tms-001", title: "Kandha Sashti Kavasam", dur: "8:45", deity: "Murugan", mood: "Chant", yt: "CfXXMZK9grE" },
        { id: "tms-004", title: "Kanda Sashti Kavasam (Lyrics)", dur: "8:30", deity: "Murugan", mood: "Chant", yt: "VGCcbIlhoMY" },
        { id: "tms-005", title: "Murugan Kanda Sashti", dur: "6:00", deity: "Murugan", mood: "Uplifting", yt: "8Ahqmu2nOTU" },
        { id: "tms-003", title: "Ayyappa Swamy Sharanam", dur: "4:30", deity: "Ayyappa", mood: "Devotional" },
      ] },
      { id: "p-susheela", name: "P. Susheela", native: "பி. சுஶீல", icon: "🌷", specialty: "Slokas, Amman Bhajans", songs: [
        { id: "ps-002", title: "Amman Devotional Medley", dur: "5:40", deity: "Durga", mood: "Devotional" },
        { id: "ps-003", title: "Devi Mahatmyam", dur: "8:22", deity: "Durga", mood: "Sacred" },
      ] },
    ],
  },
  Kannada: {
    label: "ಕನ್ನಡ", flag: "🇮🇳", color: "#C9962E",
    artists: [
      { id: "kannada-bhakti", name: "Bhakti Lahari Kannada", native: "ಭಕ್ತಿ ಲಹರಿ", icon: "🪔", specialty: "Kannada Devotional, Dharmasthala", songs: [
        { id: "kn-001", title: "Kannada Bhakti Jukebox", dur: "30:00", deity: "Various", mood: "Devotional", yt: "f-X4WyxOjUM" },
        { id: "kn-002", title: "Madhuraakshara — Vani Jayaram", dur: "8:30", deity: "Various", mood: "Devotional", yt: "tu3G96leXSQ" },
        { id: "kn-003", title: "Bhakthi Naadarchane — SPB", dur: "45:00", deity: "Various", mood: "Devotional", yt: "v3tyn9r26A4" },
        { id: "kn-004", title: "Bhakthi Namana", dur: "40:00", deity: "Various", mood: "Devotional", yt: "jN1T8RRX670" },
      ] },
    ],
  },
  Bengali: {
    label: "বাংলা", flag: "🇮🇳", color: "#D4537E",
    artists: [
      { id: "bengali-jukebox", name: "Shyama Sangeet", native: "শ্যামা সঙ্গীত", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "bjb-1", title: "Best Shyama Sangeet — Pannalal Bhattacharya", dur: "45:00", deity: "Durga", mood: "Devotional", yt: "NResju3tZok" },
        { id: "bjb-2", title: "Best Shyama Sangeet Vol.1", dur: "45:00", deity: "Durga", mood: "Devotional", yt: "tzzzi6CZTkw" },
      ] },
      { id: "hemanta", name: "Hemanta Mukhopadhyay", native: "হেমন্ত মুখোপাধ্যায়", icon: "🎼", specialty: "Durga Puja, Kirtan", songs: [
        { id: "hm-001", title: "Mahishasura Mardini Stotra", dur: "15:30", deity: "Durga", mood: "Chant", yt: "YQyo8QeoYhc" },
        { id: "hm-002", title: "Durga Puja Kirtan", dur: "6:30", deity: "Durga", mood: "Bhakti", yt: "zaMxavmz2A8" },
        { id: "hm-004", title: "Tumi Kato Je Bhalobasho", dur: "4:48", deity: "Krishna", mood: "Serene" },
      ] },
      { id: "sandhya", name: "Sandhya Mukhopadhyay", native: "সন্ধ্যা মুখোপাধ্যায়", icon: "🕊️", specialty: "Saraswati Vandana, Tagore Devotional", songs: [
        { id: "sm-001", title: "Saraswati Bandana", dur: "5:22", deity: "Saraswati", mood: "Meditative", yt: "YEHY6Z9BIC0" },
        { id: "sm-002", title: "Tumi Robe Nirabe", dur: "4:48", deity: "Bhagwan", mood: "Meditative" },
      ] },
    ],
  },
  Gujarati: {
    label: "ગુજરાતી", flag: "🇮🇳", color: "#EF9F27",
    artists: [
      { id: "gujarati-jukebox", name: "Gujarati Bhakti Jukebox", native: "ગુજરાતી ભક્તિ", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "gjb-1", title: "Jalaram Bapa Bhajan Jukebox", dur: "45:00", deity: "Bhagwan", mood: "Devotional", yt: "DvSSCy9Jl-I" },
        { id: "gjb-2", title: "Geeta Rabari — Zankaar Nonstop Garba", dur: "1:00:00", deity: "Durga", mood: "Uplifting", yt: "WAi1iuvC5qc" },
        { id: "gjb-3", title: "Geeta Rabari Ni Ramzat", dur: "45:00", deity: "Durga", mood: "Uplifting", yt: "gynuMvdPgwk" },
      ] },
      { id: "geeta-rabari", name: "Geeta Ben Rabari", native: "ગીતા બેન રબારી", icon: "🥁", specialty: "Navratri Garba, Folk Bhajans", songs: [
        { id: "gr-002", title: "Meldi Maa Bhajan", dur: "5:10", deity: "Durga", mood: "Devotional", yt: "fKY0alltEtk" },
        { id: "gr-003", title: "Navratri Garba Medley", dur: "12:30", deity: "Durga", mood: "Uplifting" },
        { id: "gr-004", title: "Ambe Maa Aarti", dur: "5:45", deity: "Durga", mood: "Aarti", yt: "GaoJC_S55IA" },
      ] },
      { id: "asha-vaishnav", name: "Asha Vaishnav", native: "આશા વૈષ્ણવ", icon: "🪗", specialty: "Classical Gujarati Bhajans", songs: [
        { id: "av-001", title: "Vaishnav Jan To", dur: "4:15", deity: "Vishnu", mood: "Meditative", yt: "oyM_PZQvy14" },
        { id: "av-003", title: "Jalaram Bapa Na Bhajan", dur: "5:22", deity: "Bhagwan", mood: "Devotional", yt: "ELgln0W_T-0" },
      ] },
    ],
  },
  Marathi: {
    label: "मराठी", flag: "🇮🇳", color: "#85B7EB",
    artists: [
      { id: "marathi-jukebox", name: "Abhangvani", native: "अभंगवाणी", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "mjb-1", title: "Abhangvani — Top 25 (Ajit Kadkade)", dur: "1:00:00", deity: "Vishnu", mood: "Devotional", yt: "VwSupcuaess" },
        { id: "mjb-2", title: "Nonstop Vitthal Abhang — Tukaram", dur: "45:00", deity: "Vishnu", mood: "Devotional", yt: "80ddNdIt62U" },
      ] },
      { id: "bhimsen-joshi", name: "Pt. Bhimsen Joshi", native: "पं. भीमसेन जोशी", icon: "🎺", specialty: "Abhang, Pandurang Kirtan", songs: [
        { id: "bj-001", title: "Jai Jai Vitthal Rakhumai", dur: "7:15", deity: "Vishnu", mood: "Devotional", yt: "0pkiwpHMB_Q" },
        { id: "bj-002", title: "Ananda Sohala (Tukaram)", dur: "9:30", deity: "Vishnu", mood: "Bhakti" },
        { id: "bj-003", title: "Raag Bhairavi Bhajan", dur: "12:45", deity: "Shiva", mood: "Classical" },
      ] },
      { id: "lata-marathi", name: "Lata Mangeshkar (Marathi)", native: "लता मंगेशकर", icon: "🌻", specialty: "Marathi Aarti, Ganpati, Vaari", songs: [
        { id: "lm-mar-001", title: "Jai Dev Jai Dev Mangalmurti", dur: "5:30", deity: "Ganesha", mood: "Aarti", yt: "kWXw00N76oM" },
        { id: "lm-mar-002", title: "Vithhal Vithhal Vithhal", dur: "6:45", deity: "Vishnu", mood: "Chant", yt: "3zUecRlIV94" },
      ] },
    ],
  },
  Malayalam: {
    label: "മലയാളം", flag: "🇮🇳", color: "#2FA37A",
    artists: [
      { id: "malayalam-jukebox", name: "Ayyappa Devotional", native: "അയ്യപ്പ ഭക്തി", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "mljb-1", title: "Ayyappa Devotional Jukebox — Irumudikattu", dur: "1:00:00", deity: "Ayyappa", mood: "Sacred", yt: "uDHKhlS2-dA" },
      ] },
      { id: "kj-malayalam", name: "K.J. Yesudas", native: "കെ.ജെ. യേശുദാസ്", icon: "🌴", specialty: "Guruvayur, Sabarimala", songs: [
        { id: "ml-001", title: "Harivarasanam", dur: "7:20", deity: "Ayyappa", mood: "Sacred", yt: "xItVs07WLsk" },
        { id: "ml-002", title: "Guruvayurappan Devotional", dur: "8:00", deity: "Krishna", mood: "Devotional", yt: "iWVeBCBDr7M" },
      ] },
    ],
  },
  Punjabi: {
    label: "ਪੰਜਾਬੀ", flag: "🇮🇳", color: "#5DCAA5",
    artists: [
      { id: "punjabi-jukebox", name: "Shabad Gurbani", native: "ਸ਼ਬਦ ਗੁਰਬਾਣੀ", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "pjb-1", title: "Nonstop Shabad Gurbani Kirtan", dur: "1:00:00", deity: "Guru Nanak", mood: "Meditative", yt: "XeMwjZaTXCs" },
        { id: "pjb-2", title: "Best of Bhai Malkiat Singh Ji", dur: "1:00:00", deity: "Guru Nanak", mood: "Meditative", yt: "13tg-DWM57Y" },
      ] },
      { id: "gurdas-maan", name: "Gurdas Maan", native: "ਗੁਰਦਾਸ ਮਾਨ", icon: "🎸", specialty: "Punjabi Bhajans, Sufi", songs: [
        { id: "gm-001", title: "Dhan Dhan Guru Nanak", dur: "5:48", deity: "Guru Nanak", mood: "Devotional", yt: "uJX5sGnL9yU" },
        { id: "gm-003", title: "Babe Nanak Nu", dur: "6:10", deity: "Guru Nanak", mood: "Meditative", yt: "KhkuT551pDY" },
        { id: "gm-004", title: "Waheguru Simran", dur: "30:00", deity: "Guru Nanak", mood: "Meditative", yt: "KqPMesirSKk" },
      ] },
      { id: "wadali-brothers", name: "Wadali Brothers", native: "ਵਡਾਲੀ ਬ੍ਰਦਰਜ਼", icon: "🎻", specialty: "Sufi Qawwali, Bulleh Shah", songs: [
        { id: "wb-001", title: "Tere Ishq Nachaya", dur: "8:30", deity: "Bhagwan", mood: "Sufi", yt: "5OFce-DV0yg" },
        { id: "wb-002", title: "Rabba Ishq Na Howe", dur: "7:15", deity: "Bhagwan", mood: "Sufi" },
      ] },
    ],
  },
  Odia: {
    label: "ଓଡ଼ିଆ", flag: "🇮🇳", color: "#C44E8B",
    artists: [
      { id: "odia-jukebox", name: "Jagannath Bhajan", native: "ଜଗନ୍ନାଥ ଭଜନ", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "od-1", title: "Odia Bhajan Hits — Sricharan", dur: "45:00", deity: "Vishnu", mood: "Devotional", yt: "rkR1x_I76fA" },
        { id: "od-2", title: "Non Stop Jagannath Bhajan", dur: "1:00:00", deity: "Vishnu", mood: "Devotional", yt: "MgrCLgjpsqM" },
        { id: "od-3", title: "Jagannath Bhajan — Sonu Nigam", dur: "45:00", deity: "Vishnu", mood: "Devotional", yt: "rqHcEmKcVg8" },
        { id: "od-4", title: "Ranka Ratana Mo Chakanayana", dur: "45:00", deity: "Vishnu", mood: "Devotional", yt: "uaZsLsf7uuU" },
        { id: "od-5", title: "Jagannath Bhakti Sangeet", dur: "45:00", deity: "Vishnu", mood: "Devotional", yt: "B6eu7BwOQ34" },
      ] },
    ],
  },
  Assamese: {
    label: "অসমীয়া", flag: "🇮🇳", color: "#3FA796",
    artists: [
      { id: "assamese-jukebox", name: "Borgeet & Naam", native: "বৰগীত", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "as-1", title: "Borgeet Assamese Jukebox", dur: "45:00", deity: "Krishna", mood: "Devotional", yt: "8BR_hK0jRWY" },
        { id: "as-2", title: "Zubeen Garg — Tokari Geet Dihanaam", dur: "45:00", deity: "Krishna", mood: "Devotional", yt: "z_gqZViOC9k" },
      ] },
    ],
  },
  Bhojpuri: {
    label: "भोजपुरी", flag: "🇮🇳", color: "#E0794B",
    artists: [
      { id: "bhojpuri-jukebox", name: "Bhojpuri Bhakti", native: "भोजपुरी भक्ति", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "bh-1", title: "Bhojpuri Bhakti Bhajan Jukebox", dur: "45:00", deity: "Various", mood: "Devotional", yt: "7EDEEx3AXUU" },
        { id: "bh-2", title: "Bhojpuri Devi Geet — Ankush Raja", dur: "45:00", deity: "Durga", mood: "Devotional", yt: "kuPWfsw2E4M" },
      ] },
    ],
  },
  Rajasthani: {
    label: "राजस्थानी", flag: "🇮🇳", color: "#E2725B",
    artists: [
      { id: "raj-jukebox", name: "Khatu Shyam Bhajan", native: "खाटू श्याम भजन", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "rj-1", title: "Shyam Baba Ka Dwara", dur: "45:00", deity: "Krishna", mood: "Devotional", yt: "jbULpBEoOiM" },
        { id: "rj-2", title: "Kharcho Bhej De Saanwariya", dur: "30:00", deity: "Krishna", mood: "Devotional", yt: "fTIj8URKRwc" },
        { id: "rj-3", title: "Mharo Babo Mhane", dur: "30:00", deity: "Krishna", mood: "Devotional", yt: "RW0f1uU3oDU" },
        { id: "rj-4", title: "Bajre Ki Roti Khale Shyam", dur: "30:00", deity: "Krishna", mood: "Devotional", yt: "A-PmM5OWXz8" },
      ] },
    ],
  },
  Maithili: {
    label: "मैथिली", flag: "🇮🇳", color: "#C98A3B",
    artists: [
      { id: "mai-jukebox", name: "Chhath Geet — Sharda Sinha", native: "छठ गीत", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "mi-1", title: "Maithili Chhath Geet — Sharda Sinha", dur: "45:00", deity: "Surya", mood: "Sacred", yt: "gcGwQm50ghk" },
        { id: "mi-2", title: "Sakal Jagtarini Hey Chhathi Maiya", dur: "45:00", deity: "Surya", mood: "Sacred", yt: "gDfLtZyeRCA" },
        { id: "mi-3", title: "Chhath Puja Songs Jukebox", dur: "45:00", deity: "Surya", mood: "Sacred", yt: "ipA98YjzA7I" },
      ] },
    ],
  },
  Nepali: {
    label: "नेपाली", flag: "🇮🇳", color: "#6FB1C9",
    artists: [
      { id: "nep-jukebox", name: "Shiva Bhajan — Music Nepal", native: "शिव भजन", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "np-1", title: "Shiva Bhajan Audio Jukebox — Music Nepal", dur: "45:00", deity: "Shiva", mood: "Meditative", yt: "vBsnd-3sdg8" },
      ] },
    ],
  },
  Sindhi: {
    label: "سنڌي", flag: "🇮🇳", color: "#7E8C5A",
    artists: [
      { id: "sindhi-jukebox", name: "Jhulelal Bhajan", native: "جھولي لال", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "sd-1", title: "Lal Jhule Lal Dhuni", dur: "30:00", deity: "Jhulelal", mood: "Devotional", yt: "5S3-JmEJdx4" },
        { id: "sd-2", title: "Lal Sai Non Stop", dur: "45:00", deity: "Jhulelal", mood: "Uplifting", yt: "oy9xTu3fHsg" },
        { id: "sd-3", title: "Chetichand Sindhi Non Stop", dur: "45:00", deity: "Jhulelal", mood: "Uplifting", yt: "4enJsjdt5pc" },
      ] },
    ],
  },
  Konkani: {
    label: "कोंकणी", flag: "🇮🇳", color: "#3FA37A",
    artists: [
      { id: "konkani-jukebox", name: "Konkani Bhajan", native: "कोंकणी भजन", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "kok-1", title: "Ganpati Tukka Pratham Vandana", dur: "8:00", deity: "Ganesha", mood: "Aarti", yt: "iDR7byqSUls" },
        { id: "kok-2", title: "Hey Ganaraya — Konkani Ganpati", dur: "6:00", deity: "Ganesha", mood: "Devotional", yt: "b11lLF3KPpg" },
      ] },
    ],
  },
  Dogri: {
    label: "डोगरी", flag: "🇮🇳", color: "#B5651D",
    artists: [
      { id: "dogri-jukebox", name: "Mata Bhajan", native: "माता भजन", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "doi-1", title: "Bawe Wali Mata Bhajan — Dogri", dur: "45:00", deity: "Durga", mood: "Devotional", yt: "1mveOKIZ8tA" },
        { id: "doi-2", title: "Mahima Vaishno Devi Ki", dur: "45:00", deity: "Durga", mood: "Devotional", yt: "LpDAs07CpgU" },
      ] },
    ],
  },
  Kashmiri: {
    label: "कॉशुर", flag: "🇮🇳", color: "#5B8DB8",
    artists: [
      { id: "kashmiri-jukebox", name: "Kashmiri Leela & Bhajan", native: "कॉशुर भजन", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "ks-1", title: "Kashmiri Leela Darshan — Gurdev Boz Myane", dur: "30:00", deity: "Shiva", mood: "Meditative", yt: "1co8WDTGsL8" },
        { id: "ks-2", title: "Shiv Natha Avinashay — Kashmiri Bhajan", dur: "20:00", deity: "Shiva", mood: "Meditative", yt: "hmHw7wnPgyw" },
        { id: "ks-3", title: "Kashmiri Devotional Bhajan", dur: "30:00", deity: "Shiva", mood: "Devotional", yt: "s6Uh9YbqlS0" },
      ] },
    ],
  },
  Manipuri: {
    label: "মৈতৈলোন্", flag: "🇮🇳", color: "#9C5BB8",
    artists: [
      { id: "manipuri-jukebox", name: "Manipuri Sankirtan", native: "মণিপুরী", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "mni-1", title: "Nupi Pala — Traditional Manipuri", dur: "30:00", deity: "Krishna", mood: "Devotional", yt: "ddfXRXPB39s" },
        { id: "mni-2", title: "Holi Pala — Krishna", dur: "30:00", deity: "Krishna", mood: "Devotional", yt: "_kAR1CI9G4s" },
        { id: "mni-3", title: "Manipuri Devotional Song", dur: "20:00", deity: "Krishna", mood: "Devotional", yt: "Qd2P3z02CeY" },
      ] },
    ],
  },
  Bodo: {
    label: "बर'", flag: "🇮🇳", color: "#4F9D69",
    artists: [
      { id: "bodo-jukebox", name: "Bathou Aroj", native: "बाथौ आरज", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "brx-1", title: "Bathou Kherai Puja — Bodo", dur: "20:00", deity: "Bathou", mood: "Sacred", yt: "ZFp_FbcCDGU" },
        { id: "brx-2", title: "Bathou Aroj Methai", dur: "20:00", deity: "Bathou", mood: "Meditative", yt: "d0iYSfPe-Is" },
        { id: "brx-3", title: "Bathou Prayer Song", dur: "20:00", deity: "Bathou", mood: "Meditative", yt: "dwiQgo5eT9A" },
      ] },
    ],
  },
  Santali: {
    label: "ᱥᱟᱱᱛᱟᱲᱤ", flag: "🇮🇳", color: "#C77D3A",
    artists: [
      { id: "santali-jukebox", name: "Marang Buru Sereng", native: "ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ", icon: "📻", specialty: "Devotional Jukebox", songs: [
        { id: "sat-1", title: "Marang Buru Jaher Aayo Bhajan", dur: "30:00", deity: "Marang Buru", mood: "Devotional", yt: "z06AH0CaENM" },
        { id: "sat-2", title: "Binti Siring — Marang Buru", dur: "20:00", deity: "Marang Buru", mood: "Sacred", yt: "Kkef1LgZVKM" },
      ] },
    ],
  },
  Sanskrit: {
    label: "संस्कृतम्", flag: "🕉️", color: "#9FE1CB",
    artists: [
      { id: "vedic-chants", name: "Vedic Chant Masters", native: "वैदिक मन्त्र गायक", icon: "📿", specialty: "Vedic Mantras, Stotrams", songs: [
        { id: "vc-001", title: "Gayatri Mantra — 108 Times", dur: "24:30", deity: "Saraswati", mood: "Chant", yt: "T6GSbLpkt40" },
        { id: "vc-002", title: "Mahamrityunjaya Mantra — 108", dur: "18:45", deity: "Shiva", mood: "Chant", yt: "a60rLwdDQ8I" },
        { id: "vc-003", title: "Om Namah Shivaya — Extended", dur: "12:20", deity: "Shiva", mood: "Meditative", yt: "K6wYPOvQ7OY" },
        { id: "vc-004", title: "Saraswati Stotram", dur: "6:45", deity: "Saraswati", mood: "Sacred" },
        { id: "vc-005", title: "Purusha Suktam", dur: "9:30", deity: "Vishnu", mood: "Chant" },
      ] },
    ],
  },
};

export const MOODS = ["All", "Aarti", "Bhakti", "Chant", "Classical", "Devotional", "Meditative", "Sacred", "Serene", "Sufi", "Uplifting"];
