export type Lang = "en" | "hi" | "gu";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "हि" },
  { code: "gu", label: "ગુજરાતી", short: "ગુ" },
];

type EventCopy = { name: string; time: string; date: string; thought?: string };

export type FormalInvitation = {
  invocation: string;
  salutation: string;
  prelude: string[];
  groomLead: string;
  groomName: string;
  groomGrandparents: string;
  groomParents: string;
  conjunction: string;
  brideName: string;
  brideParents: string;
  announcement?: string;
  invitation: string;
  blessing: string;
  awaitingLabel: string;
  awaitingNames: string[];
  complimentsLabel: string;
  complimentsNames: string;
};

export type Dict = {
  landingTitle: string;
  landingTitleItalic: string;
  tapToUnfurl: string;
  tapTheSeal: string;
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
  invitationLine: string;
  coupleBlessing: string;
  familiesTitle: string;
  theBride: string;
  theGroom: string;
  brideFull: string;
  brideParents: string;
  groomFull: string;
  groomParents: string;
  venueKicker: string;
  venueName: string;
  venueCta: string;
  countdownKicker: string;
  countdownTitle: string;
  months: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  photoPlaceholder: string;
  ganeshInvocation: string;
  closingBlessing: string;
  closingWith: string;
  closingNames: string;
  formalInvitation: FormalInvitation;
  events: Record<string, EventCopy>;
};

