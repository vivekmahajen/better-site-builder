// Aastha Bhakti Radio — devotional music catalog (8 languages, 16+ artists, 80+ songs).
// `src`/`youtube` are null in this concept build; the player runs in simulated mode.
// Wire real audio by setting NEXT_PUBLIC_RADIO_CDN and using lib/radio/audioManager.

export const BHAKTI_CATALOG = {
  Hindi: {
    label: "हिन्दी", flag: "🇮🇳", color: "#E8710A",
    artists: [
      { id: "lata-mangeshkar", name: "Lata Mangeshkar", native: "लता मंगेशकर", icon: "🎤", specialty: "Bhajans, Aartis, Classical Devotional", songs: [
        { id: "lm-001", title: "Aayega Aane Wala", dur: "4:12", deity: "Bhagwan", mood: "Serene" },
        { id: "lm-002", title: "Jai Mata Di", dur: "5:30", deity: "Durga", mood: "Devotional" },
        { id: "lm-003", title: "Saraswati Vandana", dur: "3:48", deity: "Saraswati", mood: "Meditative" },
        { id: "lm-005", title: "Raghupati Raghav Raja Ram", dur: "4:50", deity: "Rama", mood: "Uplifting" },
        { id: "lm-006", title: "Vaishnav Jan To", dur: "5:18", deity: "Vishnu", mood: "Meditative", yt: "oyM_PZQvy14" },
      ] },
      { id: "anuradha-paudwal", name: "Anuradha Paudwal", native: "अनुराधा पौडवाल", icon: "🕉️", specialty: "Shiv Bhajans, Mata Bhajans, Chalisa", songs: [
        { id: "ap-001", title: "Om Jai Jagdish Hare", dur: "5:22", deity: "Vishnu", mood: "Aarti", yt: "NE3SWh9_vR4" },
        { id: "ap-002", title: "Shiv Chalisa", dur: "8:10", deity: "Shiva", mood: "Sacred" },
        { id: "ap-003", title: "Jai Ambe Gauri", dur: "4:35", deity: "Durga", mood: "Aarti" },
        { id: "ap-004", title: "Sukhkarta Dukhaharta", dur: "3:55", deity: "Ganesha", mood: "Aarti", yt: "sHTX6Jt2YZg" },
        { id: "ap-006", title: "Hanuman Chalisa", dur: "9:45", deity: "Hanuman", mood: "Uplifting", yt: "AETFvQonfV8" },
        { id: "ap-007", title: "Lakshmi Chalisa", dur: "7:30", deity: "Lakshmi", mood: "Sacred" },
      ] },
      { id: "narendra-chanchal", name: "Narendra Chanchal", native: "नरेंद्र चंचल", icon: "🪔", specialty: "Mata Bhajans, Jagrata", songs: [
        { id: "nc-001", title: "Chalo Bulawa Aaya Hai", dur: "5:08", deity: "Durga", mood: "Devotional" },
        { id: "nc-003", title: "Sheranwali Aao", dur: "4:45", deity: "Durga", mood: "Devotional" },
        { id: "nc-004", title: "Tu Hi Durga Tu Hi Kali", dur: "5:20", deity: "Durga", mood: "Uplifting" },
      ] },
      { id: "anup-jalota", name: "Anup Jalota", native: "अनूप जलोटा", icon: "🌸", specialty: "Bhajans, Kabir, Classical", songs: [
        { id: "aj-001", title: "Aisi Lagi Lagan", dur: "6:22", deity: "Krishna", mood: "Serene" },
        { id: "aj-002", title: "Ek Radha Ek Meera", dur: "5:45", deity: "Krishna", mood: "Bhakti" },
        { id: "aj-004", title: "Sita Ram Sita Ram", dur: "4:30", deity: "Rama", mood: "Meditative" },
      ] },
    ],
  },
  Telugu: {
    label: "తెలుగు", flag: "🇮🇳", color: "#7F77DD",
    artists: [
      { id: "spb-telugu", name: "S.P. Balasubrahmanyam", native: "ఎస్.పి. బాలసుబ్రహ్మణ్యం", icon: "🎶", specialty: "Annamacharya Keertanas, Venkateswara", songs: [
        { id: "spb-002", title: "Govinda Govinda Hari Govinda", dur: "4:18", deity: "Krishna", mood: "Devotional" },
        { id: "spb-003", title: "Srinivasa Govinda", dur: "6:05", deity: "Venkateswara", mood: "Bhakti", yt: "vGbTEJoVoE8" },
        { id: "spb-004", title: "Om Namo Venkatesaya", dur: "7:12", deity: "Venkateswara", mood: "Sacred" },
        { id: "spb-005", title: "Sri Rama Rama Rameti", dur: "4:55", deity: "Rama", mood: "Chant" },
      ] },
      { id: "ms-subbulakshmi", name: "M.S. Subbulakshmi", native: "ఎమ్.ఎస్. సుబ్బులక్ష్మి", icon: "🪷", specialty: "Suprabhatam, Sahasranamam", songs: [
        { id: "ms-001", title: "Venkateshwara Suprabhatam", dur: "12:30", deity: "Venkateswara", mood: "Sacred" },
        { id: "ms-002", title: "Vishnu Sahasranamam", dur: "28:45", deity: "Vishnu", mood: "Sacred", yt: "KD62AN_SG9M" },
        { id: "ms-003", title: "Bhaja Govindam", dur: "8:20", deity: "Krishna", mood: "Classical" },
      ] },
    ],
  },
  Tamil: {
    label: "தமிழ்", flag: "🇮🇳", color: "#1D9E75",
    artists: [
      { id: "kj-yesudas", name: "K.J. Yesudas", native: "கே.ஜே. யேசுதாஸ்", icon: "🌟", specialty: "Harivarasanam, Sabarimala", songs: [
        { id: "kj-001", title: "Harivarasanam (Sabarimala)", dur: "7:20", deity: "Ayyappa", mood: "Sacred", yt: "zYXuxap3jzE" },
        { id: "kj-002", title: "Guruvaayurappan", dur: "5:45", deity: "Krishna", mood: "Devotional" },
        { id: "kj-003", title: "Saranam Saranam Ayyappa", dur: "6:10", deity: "Ayyappa", mood: "Bhakti" },
        { id: "kj-005", title: "Muruganukku Arohara", dur: "5:30", deity: "Murugan", mood: "Uplifting" },
      ] },
      { id: "tms-tamil", name: "T.M. Soundararajan", native: "டி.எம். சௌந்தரராஜன்", icon: "🎵", specialty: "Kandha Sashti Kavasam, Murugan", songs: [
        { id: "tms-001", title: "Kandha Sashti Kavasam", dur: "8:45", deity: "Murugan", mood: "Chant" },
        { id: "tms-003", title: "Ayyappa Swamy Sharanam", dur: "4:30", deity: "Ayyappa", mood: "Devotional" },
      ] },
      { id: "p-susheela", name: "P. Susheela", native: "பி. சுஶீல", icon: "🌷", specialty: "Slokas, Amman Bhajans", songs: [
        { id: "ps-002", title: "Amman Devotional Medley", dur: "5:40", deity: "Durga", mood: "Devotional" },
        { id: "ps-003", title: "Devi Mahatmyam", dur: "8:22", deity: "Durga", mood: "Sacred" },
      ] },
    ],
  },
  Bengali: {
    label: "বাংলা", flag: "🇮🇳", color: "#D4537E",
    artists: [
      { id: "hemanta", name: "Hemanta Mukhopadhyay", native: "হেমন্ত মুখোপাধ্যায়", icon: "🎼", specialty: "Durga Puja, Kirtan", songs: [
        { id: "hm-001", title: "Mahishasura Mardini Stotra", dur: "15:30", deity: "Durga", mood: "Chant", yt: "YQyo8QeoYhc" },
        { id: "hm-002", title: "Durga Puja Kirtan", dur: "6:30", deity: "Durga", mood: "Bhakti" },
        { id: "hm-004", title: "Tumi Kato Je Bhalobasho", dur: "4:48", deity: "Krishna", mood: "Serene" },
      ] },
      { id: "sandhya", name: "Sandhya Mukhopadhyay", native: "সন্ধ্যা মুখোপাধ্যায়", icon: "🕊️", specialty: "Saraswati Vandana, Tagore Devotional", songs: [
        { id: "sm-001", title: "Saraswati Bandana", dur: "5:22", deity: "Saraswati", mood: "Meditative" },
        { id: "sm-002", title: "Tumi Robe Nirabe", dur: "4:48", deity: "Bhagwan", mood: "Meditative" },
      ] },
    ],
  },
  Gujarati: {
    label: "ગુજરાતી", flag: "🇮🇳", color: "#EF9F27",
    artists: [
      { id: "geeta-rabari", name: "Geeta Ben Rabari", native: "ગીતા બેન રબારી", icon: "🥁", specialty: "Navratri Garba, Folk Bhajans", songs: [
        { id: "gr-002", title: "Meldi Maa Bhajan", dur: "5:10", deity: "Durga", mood: "Devotional" },
        { id: "gr-003", title: "Navratri Garba Medley", dur: "12:30", deity: "Durga", mood: "Uplifting" },
        { id: "gr-004", title: "Ambe Maa Aarti", dur: "5:45", deity: "Durga", mood: "Aarti", yt: "GaoJC_S55IA" },
      ] },
      { id: "asha-vaishnav", name: "Asha Vaishnav", native: "આશા વૈષ્ણવ", icon: "🪗", specialty: "Classical Gujarati Bhajans", songs: [
        { id: "av-001", title: "Vaishnav Jan To", dur: "4:15", deity: "Vishnu", mood: "Meditative", yt: "oyM_PZQvy14" },
        { id: "av-003", title: "Jalaram Bapa Na Bhajan", dur: "5:22", deity: "Bhagwan", mood: "Devotional" },
      ] },
    ],
  },
  Marathi: {
    label: "मराठी", flag: "🇮🇳", color: "#85B7EB",
    artists: [
      { id: "bhimsen-joshi", name: "Pt. Bhimsen Joshi", native: "पं. भीमसेन जोशी", icon: "🎺", specialty: "Abhang, Pandurang Kirtan", songs: [
        { id: "bj-001", title: "Jai Jai Vitthal Rakhumai", dur: "7:15", deity: "Vishnu", mood: "Devotional", yt: "0pkiwpHMB_Q" },
        { id: "bj-002", title: "Ananda Sohala (Tukaram)", dur: "9:30", deity: "Vishnu", mood: "Bhakti" },
        { id: "bj-003", title: "Raag Bhairavi Bhajan", dur: "12:45", deity: "Shiva", mood: "Classical" },
      ] },
      { id: "lata-marathi", name: "Lata Mangeshkar (Marathi)", native: "लता मंगेशकर", icon: "🌻", specialty: "Marathi Aarti, Ganpati, Vaari", songs: [
        { id: "lm-mar-001", title: "Jai Dev Jai Dev Mangalmurti", dur: "5:30", deity: "Ganesha", mood: "Aarti" },
        { id: "lm-mar-002", title: "Vithhal Vithhal Vithhal", dur: "6:45", deity: "Vishnu", mood: "Chant" },
      ] },
    ],
  },
  Punjabi: {
    label: "ਪੰਜਾਬੀ", flag: "🇮🇳", color: "#5DCAA5",
    artists: [
      { id: "gurdas-maan", name: "Gurdas Maan", native: "ਗੁਰਦਾਸ ਮਾਨ", icon: "🎸", specialty: "Punjabi Bhajans, Sufi", songs: [
        { id: "gm-001", title: "Dhan Dhan Guru Nanak", dur: "5:48", deity: "Guru Nanak", mood: "Devotional" },
        { id: "gm-003", title: "Babe Nanak Nu", dur: "6:10", deity: "Guru Nanak", mood: "Meditative" },
      ] },
      { id: "wadali-brothers", name: "Wadali Brothers", native: "ਵਡਾਲੀ ਬ੍ਰਦਰਜ਼", icon: "🎻", specialty: "Sufi Qawwali, Bulleh Shah", songs: [
        { id: "wb-001", title: "Tere Ishq Nachaya", dur: "8:30", deity: "Bhagwan", mood: "Sufi" },
        { id: "wb-002", title: "Rabba Ishq Na Howe", dur: "7:15", deity: "Bhagwan", mood: "Sufi" },
      ] },
    ],
  },
  Sanskrit: {
    label: "संस्कृतम्", flag: "🕉️", color: "#9FE1CB",
    artists: [
      { id: "vedic-chants", name: "Vedic Chant Masters", native: "वैदिक मन्त्र गायक", icon: "📿", specialty: "Vedic Mantras, Stotrams", songs: [
        { id: "vc-001", title: "Gayatri Mantra — 108 Times", dur: "24:30", deity: "Saraswati", mood: "Chant", yt: "T6GSbLpkt40" },
        { id: "vc-002", title: "Mahamrityunjaya Mantra — 108", dur: "18:45", deity: "Shiva", mood: "Chant", yt: "a60rLwdDQ8I" },
        { id: "vc-003", title: "Om Namah Shivaya — Extended", dur: "12:20", deity: "Shiva", mood: "Meditative" },
        { id: "vc-004", title: "Saraswati Stotram", dur: "6:45", deity: "Saraswati", mood: "Sacred" },
        { id: "vc-005", title: "Purusha Suktam", dur: "9:30", deity: "Vishnu", mood: "Chant" },
      ] },
    ],
  },
};

export const MOODS = ["All", "Aarti", "Bhakti", "Chant", "Classical", "Devotional", "Meditative", "Sacred", "Serene", "Sufi", "Uplifting"];
