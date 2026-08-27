export type Lang = "en" | "hi" | "gu";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "हि" },
  { code: "gu", label: "ગુજરાતી", short: "ગુ" },
];

type EventCopy = { name: string; time: string; date: string };

export type Dict = {
  landingTitle: string;
  landingTitleItalic: string;
  tapToUnfurl: string;
  openInvitation: string;
  shloka1: string;
  shloka2: string;
  translitLine: string;
  coupleKicker: string;
  bride: string;
  groom: string;
  weds: string;
  dates: string;
  timelineKicker: string;
  timelineTitle: string;
  day1: string;
  day2: string;
  languageLabel: string;
  events: Record<string, EventCopy>;
};

export const translations: Record<Lang, Dict> = {
  en: {
    landingTitle: "Shreya & Prabhav’s",
    landingTitleItalic: "Wedding",
    tapToUnfurl: "tap to unfurl",
    openInvitation: "Open the invitation",
    shloka1: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।",
    shloka2: "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    translitLine:
      "Vakratunda Mahakaya Suryakoti Samaprabha · Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada",
    coupleKicker: "with love, together forever",
    bride: "Shreya",
    groom: "Prabhav",
    weds: "weds",
    dates: "11 & 12 December",
    timelineKicker: "11th & 12th December",
    timelineTitle: "Wedding Weekend Timeline",
    day1: "11 Dec",
    day2: "12 Dec",
    languageLabel: "Language",
    events: {
      mehandi: { name: "Mehandi", time: "2:00 PM", date: "11th December" },
      "engagement-sangeet": {
        name: "Engagement & Sangeet",
        time: "6:30 PM",
        date: "11th December",
      },
      masquerade: { name: "Masquerade", time: "10:30 PM", date: "11th December" },
      haldi: { name: "Haldi", time: "10:30 AM", date: "12th December" },
      baarat: { name: "Baarat", time: "4:00 PM", date: "12th December" },
      varmala: { name: "Varmala", time: "5:30 PM", date: "12th December" },
      fera: { name: "Fera", time: "11:00 PM", date: "12th December" },
    },
  },
  hi: {
    landingTitle: "श्रेया और प्रभव का",
    landingTitleItalic: "विवाह",
    tapToUnfurl: "खोलने के लिए स्पर्श करें",
    openInvitation: "निमंत्रण खोलें",
    shloka1: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।",
    shloka2: "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    translitLine:
      "हे वक्रतुण्ड, महाकाय, कोटि सूर्यों के समान तेजस्वी — मेरे सभी कार्य सदा निर्विघ्न कीजिए।",
    coupleKicker: "प्रेम सहित, सदा साथ",
    bride: "श्रेया",
    groom: "प्रभव",
    weds: "विवाह",
    dates: "११ और १२ दिसंबर",
    timelineKicker: "११ एवं १२ दिसंबर",
    timelineTitle: "विवाह समारोह की रूपरेखा",
    day1: "११ दिस.",
    day2: "१२ दिस.",
    languageLabel: "भाषा",
    events: {
      mehandi: { name: "मेहंदी", time: "दोपहर २:००", date: "११ दिसंबर" },
      "engagement-sangeet": {
        name: "सगाई एवं संगीत",
        time: "शाम ६:३०",
        date: "११ दिसंबर",
      },
      masquerade: { name: "मास्करेड", time: "रात १०:३०", date: "११ दिसंबर" },
      haldi: { name: "हल्दी", time: "सुबह १०:३०", date: "१२ दिसंबर" },
      baarat: { name: "बारात", time: "शाम ४:००", date: "१२ दिसंबर" },
      varmala: { name: "वरमाला", time: "शाम ५:३०", date: "१२ दिसंबर" },
      fera: { name: "फेरे", time: "रात ११:००", date: "१२ दिसंबर" },
    },
  },
  gu: {
    landingTitle: "શ્રેયા અને પ્રભવનાં",
    landingTitleItalic: "લગ્ન",
    tapToUnfurl: "ખોલવા માટે સ્પર્શ કરો",
    openInvitation: "આમંત્રણ ખોલો",
    shloka1: "વક્રતુણ્ડ મહાકાય સૂર્યકોટિ સમપ્રભ ।",
    shloka2: "નિર્વિઘ્નં કુરુ મે દેવ સર્વકાર્યેષુ સર્વદા ॥",
    translitLine:
      "હે વક્રતુણ્ડ, મહાકાય, કરોડો સૂર્ય સમાન તેજસ્વી — મારાં સર્વ કાર્યો સદા નિર્વિઘ્ને પાર પાડો.",
    coupleKicker: "પ્રેમ સહિત, સદા સાથે",
    bride: "શ્રેયા",
    groom: "પ્રભવ",
    weds: "લગ્ન",
    dates: "૧૧ અને ૧૨ ડિસેમ્બર",
    timelineKicker: "૧૧ તથા ૧૨ ડિસેમ્બર",
    timelineTitle: "લગ્ન પ્રસંગોની રૂપરેખા",
    day1: "૧૧ ડિસે.",
    day2: "૧૨ ડિસે.",
    languageLabel: "ભાષા",
    events: {
      mehandi: { name: "મહેંદી", time: "બપોરે ૨:૦૦", date: "૧૧ ડિસેમ્બર" },
      "engagement-sangeet": {
        name: "સગાઈ અને સંગીત",
        time: "સાંજે ૬:૩૦",
        date: "૧૧ ડિસેમ્બર",
      },
      masquerade: { name: "માસ્કરેડ", time: "રાત્રે ૧૦:૩૦", date: "૧૧ ડિસેમ્બર" },
      haldi: { name: "હળદી", time: "સવારે ૧૦:૩૦", date: "૧૨ ડિસેમ્બર" },
      baarat: { name: "જાન", time: "સાંજે ૪:૦૦", date: "૧૨ ડિસેમ્બર" },
      varmala: { name: "વરમાળા", time: "સાંજે ૫:૩૦", date: "૧૨ ડિસેમ્બર" },
      fera: { name: "ફેરા", time: "રાત્રે ૧૧:૦૦", date: "૧૨ ડિસેમ્બર" },
    },
  },
};