export const translations: Record<Lang, Dict> = {
  en: {
    landingTitle: "Shreya & Prabhav’s",
    landingTitleItalic: "Wedding",
    tapToUnfurl: "tap to unfurl",
    tapTheSeal: "tap the seal to open",
    openInvitation: "Open the invitation",
    shloka1: "Vakratunda Mahakaya Suryakoti Samaprabha,",
    shloka2: "Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada.",
    translitLine:
      "O Lord with the curved trunk and mighty form, radiant as a million suns — may all our endeavours be free of obstacles, always.",
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
    invitationLine: "Request the honour of your presence at the celebrations",
    coupleBlessing:
      "Two families, one thread of gold — bound by seven vows and a lifetime of light.",
    familiesTitle: "Together With Their Families",
    theBride: "The Bride",
    theGroom: "The Groom",
    brideFull: "Shreya Joshi",
    brideParents: "daughter of Dr. Rajesh Joshi & Archana Joshi",
    groomFull: "Prabhav Srivastava",
    groomParents: "son of Subodh Srivastava & Garmia Srivastava",
    venueKicker: "where we celebrate",
    venueName: "Foxoso La Alphonso Beach Resort & Spa, Goa",
    venueCta: "Open in Google Maps",
    countdownKicker: "the wait begins",
    countdownTitle: "Counting Down To The Wedding",
    months: "Months",
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    photoPlaceholder: "A photograph of the couple, coming soon",
    ganeshInvocation: "Shri Ganeshay Namah",
    closingBlessing: "May this union be blessed with light, laughter and long years.",
    closingWith: "With love,",
    closingNames: "Shreya & Prabhav",
    formalInvitation: {
      invocation: "॥ Shree Ganeshay Namah ॥",
      salutation: "Dear Family and Friends,",
      prelude: [
        "By the grace of the Almighty and the auspicious blessings of our respected elders,",
        "we are delighted to announce the wedding ceremony of our beloved son,",
      ],
      groomLead: "",
      groomName: "Chi. Prabhav",
      groomGrandparents: "(Grandson of Late Smt. Kamala & Late Shri Krishna Kumar Srivastava)",
      groomParents: "(Son of Smt. Garima & Shri Subodh Srivastava)",
      conjunction: "with",
      brideName: "Ayu. Shreya",
      brideParents: "(Daughter of Smt. Archana & Shri Rajesh Joshi)",
      invitation:
        "On this auspicious occasion, we cordially invite you and your family to grace the ceremony with your esteemed presence and shower the newlywed couple with your love, blessings, and good wishes.",
      blessing: "Your affectionate presence and blessings are the most precious gifts for us.",
      awaitingLabel: "Eagerly Awaiting Your Presence:",
      awaitingNames: [
        "Smt. Seema & Shri Sandeep Srivastava",
        "Smt. Noori & Shri Saurabh Srivastava",
      ],
      complimentsLabel: "Best Compliments From:",
      complimentsNames: "Smt. Garima Srivastava & Shri Subodh Srivastava",
    },
    events: {
      mehandi: {
        name: "Mehandi",
        time: "2:00 PM",
        date: "11th December",
        thought: "Henna-dark hands, and a love just beginning.",
      },
      "engagement-sangeet": {
        name: "Engagement & Sangeet",
        time: "6:30 PM",
        date: "11th December",
        thought: "Music, laughter, and a promise set to dance.",
      },
      masquerade: {
        name: "Masquerade",
        time: "10:30 PM",
        date: "11th December",
        thought: "Behind every mask, the same happy hearts.",
      },
      haldi: {
        name: "Haldi",
        time: "10:30 AM",
        date: "12th December",
        thought: "Sunshine on her skin, laughter in the air.",
      },
      baarat: {
        name: "Baarat",
        time: "4:00 PM",
        date: "12th December",
        thought: "Dhol, dance, and a groom on his way.",
      },
      varmala: {
        name: "Varmala",
        time: "5:30 PM",
        date: "12th December",
        thought: "Two hearts, two families, one garland.",
      },
      fera: {
        name: "Fera",
        time: "11:00 PM",
        date: "12th December",
        thought: "Seven vows, forever — taaron ki chhaon mein.",
      },
    },
  },
  hi: {
    landingTitle: "श्रेया और प्रभव का",
    landingTitleItalic: "विवाह",
    tapToUnfurl: "खोलने के लिए स्पर्श करें",
    tapTheSeal: "खोलने के लिए मुहर स्पर्श करें",
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
    invitationLine: "इस शुभ अवसर पर आपकी उपस्थिति प्रार्थनीय है",
    coupleBlessing: "दो परिवार, एक स्वर्णिम बंधन — सात वचनों और जीवनभर के प्रकाश से बँधे।",
    familiesTitle: "सपरिवार सादर आमंत्रण",
    theBride: "वधू",
    theGroom: "वर",
    brideFull: "श्रेया जोशी",
    brideParents: "सुपुत्री डॉ. राजेश जोशी एवं अर्चना जोशी",
    groomFull: "प्रभव श्रीवास्तव",
    groomParents: "सुपुत्र सुबोध श्रीवास्तव एवं गरिमा श्रीवास्तव",
    venueKicker: "आयोजन स्थल",
    venueName: "फॉक्सोसो ला अल्फांसो बीच रिज़ॉर्ट एंड स्पा, गोवा",
    venueCta: "गूगल मैप्स में देखें",
    countdownKicker: "प्रतीक्षा",
    countdownTitle: "विवाह में शेष समय",
    months: "माह",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    photoPlaceholder: "युगल का चित्र शीघ्र ही",
    ganeshInvocation: "श्री गणेशाय नमः",
    closingBlessing: "यह बंधन प्रकाश, हास्य और दीर्घायु से आशीषित हो।",
    closingWith: "सप्रेम,",
    closingNames: "श्रेया एवं प्रभव",
    formalInvitation: {
      invocation: "॥ श्री गणेशाय नमः ॥",
      salutation: "स्नेही स्वजन,",
      prelude: ["परमपिता परमात्मा की असीम अनुकम्पा एवं", "पूज्य बुज़ुर्गों के मंगलमय आशीर्वाद से"],
      groomLead: "हमारे प्रिय सुपुत्र",
      groomName: "चि. प्रभव",
      groomGrandparents: "(सुपौत्र – स्व. श्रीमती कमला एवं स्व. श्री कृष्ण कुमार श्रीवास्तव)",
      groomParents: "(सुपुत्र – श्रीमती गरिमा एवं श्री सुबोध श्रीवास्तव)",
      conjunction: "एवं",
      brideName: "आयु. श्रेया",
      brideParents: "(सुपुत्री – श्रीमती अर्चना एवं श्री राजेश जोशी)",
      announcement: "का शुभ परिणय संस्कार संपन्न होने जा रहा है।",
      invitation:
        "इस शुभ एवं मंगलमय अवसर पर आप सपरिवार पधारकर नवयुगल को अपने स्नेह, आशीर्वाद एवं शुभकामनाओं से अभिसिंचित करें तथा अपनी गरिमामयी उपस्थिति से इस मांगलिक अवसर की शोभा बढ़ाएँ।",
      blessing: "आपका स्नेहिल आशीर्वाद ही हमारे लिए सबसे अमूल्य उपहार है।",
      awaitingLabel: "दर्शनाकांक्षी",
      awaitingNames: [
        "श्रीमती सीमा एवं श्री संदीप श्रीवास्तव",
        "श्रीमती नूरी एवं श्री सौरभ श्रीवास्तव",
      ],
      complimentsLabel: "विनीत",
      complimentsNames: "श्रीमती गरिमा श्रीवास्तव एवं श्री सुबोध श्रीवास्तव",
    },
    events: {
      mehandi: {
        name: "मेहंदी",
        time: "दोपहर २:००",
        date: "११ दिसंबर",
        thought: "रचे हाथ, और एक नया-नया प्यार।",
      },
      "engagement-sangeet": {
        name: "सगाई एवं संगीत",
        time: "शाम ६:३०",
        date: "११ दिसंबर",
        thought: "संगीत, हँसी और थिरकते हुए वादे।",
      },
      masquerade: {
        name: "मास्करेड",
        time: "रात १०:३०",
        date: "११ दिसंबर",
        thought: "हर नक़ाब के पीछे वही ख़ुश दिल।",
      },
      haldi: {
        name: "हल्दी",
        time: "सुबह १०:३०",
        date: "१२ दिसंबर",
        thought: "धूप-सी हल्दी, हवा में गूँजती हँसी।",
      },
      baarat: {
        name: "बारात",
        time: "शाम ४:००",
        date: "१२ दिसंबर",
        thought: "ढोल, नाच और आता हुआ दूल्हा।",
      },
      varmala: {
        name: "वरमाला",
        time: "शाम ५:३०",
        date: "१२ दिसंबर",
        thought: "दो दिल, दो परिवार, एक वरमाला।",
      },
      fera: {
        name: "फेरे",
        time: "रात ११:००",
        date: "१२ दिसंबर",
        thought: "सात वचन, सदा के लिए — तारों की छाँव में।",
      },
    },
  },
  gu: {
    landingTitle: "શ્રેયા અને પ્રભવનાં",
    landingTitleItalic: "લગ્ન",
    tapToUnfurl: "ખોલવા માટે સ્પર્શ કરો",
    tapTheSeal: "ખોલવા માટે મહોર સ્પર્શ કરો",
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
    invitationLine: "આ શુભ પ્રસંગે આપની ઉપસ્થિતિ પ્રાર્થનીય છે",
    coupleBlessing: "બે પરિવાર, એક સોનેરી તાંતણો — સાત વચનો અને જીવનભરના પ્રકાશથી બંધાયેલા.",
    familiesTitle: "સપરિવાર સ્નેહ આમંત્રણ",
    theBride: "કન્યા",
    theGroom: "વર",
    brideFull: "શ્રેયા જોશી",
    brideParents: "સુપુત્રી ડૉ. રાજેશ જોશી અને અર્ચના જોશી",
    groomFull: "પ્રભવ શ્રીવાસ્તવ",
    groomParents: "સુપુત્ર સુબોધ શ્રીવાસ્તવ અને ગરિમા શ્રીવાસ્તવ",
    venueKicker: "સ્થળ",
    venueName: "ફોક્સોસો લા અલ્ફોન્સો બીચ રિસોર્ટ એન્ડ સ્પા, ગોવા",
    venueCta: "ગૂગલ મેપ્સમાં જુઓ",
    countdownKicker: "પ્રતીક્ષા",
    countdownTitle: "લગ્નને બાકી સમય",
    months: "માસ",
    days: "દિવસ",
    hours: "કલાક",
    minutes: "મિનિટ",
    seconds: "સેકંડ",
    photoPlaceholder: "યુગલનો ફોટો ટૂંક સમયમાં",
    ganeshInvocation: "શ્રી ગણેશાય નમઃ",
    closingBlessing: "આ બંધન પ્રકાશ, હાસ્ય અને દીર્ઘાયુથી આશીર્વાદિત રહે.",
    closingWith: "સ્નેહ સહિત,",
    closingNames: "શ્રેયા અને પ્રભવ",
    formalInvitation: {
      invocation: "॥ શ્રી ગણેશાય નમઃ ॥",
      salutation: "સ્નેહી સ્વજન,",
      prelude: ["પરમકૃપાળુ પરમાત્માની અસીમ કૃપા અને", "પૂજ્ય વડીલોના મંગળમય આશીર્વાદથી"],
      groomLead: "અમારા પ્રિય સુપુત્ર",
      groomName: "ચિ. પ્રભવ",
      groomGrandparents: "(સુપૌત્ર – સ્વ. શ્રીમતી કમલા અને સ્વ. શ્રી કૃષ્ણ કુમાર શ્રીવાસ્તવ)",
      groomParents: "(સુપુત્ર – શ્રીમતી ગરિમા અને શ્રી સુબોધ શ્રીવાસ્તવ)",
      conjunction: "અને",
      brideName: "આયુ. શ્રેયા",
      brideParents: "(સુપુત્રી – શ્રીમતી અર્ચના અને શ્રી રાજેશ જોષી)",
      announcement: "નો શુભ લગ્ન પ્રસંગ (પરિણય સંસ્કાર) નિર્ધાર્યો છે.",
      invitation:
        "આ શુભ અને મંગળમય અવસર પર આપ સહપરિવાર પધારીને નવદંપતીને આપના સ્નેહ, આશીર્વાદ અને શુભકામનાઓથી અભિસિંચિત કરો તથા આપની ગરિમામયી ઉપસ્થિતિથી આ માંગલિક અવસરની શોભા વધારો.",
      blessing: "આપના સ્નેહસભર આશીર્વાદ જ અમારા માટે સૌથી અમૂલ્ય ભેટ છે.",
      awaitingLabel: "દર્શનાભિલાષી",
      awaitingNames: [
        "શ્રીમતી સીમા અને શ્રી સંદીપ શ્રીવાસ્તવ",
        "શ્રીમતી નૂરી અને શ્રી સૌરભ શ્રીવાસ્તવ",
      ],
      complimentsLabel: "વિનીત",
      complimentsNames: "શ્રીમતી ગરિમા શ્રીવાસ્તવ અને શ્રી સુબોધ શ્રીવાસ્તવ",
    },
    events: {
      mehandi: {
        name: "મહેંદી",
        time: "બપોરે ૨:૦૦",
        date: "૧૧ ડિસેમ્બર",
        thought: "મહેંદીભર્યા હાથ, અને નવો-નવો પ્રેમ.",
      },
      "engagement-sangeet": {
        name: "સગાઈ અને સંગીત",
        time: "સાંજે ૬:૩૦",
        date: "૧૧ ડિસેમ્બર",
        thought: "સંગીત, હાસ્ય અને નાચતું વચન.",
      },
      masquerade: {
        name: "માસ્કરેડ",
        time: "રાત્રે ૧૦:૩૦",
        date: "૧૧ ડિસેમ્બર",
        thought: "દરેક મુખવટા પાછળ એ જ ખુશ હૃદય.",
      },
      haldi: {
        name: "હળદી",
        time: "સવારે ૧૦:૩૦",
        date: "૧૨ ડિસેમ્બર",
        thought: "હળદરનો તડકો, હવામાં હાસ્ય.",
      },
      baarat: {
        name: "જાન",
        time: "સાંજે ૪:૦૦",
        date: "૧૨ ડિસેમ્બર",
        thought: "ઢોલ, નાચ અને આવતો વરરાજા.",
      },
      varmala: {
        name: "વરમાળા",
        time: "સાંજે ૫:૩૦",
        date: "૧૨ ડિસેમ્બર",
        thought: "બે હૃદય, બે પરિવાર, એક વરમાળા.",
      },
      fera: {
        name: "ફેરા",
        time: "રાત્રે ૧૧:૦૦",
        date: "૧૨ ડિસેમ્બર",
        thought: "સાત વચન, સદાય — તારાઓની છાંવમાં.",
      },
    },
  },
};
