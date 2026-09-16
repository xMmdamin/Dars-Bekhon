/* ===================== SUBJECTS ===================== */
const SUBJECTS = {
  biology:{name:"زیست‌شناسی",icon:"🧬",mode:"concours"},
  chemistry:{name:"شیمی",icon:"⚗️",mode:"concours"},
  physics:{name:"فیزیک",icon:"⚛️",mode:"concours"},
  math:{name:"ریاضی",icon:"🧮",mode:"concours"},
  calculus:{name:"حسابان",icon:"∫",mode:"concours"},
  geometry:{name:"هندسه",icon:"📐",mode:"concours"},
  discrete:{name:"گسسته",icon:"🔢",mode:"concours"},
  statistics:{name:"آمار و احتمال",icon:"📊",mode:"concours"},
  geology:{name:"زمین‌شناسی",icon:"🌍",mode:"concours"},
  persian:{name:"فارسی",icon:"📖",mode:"final"},
  dini:{name:"دینی",icon:"📜",mode:"final"},
  english:{name:"انگلیسی",icon:"🔤",mode:"final"},
  arabic:{name:"عربی",icon:"📝",mode:"final"},
  arabicSpec:{name:"عربی تخصصی",icon:"📗",mode:"concours"},
  health:{name:"سلامت و بهداشت",icon:"❤️‍🩹",mode:"final"},
  identity:{name:"هویت اجتماعی",icon:"🧑‍🤝‍🧑",mode:"final"},
  sociology:{name:"جامعه‌شناسی",icon:"👥",mode:"concours"},
  psychology:{name:"روان‌شناسی",icon:"🧠",mode:"concours"},
  economics:{name:"اقتصاد",icon:"💰",mode:"concours"},
  history:{name:"تاریخ",icon:"🏛️",mode:"concours"},
  geography:{name:"جغرافیا",icon:"🗺️",mode:"concours"},
  geographyIran:{name:"جغرافیای ایران",icon:"🗺️",mode:"final"},
  defensePrep:{name:"آمادگی دفاعی",icon:"🛡️",mode:"final"},
  culturalAnalysis:{name:"تحلیل فرهنگی",icon:"🎭",mode:"final"},
  literaryArts:{name:"علوم و فنون",icon:"✒️",mode:"concours"},
  logic:{name:"منطق",icon:"🔎",mode:"concours"},
  philosophy:{name:"فلسفه",icon:"💭",mode:"concours"},
  contemporaryHistory:{name:"تاریخ معاصر",icon:"📜",mode:"final"},
  humanEnvironment:{name:"انسان و محیط زیست",icon:"🌍",mode:"final"},
  mediaLiteracy:{name:"تفکر و سواد رسانه‌ای",icon:"🧠",mode:"final"},
  mathStats:{name:"ریاضی و آمار",icon:"📊",mode:"concours"}
};
const TYPES = {
  learn:{name:"آموزش",base:40},practice:{name:"تست آموزشی",base:45},coverage:{name:"تست پوششی",base:48},
  review:{name:"مرور",base:35},final:{name:"تشریحی / نهایی",base:40},timed:{name:"تست زمان‌دار",base:50},
  analysis:{name:"تحلیل آزمون",base:55},recovery:{name:"جبرانی",base:35}
};
const QUALITY={poor:.5,normal:.8,good:1,excellent:1.15,exceptional:1.3};
const DIFFICULTY={easy:.8,normal:1,hard:1.15,veryhard:1.3,nightmare:1.5};
const stateKey="studyRPG_Amin_v1";

/* ===================== CHECKLIST COLUMNS ===================== */
const CHECKLIST_STD_COLS = [
  "آموزش","کتاب تست","منبع تستی ۲","منبع تستی ۳",
  "آزمون آزمایشی ۱","آزمون آزمایشی ۲","آزمون آزمایشی ۳",
  "تست علامت‌دار","سوالات کنکور","میزان تسلط",
  "مرور ۱","مرور ۲","مرور ۳","مرور ۴",
  "آموزش","سوالات نهایی","کتاب تشریحی ۱","منبع تشریحی ۲","آزمون تشریحی ۱","آزمون تشریحی ۲"
];
const CHECKLIST_STD_GROUPS = [{label:"کنکور",span:14},{label:"امتحان نهایی",span:6}];
const CHECKLIST_CONCOURS_ONLY_COLS = CHECKLIST_STD_COLS.slice(0,14);
const CHECKLIST_CONCOURS_ONLY_GROUPS = [{label:"کنکور",span:14}];
const CHECKLIST_GENERAL_COLS = [
  "آموزش","کتاب درسی","سوالات نهایی","کتاب تشریحی ۱","منبع تشریحی ۲",
  "سوال علامت‌دار","آزمون مبحثی","آزمون جامع","میزان تسلط","مرور ۱","مرور ۲","مرور ۳"
];

function rowsByLesson(gradeId, lessonCount, topics, lessonTitles){
  const rows=[];
  for(let i=1;i<=lessonCount;i++){
    const t=(lessonTitles&&lessonTitles[i-1])||`درس ${i}`;
    topics.forEach((top,ti)=>rows.push({id:`${gradeId}_d${i}_t${ti}`,label:`${t} — ${top}`}));
  }
  return rows;
}
function simpleGrade(gradeId, gradeName, count, prefix){
  return {id:gradeId,label:`پایه ${gradeName}`,
    rows:Array.from({length:count},(_,i)=>({id:`${gradeId}_d${i+1}`,label:`${prefix||"درس"} ${i+1}`}))};
}

/* ===================== CHECKLIST TEMPLATES ===================== */
const CHECKLIST_TEMPLATES = {
  physics:{
    name:"فیزیک", icon:"⚛️",
    sections:[
      {id:"m10", label:"پایه دهم", major:"mathematics", rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"},
        {id:"c4",label:"فصل ۴"},
        {id:"c5",label:"فصل ۵"}
      ]},
      {id:"s10", label:"پایه دهم", major:"experimental", rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"},
        {id:"c4",label:"فصل ۴"}
      ]},
      {id:"g11", label:"پایه یازدهم", rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]},
      {id:"g12", label:"پایه دوازدهم", rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"},
        {id:"c4",label:"فصل ۴"}
      ]}
    ],
    cols:CHECKLIST_STD_COLS, groups:CHECKLIST_STD_GROUPS
  },
  chemistry:{
    name:"شیمی", icon:"⚗️",
    sections:[
      {id:"y10",label:"پایه دهم",rows:[
        {id:"c1h",label:"فصل ۱ — حفظیات"},
        {id:"c1m",label:"فصل ۱ — مفاهیم"},
        {id:"c1p",label:"فصل ۱ — مسائل"},
        {id:"c2h",label:"فصل ۲ — حفظیات"},
        {id:"c2m",label:"فصل ۲ — مفاهیم"},
        {id:"c2p",label:"فصل ۲ — مسائل"},
        {id:"c3h",label:"فصل ۳ — حفظیات"},
        {id:"c3m",label:"فصل ۳ — مفاهیم"},
        {id:"c3p",label:"فصل ۳ — مسائل"}
      ]},
      {id:"y11",label:"پایه یازدهم",rows:[
        {id:"c1h",label:"فصل ۱ — حفظیات"},
        {id:"c1m",label:"فصل ۱ — مفاهیم"},
        {id:"c1p",label:"فصل ۱ — مسائل"},
        {id:"c2h",label:"فصل ۲ — حفظیات"},
        {id:"c2m",label:"فصل ۲ — مفاهیم"},
        {id:"c2p",label:"فصل ۲ — مسائل"},
        {id:"c3h",label:"فصل ۳ — حفظیات"},
        {id:"c3m",label:"فصل ۳ — مفاهیم"},
        {id:"c3p",label:"فصل ۳ — مسائل"}
      ]},
      {id:"y12",label:"پایه دوازدهم",rows:[
        {id:"c1h",label:"فصل ۱ — حفظیات"},
        {id:"c1m",label:"فصل ۱ — مفاهیم"},
        {id:"c1p",label:"فصل ۱ — مسائل"},
        {id:"c2h",label:"فصل ۲ — حفظیات"},
        {id:"c2m",label:"فصل ۲ — مفاهیم"},
        {id:"c2p",label:"فصل ۲ — مسائل"},
        {id:"c3h",label:"فصل ۳ — حفظیات"},
        {id:"c3m",label:"فصل ۳ — مفاهیم"},
        {id:"c3p",label:"فصل ۳ — مسائل"},
        {id:"c4h",label:"فصل ۴ — حفظیات"},
        {id:"c4m",label:"فصل ۴ — مفاهیم"},
        {id:"c4p",label:"فصل ۴ — مسائل"}
      ]}
    ],
    cols:CHECKLIST_STD_COLS, groups:CHECKLIST_STD_GROUPS
  },
  biology:{
    name:"زیست‌شناسی", icon:"🧬",
    sections:[
      {id:"y10", label:"پایه دهم", rows:[
        {id:"c1g1",label:"فصل ۱ — گفتار ۱"},
        {id:"c1g2",label:"فصل ۱ — گفتار ۲"},
        {id:"c1g3",label:"فصل ۱ — گفتار ۳"},
        {id:"c2g1",label:"فصل ۲ — گفتار ۱"},
        {id:"c2g2",label:"فصل ۲ — گفتار ۲"},
        {id:"c2g3",label:"فصل ۲ — گفتار ۳"},
        {id:"c3g1",label:"فصل ۳ — گفتار ۱"},
        {id:"c3g2",label:"فصل ۳ — گفتار ۲"},
        {id:"c3g3",label:"فصل ۳ — گفتار ۳"},
        {id:"c4g1",label:"فصل ۴ — گفتار ۱"},
        {id:"c4g2",label:"فصل ۴ — گفتار ۲"},
        {id:"c4g3",label:"فصل ۴ — گفتار ۳"},
        {id:"c4g4",label:"فصل ۴ — گفتار ۴"},
        {id:"c5g1",label:"فصل ۵ — گفتار ۱"},
        {id:"c5g2",label:"فصل ۵ — گفتار ۲"},
        {id:"c5g3",label:"فصل ۵ — گفتار ۳"},
        {id:"c6g1",label:"فصل ۶ — گفتار ۱"},
        {id:"c6g2",label:"فصل ۶ — گفتار ۲"},
        {id:"c6g3",label:"فصل ۶ — گفتار ۳"},
        {id:"c7g1",label:"فصل ۷ — گفتار ۱"},
        {id:"c7g2",label:"فصل ۷ — گفتار ۲"},
        {id:"c7g3",label:"فصل ۷ — گفتار ۳"}
      ]},
      {id:"y11", label:"پایه یازدهم", rows:[
        {id:"c1g1",label:"فصل ۱ — گفتار ۱"},
        {id:"c1g2",label:"فصل ۱ — گفتار ۲"},
        {id:"c2g1",label:"فصل ۲ — گفتار ۱"},
        {id:"c2g2",label:"فصل ۲ — گفتار ۲"},
        {id:"c2g3",label:"فصل ۲ — گفتار ۳"},
        {id:"c3g1",label:"فصل ۳ — گفتار ۱"},
        {id:"c3g2",label:"فصل ۳ — گفتار ۲"},
        {id:"c4g1",label:"فصل ۴ — گفتار ۱"},
        {id:"c4g2",label:"فصل ۴ — گفتار ۲"},
        {id:"c5g1",label:"فصل ۵ — گفتار ۱"},
        {id:"c5g2",label:"فصل ۵ — گفتار ۲"},
        {id:"c5g3",label:"فصل ۵ — گفتار ۳"},
        {id:"c6g1",label:"فصل ۶ — گفتار ۱"},
        {id:"c6g2",label:"فصل ۶ — گفتار ۲"},
        {id:"c6g3",label:"فصل ۶ — گفتار ۳"},
        {id:"c7g1",label:"فصل ۷ — گفتار ۱"},
        {id:"c7g2",label:"فصل ۷ — گفتار ۲"},
        {id:"c7g3",label:"فصل ۷ — گفتار ۳"},
        {id:"c7g4",label:"فصل ۷ — گفتار ۴"},
        {id:"c8g1",label:"فصل ۸ — گفتار ۱"},
        {id:"c8g2",label:"فصل ۸ — گفتار ۲"},
        {id:"c8g3",label:"فصل ۸ — گفتار ۳"},
        {id:"c9g1",label:"فصل ۹ — گفتار ۱"},
        {id:"c9g2",label:"فصل ۹ — گفتار ۲"}
      ]},
      {id:"y12", label:"پایه دوازدهم", rows:[
        {id:"c1g1",label:"فصل ۱ — گفتار ۱"},
        {id:"c1g2",label:"فصل ۱ — گفتار ۲"},
        {id:"c1g3",label:"فصل ۱ — گفتار ۳"},
        {id:"c2g1",label:"فصل ۲ — گفتار ۱"},
        {id:"c2g2",label:"فصل ۲ — گفتار ۲"},
        {id:"c2g3",label:"فصل ۲ — گفتار ۳"},
        {id:"c3g1",label:"فصل ۳ — گفتار ۱"},
        {id:"c3g2",label:"فصل ۳ — گفتار ۲"},
        {id:"c4g1",label:"فصل ۴ — گفتار ۱"},
        {id:"c4g2",label:"فصل ۴ — گفتار ۲"},
        {id:"c4g3",label:"فصل ۴ — گفتار ۳"},
        {id:"c5g1",label:"فصل ۵ — گفتار ۱"},
        {id:"c5g2",label:"فصل ۵ — گفتار ۲"},
        {id:"c5g3",label:"فصل ۵ — گفتار ۳"},
        {id:"c6g1",label:"فصل ۶ — گفتار ۱"},
        {id:"c6g2",label:"فصل ۶ — گفتار ۲"},
        {id:"c6g3",label:"فصل ۶ — گفتار ۳"},
        {id:"c7g1",label:"فصل ۷ — گفتار ۱"},
        {id:"c7g2",label:"فصل ۷ — گفتار ۲"},
        {id:"c7g3",label:"فصل ۷ — گفتار ۳"},
        {id:"c8g1",label:"فصل ۸ — گفتار ۱"},
        {id:"c8g2",label:"فصل ۸ — گفتار ۲"},
        {id:"c8g3",label:"فصل ۸ — گفتار ۳"}
      ]}
    ],
    cols:CHECKLIST_STD_COLS, groups:CHECKLIST_STD_GROUPS
  },
  math:{
    name:"ریاضی", icon:"➗",
    sections:[
      {id:"g10",label:"پایه دهم",rows:[
        {id:"r1",label:"مجموعه و بازه"},
        {id:"r2",label:"الگو و دنباله"},
        {id:"r3",label:"مثلثات"},
        {id:"r4",label:"توان‌های گویا و عبارت‌های جبری"},
        {id:"r5",label:"معادله و نامعادله"},
        {id:"r6",label:"درجه ۲ و سهمی"},
        {id:"r7",label:"تابع"},
        {id:"r8",label:"شمارش"},
        {id:"r9",label:"آمار"}
      ]},
      {id:"g11",label:"پایه یازدهم",rows:[
        {id:"r1",label:"هندسه یازدهم"},
        {id:"r2",label:"هندسه تحلیلی"},
        {id:"r3",label:"تابع"},
        {id:"r4",label:"توابع نمایی و لگاریتمی"},
        {id:"r5",label:"مثلثات"},
        {id:"r6",label:"حد و پیوستگی"},
        {id:"r7",label:"آمار و احتمال"}
      ]},
      {id:"g12k",label:"کنکور جامع — مبحثی",
        cols:CHECKLIST_CONCOURS_ONLY_COLS, groups:CHECKLIST_CONCOURS_ONLY_GROUPS,
        rows:[
          {id:"k_set",      label:"مجموعه و بازه"},
          {id:"k_expr",     label:"توان‌های گویا و عبارت‌های جبری"},
          {id:"k_eq",       label:"معادله و نامعادله"},
          {id:"k_abs",      label:"قدر مطلق و جزء صحیح"},
          {id:"k_quad",     label:"درجه ۲ و سهمی"},
          {id:"k_seq",      label:"الگو و دنباله"},
          {id:"k_func",     label:"تابع"},
          {id:"k_log",      label:"تابع نمایی و لگاریتمی"},
          {id:"k_trig",     label:"مثلثات"},
          {id:"k_count",    label:"شمارش"},
          {id:"k_prob",     label:"احتمال"},
          {id:"k_stat",     label:"آمار"},
          {id:"k_geom11",   label:"هندسه یازدهم"},
          {id:"k_analytic", label:"هندسه تحلیلی"},
          {id:"k_geom12",   label:"هندسه دوازدهم"},
          {id:"k_limit",    label:"حد و پیوستگی"},
          {id:"k_deriv",    label:"مشتق"},
          {id:"k_appderiv", label:"کاربرد مشتق"}
        ]},
      {id:"g12f",label:"امتحان نهایی دوازدهم",
        cols:CHECKLIST_GENERAL_COLS, groups:null,
        rows:[
          {id:"f_func",     label:"تابع"},
          {id:"f_trig",     label:"مثلثات"},
          {id:"f_limit",    label:"حد بی‌نهایت و حد در بی‌نهایت"},
          {id:"f_deriv",    label:"مشتق"},
          {id:"f_appderiv", label:"کاربرد مشتق"},
          {id:"f_geom",     label:"هندسه (دوازدهم)"},
          {id:"f_prob",     label:"احتمال"}
        ]}
    ],
    cols:CHECKLIST_STD_COLS, groups:CHECKLIST_STD_GROUPS
  },
  calculus:{name:"حسابان",icon:"∫",
    sections:[
      {id:"y11",label:"پایه یازدهم",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"},
        {id:"c4",label:"فصل ۴"},
        {id:"c5",label:"فصل ۵"}
      ]},
      {id:"y12",label:"پایه دوازدهم — مبحثی",rows:[
        {id:"r1",label:"تابع"},
        {id:"r2",label:"مثلثات"},
        {id:"r3",label:"حد و پیوستگی"},
        {id:"r4",label:"مشتق"},
        {id:"r5",label:"کاربرد مشتق"},
        {id:"r6",label:"بهینه‌سازی و رسم نمودار"},
        {id:"r7",label:"آهنگ تغییر و مسائل کاربردی"}
      ]}
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  geometry:{name:"هندسه",icon:"📐",
    sections:[
      {id:"y10",label:"پایه دهم",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]},
      {id:"y11",label:"پایه یازدهم",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]},
      {id:"y12",label:"پایه دوازدهم",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]}
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  discrete:{name:"گسسته",icon:"🔢",
    sections:[
      {id:"g12",label:"پایه دوازدهم",rows:[
        {id:"r1",label:"فصل ۱"},
        {id:"r2",label:"فصل ۲"},
        {id:"r3",label:"فصل ۳"}
      ]}
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  statistics:{name:"آمار و احتمال",icon:"📊",
    sections:[
      {id:"y11",label:"پایه یازدهم",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]},
      {id:"y12",label:"پایه دوازدهم",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]}
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  mathStats:{name:"ریاضی و آمار",icon:"📊",
    sections:[
      {id:"h10",label:"پایه دهم (ریاضی و آمار ۱)",major:"humanities",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"},
        {id:"c4",label:"فصل ۴"}
      ]},
      {id:"h11",label:"پایه یازدهم (ریاضی و آمار ۲)",major:"humanities",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]},
      {id:"h12",label:"پایه دوازدهم (ریاضی و آمار ۳)",major:"humanities",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"}
      ]}
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  geology:{name:"زمین‌شناسی",icon:"🌍",
    sections:[
      {id:"y11",label:"پایه یازدهم",rows:[
        {id:"c1",label:"فصل ۱"},
        {id:"c2",label:"فصل ۲"},
        {id:"c3",label:"فصل ۳"},
        {id:"c4",label:"فصل ۴"},
        {id:"c5",label:"فصل ۵"},
        {id:"c6",label:"فصل ۶"},
        {id:"c7",label:"فصل ۷"}
      ]}
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  arabicSpec:{name:"عربی تخصصی",icon:"📗",
    sections:[simpleGrade("g10","دهم",10),simpleGrade("g11","یازدهم",10),simpleGrade("g12","دوازدهم",10)],
    cols:["آموزش","قواعد","ترجمه","مفهوم","تجزیه و تحلیل","کتاب تست","کنکور","میزان تسلط","مرور ۱","مرور ۲","مرور ۳"]
  },
  sociology:{name:"جامعه‌شناسی",icon:"👥",
    sections:[
      simpleGrade("g10","دهم (جامعه‌شناسی ۱)",8),
      simpleGrade("g11","یازدهم (جامعه‌شناسی ۲)",8),
      simpleGrade("g12","دوازدهم (جامعه‌شناسی ۳)",10)
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  psychology:{name:"روان‌شناسی",icon:"🧠",
    sections:[{id:"g11",label:"پایه یازدهم",rows:[
      {id:"d1",label:"درس ۱"},
      {id:"d2",label:"درس ۲"},
      {id:"d3",label:"درس ۳"},
      {id:"d4",label:"درس ۴"},
      {id:"d5",label:"درس ۵"},
      {id:"d6",label:"درس ۶"},
      {id:"d7",label:"درس ۷"},
      {id:"d8",label:"درس ۸"}
    ]}],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  economics:{name:"اقتصاد",icon:"💰",
    sections:[{id:"g10",label:"پایه دهم",rows:[
      {id:"r1",label:"فصل ۱"},
      {id:"r2",label:"فصل ۲"},
      {id:"r3",label:"فصل ۳"},
      {id:"r4",label:"فصل ۴"}
    ]}],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  literaryArts:{name:"علوم و فنون",icon:"✒️",
    sections:[
      simpleGrade("g10","دهم (علوم و فنون ۱)",12),
      simpleGrade("g11","یازدهم (علوم و فنون ۲)",12),
      simpleGrade("g12","دوازدهم (علوم و فنون ۳)",12)
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  history:{name:"تاریخ",icon:"🏛️",
    sections:[
      simpleGrade("g10","دهم (تاریخ ایران و جهان ۱)",8),
      simpleGrade("g11","یازدهم (تاریخ ایران و جهان ۲)",8),
      simpleGrade("g12","دوازدهم (تاریخ معاصر)",8)
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  geography:{name:"جغرافیا",icon:"🗺️",
    sections:[
      simpleGrade("g11","یازدهم (جغرافیای ناحیه‌ای)",8),
      simpleGrade("g12","دوازدهم (جغرافیای کاربردی)",8)
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  geographyIran:{name:"جغرافیای ایران",icon:"🗺️",
    sections:[simpleGrade("g10","دهم",10)],cols:CHECKLIST_GENERAL_COLS
  },
  defensePrep:{name:"آمادگی دفاعی",icon:"🛡️",
    sections:[simpleGrade("g10","دهم",12)],cols:CHECKLIST_GENERAL_COLS
  },
  culturalAnalysis:{name:"تحلیل فرهنگی",icon:"🎭",
    sections:[simpleGrade("g12","دوازدهم",10)],cols:CHECKLIST_GENERAL_COLS
  },
  philosophy:{name:"فلسفه و منطق",icon:"💭",
    sections:[
      simpleGrade("g11","یازدهم (فلسفه ۱)",12),
      simpleGrade("g12","دوازدهم (فلسفه ۲)",12)
    ],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  logic:{name:"منطق",icon:"🔎",
    sections:[{id:"g10",label:"پایه دهم (منطق)",rows:[
      {id:"d1",label:"درس ۱"},
      {id:"d2",label:"درس ۲"},
      {id:"d3",label:"درس ۳"},
      {id:"d4",label:"درس ۴"},
      {id:"d5",label:"درس ۵"},
      {id:"d6",label:"درس ۶"},
      {id:"d7",label:"درس ۷"},
      {id:"d8",label:"درس ۸"}
    ]}],cols:CHECKLIST_STD_COLS,groups:CHECKLIST_STD_GROUPS
  },
  persian:(function(){
    const topics=["لغت","املا","آرایه‌های ادبی","دستور زبان","معانی","مفاهیم و درک مطالب","تاریخ ادبیات"];
    const cols=["آموزش","کارگاه متن پژوهی","گنج حکمت","شعر خوانی","روان خوانی",
      "سوالات نهایی","کتاب تشریحی ۱","منبع تشریحی ۲","سوال علامت‌دار",
      "آزمون مبحثی","آزمون جامع","میزان تسلط","مرور ۱","مرور ۲","مرور ۳"];
    const EXCLUDED=[4,15];
    const snRows=(g,kind,prefix)=>topics.map((top,ti)=>({
      id:`${g}_${kind}_t${ti}`,
      label:`${prefix} — ${top}`
    })).filter((_,ti)=>![2,3,4].includes(ti));
    const lessonRows=(g,count)=>{
      const rows=[];
      for(let i=1;i<=count;i++){
        if(EXCLUDED.includes(i)) continue;
        topics.forEach((top,ti)=>rows.push({
          id:`${g}_d${i}_t${ti}`,
          label:`درس ${i} — ${top}`
        }));
      }
      return rows;
    };
    return {name:"فارسی",icon:"📖",cols,sections:[
      {id:"g10",label:"پایه دهم",rows:[
        ...snRows("g10","setayesh","ستایش"),
        ...lessonRows("g10",18),
        ...snRows("g10","nyayesh","نیایش")
      ]},
      {id:"g11",label:"پایه یازدهم",rows:[
        ...snRows("g11","setayesh","ستایش"),
        ...lessonRows("g11",18),
        ...snRows("g11","nyayesh","نیایش")
      ]},
      {id:"g12",label:"پایه دوازدهم",rows:[
        ...snRows("g12","setayesh","ستایش"),
        ...lessonRows("g12",18),
        ...snRows("g12","nyayesh","نیایش")
      ]}
    ]};
  })(),
  dini:{name:"دینی",icon:"📜",
    sections:[simpleGrade("g10","دهم",12),simpleGrade("g11","یازدهم",12),simpleGrade("g12","دوازدهم",10)],
    cols:CHECKLIST_GENERAL_COLS
  },
  arabic:(function(){
    const topics=["لغت","قواعد","معانی","تجزیه و تحلیل"];
    return {name:"عربی",icon:"📝",cols:CHECKLIST_GENERAL_COLS,sections:[
      {id:"g10",label:"پایه دهم",rows:rowsByLesson("g10",8,topics)},
      {id:"g11",label:"پایه یازدهم",rows:rowsByLesson("g11",7,topics)},
      {id:"g12",label:"پایه دوازدهم",rows:rowsByLesson("g12",4,topics)}
    ]};
  })(),
english:(function(){
    const topicsNoColl=["لغات","گرامر","ریدینگ","رایتینگ","لیستنیگ"];
    const topicsFull=[...topicsNoColl,"کالوکیشن"];
    const cols=["آموزش","کتاب دانش‌آموز","کتاب کار","سوالات نهایی","کتاب تشریحی ۱","منبع تشریحی ۲",
      "سوال علامت‌دار","آزمون مبحثی","آزمون جامع","میزان تسلط","مرور ۱","مرور ۲","مرور ۳"];
    return {name:"انگلیسی",icon:"🔤",cols,sections:[
      {id:"g10",label:"پایه دهم (Vision 1)",rows:rowsByLesson("g10",4,topicsNoColl,
        ["Lesson 1","Lesson 2","Lesson 3","Lesson 4"])},
      {id:"g11",label:"پایه یازدهم (Vision 2)",rows:rowsByLesson("g11",3,topicsNoColl,
        ["Lesson 1","Lesson 2","Lesson 3"])},
      {id:"g12",label:"پایه دوازدهم (Vision 3)",rows:rowsByLesson("g12",3,topicsFull,
        ["Lesson 1","Lesson 2","Lesson 3"])}
    ]};
  })(),
  health:{name:"سلامت و بهداشت",icon:"❤️‍🩹",
    sections:[simpleGrade("g12","دوازدهم",12)],cols:CHECKLIST_GENERAL_COLS
  },
  identity:{name:"هویت اجتماعی",icon:"🧑‍🤝‍🧑",
    sections:[simpleGrade("g12","دوازدهم",10)],cols:CHECKLIST_GENERAL_COLS
  },
  contemporaryHistory:{name:"تاریخ معاصر",icon:"📜",
    sections:[simpleGrade("g11","یازدهم",26)],cols:CHECKLIST_GENERAL_COLS
  },
  humanEnvironment:{name:"انسان و محیط زیست",icon:"🌍",
    sections:[simpleGrade("g11","یازدهم",7)],cols:CHECKLIST_GENERAL_COLS
  }
};

/* ===================== TASKS DATA ===================== */
const DEFAULT_TASKS=[
  {id:"p1",cat:"personal",name:"برنامه‌ریزی روز",xp:5,gold:3,icon:"📝"},
  {id:"p2",cat:"personal",name:"مدیتیشن / تمرکز ۱۰ دقیقه",xp:8,gold:4,icon:"🧘"},
  {id:"p3",cat:"personal",name:"مطالعه آزاد (کتاب غیردرسی)",xp:10,gold:5,icon:"📖"},
  {id:"p4",cat:"personal",name:"یادگیری مهارت جدید",xp:12,gold:6,icon:"🎯"},
  {id:"h1",cat:"home",name:"مرتب کردن اتاق",xp:8,gold:4,icon:"🧹"},
  {id:"h2",cat:"home",name:"شستن ظرف‌ها",xp:6,gold:3,icon:"🍽️"},
  {id:"h3",cat:"home",name:"کمک در آشپزی",xp:8,gold:4,icon:"🍳"},
  {id:"h4",cat:"home",name:"جارو یا تی کشیدن",xp:10,gold:5,icon:"🧽"},
  {id:"s1",cat:"sport",name:"پیاده‌روی ۲۰ دقیقه",xp:10,gold:5,icon:"🚶"},
  {id:"s2",cat:"sport",name:"دویدن",xp:15,gold:8,icon:"🏃"},
  {id:"s3",cat:"sport",name:"حرکات کششی",xp:8,gold:4,icon:"🤸"},
  {id:"s4",cat:"sport",name:"باشگاه / تمرین قدرتی",xp:20,gold:10,icon:"💪"},
  {id:"s5",cat:"sport",name:"شنا یا دوچرخه",xp:15,gold:8,icon:"🚴"},
  {id:"he1",cat:"health",name:"خواب کافی (۷-۸ ساعت)",xp:8,gold:4,icon:"😴"},
  {id:"he2",cat:"health",name:"نوشیدن ۸ لیوان آب",xp:6,gold:3,icon:"💧"},
  {id:"he3",cat:"health",name:"مصرف میوه / سبزیجات",xp:6,gold:3,icon:"🍎"},
  {id:"he4",cat:"health",name:"مسواک قبل خواب",xp:4,gold:2,icon:"🦷"},
  {id:"he5",cat:"health",name:"دوش گرفتن",xp:5,gold:3,icon:"🚿"}
];
const TASK_CATS={
  personal:{name:"شخصی",icon:"👤"},
  home:{name:"خانه",icon:"🏠"},
  sport:{name:"ورزش",icon:"🏃"},
  health:{name:"سلامتی",icon:"💚"}
};

function freshState(){
  const subjects={};
  Object.keys(SUBJECTS).forEach(k=>subjects[k]={xp:0,level:1,knowledge:0,accuracy:0,speed:0,retention:0,consistency:0,episodes:0,tests:0,correct:0,wrong:0,blank:0,marked:0,topics:{}});
  return {
    playerXP:0,gold:0,streak:0,hp:100,energy:100,combo:0,lastDate:null,lastRegenDate:null,
    settings:{playerName:"",targetEpisodes:null,concoursWeight:null,finalWeight:null,
      studyMinutes:null,breakMinutes:null,dailyXPSoftCap:null,autoGenerateQuests:false,
      desktopDensity:"comfortable",goldMultiplier:null,studySettingsConfigured:false,manualWeakSubject:"",
      selectedCurriculum:"",manualStrongSubject:"",manualFocusSubject:"",
      baseFontSize:16,baseFontWeight:400,baseFontFamily:"'Vazirmatn', Tahoma, sans-serif",
      checklistGrade:"10",dashboardGrade:"10",skillGrade:"10",episodeGrade:"10",
      statusGrade:"10",weakCurriculum:"",weakGrade:"10",
defaultCurriculum:"experimental",defaultGrade:"10",
moodEmoji:"📚",moodLabel:"مطالعه‌گر",customMoods:null,
      moodUserSet:false,moodAuto:true,appTheme:"dark",
      examDate:"",planStartDate:"",lastBackupAt:null,backupReminderSnoozeUntil:null,notifyRoutines:false,
      feedbackSound:true,
      mockExamGrade:"10",mockExamCurriculum:""},
    subjects,episodes:[],quests:[],bosses:[],customRewards:[],achievements:{},history:{},
    lastQuality:"—",leitner:{cards:[]},classes:[],checklists:{},
    checklistVersion:10,customTasks:[],tasksDone:{},taskOverrides:{},hiddenTasks:[],routines:[],routineChecks:{},mistakes:[],smartPlan:null,
    mockExams:[],routineNotifiedLog:null,quickNotes:[]
  };
}
let state=JSON.parse(localStorage.getItem(stateKey)||"null")||freshState();
state.settings=Object.assign(freshState().settings,state.settings||{});
if(state.settings.studySettingsConfigured!==true){
  state.settings.targetEpisodes=null;state.settings.studyMinutes=null;state.settings.breakMinutes=null;
  state.settings.concoursWeight=null;state.settings.finalWeight=null;state.settings.dailyXPSoftCap=null;state.settings.goldMultiplier=null;
}
if(!Array.isArray(state.customRewards))state.customRewards=[];
if(!state.leitner)state.leitner={cards:[]};
if(!Array.isArray(state.leitner.cards))state.leitner.cards=[];
if(!Array.isArray(state.classes))state.classes=[];
if(!state.checklists)state.checklists={};
if(!Array.isArray(state.customTasks))state.customTasks=[];
if(!state.taskOverrides||typeof state.taskOverrides!=="object")state.taskOverrides={};
if(!state.tasksDone||typeof state.tasksDone!=="object")state.tasksDone={};
if(!Array.isArray(state.routines))state.routines=[];
if(!state.achievementUnlocked||typeof state.achievementUnlocked!=="object")state.achievementUnlocked={};
if(!state.routineChecks||typeof state.routineChecks!=="object")state.routineChecks={};
if(!Array.isArray(state.mockExams))state.mockExams=[];
if(!Array.isArray(state.mistakes))state.mistakes=[];
if(!Array.isArray(state.quickNotes))state.quickNotes=[];
Object.keys(SUBJECTS).forEach(k=>{if(!state.subjects[k])state.subjects[k]={xp:0,level:1,knowledge:0,accuracy:0,speed:0,retention:0,consistency:0,episodes:0,tests:0,correct:0,wrong:0,blank:0,topics:{}}});

window.SHOP=[
  {id:"reward_movie",name:"فیلم",price:150,desc:"یک زمان تفریح بدون عذاب وجدان",icon:"🎬"},
  {id:"reward_game",name:"زمان بازی",price:120,desc:"۴۵ دقیقه بازی",icon:"🎮"},
  {id:"reward_snack",name:"خوراکی دلخواه",price:70,desc:"یک میان‌وعده مورد علاقه",icon:"🍫"},
  {id:"reward_social",name:"استراحت اجتماعی",price:150,desc:"وقت آزاد برای گپ",icon:"💬"},
  {id:"reward_out",name:"تفریح بیرون",price:250,desc:"یک تفریح کوتاه خارج از خانه",icon:"🌤️"},
  {id:"reward_big",name:"پاداش ویژه",price:500,desc:"یک جایزه بزرگ که خودت انتخاب می‌کنی",icon:"👑"}
];

function save(){try{localStorage.setItem(stateKey,JSON.stringify(state))}catch(e){console.warn("save err",e)}}
function today(){return new Date().toISOString().slice(0,10)}
function showToast(msg){
  const t=document.getElementById("toast");
  if(t){t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500);}
  handleRewardFeedback(msg);
}
/* ===================== INSTANT FEEDBACK: SOUND + FLOATING REWARDS ===================== */
let _fxAudioCtx=null;
function feedbackSoundEnabled(){return state.settings.feedbackSound!==false}
function playFeedbackSound(kind){
  if(!feedbackSoundEnabled())return;
  try{
    if(!_fxAudioCtx)_fxAudioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(_fxAudioCtx.state==="suspended")_fxAudioCtx.resume();
    const ctx=_fxAudioCtx,now=ctx.currentTime;
    const notes=kind==="levelup"?[523.25,659.25,783.99,1046.5]:kind==="negative"?[293.66]:[659.25,880];
    notes.forEach((freq,i)=>{
      const osc=ctx.createOscillator(),gain=ctx.createGain();
      osc.type="sine";osc.frequency.value=freq;
      osc.connect(gain);gain.connect(ctx.destination);
      const start=now+i*.08;
      gain.gain.setValueAtTime(0,start);
      gain.gain.linearRampToValueAtTime(.15,start+.015);
      gain.gain.exponentialRampToValueAtTime(.0001,start+.3);
      osc.start(start);osc.stop(start+.32);
    });
  }catch(e){}
}
function spawnRewardFx(text,type){
  const layer=document.getElementById("rewardFx");if(!layer)return;
  const el=document.createElement("div");
  el.className="reward-fx-bubble"+(type?" "+type:"");
  el.textContent=text;
  el.style.setProperty("--fx-x",(Math.random()*50-25).toFixed(1)+"px");
  layer.appendChild(el);
  el.addEventListener("animationend",()=>el.remove());
  setTimeout(()=>{if(el.isConnected)el.remove();},2400);
}
function pulseHudStat(id){
  const el=document.getElementById(id);if(!el)return;
  el.classList.remove("stat-pulse");void el.offsetWidth;el.classList.add("stat-pulse");
  setTimeout(()=>el.classList.remove("stat-pulse"),500);
}
function handleRewardFeedback(msg){
  if(!msg)return;
  const xpMatch=msg.match(/\+(\S+)\s*XP/);
  const goldMatch=msg.match(/\+(\S+)\s*(?:سکه|💰)/);
  const isLevelUp=/تبریک|سطح/.test(msg);
  const isCancel=/^↺|لغو/.test(msg);
  if(isLevelUp){
    spawnRewardFx("🎉 Level Up!","levelup");
    pulseHudStat("playerLevel");pulseHudStat("rank");
    playFeedbackSound("levelup");
    return;
  }
  if(!xpMatch&&!goldMatch)return;
  if(xpMatch){spawnRewardFx((isCancel?"":"+")+xpMatch[1]+" XP",isCancel?"negative":"xp");pulseHudStat("playerXP");}
  if(goldMatch){spawnRewardFx((isCancel?"":"+")+goldMatch[1]+" 💰",isCancel?"negative":"gold");pulseHudStat("gold");}
  playFeedbackSound(isCancel?"negative":"positive");
}
function updateFeedbackSoundUI(){
  const btn=document.getElementById("feedbackSoundBtn");
  const status=document.getElementById("feedbackSoundStatus");
  const on=feedbackSoundEnabled();
  if(btn)btn.textContent=on?"🔇 خاموش کردن صدای امتیاز":"🔊 روشن کردن صدای امتیاز";
  if(status)status.textContent="وضعیت: "+(on?"فعال":"غیرفعال");
}
function toggleFeedbackSound(){
  state.settings.feedbackSound=!feedbackSoundEnabled();
  save();updateFeedbackSoundUI();
  if(feedbackSoundEnabled())playFeedbackSound("positive");
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function fmt(n){return Math.round(Number(n)||0).toLocaleString("fa-IR")}
/* ===================== REBALANCED STUDY ECONOMY ===================== */
const STUDY_ECONOMY={type:{learn:.90,practice:1,coverage:1.05,review:.82,final:.95,timed:1.10,analysis:1.15,recovery:.85},quality:{poor:.55,normal:.85,good:1,excellent:1.12,exceptional:1.25},difficulty:{easy:.90,normal:1,hard:1.12,veryhard:1.25,nightmare:1.40},maxEpisodeXP:140,maxEpisodeGold:80};
function threshold(level){level=Math.max(1,+level||1);return Math.round(120*Math.pow(level,1.42))}
function calculateStudyRewards({type,quality,difficulty,minutes,tests,analysis,completion,subject}){const tm=Math.max(5,Math.min(240,+minutes||50));const t=STUDY_ECONOMY.type[type]||1,q=STUDY_ECONOMY.quality[quality]||1,d=STUDY_ECONOMY.difficulty[difficulty]||1;const combo=1+Math.min(state.combo,5)*.04,repeat=diminishing(subject,type),testBonus=Math.min(30,(+tests||0)*1.2),analysisBonus=analysis?Math.min(20,(+tests||0)*1.5):0;let xp=Math.round(tm*t*q*d*Math.max(.3,completion)*combo*repeat+testBonus+analysisBonus);if(dayEpisodes().length===0)xp+=10;if(state.streak>=3)xp+=Math.min(15,state.streak);xp=Math.min(STUDY_ECONOMY.maxEpisodeXP,Math.max(5,xp));let gold=Math.round(tm/5);if(quality==='excellent')gold+=3;else if(quality==='exceptional')gold+=6;else if(quality==='poor')gold=Math.max(1,gold-3);if(type==='review')gold+=3;if(type==='analysis')gold+=5;if(analysis)gold+=Math.min(8,Math.floor((+tests||0)/10));if(state.streak>=3)gold+=Math.min(8,Math.floor(state.streak/3));gold=Math.min(STUDY_ECONOMY.maxEpisodeGold,Math.max(1,Math.round(gold*(+state.settings.goldMultiplier||1))));return{xp,gold}}
function levelFromXP(xp){let l=1;while(xp>=threshold(l+1))l++;return l}
function rankFor(l){if(l<10)return"Rookie";if(l<20)return"Trainee";if(l<30)return"Challenger";if(l<40)return"Competitor";if(l<50)return"Advanced";if(l<60)return"Elite";if(l<70)return"Expert";if(l<80)return"Master";if(l<90)return"Grandmaster";if(l<100)return"Apex";return"Conqueror"}
function dayEpisodes(){return state.episodes.filter(e=>e.date===today())}
function dayXP(){return dayEpisodes().reduce((a,e)=>a+(+e.xp||0),0)}
function dayGold(){return dayEpisodes().reduce((a,e)=>a+(+e.gold||0),0)}
function avg(k){const a=Object.values(state.subjects).map(s=>+s[k]||0);return a.reduce((x,y)=>x+y,0)/(a.length||1)}
function avgAccuracy(){const v=Object.values(state.subjects).map(s=>+s.accuracy||0);return v.length?v.reduce((a,b)=>a+b,0)/v.length:0}

/* ===================== CURRICULUM ===================== */
function curriculumSubjectKeys(key){
  return {
    experimental:[
      "biology","chemistry","physics","math","geology",
      "persian","dini","arabic","english",
      "geographyIran","defensePrep",
      "health","identity",
      "contemporaryHistory","humanEnvironment"
    ],
    mathematics:[
      "physics","geometry","discrete","statistics","calculus","chemistry","geology","math",
      "persian","dini","arabic","english",
      "geographyIran","defensePrep",
      "health","identity",
      "contemporaryHistory","humanEnvironment"
    ],
    humanities:[
      "mathStats","economics","literaryArts","sociology","psychology","arabicSpec","history","geography","philosophy","logic",
      "persian","dini","arabic","english",
      "geographyIran","defensePrep","culturalAnalysis",
      "health","humanEnvironment"
    ]
  }[key]||[];
}

const CHECKLIST_RETAKE_MAP = {
  experimental:{biology:{grades:[11]},chemistry:{grades:[11]},persian:{grades:[11]},dini:{grades:[11]},arabic:{grades:[11]},english:{grades:[11]}},
  mathematics:{geometry:{grades:[11]},physics:{grades:[11]},persian:{grades:[11]},dini:{grades:[11]},arabic:{grades:[11]},english:{grades:[11]}},
  humanities:{sociology:{grades:[12]},history:{grades:[12]},persian:{grades:[11]},dini:{grades:[11]},arabic:{grades:[11]},english:{grades:[11]}}
};
const GRADE11_FINAL_GENERALS = ["persian","dini","arabic","english"];
const DASHBOARD_NAME_OVERRIDE={health:"سلامت",identity:"هویت"};
const HUMANITIES_OVERRIDE={mathStats:"ریاضی و آمار",philosophy:"فلسفه و منطق",statistics:"آمار و احتمال"};
function subjectDisplayName(k,curriculum){
  if(curriculum==="humanities"&&HUMANITIES_OVERRIDE[k])return HUMANITIES_OVERRIDE[k];
  if(DASHBOARD_NAME_OVERRIDE[k])return DASHBOARD_NAME_OVERRIDE[k];
  return SUBJECTS[k]?.name||k;
}

const curriculumGroups={
  experimental:{
    name:"تجربی",icon:"🧬",
    concours:["biology","chemistry","physics","math","geology"],
    final:[
      "persian","dini","english","arabic",
      "geographyIran","defensePrep",
      "health","identity",
      "contemporaryHistory","humanEnvironment",
      "biology","chemistry","physics","math","geology"
    ]
  },
  mathematics:{
    name:"ریاضی",icon:"📐",
    concours:["math","calculus","geometry","discrete","statistics","physics"],
    final:[
      "persian","dini","english","arabic",
      "geographyIran","defensePrep",
      "health","identity",
      "contemporaryHistory","humanEnvironment",
      "math","calculus","geometry","discrete","statistics","physics","geology"
    ]
  },
  humanities:{
    name:"انسانی",icon:"📚",
    concours:["mathStats","economics","literaryArts","sociology","psychology","arabicSpec","history","geography","philosophy"],
    final:[
      "persian","dini","arabic","english",
      "geographyIran","defensePrep","culturalAnalysis",
      "health","humanEnvironment",
      "mathStats","economics","literaryArts","sociology","psychology","arabicSpec","history","geography","philosophy","logic"
    ]
  }
};

/* ===================== SKILL TREE FINAL-EXAM GRADE RULES =====================
   پایه دهم: امتحان نهایی ندارد → هیچ درس نهایی در Skill Tree
   پایه یازدهم: فقط ۴ عمومی اصلی + تخصصیِ نهاییِ هر رشته
   پایه دوازدهم: فهرست نهایی فعلی برنامه حفظ می‌شود. */
const SKILL_FINAL_GRADE_RULES = {
  experimental:{
    /* پایه دهم امتحان نهایی ندارد؛ درخت مهارت این بخش را به «نوبت دوم» تبدیل می‌کند. */
    "10":"ALL_GRADE_MATCHING",
    "11":["persian","dini","arabic","english","biology","chemistry"],
    "12":null
  },
  mathematics:{
    "10":"ALL_GRADE_MATCHING",
    "11":["persian","dini","arabic","english","physics","geometry"],
    "12":null
  },
  humanities:{
    "10":"ALL_GRADE_MATCHING",
    "11":["persian","dini","arabic","english","sociology","history"],
    "12":null
  }
};

/* ===================== THEME ===================== */
(function(){
  const KEY='studyRPG_theme';
  window.applyTheme=function(t){
    t=['dark','light','harry'].includes(t)?t:'dark';
    document.documentElement.setAttribute('data-theme',t);
    const b=document.getElementById('themeToggle');
    if(b)b.textContent={light:'☀️',dark:'🌙',harry:'⚡'}[t]||'🌙';
    try{localStorage.setItem(KEY,t)}catch(e){}
  };
  window.previewAppTheme=function(t){applyTheme(t)};
  window.toggleTheme=function(){
    const cur=document.documentElement.getAttribute('data-theme')||'dark';
    applyTheme(cur==='light'?'dark':cur==='dark'?'harry':'light');
    const sel=document.getElementById('appTheme');if(sel)sel.value=document.documentElement.getAttribute('data-theme');
  };
  let saved='dark';try{saved=localStorage.getItem(KEY)||'dark'}catch(e){}
  applyTheme(saved);
})();

function applyFontSize(size){const s=Math.max(12,Math.min(22,+size||16));document.documentElement.style.setProperty('--base-font-size',s+'px')}
function applyFontWeight(w){const v=Math.max(100,Math.min(900,+w||400));document.documentElement.style.setProperty('--base-font-weight',v)}
function applyFontFamily(f){document.documentElement.style.setProperty('--base-font-family',f)}
window.previewFontSize=function(v){applyFontSize(v);updateFontPreview()};
window.previewFontWeight=function(v){applyFontWeight(v);updateFontPreview()};
window.previewFontFamily=function(v){applyFontFamily(v);updateFontPreview()};
function updateFontPreview(){const p=document.getElementById("fontSizePreview");if(p)p.style.fontFamily=state.settings.baseFontFamily||'Vazirmatn'}
function currentFontSizeLabel(size){const map={14:"کوچک",15:"متوسط کوچک",16:"متوسط",17:"بزرگ",18:"خیلی بزرگ",20:"بسیار بزرگ"};return map[+size]||`${size}px`}
function currentFontWeightLabel(w){const map={300:"نازک",400:"نرمال",500:"متوسط",600:"نیمه‌ضخیم",700:"ضخیم",800:"خیلی ضخیم"};return map[+w]||`${w}`}

/* ===================== NAVIGATION ===================== */
function isPageActive(id){const p=document.getElementById(id);return !!p&&p.classList.contains("active");}
window.switchToPage=function(name){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  const page=document.getElementById(name);
  if(page)page.classList.add("active");
  const sel=document.getElementById("pageSelect");
  if(sel)sel.value=name;
  if(name==="skillHub"&&window.renderSkillHub)renderSkillHub();
  if(name==="leitner"&&window.renderLeitner)renderLeitner();
  if(name==="mistakes"){populateMistakeSubjects();renderMistakes();}
  if(name==="mockExams"){populateMockExamSubjects();renderMockExams();}
  if(name==="classes"&&window.renderClasses)renderClasses();
  if(name==="checklist"&&window.renderChecklist)renderChecklist();
  if(name==="tasks"&&window.renderTasks)renderTasks();
  if(name==="routines"&&window.renderRoutines)renderRoutines();
  if(name==="quests"&&window.renderQuests)renderQuests();
  if(name==="boss"&&window.renderBosses)renderBosses();
  if(name==="shop"&&window.renderShop)renderShop();
  if(name==="achievements"&&window.renderAchievements)renderAchievements();
  window.scrollTo({top:0,behavior:"smooth"});
};

/* ===================== MOOD / STATUS ===================== */
const MOOD_DEFAULTS=[
  {emoji:"📚",label:"مطالعه‌گر"},
  {emoji:"🔥",label:"پرانگیزه"},
  {emoji:"⚡",label:"پرانرژی"},
  {emoji:"🎯",label:"هدف‌گرا"},
  {emoji:"💪",label:"قوی"},
  {emoji:"🧠",label:"متفکر"},
  {emoji:"🌟",label:"درخشان"},
  {emoji:"🚀",label:"در حال پیشرفت"},
  {emoji:"🦉",label:"شب‌خوان"},
  {emoji:"☕",label:"کافه‌نشین"},
  {emoji:"🍀",label:"خوش‌شانس"},
  {emoji:"👑",label:"پادشاه مطالعه"},
  {emoji:"🧘",label:"آرام"},
  {emoji:"🎓",label:"دانشجو"},
  {emoji:"✍️",label:"تمرکز بالا"},
  {emoji:"💎",label:"ارزشمند"},
  {emoji:"🌱",label:"در حال رشد"},
  {emoji:"🦁",label:"شجاع"}
];
const MOOD_GRADIENTS=[
  "linear-gradient(135deg,#6ee7ff,#9b8cff)",
  "linear-gradient(135deg,#53e6a6,#6ee7ff)",
  "linear-gradient(135deg,#ffd166,#ff6b81)",
  "linear-gradient(135deg,#c56cf0,#7d2ae8)",
  "linear-gradient(135deg,#ffa751,#e67e22)",
  "linear-gradient(135deg,#74b9ff,#0984e3)",
  "linear-gradient(135deg,#f8a5c2,#e84393)",
  "linear-gradient(135deg,#a29bfe,#6c5ce7)",
  "linear-gradient(135deg,#f0932b,#b33939)",
  "linear-gradient(135deg,#00b894,#00cec9)",
  "linear-gradient(135deg,#55efc4,#00b894)",
  "linear-gradient(135deg,#fd79a8,#e84393)"
];

function pickTimeBasedMood(){
  const h=new Date().getHours();
  if(h>=5  && h<8 )  return {emoji:"🌅", label:"پگاه‌خیز"};
  if(h>=8  && h<12)  return {emoji:"☀️", label:"صبح‌کار"};
  if(h>=12 && h<15)  return {emoji:"🌞", label:"نیمه‌روز"};
  if(h>=15 && h<18)  return {emoji:"🌤️", label:"بعدازظهر"};
  if(h>=18 && h<21)  return {emoji:"🌆", label:"غروب‌خوان"};
  return              {emoji:"🌙", label:"شب‌خوان"};
}

function getMoods(){
  if(!Array.isArray(state.settings.customMoods)){
    state.settings.customMoods = MOOD_DEFAULTS.map(x=>({...x}));
  }
  return state.settings.customMoods;
}

window.openMoodPicker=function(){
  const m=document.getElementById("moodModal");if(!m)return;
  renderMoodGrid();
  updateMoodPreview();
  m.classList.add("show");
};
window.closeMoodPicker=function(){
  const m=document.getElementById("moodModal");
  if(m)m.classList.remove("show");
};

function renderMoodGrid(){
  const grid=document.getElementById("moodGrid");if(!grid)return;
  const moods=getMoods();
  const currentEmoji=state.settings.moodEmoji||"📚";
  const currentLabel=state.settings.moodLabel||"";
  if(!moods.length){
    grid.innerHTML=`<div class="empty" style="grid-column:1/-1">هنوز حالتی نساخته‌ای. از پایین یک ایموجی اضافه کن.</div>`;
    return;
  }
  grid.innerHTML=moods.map((p,i)=>{
    const isActive=(p.emoji===currentEmoji && p.label===currentLabel);
    const active=isActive?"active":"";
    return `<div class="mood-option-wrap">
      <button type="button" class="mood-option ${active}"
        onclick="setMood('${esc(p.emoji)}','${esc(p.label)}')"
        title="${esc(p.label)} — برای ویرایش دکمه ✎ را بزن">${p.emoji}</button>
      <button type="button" class="mood-edit-btn" onclick="event.stopPropagation();editMood(${i})" title="ویرایش">✎</button>
      <button type="button" class="mood-del-btn" onclick="event.stopPropagation();deleteMood(${i})" title="حذف">✕</button>
    </div>`;
  }).join("");
}

function updateMoodPreview(){
  const emojiEl=document.getElementById("moodPreviewEmoji");
  const labelEl=document.getElementById("moodPreviewLabel");
  const modeEl=document.getElementById("moodPreviewMode");
  if(emojiEl)emojiEl.textContent=state.settings.moodEmoji||"📚";
  if(labelEl)labelEl.textContent=state.settings.moodLabel||"مطالعه‌گر";
  if(modeEl){
    if(state.settings.moodAuto){
      modeEl.textContent="🕐 حالت خودکار بر اساس ساعت روز";
    }else{
      modeEl.textContent="✋ حالت دستی — انتخاب خودت";
    }
  }
}

window.setMood=function(emoji,label){
  state.settings.moodEmoji=emoji;
  state.settings.moodLabel=label||"حالت";
  state.settings.moodUserSet=true;
  state.settings.moodAuto=false;
  save();
  applyMoodToHeader();
  renderMoodGrid();
  updateMoodPreview();
  showToast(`Status ثبت شد: ${emoji} ${label||""}`);
};

window.addMood=function(){
  const emojiEl=document.getElementById("moodNewEmoji");
  const labelEl=document.getElementById("moodNewLabel");
  const emoji=(emojiEl?.value||"").trim();
  const label=(labelEl?.value||"").trim();
  if(!emoji){showToast("یک ایموجی وارد کن.");return}
  const moods=getMoods();
  if(moods.some(m=>m.emoji===emoji && m.label===label)){
    showToast("این حالت قبلاً وجود دارد.");return;
  }
  moods.push({emoji:emoji.slice(0,4),label:label||"حالت"});
  state.settings.customMoods=moods;
  save();
  if(emojiEl)emojiEl.value="";
  if(labelEl)labelEl.value="";
  renderMoodGrid();
  showToast("حالت جدید اضافه شد.");
};

window.editMood=function(index){
  const moods=getMoods();
  const cur=moods[index];if(!cur)return;
  const newEmoji=prompt("ایموجی جدید:",cur.emoji);
  if(newEmoji===null)return;
  const newLabel=prompt("نام حالت:",cur.label);
  if(newLabel===null)return;
  const trimmed=(newEmoji||"").trim();
  if(!trimmed){showToast("ایموجی نمی‌تواند خالی باشد.");return}
  const wasCurrent=(cur.emoji===state.settings.moodEmoji && cur.label===state.settings.moodLabel);
  moods[index]={emoji:trimmed.slice(0,4),label:(newLabel||"").trim()||"حالت"};
  state.settings.customMoods=moods;
  if(wasCurrent){
    state.settings.moodEmoji=moods[index].emoji;
    state.settings.moodLabel=moods[index].label;
    applyMoodToHeader();
  }
  save();
  renderMoodGrid();
  updateMoodPreview();
  showToast("حالت ویرایش شد.");
};

window.deleteMood=function(index){
  const moods=getMoods();
  const cur=moods[index];if(!cur)return;
  if(!confirm(`حالت «${cur.emoji} ${cur.label}» حذف شود؟`))return;
  const wasCurrent=(cur.emoji===state.settings.moodEmoji && cur.label===state.settings.moodLabel);
  moods.splice(index,1);
  state.settings.customMoods=moods;
  if(wasCurrent){
    if(moods.length){
      state.settings.moodEmoji=moods[0].emoji;
      state.settings.moodLabel=moods[0].label;
    }else{
      state.settings.moodEmoji="📚";
      state.settings.moodLabel="مطالعه‌گر";
    }
    applyMoodToHeader();
  }
  save();
  renderMoodGrid();
  updateMoodPreview();
  showToast("حالت حذف شد.");
};

window.resetMoods=function(){
  if(!confirm("لیست حالت‌ها به پیش‌فرض برگردد؟ تغییراتت پاک می‌شود."))return;
  state.settings.customMoods=MOOD_DEFAULTS.map(x=>({...x}));
  save();
  renderMoodGrid();
  showToast("لیست حالت‌ها بازنشانی شد.");
};

window.enableAutoMood=function(){
  state.settings.moodUserSet=false;
  state.settings.moodAuto=true;
  save();
  applyMoodToHeader();
  renderMoodGrid();
  updateMoodPreview();
  showToast("حالت خودکار بر اساس ساعت روز فعال شد.");
};

function applyMoodToHeader(){
  const btn=document.getElementById("moodButton");
  if(!btn)return;
  if(!state.settings.moodUserSet){
    const auto=pickTimeBasedMood();
    state.settings.moodEmoji=auto.emoji;
    state.settings.moodLabel=auto.label;
    state.settings.moodAuto=true;
  }else{
    state.settings.moodAuto=false;
  }
  const c=MOOD_GRADIENTS[Math.floor(Math.random()*MOOD_GRADIENTS.length)];
  btn.style.background=c;
  btn.classList.toggle("auto-mode", !!state.settings.moodAuto);
  btn.textContent=state.settings.moodEmoji||"📚";
  const modeTag=state.settings.moodAuto?" (خودکار)":"";
  btn.title=`Status: ${state.settings.moodLabel||""}${modeTag} — کلیک برای تغییر`;
  const existing=btn.querySelector(".mood-auto-badge");
  if(existing)existing.remove();
  if(state.settings.moodAuto){
    const b=document.createElement("span");
    b.className="mood-auto-badge";
    b.textContent="AUTO";
    btn.appendChild(b);
  }
}
window.applyMoodToHeader=applyMoodToHeader;

/* ===== v1.21 additive tools: intentionally independent of existing study logic ===== */
let focusTimer=null, focusSeconds=25*60, focusRunning=false;
function smartDateDaysAgo(dateStr){
  if(!dateStr)return 999; const a=new Date(dateStr+'T00:00:00'),b=new Date(today()+'T00:00:00');
  return Math.max(0,Math.floor((b-a)/86400000));
}
function getSmartSubjects(){
  const c=state.settings.selectedCurriculum||'experimental', g=state.settings.dashboardGrade||'10';
  return curriculumSubjectKeys(c).filter(k=>state.subjects[k]&&subjectMatchesGrade(k,g,c));
}
let studyTimer=null,studyTimerSeconds=25*60,studyTimerTotal=25*60,studyTimerRunning=false;
let studyTimerSubject='',studyTimerSubjectLabel='',studyTimerTopic='',studyTimerSavedAt=0,studyTimerStartedAt=0;
const STUDY_TIMER_STORAGE='darsbekhon_offline_study_timer_v2';
function studyTimerState(){return{seconds:studyTimerSeconds,total:studyTimerTotal,subject:studyTimerSubject,subjectLabel:studyTimerSubjectLabel,topic:studyTimerTopic,savedAt:Date.now(),running:studyTimerRunning,startedAt:studyTimerStartedAt};}
function saveOfflineStudyTimer(){try{localStorage.setItem(STUDY_TIMER_STORAGE,JSON.stringify(studyTimerState()));}catch(e){}}
const STUDY_TIMER_CURRICULUM_CATALOG = {
  experimental:{
    "10":[
      ["biology","زیست‌شناسی ۱"],["physics","فیزیک ۱"],["chemistry","شیمی ۱"],["math","ریاضی ۱"],
      ["persian","فارسی ۱"],["dini","دین و زندگی ۱ (ریاضی و تجربی)"],["arabic","عربی ۱ (ریاضی و تجربی)"],["english","انگلیسی ۱"],
      ["defensePrep","آمادگی دفاعی"],["geographyIran","جغرافیا ایران"],["mediaLiteracy","تفکر و سواد رسانه‌ای"]
    ],
    "11":[
      ["biology","زیست‌شناسی ۲"],["physics","فیزیک ۲"],["chemistry","شیمی ۲"],["math","ریاضی ۲"],["geology","زمین‌شناسی (جامع)"],
      ["persian","فارسی ۲"],["dini","دین و زندگی ۲ (ریاضی و تجربی)"],["arabic","عربی ۲ (ریاضی و تجربی)"],["english","انگلیسی ۲"],
      ["humanEnvironment","انسان و محیط زیست"],["contemporaryHistory","تاریخ معاصر"]
    ],
    "12":[
      ["biology","زیست‌شناسی ۱ و ۲ (پایه)"],["biology","زیست‌شناسی ۳ (دوازدهم)"],["physics","فیزیک ۱ و ۲ (پایه)"],["physics","فیزیک ۳ (دوازدهم)"],
      ["chemistry","شیمی ۱ و ۲ (پایه)"],["chemistry","شیمی ۳ (دوازدهم)"],["math","ریاضی ۱ و ۲ (پایه)"],["math","ریاضی ۳ (دوازدهم)"],["geology","زمین‌شناسی (جامع)"],
      ["persian","فارسی ۳"],["dini","دین و زندگی ۳ (ریاضی و تجربی)"],["arabic","عربی ۳ (ریاضی و تجربی)"],["english","انگلیسی ۳"],
      ["health","سلامت و بهداشت"],["identity","هویت اجتماعی"]
    ]
  },
  mathematics:{
    "10":[
      ["math","ریاضی ۱"],["geometry","هندسه ۱"],["physics","فیزیک ۱"],["chemistry","شیمی ۱"],
      ["persian","فارسی ۱"],["dini","دین و زندگی ۱ (ریاضی و تجربی)"],["arabic","عربی ۱ (ریاضی و تجربی)"],["english","انگلیسی ۱"],
      ["defensePrep","آمادگی دفاعی"],["mediaLiteracy","تفکر و سواد رسانه‌ای"],["geographyIran","جغرافیا ایران"]
    ],
    "11":[
      ["calculus","حسابان ۱"],["geometry","هندسه ۲"],["statistics","آمار و احتمال"],["physics","فیزیک ۲"],["chemistry","شیمی ۲"],
      ["persian","فارسی ۲"],["dini","دین و زندگی ۲ (ریاضی و تجربی)"],["arabic","عربی ۲ (ریاضی و تجربی)"],["english","انگلیسی ۲"],
      ["humanEnvironment","انسان و محیط زیست"],["contemporaryHistory","تاریخ معاصر"]
    ],
    "12":[
      ["math","ریاضی ۱ و حسابان ۱ (پایه)"],["calculus","حسابان ۲ (دوازدهم)"],["geometry","هندسه ۱ و ۲ (پایه)"],["geometry","هندسه ۳ (دوازدهم)"],
      ["statistics","آمار و احتمال"],["discrete","ریاضیات گسسته"],["physics","فیزیک ۱ و ۲ (پایه)"],["physics","فیزیک ۳ (دوازدهم)"],
      ["chemistry","شیمی ۱ و ۲ (پایه)"],["chemistry","شیمی ۳ (دوازدهم)"],
      ["persian","فارسی ۳"],["dini","دین و زندگی ۳ (ریاضی و تجربی)"],["arabic","عربی ۳ (ریاضی و تجربی)"],["english","انگلیسی ۳"],
      ["health","سلامت و بهداشت"],["identity","هویت اجتماعی"]
    ]
  },
  humanities:{
    "10":[
      ["mathStats","ریاضی و آمار ۱"],["literaryArts","علوم و فنون ادبی ۱"],["sociology","جامعه‌شناسی ۱"],["arabicSpec","عربی تخصصی ۱"],
      ["history","تاریخ ۱"],["geographyIran","جغرافیا ایران"],["logic","منطق"],
      ["persian","فارسی ۱"],["dini","دین و زندگی ۱ (انسانی)"],["english","انگلیسی ۱"],["defensePrep","آمادگی دفاعی"],["mediaLiteracy","تفکر و سواد رسانه‌ای"]
    ],
    "11":[
      ["mathStats","ریاضی و آمار ۲"],["literaryArts","علوم و فنون ادبی ۲"],["sociology","جامعه‌شناسی ۲"],["psychology","روان‌شناسی"],
      ["arabicSpec","عربی تخصصی ۲"],["history","تاریخ ۲"],["geography","جغرافیا ۲"],["philosophy","فلسفه ۱"],
      ["persian","فارسی ۲"],["dini","دین و زندگی ۲ (انسانی)"],["english","انگلیسی ۲"],["humanEnvironment","انسان و محیط زیست"]
    ],
    "12":[
      ["mathStats","ریاضی و آمار ۱ و ۲ (پایه)"],["mathStats","ریاضی و آمار ۳ (دوازدهم)"],["literaryArts","علوم و فنون ادبی ۱ و ۲ (پایه)"],["literaryArts","علوم و فنون ادبی ۳ (دوازدهم)"],
      ["literaryArts","آرایه‌های ادبی"],["sociology","جامعه‌شناسی ۱ و ۲ (پایه)"],["sociology","جامعه‌شناسی ۳ (دوازدهم)"],["psychology","روان‌شناسی"],
      ["arabicSpec","عربی تخصصی ۱ و ۲ (پایه)"],["arabicSpec","عربی تخصصی ۳ (دوازدهم)"],["history","تاریخ ۱ و ۲ (پایه)"],["history","تاریخ ۳ (دوازدهم)"],
      ["geography","جغرافیا ۱ و ۲ (پایه)"],["geography","جغرافیا ۳ (دوازدهم)"],["logic","منطق"],["philosophy","فلسفه ۱"],["philosophy","فلسفه ۲"],["economics","اقتصاد"],
      ["persian","فارسی ۳"],["dini","دین و زندگی ۳ (انسانی)"],["arabic","عربی ۳ (رشته انسانی)"],["english","انگلیسی ۳"],["culturalAnalysis","تحلیل فرهنگی"]
    ]
  }
};
function getStudyTimerCatalog(curriculum,grade){
  const c=STUDY_TIMER_CURRICULUM_CATALOG[curriculum]||STUDY_TIMER_CURRICULUM_CATALOG.experimental;
  const list=c[String(grade)]||[];
  return list.filter(x=>Array.isArray(x)&&x.length>=2&&state.subjects[x[0]]);
}

function studyTimerContext(){const c=state.settings.defaultCurriculum||state.settings.selectedCurriculum||'experimental',g=String(state.settings.defaultGrade||state.settings.dashboardGrade||'10');const names={experimental:'🧬 تجربی',mathematics:'📐 ریاضی',humanities:'📚 انسانی'};const grades={10:'دهم',11:'یازدهم',12:'دوازدهم'};return `${names[c]||'—'} • پایه ${grades[g]||g}`}
function populateStudyTimerSubjects(){
  const sel=document.getElementById('studyTimerSubject');if(!sel)return;
  const c=state.settings.defaultCurriculum||state.settings.selectedCurriculum||'experimental',g=String(state.settings.defaultGrade||state.settings.dashboardGrade||'10');
  const items=getStudyTimerCatalog(c,g).filter(x=>state.subjects[x[0]]);
  const cur=studyTimerSubject,label=studyTimerSubjectLabel;
  sel.innerHTML='<option value="">مطالعه آزاد</option>'+items.map(x=>`<option value="${esc(x[0])}" data-label="${esc(x[1])}">${SUBJECTS[x[0]]?.icon||'📘'} ${esc(x[1])}</option>`).join('');
  let match=[...sel.options].find(o=>o.value===cur&&(!label||o.dataset.label===label));
  if(match){
    sel.value=match.value;
  }else{
    // اگر با تغییر رشته/پایه، درس قبلی دیگر متعلق به پیش‌فرض جدید نیست، انتخاب را پاک کن.
    studyTimerSubject='';studyTimerSubjectLabel='';sel.value='';
  }
  const ctx=document.getElementById('studyTimerContext');if(ctx)ctx.textContent='پیش‌فرض فعال: '+studyTimerContext();
  updateOfflineStudyTimer();
}
function setStudyTimerSubject(v){
  if(studyTimerRunning)return;
  const sel=document.getElementById('studyTimerSubject'),opt=sel&&[...sel.options].find(o=>o.value===v);
  studyTimerSubject=opt?.value||'';studyTimerSubjectLabel=opt?.dataset.label||'';
  saveOfflineStudyTimer();updateOfflineStudyTimer();
}
function setStudyTimerTopic(v){if(studyTimerRunning)return;studyTimerTopic=(v||'').trim().slice(0,60);saveOfflineStudyTimer();updateOfflineStudyTimer();}
function formatTimerNumber(n){return new Intl.NumberFormat('fa-IR').format(Math.max(0,Math.round(n)));}
function updateOfflineStudyTimer(){
  const t=document.getElementById('studyTimerDisplay'),st=document.getElementById('studyTimerStatusText'),status=document.querySelector('.timer-v2-status'),dot=document.getElementById('studyTimerStatusDot'),btn=document.getElementById('studyTimerToggle'),sub=document.getElementById('studyTimerSelectedSubject'),topic=document.getElementById('studyTimerSelectedTopic'),mins=document.getElementById('studyTimerMinutes'),prog=document.getElementById('studyTimerProgress'),pct=document.getElementById('studyTimerPercent'),elapsedEl=document.getElementById('studyTimerElapsed'),lenEl=document.getElementById('studyTimerSessionLength'),label=document.getElementById('studyTimerDisplayLabel');
  const m=String(Math.floor(studyTimerSeconds/60)).padStart(2,'0'),s=String(studyTimerSeconds%60).padStart(2,'0');
  if(t)t.textContent=m+':'+s;
  const elapsed=Math.max(0,studyTimerTotal-studyTimerSeconds),ratio=Math.max(0,Math.min(1,elapsed/Math.max(1,studyTimerTotal)));
  if(prog)prog.style.width=(ratio*100)+'%';if(pct)pct.textContent=formatTimerNumber(ratio*100)+'٪';
  if(st)st.textContent=studyTimerRunning?'در حال مطالعه':studyTimerSeconds===0?'جلسه تمام شد':'آماده';
  if(status){status.classList.toggle('running',studyTimerRunning);status.classList.toggle('done',!studyTimerRunning&&studyTimerSeconds===0);}
  if(dot)dot.setAttribute('aria-label',studyTimerRunning?'در حال مطالعه':'آماده');
  if(btn)btn.textContent=studyTimerRunning?'⏸ توقف':'▶ شروع مطالعه';
  if(label)label.textContent=studyTimerSeconds===0?'جلسه به پایان رسید':'زمان باقی‌مانده';
  const c=state.settings.defaultCurriculum||state.settings.selectedCurriculum||'experimental';
  const name=studyTimerSubject?(studyTimerSubjectLabel||subjectDisplayName(studyTimerSubject,c)):'مطالعه آزاد';
  if(sub)sub.textContent=name;if(topic)topic.textContent=studyTimerTopic?'📌 '+studyTimerTopic:'بدون مبحث';
  if(mins&&!studyTimerRunning)mins.value=Math.round(studyTimerTotal/60);
  if(elapsedEl)elapsedEl.textContent=formatTimerNumber(elapsed/60)+' دقیقه';
  if(lenEl)lenEl.textContent=formatTimerNumber(studyTimerTotal/60)+' دقیقه';
  const oldTopic=document.getElementById('studyTimerTopic');if(oldTopic&&oldTopic.value!==studyTimerTopic)oldTopic.value=studyTimerTopic;
}
function resyncStudyTimerClock(){
  if(!studyTimerRunning||!studyTimerStartedAt)return;
  const passed=Math.max(0,Math.floor((Date.now()-studyTimerStartedAt)/1000));
  if(passed<=0)return;
  studyTimerSeconds=Math.max(0,studyTimerSeconds-passed);
  if(studyTimerSeconds<=0){
    studyTimerSeconds=0;studyTimerRunning=false;clearInterval(studyTimer);studyTimer=null;studyTimerStartedAt=0;
    saveOfflineStudyTimer();updateOfflineStudyTimer();
    showToast('زمان جلسه تمام شد. جلسه مطالعه ثبت می‌شود.');
    logCurrentTimerSession(true);
    return;
  }
  studyTimerStartedAt=Date.now();
  saveOfflineStudyTimer();updateOfflineStudyTimer();
}
function loadOfflineStudyTimer(){
  try{
    let x=JSON.parse(localStorage.getItem(STUDY_TIMER_STORAGE)||'null');
    if(!x){const old=JSON.parse(localStorage.getItem('darsbekhon_offline_study_timer')||'null');if(old)x={...old,running:false};}
    if(x&&Number.isFinite(x.seconds)&&Number.isFinite(x.total)){
      studyTimerTotal=Math.max(60,Math.min(240*60,x.total));studyTimerSeconds=Math.max(0,Math.min(studyTimerTotal,x.seconds));
      studyTimerSubject=typeof x.subject==='string'&&state.subjects[x.subject]?x.subject:'';studyTimerSubjectLabel=typeof x.subjectLabel==='string'?x.subjectLabel:'';studyTimerTopic=typeof x.topic==='string'?x.topic.slice(0,60):'';studyTimerSavedAt=Number(x.savedAt)||0;studyTimerStartedAt=Number(x.startedAt)||0;
      studyTimerRunning=!!(x.running&&studyTimerStartedAt);
      resyncStudyTimerClock();
    }
  }catch(e){}
  populateStudyTimerSubjects();updateOfflineStudyTimer();
  if(studyTimerRunning)startStudyTimerInterval();
}
// وقتی برنامه از پس‌زمینه به پیش‌زمینه برمی‌گردد (تعویض اپ/تب یا خاموش‌شدن صفحه)، ساعت تایمر را با زمان واقعی هماهنگ کن
document.addEventListener('visibilitychange',()=>{if(!document.hidden)resyncStudyTimerClock();});
window.addEventListener('pageshow',()=>{resyncStudyTimerClock();});
window.addEventListener('focus',()=>{resyncStudyTimerClock();});
function setStudyTimerPreset(min,el){if(studyTimerRunning)return;studyTimerTotal=Math.max(60,Math.min(240*60,Math.round(min)*60));studyTimerSeconds=studyTimerTotal;document.querySelectorAll('.timer-preset').forEach(b=>b.classList.remove('active'));if(el)el.classList.add('active');const inp=document.getElementById('studyTimerMinutes');if(inp)inp.value=min;saveOfflineStudyTimer();updateOfflineStudyTimer();}
function setStudyTimerCustom(v){if(studyTimerRunning)return;let min=Math.round(Number(v));if(!Number.isFinite(min))min=25;min=Math.max(1,Math.min(240,min));studyTimerTotal=min*60;studyTimerSeconds=studyTimerTotal;document.querySelectorAll('.timer-preset').forEach(b=>b.classList.remove('active'));saveOfflineStudyTimer();updateOfflineStudyTimer();}
function focusStudyTimerCustom(){const inp=document.getElementById('studyTimerMinutes');if(inp){inp.focus();inp.select();}}
function startStudyTimerInterval(){clearInterval(studyTimer);studyTimer=setInterval(()=>{if(!studyTimerRunning)return;studyTimerSeconds--;if(studyTimerSeconds<=0){studyTimerSeconds=0;studyTimerRunning=false;clearInterval(studyTimer);studyTimer=null;studyTimerStartedAt=0;saveOfflineStudyTimer();updateOfflineStudyTimer();showToast('زمان جلسه تمام شد. جلسه مطالعه ثبت می‌شود.');logCurrentTimerSession(true);return;}updateOfflineStudyTimer();saveOfflineStudyTimer();},1000);}
function toggleStudyTimer(){
  if(studyTimerRunning){studyTimerRunning=false;clearInterval(studyTimer);studyTimer=null;studyTimerStartedAt=0;saveOfflineStudyTimer();updateOfflineStudyTimer();return;}
  if(studyTimerSeconds<=0)studyTimerSeconds=studyTimerTotal;studyTimerRunning=true;studyTimerStartedAt=Date.now();saveOfflineStudyTimer();updateOfflineStudyTimer();startStudyTimerInterval();
}
function resetStudyTimer(){clearInterval(studyTimer);studyTimer=null;studyTimerRunning=false;studyTimerStartedAt=0;studyTimerSeconds=studyTimerTotal;saveOfflineStudyTimer();updateOfflineStudyTimer();}
function finishStudyTimer(){
  const elapsed=Math.max(0,studyTimerTotal-studyTimerSeconds);
  if(elapsed<60){resetStudyTimer();showToast('کمتر از یک دقیقه از جلسه گذشته بود؛ چیزی ثبت نشد.');return;}
  studyTimerRunning=false;clearInterval(studyTimer);studyTimer=null;studyTimerStartedAt=0;saveOfflineStudyTimer();updateOfflineStudyTimer();logCurrentTimerSession(true);
}
function logCurrentTimerSession(autoFinish=false){
  const subject=studyTimerSubject;
  if(!subject||!state.subjects[subject]){showToast('برای ثبت پارت، ابتدا یک درس انتخاب کن.');return false;}
  const elapsed=Math.max(0,Math.floor((studyTimerTotal-studyTimerSeconds)/60));
  if(elapsed<1){showToast('هنوز زمانی از تایمر ثبت نشده است.');return false;}
  const sub=document.getElementById('epSubject'),gr=document.getElementById('epGrade'),tp=document.getElementById('epTopic'),mi=document.getElementById('epMinutes'),ty=document.getElementById('epType'),q=document.getElementById('epQuality'),d=document.getElementById('epDifficulty'),tests=document.getElementById('epTests');
  if(sub)sub.value=subject;if(gr)gr.value=state.settings.dashboardGrade||state.settings.defaultGrade||'10';if(tp)tp.value=studyTimerTopic||'بدون موضوع';if(mi)mi.value=elapsed;if(ty)ty.value='timed';if(q)q.value='normal';if(d)d.value='normal';if(tests)tests.value=0;['epCorrect','epWrong','epBlank','epMarked'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=0});const an=document.getElementById('epAnalysis');if(an)an.value='no';
  addEpisode();
  if(autoFinish||studyTimerSeconds===0)resetStudyTimer();else{studyTimerSeconds=studyTimerTotal;saveOfflineStudyTimer();updateOfflineStudyTimer();}
  showToast(`پارت ${elapsed} دقیقه‌ای ثبت شد.`);return true;
}


function renderSmartTools(){
  const weakEl=document.getElementById('smartWeakness'),streakEl=document.getElementById('smartStreak');
  if(!weakEl)return;
  const keys=getSmartSubjects(); const candidates=keys.map(k=>({k,s:state.subjects[k]})).sort((a,b)=>(a.s.knowledge||0)-(b.s.knowledge||0));
  weakEl.innerHTML=candidates.slice(0,4).map(x=>`<div class="smart-item"><span>${esc(subjectDisplayName(x.k,state.settings.selectedCurriculum))}</span><b>${Math.round(x.s.knowledge||0)}٪</b></div>`).join('')||'<div class="empty">داده کافی نیست.</div>';
  const eps=dayEpisodes().reduce((n,e)=>n+e.minutes,0);
  streakEl.innerHTML=`<div class="smart-item"><span>زنجیره فعلی</span><b>${fmt(state.streak)} روز 🔥</b></div><div class="smart-item"><span>مطالعه امروز</span><b>${fmt(eps)} دقیقه</b></div>`;
}
function openFocusMode(){
  const keys=getSmartSubjects(); const pick=keys.sort((a,b)=>(state.subjects[a].knowledge||0)-(state.subjects[b].knowledge||0))[0];
  const ov=document.getElementById('focusOverlay');if(!ov)return; ov.classList.add('show');ov.setAttribute('aria-hidden','false');
  document.getElementById('focusSubject').textContent=pick?subjectDisplayName(pick,state.settings.selectedCurriculum):'مطالعه آزاد';
  resetFocusTimer();
}
function closeFocusMode(){clearInterval(focusTimer);focusTimer=null;focusRunning=false;const ov=document.getElementById('focusOverlay');if(ov){ov.classList.remove('show');ov.setAttribute('aria-hidden','true')}}
function updateFocusTime(){const m=String(Math.floor(focusSeconds/60)).padStart(2,'0'),s=String(focusSeconds%60).padStart(2,'0');const el=document.getElementById('focusTime');if(el)el.textContent=m+':'+s;}
function toggleFocusTimer(){
  if(focusRunning){clearInterval(focusTimer);focusRunning=false;document.getElementById('focusToggle').textContent='▶ ادامه';return;}
  focusRunning=true;document.getElementById('focusToggle').textContent='⏸ توقف';
  focusTimer=setInterval(()=>{focusSeconds--;updateFocusTime();if(focusSeconds<=0){clearInterval(focusTimer);focusRunning=false;document.getElementById('focusToggle').textContent='▶ شروع';showToast('جلسه تمرکز تمام شد؛ یک استراحت کوتاه داشته باش.')}},1000);
}
function resetFocusTimer(){clearInterval(focusTimer);focusRunning=false;focusSeconds=25*60;updateFocusTime();const b=document.getElementById('focusToggle');if(b)b.textContent='▶ شروع';}

/* ===================== v1.21 SMART STUDY ENGINE ===================== */
function subjectMistakePressure(k){
  // Unresolved mistakes weigh more the lower their Leitner box (i.e. the more recently/repeatedly they've been missed).
  const active=(state.mistakes||[]).filter(m=>!m.resolved&&m.subject===k);
  let p=0;
  active.forEach(m=>{p+=(6-Math.min(5,Math.max(1,m.box||1)))*4+Math.min(3,(m.count||1)-1);});
  return Math.min(35,p);
}
function subjectExamWeakness(k){
  // Average of this subject's score across its last 3 logged mock exams (آزمون آزمایشی), if any.
  const exams=(state.mockExams||[]).filter(e=>e.subjects&&Object.prototype.hasOwnProperty.call(e.subjects,k)).slice(0,3);
  if(!exams.length)return 0;
  const avg=exams.reduce((a,e)=>a+(+e.subjects[k]||0),0)/exams.length;
  return Math.max(0,50-avg)*.6;
}
function examDaysLeft(){
  const ds=state.settings.examDate;
  if(!ds)return null;
  const diff=Math.ceil((new Date(ds+'T00:00:00')-new Date(today()+'T00:00:00'))/86400000);
  return Number.isFinite(diff)?diff:null;
}
function smartSubjectScore(k){
  const s=state.subjects[k]||{};
  const recent=state.episodes.filter(e=>e.subject===k).slice(0,8);
  const last=recent[0]; const daysSince=last?smartDateDaysAgo(last.date):30;

  // Every factor below is normalized to a 0-100 scale first, so the weights are
  // easy to reason about and no single factor can silently dominate the others.
  const masteryGap=Math.max(0,Math.min(100,100-(+s.knowledge||0)));
  const retentionGap=Math.max(0,Math.min(100,100-(+s.retention||0)));
  const staleness=Math.max(0,Math.min(100,daysSince*10)); // fully "stale" after ~10 days untouched
  const hasTests=(+s.tests||0)>0;
  const accuracyGap=hasTests?Math.max(0,Math.min(100,100-(+s.accuracy||0))):0; // ignore accuracy until there's real test data
  const poor=recent.filter(e=>e.quality==='poor').length;
  const excellent=recent.filter(e=>e.quality==='excellent').length;
  const recentStruggle=Math.max(0,Math.min(100,poor*25-excellent*10));

  const baseScore=masteryGap*.32+retentionGap*.26+staleness*.18+accuracyGap*.14+recentStruggle*.10;

  // Rescale the mistake-notebook and mock-exam pressure (old 0-35 / 0-30 ranges) onto the same 0-100 scale.
  const mistakePressure=Math.max(0,Math.min(100,subjectMistakePressure(k)*(100/35)));
  const examWeak=Math.max(0,Math.min(100,subjectExamWeakness(k)*(100/30)));

  let score=baseScore*.70+mistakePressure*.18+examWeak*.12;

  const daysLeft=examDaysLeft();
  if(daysLeft!=null&&daysLeft>=0&&daysLeft<=45){
    // As the exam approaches, weak/unreviewed subjects get pushed up a bit harder.
    score*=1+((45-daysLeft)/45)*.5;
  }
  return Math.max(1,score);
}
function smartReason(k){
  const s=state.subjects[k]||{};const reasons=[];
  if((s.knowledge||0)<55)reasons.push('تسلط پایین');
  if((s.retention||0)<45)reasons.push('Retention پایین');
  const last=state.episodes.filter(e=>e.subject===k)[0];
  if(!last||smartDateDaysAgo(last.date)>=3)reasons.push('مدتی است مرور نشده');
  if((s.accuracy||0)<60&&s.tests)reasons.push('دقت پایین');
  if(subjectMistakePressure(k)>0)reasons.push('اشتباه سررسید/حل‌نشده در دفترچه اشتباهات');
  if(subjectExamWeakness(k)>0)reasons.push('میانگین آزمون‌های اخیر پایین');
  return reasons.slice(0,3).join(' • ')||'بهترین گزینه بعدی';
}
function buildSmartPlan(){
 const keys=getSmartSubjects(); if(!keys.length)return;
 const sorted=keys.map(k=>({k,score:smartSubjectScore(k)})).sort((a,b)=>b.score-a.score);
 const used=[];
 const dueMistakes=(state.mistakes||[]).filter(x=>!x.resolved&&leitnerIsDue(x)).sort((a,b)=>(b.count||1)-(a.count||1));
 const mistakes=dueMistakes.length?dueMistakes:(state.mistakes||[]).filter(x=>!x.resolved).sort((a,b)=>(b.count||1)-(a.count||1));
 mistakes.slice(0,2).forEach(m=>{if(!used.includes(m.subject))used.push(m.subject)});
 sorted.forEach(x=>{if(used.length<3&&!used.includes(x.k))used.push(x.k)});
 const plan=used.slice(0,3).map((k,i)=>{const s=state.subjects[k]||{};const topic=Object.entries(s.topics||{}).sort((a,b)=>(+a[1].retention||50)-(+b[1].retention||50))[0]?.[0]||'';return {k,topic,minutes:i===0?50:35,reason:smartReason(k)}});
 const el=document.getElementById('smartPlanList');if(!el)return;
 el.innerHTML=plan.map((x,i)=>`<article class="smart-plan-item"><div class="meta"><b>${i+1}. ${esc(subjectDisplayName(x.k,state.settings.selectedCurriculum))}</b><span>${x.minutes} دقیقه</span></div><div>${x.topic?`📌 ${esc(x.topic)}`:'📚 مطالعه هدفمند'}</div><div class="why">🎯 ${esc(x.reason)}</div><div class="actions"><button class="btn primary" onclick="startSmartTask('${esc(x.k)}','${esc(x.topic)}',${x.minutes})">▶ شروع</button></div></article>`).join('');
 state.smartPlan={date:today(),items:plan};save();
}
window.buildSmartPlan=buildSmartPlan;

function startSmartTask(k,topic,minutes){
 switchToPage('leitner');
 switchToolboxTab('timer');
 setTimeout(()=>{const sel=document.getElementById('studyTimerSubject');if(sel){const opt=[...sel.options].find(o=>o.dataset.subjectKey===k);if(opt){sel.value=opt.value;setStudyTimerSubject(opt.value)}else setStudyTimerSubject(k)};const ti=document.getElementById('studyTimerTopic');if(ti){ti.value=topic||'';setStudyTimerTopic(topic||'')};setStudyTimerCustom(minutes);showToast('جلسه هوشمند آماده شد؛ شروع کن.')},80);
}
window.startSmartTask=startSmartTask;
function logCurrentTimerSession(){
  const subject=document.getElementById("studyTimerSubject")?.value||"";
  if(!subject || !state.subjects[subject]){showToast("برای ثبت پارت، ابتدا یک درس انتخاب کن.");return}
  const elapsed=Math.max(0,Math.round((studyTimerTotal-studyTimerSeconds)/60));
  if(elapsed<1){showToast("هنوز زمانی از تایمر ثبت نشده است.");return}
  const minutes=elapsed;
  const sub=document.getElementById("epSubject"),gr=document.getElementById("epGrade"),tp=document.getElementById("epTopic"),mi=document.getElementById("epMinutes"),ty=document.getElementById("epType"),q=document.getElementById("epQuality"),d=document.getElementById("epDifficulty"),tests=document.getElementById("epTests");
  if(sub)sub.value=subject;
  if(gr)gr.value=state.settings.dashboardGrade||"10";
  if(tp)tp.value=studyTimerTopic||"بدون موضوع";
  if(mi)mi.value=minutes;
  if(ty)ty.value="timed";
  if(q)q.value="normal";
  if(d)d.value="normal";
  if(tests)tests.value=0;
  ["epCorrect","epWrong","epBlank","epMarked"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=0});
  const an=document.getElementById("epAnalysis");if(an)an.value="no";
  addEpisode();
  resetStudyTimer();
  showToast(`پارت ${minutes} دقیقه‌ای به پارت های مطالعه اضافه شد.`);
}

function ensureMistakes(){
  if(!Array.isArray(state.mistakes))state.mistakes=[];
  state.mistakes.forEach(m=>{
    if(!m.box)m.box=1;
    if(!m.nextReview)m.nextReview=m.date||today();
  });
}
function populateMistakeSubjects(){const el=document.getElementById('mistakeSubject');if(!el)return;const c=state.settings.selectedCurriculum||'experimental',g=state.settings.dashboardGrade||'10';const keys=curriculumSubjectKeys(c).filter(k=>state.subjects[k]&&subjectMatchesGrade(k,g,c));el.innerHTML=keys.map(k=>`<option value="${k}">${SUBJECTS[k]?.icon||'📘'} ${esc(subjectDisplayName(k,c))}</option>`).join('')}
function addMistake(){ensureMistakes();const subject=document.getElementById('mistakeSubject')?.value,topic=document.getElementById('mistakeTopic')?.value.trim()||'بدون مبحث',type=document.getElementById('mistakeType')?.value||'مفهومی',note=document.getElementById('mistakeNote')?.value.trim()||'';if(!subject){showToast('درس را انتخاب کن.');return}state.mistakes.unshift({id:crypto.randomUUID(),date:today(),subject,topic,type,note,count:1,resolved:false,box:1,nextReview:today()});save();renderMistakes();document.getElementById('mistakeTopic').value='';document.getElementById('mistakeNote').value='';showToast('اشتباه ثبت شد؛ طبق چرخه لایتنر (۱، ۳، ۷، ۱۴ روز) دوباره جلوی چشمت میاد.')}
function resolveMistake(id){ensureMistakes();const m=state.mistakes.find(x=>x.id===id);if(!m)return;m.resolved=!m.resolved;if(!m.resolved){m.box=m.box||1;m.nextReview=today();}save();renderMistakes()}
function deleteMistake(id){
  ensureMistakes();
  const m=state.mistakes.find(x=>x.id===id);
  if(!m)return;
  if(!confirm('این اشتباه برای همیشه حذف شود؟'))return;
  state.mistakes=state.mistakes.filter(x=>x.id!==id);
  save();
  renderMistakes();
  showToast('🗑 اشتباه حذف شد.');
}
function answerMistake(id,correct){
  ensureMistakes();
  const m=state.mistakes.find(x=>x.id===id);if(!m)return;
  if(correct){
    m.box=Math.min(5,(m.box||1)+1);
    m.nextReview=leitnerNextDate(m.box);
    if(m.box>=5){m.resolved=true;showToast('🎉 این اشتباه دیگر تکرار نمی‌شود — به آرشیو رفت.');}
    else{showToast(`✓ ثبت شد — مرور بعدی: ${m.nextReview}`);}
  }else{
    m.count=(m.count||1)+1;m.box=1;m.nextReview=today();m.resolved=false;m.date=today();
    showToast('↻ دوباره ثبت شد؛ فردا دوباره جلوی چشمت میاد.');
  }
  save();renderMistakes();
}
function mistakeTypeBreakdown(subjectFilter){
  const list=(state.mistakes||[]).filter(m=>!subjectFilter||m.subject===subjectFilter);
  const counts={};
  list.forEach(m=>{counts[m.type]=(counts[m.type]||0)+1;});
  const total=list.length;
  const rows=Object.entries(counts).map(([type,n])=>({type,n,pct:total?Math.round(n/total*100):0})).sort((a,b)=>b.n-a.n);
  return{rows,total};
}
window.mistakeTypeBreakdown=mistakeTypeBreakdown;
function renderMistakeAnalytics(){
  const el=document.getElementById('mistakeAnalytics');if(!el)return;
  const{rows,total}=mistakeTypeBreakdown();
  if(!total){el.innerHTML='<div class="empty">هنوز اشتباهی برای تحلیل ثبت نشده.</div>';return}
  const bars=rows.map(r=>`<div style="margin:8px 0"><div class="xpmeta"><span>${esc(r.type)}</span><b>${fmt(r.n)} (${r.pct}%)</b></div><div class="progress"><div class="bar" style="width:${r.pct}%"></div></div></div>`).join('');
  const bySubject={};
  state.mistakes.forEach(m=>{bySubject[m.subject]=bySubject[m.subject]||{};bySubject[m.subject][m.type]=(bySubject[m.subject][m.type]||0)+1;});
  let insight='';
  Object.entries(bySubject).forEach(([subj,types])=>{
    const sorted=Object.entries(types).sort((a,b)=>b[1]-a[1]);
    const top=sorted[0];if(!top)return;
    const subjTotal=sorted.reduce((a,x)=>a+x[1],0);
    if(subjTotal>=4&&top[1]/subjTotal>=.5&&top[0]!=='مفهومی'){
      insight=`⚠️ مشکل اصلی تو در ${esc(subjectDisplayName(subj,state.settings.selectedCurriculum))} به‌نظر «${esc(top[0])}» است، نه لزوماً مفهومی — روی همین تمرکز کن.`;
    }
  });
  el.innerHTML=bars+(insight?`<div class="smart-plan-item" style="margin-top:10px">${insight}</div>`:'');
}
window.renderMistakeAnalytics=renderMistakeAnalytics;
function renderMistakes(){
  ensureMistakes();
  const el=document.getElementById('mistakeList');if(!el)return;
  const statsEl=document.getElementById('mistakeStats');
  const active=state.mistakes.filter(x=>!x.resolved);
  const due=active.filter(leitnerIsDue);
  if(statsEl)statsEl.innerHTML=`
    <div class="leitner-stat"><span>فعال</span><b>${active.length}</b></div>
    <div class="leitner-stat"><span>سررسید امروز</span><b style="color:var(--warn)">${due.length}</b></div>
    <div class="leitner-stat"><span>آرشیو (مسلط)</span><b style="color:var(--good)">${state.mistakes.length-active.length}</b></div>`;
  renderMistakeAnalytics();
  const arr=state.mistakes.slice().sort((a,b)=>{
    if(!!a.resolved!==!!b.resolved) return Number(!!a.resolved)-Number(!!b.resolved);
    const ad=leitnerIsDue(a)?0:1, bd=leitnerIsDue(b)?0:1;
    if(ad!==bd) return ad-bd;
    return (b.count||1)-(a.count||1);
  });
  el.innerHTML=arr.map(m=>{
    const isDue=leitnerIsDue(m);
    return `<div class="mistake-card" style="opacity:${m.resolved?.6:1}">
      <div class="top"><b>${SUBJECTS[m.subject]?.icon||'📘'} ${esc(subjectDisplayName(m.subject,state.settings.selectedCurriculum))} — ${esc(m.topic)}</b><span>${m.count||1}×</span></div>
      <div class="muted small">${esc(m.type)} • ${m.date}</div>
      ${m.note?`<div class="note">${esc(m.note)}</div>`:''}
      <div style="display:flex;gap:6px;margin-top:7px;flex-wrap:wrap;align-items:center">
        <span class="leitner-box-badge">جعبه ${m.box||1}</span>
        ${m.resolved?`<span class="leitner-box-badge" style="background:rgba(83,230,166,.12);color:var(--good)">آرشیو</span>`:
          isDue?`<span class="leitner-due">🔥 سررسید مرور</span>`:`<span class="muted small">مرور بعدی: ${m.nextReview||'—'}</span>`}
      </div>
      <div class="actions" style="margin-top:7px">
        ${!m.resolved?`<button class="btn primary" onclick="answerMistake('${m.id}',true)">✓ این بار درست بود</button><button class="btn danger" onclick="answerMistake('${m.id}',false)">✗ بازم اشتباه کردم</button>`:''}
        <button class="btn" onclick="resolveMistake('${m.id}')">${m.resolved?'↩ بازگردانی':'🗄 آرشیو دستی'}</button>
        <button class="btn danger" onclick="deleteMistake('${m.id}')">🗑 حذف</button>
      </div>
    </div>`;
  }).join('')||'<div class="empty">هنوز اشتباهی ثبت نشده.</div>';
}
window.addMistake=addMistake;window.renderMistakes=renderMistakes;window.resolveMistake=resolveMistake;window.deleteMistake=deleteMistake;window.answerMistake=answerMistake;
ensureMistakes();populateMistakeSubjects();

/* ===================== MOCK EXAMS (آزمون‌های آزمایشی) ===================== */
const MOCK_EXAM_SUBJECT_LISTS={
  experimental:{
    "12":[
      {key:"biology_pre",label:"زیست‌شناسی ۱ و ۲ (پایه)",icon:"🧬"},
      {key:"biology_12",label:"زیست‌شناسی ۳ (دوازدهم)",icon:"🧬"},
      {key:"physics_pre",label:"فیزیک ۱ و ۲ (پایه)",icon:"⚛️"},
      {key:"physics_12",label:"فیزیک ۳ (دوازدهم)",icon:"⚛️"},
      {key:"chemistry_pre",label:"شیمی ۱ و ۲ (پایه)",icon:"⚗️"},
      {key:"chemistry_12",label:"شیمی ۳ (دوازدهم)",icon:"⚗️"},
      {key:"math_pre",label:"ریاضی ۱ و ۲ (پایه)",icon:"🧮"},
      {key:"math_12",label:"ریاضی ۳ (دوازدهم)",icon:"🧮"},
      {key:"geology",label:"زمین‌شناسی (جامع)",icon:"🌍"}
    ],
    "11":[
      {key:"biology2",label:"زیست‌شناسی ۲",icon:"🧬"},
      {key:"physics2",label:"فیزیک ۲",icon:"⚛️"},
      {key:"chemistry2",label:"شیمی ۲",icon:"⚗️"},
      {key:"math2",label:"ریاضی ۲",icon:"🧮"},
      {key:"geology",label:"زمین‌شناسی (جامع)",icon:"🌍"}
    ],
    "10":[
      {key:"biology1",label:"زیست‌شناسی ۱",icon:"🧬"},
      {key:"physics1",label:"فیزیک ۱",icon:"⚛️"},
      {key:"chemistry1",label:"شیمی ۱",icon:"⚗️"},
      {key:"math1",label:"ریاضی ۱",icon:"🧮"}
    ]
  },
  mathematics:{
    "12":[
      {key:"math_calc_pre",label:"ریاضی ۱ و حسابان ۱ (پایه)",icon:"🧮"},
      {key:"calc2",label:"حسابان ۲ (دوازدهم)",icon:"∫"},
      {key:"geometry_pre",label:"هندسه ۱ و ۲ (پایه)",icon:"📐"},
      {key:"geometry3",label:"هندسه ۳ (دوازدهم)",icon:"📐"},
      {key:"statistics",label:"آمار و احتمال",icon:"📊"},
      {key:"discrete",label:"ریاضیات گسسته",icon:"🔢"},
      {key:"physics_pre",label:"فیزیک ۱ و ۲ (پایه)",icon:"⚛️"},
      {key:"physics_12",label:"فیزیک ۳ (دوازدهم)",icon:"⚛️"},
      {key:"chemistry_pre",label:"شیمی ۱ و ۲ (پایه)",icon:"⚗️"},
      {key:"chemistry_12",label:"شیمی ۳ (دوازدهم)",icon:"⚗️"}
    ],
    "11":[
      {key:"calc1",label:"حسابان ۱",icon:"∫"},
      {key:"geometry2",label:"هندسه ۲",icon:"📐"},
      {key:"statistics",label:"آمار و احتمال",icon:"📊"},
      {key:"physics2",label:"فیزیک ۲",icon:"⚛️"},
      {key:"chemistry2",label:"شیمی ۲",icon:"⚗️"}
    ],
    "10":[
      {key:"math1",label:"ریاضی ۱",icon:"🧮"},
      {key:"geometry1",label:"هندسه ۱",icon:"📐"},
      {key:"physics1",label:"فیزیک ۱",icon:"⚛️"},
      {key:"chemistry1",label:"شیمی ۱",icon:"⚗️"}
    ]
  },
  humanities:{
    "12":[
      {key:"mathStats_pre",label:"ریاضی و آمار ۱ و ۲ (پایه)",icon:"📊"},
      {key:"mathStats3",label:"ریاضی و آمار ۳ (دوازدهم)",icon:"📊"},
      {key:"literaryArts_pre",label:"علوم و فنون ادبی ۱ و ۲ (پایه)",icon:"✒️"},
      {key:"literaryArts3",label:"علوم و فنون ادبی ۳ (دوازدهم)",icon:"✒️"},
      {key:"literaryDevices",label:"آرایه‌های ادبی",icon:"🖋️"},
      {key:"sociology_pre",label:"جامعه‌شناسی ۱ و ۲ (پایه)",icon:"👥"},
      {key:"sociology3",label:"جامعه‌شناسی ۳ (دوازدهم)",icon:"👥"},
      {key:"psychology",label:"روان‌شناسی",icon:"🧠"},
      {key:"arabicSpec_pre",label:"عربی تخصصی ۱ و ۲ (پایه)",icon:"📗"},
      {key:"arabicSpec3",label:"عربی تخصصی ۳ (دوازدهم)",icon:"📗"},
      {key:"history_pre",label:"تاریخ ۱ و ۲ (پایه)",icon:"🏛️"},
      {key:"history3",label:"تاریخ ۳ (دوازدهم)",icon:"🏛️"},
      {key:"geography_pre",label:"جغرافیا ۱ و ۲ (پایه)",icon:"🗺️"},
      {key:"geography3",label:"جغرافیا ۳ (دوازدهم)",icon:"🗺️"},
      {key:"logic",label:"منطق",icon:"🔎"},
      {key:"philosophy1",label:"فلسفه ۱",icon:"💭"},
      {key:"philosophy2",label:"فلسفه ۲",icon:"💭"},
      {key:"economics",label:"اقتصاد",icon:"💰"}
    ],
    "11":[
      {key:"mathStats2",label:"ریاضی و آمار ۲",icon:"📊"},
      {key:"literaryArts2",label:"علوم و فنون ادبی ۲",icon:"✒️"},
      {key:"sociology2",label:"جامعه‌شناسی ۲",icon:"👥"},
      {key:"psychology",label:"روان‌شناسی",icon:"🧠"},
      {key:"arabicSpec2",label:"عربی تخصصی ۲",icon:"📗"},
      {key:"history2",label:"تاریخ ۲",icon:"🏛️"},
      {key:"geography2",label:"جغرافیا ۲",icon:"🗺️"},
      {key:"philosophy1",label:"فلسفه ۱",icon:"💭"}
    ],
    "10":[
      {key:"mathStats1",label:"ریاضی و آمار ۱",icon:"📊"},
      {key:"literaryArts1",label:"علوم و فنون ادبی ۱",icon:"✒️"},
      {key:"sociology1",label:"جامعه‌شناسی ۱",icon:"👥"},
      {key:"arabicSpec1",label:"عربی تخصصی ۱",icon:"📗"},
      {key:"history1",label:"تاریخ ۱",icon:"🏛️"},
      {key:"geographyIran",label:"جغرافیای ایران",icon:"🗺️"},
      {key:"logic",label:"منطق",icon:"🔎"}
    ]
  }
};
function mockExamSubjectList(curriculum,grade){
  return (MOCK_EXAM_SUBJECT_LISTS[curriculum]&&MOCK_EXAM_SUBJECT_LISTS[curriculum][grade])||[];
}
function mockExamSubjectLabel(curriculum,grade,key){
  const item=mockExamSubjectList(curriculum,grade).find(s=>s.key===key);
  return item?item.label:key;
}
function mockExamSubjectIcon(curriculum,grade,key){
  const item=mockExamSubjectList(curriculum,grade).find(s=>s.key===key);
  return item?item.icon:"📘";
}
function ensureMockExams(){if(!Array.isArray(state.mockExams))state.mockExams=[]}
window.setMockExamGradeCurriculum=function(){
  const g=document.getElementById('mockExamGrade')?.value||'10';
  const c=document.getElementById('mockExamCurriculum')?.value||'experimental';
  state.settings.mockExamGrade=g;
  state.settings.mockExamCurriculum=c;
  save();
  populateMockExamSubjects();
};
function populateMockExamSubjects(){
  const wrap=document.getElementById('mockExamSubjects');if(!wrap)return;
  populateMockExamJalaliDate();
  const gradeSel=document.getElementById('mockExamGrade'),curSel=document.getElementById('mockExamCurriculum');
  const c=state.settings.mockExamCurriculum||state.settings.selectedCurriculum||'experimental';
  const g=state.settings.mockExamGrade||state.settings.dashboardGrade||'10';
  if(gradeSel)gradeSel.value=g;
  if(curSel)curSel.value=c;
  const list=mockExamSubjectList(c,g);
  wrap.innerHTML=list.map(s=>`<div class="field-mini"><label>${s.icon} ${esc(s.label)}</label><input type="number" id="mockExamSubj_${s.key}" min="-100" max="100" step="0.1" placeholder="٪"></div>`).join('')||'<div class="empty">برای این پایه/رشته لیست درسی تعریف نشده.</div>';
}
const JALALI_MONTH_NAMES=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
function toPersianDigits(n){const map={'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};return String(n).replace(/[0-9]/g,d=>map[d]);}
function populateJalaliSelects(dayId,monthId,yearId,presetISO,yearsBefore=1,yearsAfter=2){
  const dSel=document.getElementById(dayId),mSel=document.getElementById(monthId),ySel=document.getElementById(yearId);
  if(!dSel||!mSel||!ySel)return;
  const now=new Date();
  const todayJ=gregorianToJalali(now.getFullYear(),now.getMonth()+1,now.getDate());
  let jy=todayJ.jy,jm=todayJ.jm,jd=todayJ.jd;
  if(presetISO){
    const parts=String(presetISO).slice(0,10).split('-').map(Number);
    if(parts.length===3&&parts.every(Number.isFinite)){
      const j=gregorianToJalali(parts[0],parts[1],parts[2]);
      jy=j.jy;jm=j.jm;jd=j.jd;
    }
  }
  if(!dSel.options.length)dSel.innerHTML=Array.from({length:31},(_,i)=>i+1).map(d=>`<option value="${d}">${toPersianDigits(d)}</option>`).join('');
  if(!mSel.options.length)mSel.innerHTML=JALALI_MONTH_NAMES.map((n,i)=>`<option value="${i+1}">${n}</option>`).join('');
  if(!ySel.options.length){
    const startY=todayJ.jy-yearsBefore,endY=todayJ.jy+yearsAfter;
    ySel.innerHTML=Array.from({length:endY-startY+1},(_,i)=>startY+i).map(y=>`<option value="${y}">${toPersianDigits(y)}</option>`).join('');
  }
  dSel.value=String(jd);mSel.value=String(jm);ySel.value=String(jy);
}
function jalaliSelectsToISO(dayId,monthId,yearId){
  const d=Number(document.getElementById(dayId)?.value)||1;
  const m=Number(document.getElementById(monthId)?.value)||1;
  const y=Number(document.getElementById(yearId)?.value)||1400;
  const g=jalaliToGregorian(y,m,d);
  return `${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,'0')}-${String(g.getDate()).padStart(2,'0')}`;
}
function populateMockExamJalaliDate(presetISO){
  populateJalaliSelects('mockExamDateDay','mockExamDateMonth','mockExamDateYear',presetISO,1,2);
}
function mockExamSelectedDateISO(){
  return jalaliSelectsToISO('mockExamDateDay','mockExamDateMonth','mockExamDateYear');
}
function isoToJalaliLabel(iso){
  if(!iso)return '—';
  const parts=String(iso).slice(0,10).split('-').map(Number);
  if(parts.length!==3||!parts.every(Number.isFinite))return String(iso);
  const j=gregorianToJalali(parts[0],parts[1],parts[2]);
  return toPersianDigits(j.jy)+'/'+toPersianDigits(String(j.jm).padStart(2,'0'))+'/'+toPersianDigits(String(j.jd).padStart(2,'0'));
}
function isoToJalaliShort(iso){
  if(!iso)return '';
  const parts=String(iso).slice(0,10).split('-').map(Number);
  if(parts.length!==3||!parts.every(Number.isFinite))return String(iso);
  const j=gregorianToJalali(parts[0],parts[1],parts[2]);
  return toPersianDigits(String(j.jm).padStart(2,'0'))+'/'+toPersianDigits(String(j.jd).padStart(2,'0'));
}
function addMockExam(){
  ensureMockExams();
  const date=mockExamSelectedDateISO();
  const source=(document.getElementById('mockExamSource')?.value||'').trim();
  const name=(document.getElementById('mockExamName')?.value||'').trim();
  const overall=Number(document.getElementById('mockExamPercentile')?.value);
  const rankRaw=document.getElementById('mockExamRank')?.value;
  const rank=rankRaw?Number(rankRaw):null;
  if(!Number.isFinite(overall)||overall<=0){showToast('تراز کل را وارد کن.');return;}
  const curriculum=state.settings.mockExamCurriculum||state.settings.selectedCurriculum||'experimental';
  const grade=state.settings.mockExamGrade||state.settings.dashboardGrade||'10';
  const list=mockExamSubjectList(curriculum,grade);
  const subjects={};
  list.forEach(s=>{
    const el=document.getElementById('mockExamSubj_'+s.key);
    if(el&&el.value!==''){const v=Number(el.value);if(Number.isFinite(v))subjects[s.key]=v;}
  });
  const examId='mx_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);
  state.mockExams.unshift({id:examId,date,source,name,curriculum,grade,overall,rank,subjects,createdAt:Date.now()});
  save();renderMockExams();
  const nameEl=document.getElementById('mockExamName');if(nameEl)nameEl.value='';
  const sourceEl=document.getElementById('mockExamSource');if(sourceEl)sourceEl.value='';
  const pctEl=document.getElementById('mockExamPercentile');if(pctEl)pctEl.value='';
  const rankEl=document.getElementById('mockExamRank');if(rankEl)rankEl.value='';
  list.forEach(s=>{const el=document.getElementById('mockExamSubj_'+s.key);if(el)el.value='';});
  showToast('آزمون آزمایشی ثبت شد.');
  renderExamWeakFollowup(examId);
}
function renderExamWeakFollowup(examId){
  const ex=(state.mockExams||[]).find(e=>e.id===examId);
  const el=document.getElementById('examWeakFollowup');
  if(!el)return;
  if(!ex||!ex.subjects||!Object.keys(ex.subjects).length){el.innerHTML='';return}
  const weak=Object.entries(ex.subjects).filter(([,v])=>v<50);
  if(!weak.length){el.innerHTML='<div class="empty" style="margin-top:10px">🎉 در این آزمون درسی زیر ۵۰٪ نداشتی.</div>';return}
  el.innerHTML=`<div class="card" style="margin-top:12px">
    <h3>⚠️ دروس ضعیف این آزمون</h3>
    <p class="muted small">مباحثی که در این درس‌ها اشتباه زدی را بنویس (با ویرگول یا خط جدید جدا کن) تا خودکار به دفترچه اشتباهات اضافه شوند و طبق چرخه لایتنر مرورشان یادآوری شود.</p>
    ${weak.map(([k,v])=>`<div style="margin:8px 0"><label>${SUBJECTS[k]?.icon||'📘'} ${esc(subjectDisplayName(k,state.settings.selectedCurriculum))} — ${v}%</label>
      <textarea id="examTopics_${esc(k)}" placeholder="مثلاً: ژنتیک فصل ۲, ترمودینامیک"></textarea>
      <select id="examTopicsType_${esc(k)}" style="margin-top:4px"><option>مفهومی</option><option>بی‌دقتی</option><option>فراموشی</option><option>محاسباتی</option><option>زمان‌بندی</option><option>حل مسئله</option></select>
    </div>`).join('')}
    <button class="btn primary" onclick="addMockExamMistakes('${examId}')">➕ افزودن به دفترچه اشتباهات</button>
  </div>`;
}
window.renderExamWeakFollowup=renderExamWeakFollowup;
function addMockExamMistakes(examId){
  ensureMistakes();
  const ex=(state.mockExams||[]).find(e=>e.id===examId);if(!ex)return;
  const weak=Object.entries(ex.subjects||{}).filter(([,v])=>v<50);
  let added=0;
  weak.forEach(([k])=>{
    const ta=document.getElementById('examTopics_'+k);if(!ta)return;
    const typeSel=document.getElementById('examTopicsType_'+k);
    const type=(typeSel&&typeSel.value)||'مفهومی';
    const topics=ta.value.split(/[,،\n]/).map(t=>t.trim()).filter(Boolean);
    topics.forEach(topic=>{
      state.mistakes.unshift({id:crypto.randomUUID(),date:today(),subject:k,topic,type,note:'از آزمون: '+(ex.name||ex.source||ex.date),count:1,resolved:false,box:1,nextReview:today()});
      added++;
    });
  });
  if(added){
    save();renderMistakes();
    showToast(fmt(added)+' اشتباه از این آزمون به دفترچه اضافه شد.');
    const el=document.getElementById('examWeakFollowup');if(el)el.innerHTML='';
  }else showToast('هیچ مبحثی وارد نشده بود.');
}
window.addMockExamMistakes=addMockExamMistakes;
function deleteMockExam(id){
  ensureMockExams();
  const x=state.mockExams.find(m=>m.id===id);if(!x)return;
  if(!confirm('این آزمون از تاریخچه حذف شود؟'))return;
  state.mockExams=state.mockExams.filter(m=>m.id!==id);
  save();renderMockExams();showToast('آزمون حذف شد.');
}
const MOCK_EXAM_SOURCE_ICON={"ماز":"📘","خیلی سبز":"📗","آرمان":"📙","مدرسه":"🏫"};
function mockExamSourceIcon(source){
  const s=String(source||'');
  const found=Object.keys(MOCK_EXAM_SOURCE_ICON).find(k=>s.includes(k));
  return found?MOCK_EXAM_SOURCE_ICON[found]:'📝';
}
function mockExamTrendChart(rows,title){
  const w=520,h=190,p={l:34,r:12,t:20,b:28};
  const vals=rows.map(r=>r.value);
  const max=Math.max(1,...vals),min=Math.min(0,...vals);
  const span=Math.max(1,max-min);
  const pts=rows.map((r,i)=>({x:p.l+i*(w-p.l-p.r)/Math.max(1,rows.length-1),y:h-p.b-((r.value-min)/span)*(h-p.t-p.b)}));
  const path=pts.map((q,i)=>(i?"L":"M")+q.x.toFixed(1)+" "+q.y.toFixed(1)).join(" ");
  const area=path+` L ${pts[pts.length-1].x} ${h-p.b} L ${pts[0].x} ${h-p.b} Z`;
  const step=Math.max(1,Math.ceil(rows.length/6));
  return `<div class="status-chart-v9"><h3>${title}</h3><small>تراز هر آزمون</small>
    <svg class="xp-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      ${[0,1,2,3].map(i=>{const y=p.t+i*(h-p.t-p.b)/3;return `<line class="xp-grid" x1="${p.l}" x2="${w-p.r}" y1="${y}" y2="${y}"/>`}).join("")}
      <path class="xp-area" d="${area}"/>
      <path class="xp-line" d="${path}"/>
      ${pts.map((q,i)=>{
        const showLabel=(i===0||i===pts.length-1||i%step===0);
        return `<circle class="xp-dot" cx="${q.x}" cy="${q.y}" r="3"/>`+
          (showLabel?`<text class="xp-label" x="${q.x}" y="${h-8}" text-anchor="middle">${rows[i].label}</text>`:"");
      }).join("")}
    </svg></div>`;
}
function renderMockExams(){
  ensureMockExams();
  const listEl=document.getElementById('mockExamList');if(!listEl)return;
  const arr=state.mockExams.slice().sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.createdAt||0)-(a.createdAt||0));
  const statsEl=document.getElementById('mockExamStats');
  if(statsEl){
    const n=arr.length;
    const avg=n?Math.round(arr.reduce((s,x)=>s+(+x.overall||0),0)/n):0;
    const best=n?Math.max(...arr.map(x=>+x.overall||0)):0;
    const trend=n>=2?(arr[0].overall-arr[1].overall):0;
    statsEl.innerHTML=`
      <div class="leitner-stat"><span>تعداد آزمون</span><b>${n}</b></div>
      <div class="leitner-stat"><span>میانگین تراز</span><b>${fmt(avg)}</b></div>
      <div class="leitner-stat"><span>بهترین تراز</span><b style="color:var(--good)">${fmt(best)}</b></div>
      <div class="leitner-stat"><span>روند اخیر</span><b style="color:${trend>=0?'var(--good)':'var(--bad)'}">${trend>=0?'▲':'▼'} ${fmt(Math.abs(trend))}</b></div>`;
  }
  const chartEl=document.getElementById('mockExamChartWrap');
  if(chartEl){
    if(arr.length<2){chartEl.innerHTML='<div class="empty">برای رسم نمودار روند، حداقل ۲ آزمون ثبت کن.</div>';}
    else{
      const rows=arr.slice().sort((a,b)=>(a.date||'').localeCompare(b.date||'')).map(x=>({label:isoToJalaliShort(x.date),value:+x.overall||0}));
      chartEl.innerHTML=mockExamTrendChart(rows,'روند تراز');
    }
  }
  if(!arr.length){listEl.innerHTML='<div class="empty">هنوز آزمونی ثبت نشده.</div>';return;}
  listEl.innerHTML=arr.map(x=>{
    const curriculum=x.curriculum||state.settings.mockExamCurriculum||'experimental';
    const grade=x.grade||state.settings.mockExamGrade||'10';
    const gradeLabel={"10":"دهم","11":"یازدهم","12":"دوازدهم"}[grade]||grade;
    const curLabel={experimental:"تجربی",mathematics:"ریاضی",humanities:"انسانی"}[curriculum]||curriculum;
    const subjBadges=Object.entries(x.subjects||{}).map(([k,v])=>`<span class="leitner-box-badge">${mockExamSubjectIcon(curriculum,grade,k)} ${esc(mockExamSubjectLabel(curriculum,grade,k))}: ${v}%</span>`).join(' ');
    return `<div class="mistake-card">
      <div class="top"><b>${mockExamSourceIcon(x.source)} ${esc(x.name)||esc(x.source||'آزمون')}</b><span style="font-weight:900;color:var(--accent)">تراز ${fmt(x.overall)}</span></div>
      <div class="muted small">${isoToJalaliLabel(x.date)}${x.rank?` • رتبه ${fmt(x.rank)}`:''} • ${esc(x.source||'')} • پایه ${gradeLabel} ${curLabel}</div>
      ${subjBadges?`<div class="note" style="display:flex;flex-wrap:wrap;gap:5px;margin-top:7px">${subjBadges}</div>`:''}
      <div class="actions" style="margin-top:7px"><button class="btn danger" onclick="deleteMockExam('${x.id}')">🗑 حذف</button></div>
    </div>`;
  }).join('');
}
window.addMockExam=addMockExam;window.deleteMockExam=deleteMockExam;window.renderMockExams=renderMockExams;window.populateMockExamSubjects=populateMockExamSubjects;
ensureMockExams();

/* ===================== RENDER MAIN ===================== */
function ensureDailyRegen(){
  const d=today();
  if(state.lastRegenDate===d)return;
  const first=!state.lastRegenDate;
  state.energy=100;
  state.hp=first?100:Math.min(100,(+state.hp||0)+25);
  state.lastRegenDate=d;
  save();
}
function render(){
  ensureDailyRegen();
  const pl=levelFromXP(state.playerXP),prev=(pl===1?0:threshold(pl)),next=threshold(pl+1);
  const pct=Math.min(100,Math.max(0,((state.playerXP-prev)/(next-prev))*100));
  const g=id=>document.getElementById(id);
  if(g("playerLevel"))g("playerLevel").textContent=fmt(pl);
  if(g("playerXP"))g("playerXP").textContent=fmt(state.playerXP);
  if(g("gold"))g("gold").textContent=fmt(state.gold);
  if(g("streak"))g("streak").textContent=fmt(state.streak)+" 🔥";
  if(g("hp"))g("hp").textContent=fmt(state.hp)+" ❤️";
  if(g("energy"))g("energy").textContent=fmt(state.energy)+" ⚡";
  if(g("rank"))g("rank").textContent=rankFor(pl);
  if(g("xpText"))g("xpText").textContent=`${fmt(state.playerXP-prev)} / ${fmt(next-prev)} XP`;
  if(g("xpPercent"))g("xpPercent").textContent=Math.round(pct)+"%";
  if(g("playerXPBar"))g("playerXPBar").style.width=pct+"%";
  if(g("todayEpisodes"))g("todayEpisodes").textContent=dayEpisodes().length;
  if(g("todayXP"))g("todayXP").textContent=fmt(dayXP());
  if(g("todayGold"))g("todayGold").textContent=fmt(dayGold());
  if(g("lastQuality"))g("lastQuality").textContent=state.lastQuality;
   const _todayEps=dayEpisodes();
  if(g("todayMinutes"))g("todayMinutes").textContent=fmt(_todayEps.reduce((a,e)=>a+(+e.minutes||0),0));
if(g("todayTests"))g("todayTests").textContent=fmt(_todayEps.reduce((a,e)=>a+(+e.tests||0),0));
  if(g("campaignConcoursWeight"))g("campaignConcoursWeight").textContent=(state.settings.concoursWeight??65)+"%";
  if(g("campaignFinalWeight"))g("campaignFinalWeight").textContent=(state.settings.finalWeight??35)+"%";
  const dp=Math.min(100,dayEpisodes().length/(state.settings.targetEpisodes||1)*100);
  if(g("dayProgressText"))g("dayProgressText").textContent=`${dayEpisodes().length} / ${state.settings.targetEpisodes}`;
  if(g("dayProgressBar"))g("dayProgressBar").style.width=dp+"%";
  const weakCur=state.settings.weakCurriculum||state.settings.selectedCurriculum||"experimental";
  const weakGr=state.settings.weakGrade||"10";
  const weakKeys=curriculumSubjectKeys(weakCur).filter(k=>subjectMatchesGrade(k,weakGr,weakCur));
  const manualWeak=state.settings.manualWeakSubject;
  let weakest=null;
  if(manualWeak && weakKeys.includes(manualWeak)){
    weakest=[manualWeak,state.subjects[manualWeak]];
  } else {
    const candidates=weakKeys.map(k=>[k,state.subjects[k]]).filter(x=>x[1]);
    if(candidates.length){
      weakest=candidates.sort((a,b)=>(a[1].knowledge||0)-(b[1].knowledge||0))[0];
    }
  }
  if(g("weakSubject"))g("weakSubject").textContent=weakest?subjectDisplayName(weakest[0],weakCur):"—";
  let rc=0;Object.values(state.subjects).forEach(s=>Object.values(s.topics||{}).forEach(t=>{if(t.retention<45)rc++}));
  if(g("retentionCount"))g("retentionCount").textContent=rc;
  renderMiniSubjects();renderGlobalStats();renderProgressChart();populateStudyTimerSubjects();renderSmartTools();renderEpisodes();
  if(isPageActive("quests"))renderQuests();
  if(isPageActive("boss"))renderBosses();
  if(isPageActive("shop"))renderShop();
  renderAchievements();
  if(isPageActive("leitner"))renderLeitner();
  if(isPageActive("classes"))renderClasses();
  if(isPageActive("checklist"))renderChecklist();
  if(isPageActive("tasks"))renderTasks();
  if(isPageActive("routines"))renderRoutines();
  renderExamCountdown();renderBackupReminder();updateLastBackupInfo();
  if(isPageActive("mistakes"))renderMistakes();
}

function setDashboardCurriculum(key){
  state.settings.selectedCurriculum=key||"";save();
  renderMiniSubjects();renderChecklist();populateRoutineSubjectSelect();
  const ec=document.getElementById("episodeCurriculum");if(ec)ec.value=key||"";
  if(key)populateEpisodeSubjects(key);
}
window.setDashboardGrade=function(g){
  state.settings.dashboardGrade=String(g||"10");save();renderMiniSubjects();
};
window.setWeakCurriculum=function(c){
  state.settings.weakCurriculum=c||"";save();populateWeakSubjectSelect();render();
};
window.setWeakGrade=function(g){
  state.settings.weakGrade=String(g||"10");save();populateWeakSubjectSelect();render();
};
window.setStatusCurriculum=function(c){
  state.settings.selectedCurriculum=c||"";save();
  const dc=document.getElementById("dashboardCurriculum");if(dc)dc.value=c||"";
  const cc=document.getElementById("checklistCurriculum");if(cc)cc.value=c||"";
  if(window.renderSkillHub)renderSkillHub();
  renderMiniSubjects();renderChecklist();render();
  populateWeakSubjectSelect();
};
window.setStatusGrade=function(g){
  state.settings.statusGrade=String(g||"10");save();
  if(window.renderSkillHub)renderSkillHub();
};
function subjectMatchesGrade(subjKey, grade, curriculum){
  if(!grade || grade==="all") return true;
  if(grade==="عمومی") return true;
  const gn=+grade;
  if(isNaN(gn)) return true;
  const tpl=CHECKLIST_TEMPLATES[subjKey];
  if(!tpl) return true;
  const curMajor=curriculum || state.settings.selectedCurriculum || "experimental";
  let hasAll=false, hasTarget=false;
  tpl.sections.forEach(sec=>{
    if(sec.major&&sec.major!==curMajor) return;
    const m=sec.id.match(/^[a-z]*(\d+)/);
    if(m){ if(+m[1]===gn) hasTarget=true; }
    else if(sec.id==="all"){ hasAll=true; }
  });
  if(hasAll) return true;
  if(gn===12 && isSpecialtySubject(subjKey)) return true;
  return hasTarget;
}
function renderMiniSubjects(){
  const el=document.getElementById("subjectMini");if(!el)return;
  const picker=document.getElementById("dashboardCurriculum");
  const gradeSel=document.getElementById("dashboardGrade");
  const key=state.settings.selectedCurriculum||"";
  const gr=state.settings.dashboardGrade||"10";
  if(picker)picker.value=key;
  if(gradeSel)gradeSel.value=gr;
  if(!key){el.innerHTML='<div class="empty">رشته تحصیلی را انتخاب کن تا وضعیت دروس نمایش داده شود.</div>';return}
  // همان فیلتر لیست دروس صفحه «پارت مطالعه» (populateEpisodeSubjects) تا دو لیست همیشه یکی باشند.
  const visible=curriculumSubjectKeys(key).filter(k=>CHECKLIST_TEMPLATES[k]&&subjectMatchesGrade(k,gr,key));
  if(!visible.length){el.innerHTML='<div class="empty">درسی برای این پایه یافت نشد.</div>';return}
  el.innerHTML=visible.map(k=>{
    const v=SUBJECTS[k],s=state.subjects[k];
    const displayName=subjectDisplayName(k,key);
    return `<div class="subject"><div class="subject-top"><b>${v.icon} ${displayName}</b><span class="pill">Lv ${s.level}</span></div>
      <div class="xpmeta"><span>XP ${fmt(s.xp)}</span><span>${Math.round(s.knowledge)} Know</span></div>
      <div class="progress"><div class="bar" style="width:${Math.min(100,s.knowledge)}%"></div></div></div>`;
  }).join("");
}
function renderGlobalStats(){
  const vals={discipline:calcDiscipline(),knowledge:avg("knowledge"),accuracy:avg("accuracy"),speed:avg("speed"),retention:avg("retention"),consistency:avg("consistency")};
  const names={discipline:"Discipline",knowledge:"Knowledge",accuracy:"Accuracy",speed:"Speed",retention:"Retention",consistency:"Consistency"};
  const el=document.getElementById("globalStats");if(!el)return;
  el.innerHTML=Object.entries(vals).map(([k,v])=>`<div style="margin:8px 0"><div class="xpmeta"><span>${names[k]}</span><b>${Math.round(v)}</b></div><div class="progress"><div class="bar" style="width:${Math.min(100,v)}%"></div></div></div>`).join("");
}
/* ===================== PROGRESS TREND CHART ===================== */
let progressChartRange=14,progressChartMetric="xp";
const PROGRESS_METRIC_META={
  xp:{label:"XP روزانه",color:"var(--accent)",format:v=>fmt(v)+" XP"},
  minutes:{label:"دقیقه مطالعه روزانه",color:"var(--accent2)",format:v=>fmt(v)+" دقیقه"},
  accuracy:{label:"دقت آزمون روزانه",color:"var(--good)",format:v=>fmt(Math.round(v))+"٪"}
};
function progressChartDailyData(days){
  const out=[];
  for(let i=days-1;i>=0;i--){
    const d=new Date(Date.now()-i*86400000);
    const key=d.toISOString().slice(0,10);
    const dayEps=state.episodes.filter(e=>e.date===key);
    const xp=dayEps.reduce((a,e)=>a+(+e.xp||0),0);
    const minutes=dayEps.reduce((a,e)=>a+(+e.minutes||0),0);
    const tested=dayEps.filter(e=>+e.tests>0);
    const accuracy=tested.length?tested.reduce((a,e)=>a+((+e.correct||0)/(+e.tests||1)*100),0)/tested.length:null;
    out.push({d,key,xp,minutes,accuracy});
  }
  return out;
}
function setProgressChartRange(days){
  progressChartRange=days;
  document.querySelectorAll(".progress-range-btn").forEach(b=>b.classList.toggle("active",+b.dataset.range===days));
  renderProgressChart();
}
function setProgressChartMetric(metric){
  progressChartMetric=metric;
  document.querySelectorAll(".progress-metric-btn").forEach(b=>b.classList.toggle("active",b.dataset.metric===metric));
  renderProgressChart();
}
function renderProgressChart(){
  const el=document.getElementById("progressChart");if(!el)return;
  const data=progressChartDailyData(progressChartRange);
  const meta=PROGRESS_METRIC_META[progressChartMetric];
  const values=data.map(x=>x[progressChartMetric]).filter(v=>v!==null&&v!==undefined);
  const max=Math.max(1,...(progressChartMetric==="accuracy"?[100]:values));
  const activeDays=data.filter(x=>x.xp>0||x.minutes>0).length;
  const avgVal=values.length?values.reduce((a,b)=>a+b,0)/values.length:0;
  const prevData=progressChartDailyData(progressChartRange*2).slice(0,progressChartRange);
  const prevVals=prevData.map(x=>x[progressChartMetric]).filter(v=>v!==null&&v!==undefined);
  const prevAvg=prevVals.length?prevVals.reduce((a,b)=>a+b,0)/prevVals.length:0;
  const diffPct=prevAvg>0?Math.round((avgVal-prevAvg)/prevAvg*100):(avgVal>0?100:0);
  const trendIcon=diffPct>0?"📈":diffPct<0?"📉":"➖";
  const trendClass=diffPct>0?"good":diffPct<0?"bad":"muted";
  const todayKey=new Date().toISOString().slice(0,10);
  if(!data.length||!activeDays){
    el.innerHTML=`<div class="empty">هنوز داده‌ای برای این بازه ثبت نشده. یک پارت مطالعه ثبت کن تا روند نمایش داده شود.</div>`;
    return;
  }
  el.innerHTML=`
    <div class="progress-chart-summary">
      <div class="stat"><small class="label">میانگین ${esc(meta.label)}</small><b>${meta.format(avgVal)}</b></div>
      <div class="stat"><small class="label">نسبت به ${fmt(progressChartRange)} روز قبل</small><b class="${trendClass}">${trendIcon} ${diffPct>0?"+":""}${fmt(diffPct)}٪</b></div>
      <div class="stat"><small class="label">روزهای فعال</small><b>${fmt(activeDays)}/${fmt(data.length)}</b></div>
    </div>
    <div class="progress-chart-bars">
      ${data.map(x=>{
        const v=x[progressChartMetric];
        const hasData=v!==null&&v!==undefined;
        const h=hasData?Math.max(v>0?4:0,Math.round(v/max*100)):0;
        const isToday=x.key===todayKey;
        const tip=`${x.d.toLocaleDateString("fa-IR",{month:"short",day:"numeric"})} • ${hasData?meta.format(v):"بدون داده"}`;
        return `<div class="progress-bar-col" title="${esc(tip)}">
          <div class="progress-bar-track"><div class="progress-bar-fill${isToday?" is-today":""}${hasData?"":" no-data"}" style="height:${h}%;background:${meta.color}"></div></div>
          <span class="progress-bar-label${isToday?" is-today":""}">${routineDayShort(x.d)}</span>
        </div>`;
      }).join("")}
    </div>`;
}
function calcDiscipline(){return Math.min(100,state.episodes.length*1.5+state.streak*2)}
function comboMultiplier(){return 1+Math.min(state.combo,5)*.05}
function diminishing(subject,type){
  const recent=state.episodes.filter(e=>e.date===today()&&e.subject===subject&&e.type===type).length;
  return recent===0?1:recent===1?.9:recent===2?.75:recent===3?.6:.4;
}
function qualityName(q){return {poor:"ضعیف",normal:"عادی",good:"خوب",excellent:"عالی",exceptional:"فوق العاده"}[q]||q}

/* ===================== EPISODES ===================== */
function addEpisode(){
  const subject=document.getElementById("epSubject").value,type=document.getElementById("epType").value;
  if(!subject){showToast("ابتدا رشته و درس را انتخاب کن.");return}
  const tests=+document.getElementById("epTests").value||0,correct=+document.getElementById("epCorrect").value||0;
  const wrong=+document.getElementById("epWrong").value||0,blank=+document.getElementById("epBlank").value||0;
const marked=+document.getElementById("epMarked").value||0;
  const q=document.getElementById("epQuality").value,d=document.getElementById("epDifficulty").value;
  const analysis=document.getElementById("epAnalysis").value==="yes";
  let completion=1;
  const minutes=+document.getElementById("epMinutes").value||50;
  const targetMinutes=+state.settings.studyMinutes||50,ratio=minutes/targetMinutes;
  if(ratio<.5)completion=.3;else if(ratio<.8)completion=.6;else if(ratio<.96)completion=.85;
  const oldLevel=levelFromXP(state.playerXP);
  if(q==="poor")state.combo=0;else state.combo=Math.min(6,state.combo+1);
  updateStreak();
  let {xp,gold}=calculateStudyRewards({type,quality:q,difficulty:d,minutes,tests,analysis,completion,subject});
  const beforeTodayXP=dayXP(),cap=+state.settings.dailyXPSoftCap||500;
  if(beforeTodayXP>=cap)xp=Math.round(xp*.5);
  else if(beforeTodayXP+xp>cap)xp=Math.round((cap-beforeTodayXP)+(xp-(cap-beforeTodayXP))*.75);
  const accuracy=tests?Math.max(0,correct/tests*100):0;
  const e={id:crypto.randomUUID(),date:today(),
    time:new Date().toLocaleTimeString("fa-IR",{hour:"2-digit",minute:"2-digit"}),
    subject,grade:document.getElementById("epGrade").value,
    topic:document.getElementById("epTopic").value||"بدون موضوع",
    type,minutes,tests,correct,wrong,blank,marked,analysis,quality:q,difficulty:d,xp,gold,combo:state.combo};
  state.episodes.unshift(e);
  state.playerXP+=xp;state.gold+=gold;state.lastQuality=qualityName(q);
  const s=state.subjects[subject];s.xp+=xp;s.level=levelFromXP(s.xp);s.episodes++;
  s.tests+=tests;s.correct+=correct;s.wrong+=wrong;s.blank+=blank;
  if(marked>0) s.marked = (s.marked||0) + marked;
  const k=q==="poor"?-.5:q==="exceptional"?2:q==="excellent"?1.5:q==="good"?1:.5;
  s.knowledge=Math.max(0,Math.min(100,s.knowledge+k+(type==="learn"?2:type==="review"?1:0)));
  if(tests)s.accuracy=Math.max(0,Math.min(100,s.accuracy*.7+accuracy*.3));
  if(type==="timed")s.speed=Math.min(100,s.speed+2);
  if(type==="review")s.retention=Math.min(100,s.retention+4);
  s.consistency=Math.min(100,s.consistency+.8);
  if(e.topic){s.topics[e.topic]||={retention:50,last:today(),seen:0};s.topics[e.topic].seen++;s.topics[e.topic].last=today();s.topics[e.topic].retention=Math.min(100,s.topics[e.topic].retention+15)}
  state.energy=Math.max(0,state.energy-Math.max(2,Math.round(minutes/6)));
  state.hp=Math.max(1,state.hp-(q==="poor"?2:0));
  const newLevel=levelFromXP(state.playerXP);
  save();render();
  showToast(`+${fmt(xp)} XP • +${fmt(gold)} سکه مطالعه`);
  if(newLevel>oldLevel)setTimeout(()=>showToast(`🎉 تبریک! به سطح ${fmt(newLevel)} رسیدی!`),500);
}
const _mEl=document.getElementById("epMarked");if(_mEl)_mEl.value="0";
function updateStreak(){
  const d=today();if(state.lastDate===d)return;
  const y=new Date(Date.now()-86400000).toISOString().slice(0,10);
  if(state.lastDate===y)state.streak++;else state.streak=1;
  state.lastDate=d;
}
function renderEpisodes(){
  const el=document.getElementById("episodeList");if(!el)return;
  const arr=state.episodes.slice(0,40);
  if(!arr.length){el.innerHTML='<div class="empty">هنوز پارت مطالعه‌ای ثبت نشده.</div>';return}
  el.innerHTML=arr.map(e=>{
    const v=SUBJECTS[e.subject]||{icon:"📘",name:e.subject};
    return `<div class="episode ${e.quality==="poor"?"":"done"}">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
        <b>${v.icon} ${v.name} — ${esc(e.topic)}</b>
        <span class="tag">${TYPES[e.type]?.name||e.type}</span>
      </div>
      <div class="muted small">${e.date} • ${e.time} • ${e.minutes} دقیقه • ${e.tests} تست • ${e.correct}/${e.tests||0} درست${e.marked?` • ✏️ ${e.marked} علامت‌دار`:""}</div>
      <div style="display:flex;justify-content:space-between;margin-top:7px">
        <span class="good">+${fmt(e.xp)} XP</span>
        <span class="warn">+${e.gold} سکه</span>
        <span>کیفیت: ${qualityName(e.quality)}</span>
      </div></div>`;
  }).join("");
}

/* ===================== CHECKLIST ===================== */
function getChecklistState(subjectKey){
  if(!state.checklists) state.checklists = {};
  if(!state.checklists[subjectKey]) state.checklists[subjectKey] = {};
  return state.checklists[subjectKey];
}
function getCellState(subjectKey, sectionId, rowId, colIdx){
  const s = getChecklistState(subjectKey);
  return s[`${sectionId}__${rowId}__${colIdx}`] ?? 0;
}
function setCellState(subjectKey, sectionId, rowId, colIdx, value){
  const s = getChecklistState(subjectKey);
  s[`${sectionId}__${rowId}__${colIdx}`] = value;
  save();
}
let currentChecklistSubject = null;
let currentChecklistGrade = "10";

function getPersianCellMeta(sectionId, rowId, colIdx){
  const tpl=CHECKLIST_TEMPLATES.persian;
  if(!tpl) return {mode:"normal"};
  const colName=tpl.cols[colIdx];

  /* ===== ستایش و نیایش ===== */
  const sn=rowId.match(/_(setayesh|nyayesh)_t(\d+)$/);
  if(sn){
    const ti=+sn[2];

    /* آرایه، دستور و معانی در ستایش/نیایش: تمام ستون‌ها غیرفعال. */
    if(ti===2 || ti===3 || ti===4) return {mode:"empty"};

    /* فقط این ستون‌ها برای لغت، املا، مفاهیم و درک مطالب، تاریخ ادبیات فعال‌اند. */
    const enabledSNCols = new Set([
      "آموزش","سوالات نهایی","کتاب تشریحی ۱","منبع تشریحی ۲",
      "سوال علامت‌دار","آزمون مبحثی","آزمون جامع","میزان تسلط",
      "مرور ۱","مرور ۲","مرور ۳"
    ]);
    if(!enabledSNCols.has(colName)) return {mode:"empty"};
    return {mode:"normal"};
  }

  /* ===== درس‌های عادی ===== */
  const ln=rowId.match(/_d(\d+)_t(\d+)$/);
  if(!ln) return {mode:"normal"};
  const ti=+ln[2];
  if(ti!==2 && ti!==3 && ti!==4) return {mode:"normal"};
  if(colName==="گنج حکمت" || colName==="شعر خوانی" || colName==="روان خوانی") return {mode:"empty"};
  return {mode:"normal"};
}

function subjectGrades(subjKey){
  const tpl=CHECKLIST_TEMPLATES[subjKey];
  if(!tpl) return [];
  const curMajor=state.settings.selectedCurriculum||"experimental";
  const set=new Set();
  tpl.sections.forEach(sec=>{
    if(sec.major&&sec.major!==curMajor) return;
    const m=sec.id.match(/^[a-z]*(\d+)/);
    if(m) set.add(+m[1]);
  });
  return [...set];
}
function subjectHasAllSection(subjKey){
  const tpl=CHECKLIST_TEMPLATES[subjKey];
  if(!tpl) return false;
  return tpl.sections.some(sec=>sec.id==="all");
}
function isSpecialtySubject(subjKey){
  const c=state.settings.selectedCurriculum||"experimental";
  const g=curriculumGroups[c];
  if(!g) return false;
  return g.concours.includes(subjKey);
}
function getSectionsForGrade(subjKey, grade){
  const tpl=CHECKLIST_TEMPLATES[subjKey];
  if(!tpl) return [];
  const curMajor=state.settings.selectedCurriculum||"experimental";
  let all=tpl.sections.filter(sec=>!sec.major||sec.major===curMajor);
  if(grade==="12r"){
    const map=(CHECKLIST_RETAKE_MAP[curMajor]||{})[subjKey];
    if(!map) return [];
    const wanted=map.grades;
    return all.filter(sec=>{
      const m=sec.id.match(/^[a-z]*(\d+)/);
      if(m) return wanted.includes(+m[1]);
      return false;
    });
  }
  const gn=+grade;
  const isSpecial=isSpecialtySubject(subjKey);
  if(gn===12 && isSpecial){
    if(subjKey==="math"){
      return all.filter(sec=>/^g12/.test(sec.id));
    }
    if(subjKey==="calculus"){
      return all.filter(sec=>sec.id==="g12"||sec.id==="y12");
    }
    return all;
  }
  return all.filter(sec=>{
    const m=sec.id.match(/^[a-z]*(\d+)/);
    if(m) return +m[1]===gn;
    return sec.id==="all";
  });
}

window.switchChecklistSubject = function(key){
  currentChecklistSubject = key;
  renderChecklist();
};
window.resetCurrentChecklist = function(){
  if(!currentChecklistSubject){ showToast("ابتدا یک درس انتخاب کن."); return; }
  const tpl = CHECKLIST_TEMPLATES[currentChecklistSubject];
  if(!tpl) return;
  if(!confirm(`همه تیک‌های چک‌لیست «${tpl.name}» پاک شود؟`)) return;
  state.checklists[currentChecklistSubject] = {};
  save(); renderChecklist();
  showToast("چک‌لیست ریست شد.");
};
window.cycleChecklistCell = function(subjectKey,sectionId,rowId,colIdx){
  if(subjectKey==="persian"){
    const meta=getPersianCellMeta(sectionId,rowId,colIdx);
    if(meta.mode==="empty") return;
  }
  const tpl=CHECKLIST_TEMPLATES[subjectKey];
  const sec=tpl&&(tpl.sections||[]).find(s=>s.id===sectionId);
  const cols=(sec&&sec.cols)||(tpl&&tpl.cols)||[];
  const colName=cols[colIdx]||"";
  const cur=getCellState(subjectKey,sectionId,rowId,colIdx);
  let next;
  if(colName==="میزان تسلط"){ next=(cur>=4)?0:cur+1; }
  else{ next=(cur+1)%3; }
  setCellState(subjectKey,sectionId,rowId,colIdx,next);
  renderChecklist();
};
function computeSubjectProgress(subjectKey, sections){
  const tpl=CHECKLIST_TEMPLATES[subjectKey];
  if(!tpl) return {done:0,total:0,pct:0};
  const secs=sections||tpl.sections;
  let total=0,done=0,partial=0;
  secs.forEach(sec=>{
    const cols=(sec.cols||tpl.cols);
    sec.rows.forEach(row=>{
      cols.forEach((colName,i)=>{
        if(colName==="میزان تسلط") return;
        total++;
        const v=getCellState(subjectKey,sec.id,row.id,i);
        if(v===2) done++;
        else if(v===1) partial+=0.5;
      });
    });
  });
  const eff=done+partial;
  return {done,total,pct:total?Math.round(eff/total*100):0};
}
function renderExamCountdown(){
  const body=document.getElementById('examCountdownBody');if(!body)return;
  const examDateStr=state.settings.examDate;
  if(!examDateStr){
    body.innerHTML='<p class="muted" style="margin:6px 0">تاریخ کنکور را در تنظیمات مشخص کن تا روزشمار را ببینی.</p><button class="btn" onclick="switchToPage(\'settings\')">⚙️ رفتن به تنظیمات</button>';
    return;
  }
  const now=new Date();now.setHours(0,0,0,0);
  const exam=new Date(examDateStr+'T00:00:00');
  const daysLeft=Math.round((exam-now)/86400000);
  let dateLabel=examDateStr;
  try{dateLabel=exam.toLocaleDateString('fa-IR');}catch(e){}
  body.innerHTML=`
    <div style="text-align:center;margin:8px 0 4px">
      <div style="font-size:2.2rem;font-weight:900;color:var(--accent)">${daysLeft>=0?fmt(daysLeft):0}</div>
      <div class="muted small">روز تا کنکور</div>
      <div class="muted small" style="margin-top:5px">${dateLabel}</div>
    </div>`;
}
window.renderExamCountdown=renderExamCountdown;
function getSubjectsForChecklist(){
  const c=state.settings.selectedCurriculum;
  if(!c) return [];
  if(currentChecklistGrade==="12r"){
    const map=CHECKLIST_RETAKE_MAP[c]||{};
    return Object.keys(map).filter(k=>CHECKLIST_TEMPLATES[k]);
  }
  const keys=curriculumSubjectKeys(c);
  const gn=+currentChecklistGrade;
  return keys.filter(k=>{
    if(!CHECKLIST_TEMPLATES[k]) return false;
    if(k==="geology" && gn!==11) return false;
    const grades=subjectGrades(k);
    const hasAll=subjectHasAllSection(k);
    if(grades.length===0 && !hasAll) return false;
    if(gn===12 && isSpecialtySubject(k)) return true;
    return grades.includes(gn) || hasAll;
  });
}
window.setChecklistCurriculum=function(c){
  state.settings.selectedCurriculum=c||"";
  state.settings.weakCurriculum=c||"";
  save();
  currentChecklistSubject=null;
  populateWeakSubjectSelect();
  renderChecklist();
  renderMiniSubjects();
  if(window.renderSkillHub)renderSkillHub();
  const dc=document.getElementById("dashboardCurriculum");if(dc)dc.value=c||"";
  const ec=document.getElementById("episodeCurriculum");if(ec)ec.value=c||"";
  if(c) populateEpisodeSubjects(c);
};
window.setChecklistGrade=function(g){
  currentChecklistGrade=String(g||"10");
  state.settings.checklistGrade=currentChecklistGrade;
  save();
  currentChecklistSubject=null;
  renderChecklist();
};
window.renderChecklist=function(){
  const tabsEl=document.getElementById("checklistTabs");
  const contentEl=document.getElementById("checklistContent");
  const curSel=document.getElementById("checklistCurriculum");
  const gradeSel=document.getElementById("checklistGrade");
  if(!tabsEl||!contentEl) return;
  const curKey=state.settings.selectedCurriculum||"";
  if(curSel&&curSel.value!==curKey) curSel.value=curKey;
  if(gradeSel&&gradeSel.value!==currentChecklistGrade) gradeSel.value=currentChecklistGrade;
  if(!curKey){
    tabsEl.innerHTML="";
    contentEl.innerHTML=`<div class="checklist-empty-filter">
      <div class="icon">🎓</div><b>ابتدا رشته تحصیلی را انتخاب کن</b>
      <span class="muted">بعد از انتخاب رشته، دروس مربوطه نمایش داده می‌شوند.</span></div>`;
    return;
  }
  const subjects=getSubjectsForChecklist();
  if(!subjects.length){
    tabsEl.innerHTML="";
    const gradeName={"10":"دهم","11":"یازدهم","12":"دوازدهم","12r":"ترمیم یازدهم"}[currentChecklistGrade];
    contentEl.innerHTML=`<div class="checklist-empty-filter">
      <div class="icon">📭</div><b>هیچ چک‌لیستی برای پایه ${gradeName} این رشته موجود نیست</b>
      <span class="muted">پایه یا رشته دیگری را انتخاب کن.</span></div>`;
    return;
  }
  const orderedKeys=curriculumSubjectKeys(curKey);
  subjects.sort((a,b)=>{
    const ia=orderedKeys.indexOf(a),ib=orderedKeys.indexOf(b);
    if(ia===-1&&ib===-1) return a.localeCompare(b);
    if(ia===-1) return 1;
    if(ib===-1) return -1;
    return ia-ib;
  });
  if(!currentChecklistSubject||!subjects.includes(currentChecklistSubject)){
    currentChecklistSubject=subjects[0];
  }
  tabsEl.innerHTML=subjects.map(k=>{
    const tpl=CHECKLIST_TEMPLATES[k];
    const secs=getSectionsForGrade(k,currentChecklistGrade);
    const prg=computeSubjectProgress(k,secs);
    const active=k===currentChecklistSubject?"active":"";
    return `<button class="checklist-tab ${active}" onclick="switchChecklistSubject('${k}')">
      <span>${tpl.icon} ${esc(tpl.name)}</span>
      <span class="cl-progress">${prg.pct}%</span></button>`;
  }).join("");
  const tpl=CHECKLIST_TEMPLATES[currentChecklistSubject];
  const subjKey=currentChecklistSubject;
  const visibleSections=getSectionsForGrade(subjKey,currentChecklistGrade);
  if(!visibleSections.length){
    contentEl.innerHTML=`<div class="checklist-empty-filter">
      <div class="icon">🔍</div><b>این درس برای پایه انتخاب‌شده سکشنی ندارد</b></div>`;
    return;
  }
  const isRetake=(currentChecklistGrade==="12r");
  const is12Special=(!isRetake&&+currentChecklistGrade===12&&isSpecialtySubject(subjKey));
  const fallbackCols = isRetake ? CHECKLIST_GENERAL_COLS : tpl.cols;
  const fallbackGroups = isRetake ? null : tpl.groups;
  let gradeBadge;
  if(isRetake){
    gradeBadge=`<span class="field-badge" style="background:rgba(255,107,129,.16);color:var(--bad)">🔁 ترمیم یازدهم</span>`;
  }else if(is12Special){
    gradeBadge=`<span class="field-badge" style="background:rgba(155,140,255,.14);color:var(--accent2)">🔄 همه پایه‌ها (کنکور)</span>`;
  }else{
    gradeBadge=`<span class="field-badge">پایه ${({"10":"دهم","11":"یازدهم","12":"دوازدهم","12r":"ترمیم"})[currentChecklistGrade]}</span>`;
  }
  let html=`<div class="checklist-subject-head">
    <div>${tpl.icon} ${esc(tpl.name)}</div>
    <div>${gradeBadge}</div>
  </div>`;
  visibleSections.forEach(sec=>{
    const colsToUse = sec.cols || fallbackCols;
    const groupsToUse = sec.groups !== undefined ? sec.groups : fallbackGroups;
    let secDone=0,secTotal=0;
    sec.rows.forEach(row=>{
      colsToUse.forEach((colName,i)=>{
        if(colName==="میزان تسلط") return;
        secTotal++;
        const v=getCellState(subjKey,sec.id,row.id,i);
        if(v===2) secDone++;
        else if(v===1) secDone+=0.5;
      });
    });
    const secPct=secTotal?Math.round(secDone/secTotal*100):0;
    const hasGroups=groupsToUse&&groupsToUse.length;
    const totalSpan=hasGroups?groupsToUse.reduce((a,g)=>a+(+g.span||0),0):0;
    const useGrouped=hasGroups&&totalSpan===colsToUse.length;
    const colHeaderCells=colsToUse.map(c=>{
      const cls=c==="میزان تسلط"?"col-mastery":"col-check";
      return `<th class="${cls}">${esc(c)}</th>`;
    }).join("");
    let headerHtml;
    if(useGrouped){
      headerHtml=`
        <tr class="group-row">
          <th class="col-title" rowspan="2">عنوان</th>
          ${groupsToUse.map(g=>`<th colspan="${g.span}">${esc(g.label)}</th>`).join("")}
          <th class="col-progress" rowspan="2">پیشرفت</th>
        </tr>
        <tr class="cols-row">${colHeaderCells}</tr>`;
    }else{
      headerHtml=`
        <tr class="cols-row flat-header">
          <th class="col-title">عنوان</th>
          ${colHeaderCells}
          <th class="col-progress">پیشرفت</th>
        </tr>`;
    }
    const bodyRows=sec.rows.map(row=>{
      let rowDone=0,rowTotal=0;
      colsToUse.forEach((colName,i)=>{
        if(colName==="میزان تسلط") return;
        rowTotal++;
        const v=getCellState(subjKey,sec.id,row.id,i);
        if(v===2) rowDone++;
        else if(v===1) rowDone+=0.5;
      });
      const rowPct=rowTotal?Math.round(rowDone/rowTotal*100):0;
      const pColor=rowPct>=80?"var(--good)":rowPct>=40?"var(--warn)":"var(--muted)";
      const cells=colsToUse.map((colName,i)=>{
        const v=getCellState(subjKey,sec.id,row.id,i);
        if(colName==="میزان تسلط"){
          const labels=["","A","B","C","D"];
          if(subjKey==="persian"){
            const meta=getPersianCellMeta(sec.id,row.id,i);
            if(meta.mode==="mastery-empty"){
              return `<td class="col-mastery"><span class="checklist-cell mastery disabled" aria-disabled="true"></span></td>`;
            }
          }
          const cls=["","mastery-A","mastery-B","mastery-C","mastery-D"][v]||"";
          return `<td class="col-mastery"><span class="checklist-cell mastery ${cls}" onclick="cycleChecklistCell('${subjKey}','${sec.id}','${row.id}',${i})">${labels[v]||""}</span></td>`;
        }
        if(subjKey==="persian"){
          const meta=getPersianCellMeta(sec.id,row.id,i);
          if(meta.mode==="empty"){
            return `<td class="col-check"><span class="checklist-cell disabled"></span></td>`;
          }
        }
        const cls=v===2?"done":v===1?"partial":"";
        return `<td class="col-check"><span class="checklist-cell ${cls}" onclick="cycleChecklistCell('${subjKey}','${sec.id}','${row.id}',${i})"></span></td>`;
      }).join("");
      return `<tr>
        <td class="col-title">${esc(row.label)}</td>
        ${cells}
        <td class="col-progress"><span class="checklist-row-progress" style="color:${pColor}">${rowPct}%</span></td>
      </tr>`;
    }).join("");
    html+=`<div class="checklist-section">
      <div class="checklist-section-title">
        <span>${esc(sec.label)}</span>
        <span style="font-size:.8rem;color:var(--muted)">${secPct}% • ${sec.rows.length} ردیف</span>
      </div>
      <div class="checklist-table-wrap">
        <table class="checklist-table">
          <thead>${headerHtml}</thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
    </div>`;
  });
  contentEl.innerHTML=html;
};

/* ===================== CHECKLIST PRINT ===================== */
window.printCurrentChecklist=function(){
  const tpl=CHECKLIST_TEMPLATES[currentChecklistSubject];
  const content=document.getElementById("checklistContent");
  if(!tpl||!content){window.print();return;}
  const originalGrade=currentChecklistGrade;
  const originalSubject=currentChecklistSubject;
  const grades=["10","11","12"];
  const pages=[];
  const subjectName=tpl.name;

  grades.forEach(gr=>{
    currentChecklistGrade=gr;
    /* اگر خودِ درس در این پایه وجود ندارد، آن پایه چاپ نشود. */
    const available=getSubjectsForChecklist();
    if(!available.includes(originalSubject)) return;
    currentChecklistSubject=originalSubject;
    renderChecklist();
    const html=document.getElementById("checklistContent")?.innerHTML||"";
    if(html && !html.includes("هیچ چک‌لیستی") && !html.includes("سکشنی ندارد")){
      pages.push(`<section class="print-grade-page"><div class="print-grade-title">${esc(subjectName)} — پایه ${({"10":"دهم","11":"یازدهم","12":"دوازدهم"})[gr]}</div>${html}</section>`);
    }
  });

  currentChecklistGrade=originalGrade;
  currentChecklistSubject=originalSubject;
  renderChecklist();

  if(!pages.length){showToast("برای چاپ، چک‌لیست قابل نمایش پیدا نشد.");return;}
  const old=document.getElementById("checklistPrintRoot"); if(old) old.remove();
  const root=document.createElement("div");
  root.id="checklistPrintRoot";
  root.innerHTML=pages.join("");
  document.body.appendChild(root);
  setTimeout(()=>{
    window.print();
    setTimeout(()=>root.remove(),300);
  },60);
};

/* ===================== CLASSES ===================== */
let editingClassId=null;
function clearClassForm(){editingClassId=null;["classTitle","classTeacher","classNote"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=""});const t=document.getElementById("classTime");if(t)t.value="08:00";const et=document.getElementById("classEndTime");if(et)et.value="09:30";const b=document.getElementById("classSaveBtn");if(b)b.textContent="➕ افزودن";}
window.addClass=function(){
  const title=document.getElementById("classTitle").value.trim();
  const day=document.getElementById("classDay").value;
  const time=document.getElementById("classTime").value||"";
  const endTime=document.getElementById("classEndTime").value||"";
  const type=document.getElementById("classType").value;
  const teacher=document.getElementById("classTeacher").value.trim();
  const note=document.getElementById("classNote").value.trim();
  if(!title){showToast("عنوان را وارد کن.");return}
  if(editingClassId){
    const c=(state.classes||[]).find(x=>x.id===editingClassId);
    if(c)Object.assign(c,{title,day,time,endTime,type,teacher,note});
    save();renderClasses();clearClassForm();showToast("برنامه ویرایش شد.");return;
  }
  state.classes.push({id:"cls_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),title,day,time,endTime,type,teacher,note,createdAt:new Date().toISOString()});
  save();renderClasses();clearClassForm();
  showToast("برنامه اضافه شد.");
};
window.editClass=function(id){
  const c=(state.classes||[]).find(x=>x.id===id);if(!c)return;editingClassId=id;
  document.getElementById("classTitle").value=c.title||"";document.getElementById("classDay").value=c.day||"شنبه";
  document.getElementById("classTime").value=c.time||"08:00";document.getElementById("classEndTime").value=c.endTime||"09:30";
  document.getElementById("classTeacher").value=c.teacher||"";document.getElementById("classType").value=c.type||"school";document.getElementById("classNote").value=c.note||"";
  const b=document.getElementById("classSaveBtn");if(b)b.textContent="💾 ذخیره ویرایش";document.getElementById("classTitle")?.focus();showToast("حالت ویرایش برنامه فعال شد.");
};
window.deleteClass=function(id){
  if(!confirm("این آیتم حذف شود؟"))return;
  state.classes=(state.classes||[]).filter(c=>c.id!==id);
  save();renderClasses();showToast("حذف شد.");
};
window.clearClassForm=clearClassForm;

window.clearClasses=function(){
  if(!(state.classes||[]).length){showToast("لیست خالی است.");return}
  if(!confirm("همه برنامه‌ها حذف شوند؟"))return;
  state.classes=[];save();renderClasses();showToast("همه حذف شدند.");
};
const DAY_ORDER=["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"];
const TYPE_LABEL={school:"🏫 مدرسه",online:"💻 آنلاین",exam:"📝 آزمون",sport:"🏃 ورزش",custom:"🌱 سایر"};
function renderClasses(){
  const wrap=document.getElementById("classesTableWrap");if(!wrap)return;
  const filter=document.getElementById("classesFilter")?.value||"all";
  let arr=(state.classes||[]).slice();
  if(filter!=="all")arr=arr.filter(c=>c.type===filter);
  arr.sort((a,b)=>{
    const da=DAY_ORDER.indexOf(a.day),db=DAY_ORDER.indexOf(b.day);
    if(da!==db)return da-db;
    return (a.time||"").localeCompare(b.time||"");
  });
  if(!arr.length){wrap.innerHTML=`<div class="classes-empty">هنوز آیتمی ثبت نشده.</div>`;return}
  wrap.innerHTML=`<table class="classes-table">
    <thead><tr><th>روز</th><th>ساعت</th><th>عنوان</th><th>استاد</th><th>نوع</th><th>یادداشت</th><th>عملیات</th></tr></thead>
    <tbody>
      ${arr.map(c=>{
        const t=c.type||"school";
        return `<tr>
          <td><span class="classes-day-badge">${esc(c.day)}</span></td>
          <td style="white-space:nowrap;font-variant-numeric:tabular-nums">${esc(c.time||"—")}${c.endTime?" تا "+esc(c.endTime):""}</td>
          <td><b>${esc(c.title)}</b></td>
          <td style="color:var(--muted)">${esc(c.teacher||"—")}</td>
          <td><span class="classes-type-badge type-${t}">${TYPE_LABEL[t]||t}</span></td>
          <td style="color:var(--muted)">${esc(c.note||"—")}</td>
          <td class="classes-actions-cell"><button class="btn" onclick="editClass('${c.id}')">✏️</button><button class="btn danger" onclick="deleteClass('${c.id}')">🗑</button></td>
        </tr>`;
      }).join("")}
    </tbody>
  </table>`;
}

/* ===================== QUESTS ===================== */
const priorityRank={urgent:4,critical:4,high:3,normal:2,low:1};
function renderQuests(){
  const all=state.quests.filter(q=>q.date===today()&&q.manual);
  const filter=document.getElementById("questFilter")?.value||"all";
  const pf=document.getElementById("questPriorityFilter")?.value||"all";
  const active=all.filter(q=>!q.completed&&q.done!==true);
  const done=all.filter(q=>q.completed||q.done===true);
  const high=all.filter(q=>["urgent","critical","high"].includes(q.priority));
  const stats=document.getElementById("questBoardStats");
  if(stats)stats.innerHTML=`
    <div class="quest-stat"><span>کل</span><b>${all.length}</b><small>Quest</small></div>
    <div class="quest-stat active-stat"><span>فعال</span><b>${active.length}</b><small>در انتظار</small></div>
    <div class="quest-stat done-stat"><span>تکمیل</span><b>${done.length}</b><small>امروز</small></div>
    <div class="quest-stat"><span>اولویت بالا</span><b>${high.length}</b><small>مهم/فوری</small></div>`;
  const a=g=>document.getElementById(g);
  if(a("questActiveCount"))a("questActiveCount").textContent=active.length;
  if(a("questDoneCount"))a("questDoneCount").textContent=done.length;
  if(a("questHighCount"))a("questHighCount").textContent=high.length;
  let arr=all.filter(q=>filter==="all"||(filter==="active"?(!q.completed&&q.done!==true):(q.completed||q.done===true)))
    .filter(q=>pf==="all"||q.priority===pf);
  arr.sort((x,y)=>(x.completed?1:0)-(y.completed?1:0)||(priorityRank[y.priority]||2)-(priorityRank[x.priority]||2));
  const el=document.getElementById("questList");if(!el)return;
  if(!arr.length){
    el.innerHTML=`<div class="quest-empty-v7"><div>🗺️</div><b>${all.length?"با این فیلتر Questای پیدا نشد.":"امروز هنوز کوئست دستی نساختی."}</b><span>با دکمه «ساخت کوئست» یک مأموریت جدید بساز.</span></div>`;
    return;
  }
  el.innerHTML=arr.map(q=>{
    const subject=SUBJECTS[q.subject]||{name:q.subject||"عمومی",icon:"🎯"};
    const isDone=q.completed||q.done===true;
    const pr={urgent:"فوری",critical:"بحرانی",high:"مهم",normal:"عادی",low:"کم"}[q.priority]||"عادی";
    const type=TYPES[q.type]?.name||q.type||"مأموریت";
    return `<article class="quest-v7 ${isDone?"is-done":""} priority-${q.priority||"normal"}" data-id="${esc(q.id)}">
      <div class="quest-v7-accent"></div>
      <div class="quest-v7-icon">${subject.icon}</div>
      <div class="quest-v7-body">
        <div class="quest-v7-top">
          <div><div class="quest-v7-title">${esc(q.title||subject.name)}</div>
            <div class="quest-v7-sub">${esc(subject.name)}${q.grade?" • "+esc(q.grade):""}</div></div>
          <span class="quest-status ${isDone?"done":"live"}">${isDone?"✓ تکمیل":"● فعال"}</span>
        </div>
        <div class="quest-v7-tags"><span>${esc(type)}</span><span>${pr}</span><span>دستی</span></div>
        ${q.note?`<div class="quest-v7-note">${esc(q.note)}</div>`:""}
        <div class="quest-v7-progress">
          <div><span>پیشرفت</span><b>${isDone?"100":"0"}%</b></div>
          <div class="progress"><div class="bar" style="width:${isDone?100:0}%"></div></div>
        </div>
      </div>
      <div class="quest-v7-actions">
        <button class="btn ${isDone?"":"primary"}" ${isDone?"disabled":""} onclick="completeQuest('${esc(q.id)}')">${isDone?"✓ انجام شد":"⚔ انجام Quest"}</button>
        <button class="btn danger" onclick="deleteQuest('${esc(q.id)}')">🗑 حذف</button>
      </div>
    </article>`;
  }).join("");
}
window.completeQuest=function(id){
  const q=state.quests.find(x=>String(x.id)===String(id));
  if(!q||q.completed||q.done===true)return;
  q.completed=true;q.done=true;
  state.gold=(+state.gold||0)+5;
  state.energy=Math.max(0,(+state.energy||0)-2);
  save();render();showToast("Quest کامل شد • +5 سکه");
};
window.deleteQuest=function(id){
  const i=state.quests.findIndex(q=>String(q.id)===String(id));
  if(i<0){showToast("Quest پیدا نشد.");return}
  const q=state.quests[i];
  const label=q.title||SUBJECTS[q.subject]?.name||"این Quest";
  if(!confirm(`«${label}» حذف شود؟`))return;
  state.quests.splice(i,1);save();render();showToast("Quest حذف شد.");
};
window.openManualQuestModal=function(){
  const m=document.getElementById("manualQuestModal");if(!m)return;
  populateSelects();
  const key=state.settings.selectedCurriculum;
  const keys=key?curriculumSubjectKeys(key):Object.keys(SUBJECTS);
  const sel=document.getElementById("manualQuestSubject");
  if(sel)sel.innerHTML=keys.map(k=>`<option value="${k}">${SUBJECTS[k].icon} ${SUBJECTS[k].name}</option>`).join("");
  m.classList.add("show");
  setTimeout(()=>document.getElementById("manualQuestTitle")?.focus(),50);
};
window.closeManualQuestModal=function(){
  const m=document.getElementById("manualQuestModal");
  if(m)m.classList.remove("show");
};
window.createManualQuest=function(){
  const title=document.getElementById("manualQuestTitle")?.value.trim();
  if(!title){showToast("عنوان کوئست را وارد کن.");return}
  state.quests.push({
    id:"manual_"+Date.now(),date:today(),title,
    subject:document.getElementById("manualQuestSubject")?.value||"",
    grade:document.getElementById("manualQuestGrade")?.value||"عمومی",
    type:document.getElementById("manualQuestType")?.value||"learn",
    episodes:Math.max(1,+document.getElementById("manualQuestEpisodes")?.value||1),
    priority:document.getElementById("manualQuestPriority")?.value||"normal",
    note:document.getElementById("manualQuestNote")?.value.trim()||"",
    completed:false,done:false,manual:true
  });
  save();closeManualQuestModal();render();showToast("کوئست جدید ساخته شد.");
};

/* ===================== TASKS ===================== */
function getAllTasks(){
  const overrides=state.taskOverrides||{};
  const hidden=Array.isArray(state.hiddenTasks)?state.hiddenTasks:[];
  const defaults=DEFAULT_TASKS.filter(t=>!hidden.includes(t.id))
    .map(t=>overrides[t.id]?Object.assign({},t,overrides[t.id]):t);
  return defaults.concat(state.customTasks||[]);
}
function isTaskDoneToday(taskId){return (state.tasksDone||{})[taskId] === today()}
window.toggleTask=function(taskId){
  const tasks=getAllTasks();
  const t=tasks.find(x=>x.id===taskId);
  if(!t) return;
  if(!state.tasksDone) state.tasksDone={};
  const wasDone=state.tasksDone[taskId]===today();
  if(wasDone){
    delete state.tasksDone[taskId];
    state.playerXP=Math.max(0,(+state.playerXP||0)-(t.xp||0));
    state.gold=Math.max(0,(+state.gold||0)-(t.gold||0));
    showToast(`↺ لغو: ${t.name}`);
  } else {
    state.tasksDone[taskId]=today();
    state.playerXP=(+state.playerXP||0)+(t.xp||0);
    state.gold=(+state.gold||0)+(t.gold||0);
    showToast(`✓ +${t.xp} XP • +${t.gold} سکه`);
  }
  save();render();
};
window.addCustomTask=function(cat){
  const nameEl=document.getElementById(`taskName_${cat}`);
  const xpEl=document.getElementById(`taskXP_${cat}`);
  const goldEl=document.getElementById(`taskGold_${cat}`);
  const name=(nameEl?.value||"").trim();
  if(!name){showToast("اسم تسک را وارد کن.");return}
  const xp=Math.max(1,+xpEl?.value||5);
  const gold=Math.max(0,+goldEl?.value||2);
  if(!Array.isArray(state.customTasks)) state.customTasks=[];
  state.customTasks.push({id:"ct_"+Date.now(),cat,name,xp,gold,icon:"⭐"});
  if(nameEl)nameEl.value="";
  if(xpEl)xpEl.value="5";
  if(goldEl)goldEl.value="2";
  save();render();
  showToast("تسک اضافه شد.");
};
window.deleteCustomTask=function(taskId){
  if(!confirm("این تسک حذف شود؟"))return;
  state.customTasks=(state.customTasks||[]).filter(t=>t.id!==taskId);
  if(state.tasksDone) delete state.tasksDone[taskId];
  save();render();
  showToast("تسک حذف شد.");
};
window.editTask=function(taskId){
  const tasks=getAllTasks();
  const t=tasks.find(x=>x.id===taskId);
  if(!t)return;
  const newName=prompt("نام تسک:",t.name);
  if(newName===null)return;
  const name=newName.trim();
  if(!name){showToast("نام تسک نمی‌تواند خالی باشد.");return}
  const newXpRaw=prompt("امتیاز XP:",String(t.xp));
  if(newXpRaw===null)return;
  const xp=Math.max(1,Math.round(+newXpRaw)||t.xp);
  const newGoldRaw=prompt("سکه:",String(t.gold));
  if(newGoldRaw===null)return;
  const gold=Math.max(0,Math.round(+newGoldRaw)||0);
  if(String(t.id).startsWith("ct_")){
    const ct=(state.customTasks||[]).find(x=>x.id===taskId);
    if(ct){ct.name=name;ct.xp=xp;ct.gold=gold;}
  } else {
    if(!state.taskOverrides||typeof state.taskOverrides!=="object")state.taskOverrides={};
    state.taskOverrides[taskId]={name,xp,gold};
  }
  save();render();
  showToast("تسک ویرایش شد.");
};
window.resetTaskOverride=function(taskId){
  if(!confirm("این تسک به حالت پیش‌فرض برگردد؟"))return;
  if(state.taskOverrides)delete state.taskOverrides[taskId];
  save();render();
  showToast("تسک به حالت پیش‌فرض برگشت.");
};
let editingTaskId=null;
window.openTaskEditModal=function(id){
  const t=getAllTasks().find(x=>x.id===id);if(!t)return;
  editingTaskId=id;
  document.getElementById('taskEditName').value=t.name||'';
  document.getElementById('taskEditXP').value=t.xp||5;
  document.getElementById('taskEditGold').value=t.gold||2;
  document.getElementById('taskEditModal').classList.add('show');
  setTimeout(()=>document.getElementById('taskEditName')?.focus(),50);
};
window.closeTaskEditModal=function(){
  document.getElementById('taskEditModal').classList.remove('show');
  editingTaskId=null;
};
window.saveTaskEdit=function(){
  if(!editingTaskId)return;
  const name=(document.getElementById('taskEditName').value||'').trim();
  if(!name){showToast('نام تسک نمی‌تواند خالی باشد.');return}
  const xp=Math.max(1,Math.round(+document.getElementById('taskEditXP').value||5));
  const gold=Math.max(0,Math.round(+document.getElementById('taskEditGold').value||0));
  if(String(editingTaskId).startsWith('ct_')){
    const ct=(state.customTasks||[]).find(x=>x.id===editingTaskId);
    if(ct){ct.name=name;ct.xp=xp;ct.gold=gold;}
  } else {
    if(!state.taskOverrides||typeof state.taskOverrides!=='object')state.taskOverrides={};
    state.taskOverrides[editingTaskId]={name,xp,gold};
  }
  save();render();closeTaskEditModal();showToast('تسک ویرایش شد.');
};
window.deleteTask=function(id){
  const t=getAllTasks().find(x=>x.id===id);if(!t)return;
  if(!confirm(`تسک «${t.name}» حذف شود؟`))return;
  if(String(id).startsWith('ct_')){
    state.customTasks=(state.customTasks||[]).filter(x=>x.id!==id);
  } else {
    state.hiddenTasks=Array.isArray(state.hiddenTasks)?state.hiddenTasks:[];
    if(!state.hiddenTasks.includes(id))state.hiddenTasks.push(id);
  }
  if(state.tasksDone)delete state.tasksDone[id];
  if(state.taskOverrides)delete state.taskOverrides[id];
  save();render();showToast('تسک حذف شد.');
};
window.deleteTaskFromModal=function(){if(!editingTaskId)return;const id=editingTaskId;closeTaskEditModal();deleteTask(id);};
function renderTasks(){
  const grid=document.getElementById("tasksGrid");
  const summary=document.getElementById("tasksSummary");
  if(!grid) return;
  const all=getAllTasks();
  const doneCount=all.filter(t=>isTaskDoneToday(t.id)).length;
  const totalXP=all.filter(t=>isTaskDoneToday(t.id)).reduce((a,t)=>a+t.xp,0);
  const totalGold=all.filter(t=>isTaskDoneToday(t.id)).reduce((a,t)=>a+t.gold,0);
  if(summary)summary.innerHTML=`
    <div class="ts-item"><b>${doneCount}/${all.length}</b><span>انجام‌شده</span></div>
    <div class="ts-item"><b style="color:var(--accent)">${totalXP}</b><span>XP امروز</span></div>
    <div class="ts-item"><b style="color:var(--warn)">${totalGold}</b><span>سکه امروز</span></div>`;
  grid.innerHTML=Object.entries(TASK_CATS).map(([catId,cat])=>{
    const catTasks=all.filter(t=>t.cat===catId);
    const doneCountCat=catTasks.filter(t=>isTaskDoneToday(t.id)).length;
    const pct=catTasks.length?Math.round(doneCountCat/catTasks.length*100):0;
    return `<div class="task-cat">
      <div class="task-cat-head">
        <h3>${cat.icon} ${cat.name}</h3>
        <span class="task-cat-pct">${doneCountCat}/${catTasks.length} • ${pct}%</span>
      </div>
      <div class="task-list">
        ${catTasks.map(t=>{
          const done=isTaskDoneToday(t.id);
          const isCustom=t.id.startsWith("ct_");
          const isOverridden=!isCustom&&!!(state.taskOverrides||{})[t.id];
          return `<div class="task-item ${done?"done":""}" onclick="toggleTask('${t.id}')">
            <div class="task-check"></div>
            <div class="task-info">
              <span class="task-name"><span class="task-icon">${t.icon||"⭐"}</span>${esc(t.name)}</span>
            <div class="task-reward" onclick="event.stopPropagation()">
  <span class="tr-xp">+${t.xp} XP</span>
  <span class="tr-gold">+${t.gold} 💰</span>
  <div style="display:flex;gap:3px;justify-content:flex-end;margin-top:2px">
    <span class="task-edit" onclick="event.stopPropagation();openTaskEditModal('${t.id}')" title="ویرایش">✏️</span>
    <span class="task-delete" onclick="event.stopPropagation();deleteTask('${t.id}')" title="حذف">🗑</span>
  </div>
</div>
          </div>`;
        }).join("")}
      </div>
      <div class="task-add-row">
        <input class="tn" id="taskName_${catId}" maxlength="60" placeholder="تسک جدید...">
        <input class="tx" id="taskXP_${catId}" type="number" min="1" value="5" title="XP">
        <input class="tg" id="taskGold_${catId}" type="number" min="0" value="2" title="سکه">
        <button class="btn primary" onclick="addCustomTask('${catId}')">➕</button>
      </div>
    </div>`;
  }).join("");
}

/* ===================== SKILL TREE ===================== */
function tierFor(level,knowledge){
  const score=(+level||1)*10+(+knowledge||0)/10;
  if(score>=600)return{name:"Diamond",cls:"tier-diamond",icon:"💎"};
  if(score>=300)return{name:"Platinum",cls:"tier-platinum",icon:"🌟"};
  if(score>=150)return{name:"Gold",cls:"tier-gold",icon:"🥇"};
  if(score>=70)return{name:"Silver",cls:"tier-silver",icon:"🥈"};
  if(score>=20)return{name:"Bronze",cls:"tier-bronze",icon:"🥉"};
  return{name:"Novice",cls:"",icon:"🪨"};
}
const SKILL_CONCOURS_BOOKS={
  experimental:{
    "10":["زیست شناسی ۱","شیمی ۱","فیزیک ۱ تجربی","ریاضی ۱"],
    "11":["زیست شناسی ۲","شیمی ۲","فیزیک ۲ تجربی","ریاضی ۲","زمین شناسی"],
    "12":["زیست شناسی ۱ و ۲ و ۳ (جامع)","شیمی ۱ و ۲ و ۳ (جامع)","فیزیک ۱ و ۲ و ۳ تجربی (جامع)","ریاضی ۱ و ۲ و ۳ (جامع)","زمین شناسی (جامع)"]
  },
  mathematics:{
    "10":["هندسه ۱","شیمی ۱","فیزیک ۱","ریاضی ۱"],
    "11":["هندسه ۲","شیمی ۲","فیزیک ۲","حسابان ۱","آمار و احتمال"],
    "12":["هندسه ۱ و ۲ و ۳ (جامع)","شیمی ۱ و ۲ و ۳ (جامع)","فیزیک ۱ و ۲ و ۳ (جامع)","ریاضی ۱ و حسابان ۱ و ۲ (جامع)","آمار و احتمال","ریاضیات گسسته"]
  },
  humanities:{
    "10":["منطق","جغرافیا ۱","تاریخ ۱","ریاضی و آمار ۱","اقتصاد","علوم و فنون ادبی ۱","جامعه شناسی ۱","عربی تخصصی ۱"],
    "11":["جغرافیا ۲","تاریخ ۲","ریاضی و آمار ۲","علوم و فنون ادبی ۲","فلسفه ۱","جامعه شناسی ۲","عربی تخصصی ۲","روان‌شناسی"],
    "12":["جغرافیا ۱ و ۲ و ۳ (جامع)","تاریخ ۱ و ۲ و ۳ (جامع)","ریاضی و آمار ۱ و ۲ و ۳ (جامع)","اقتصاد","علوم و فنون ادبی ۱ و ۲ و ۳ (جامع)","فلسفه ۱ و ۲ (جامع)","منطق","جامعه شناسی ۱ و ۲ و ۳ (جامع)","روان‌شناسی","عربی ۱ و ۲ و ۳ (جامع)"]
  }
};
const SKILL_BOOK_ICONS={"زیست شناسی":"🧬","شیمی":"⚗️","فیزیک":"⚛️","ریاضی":"🧮","هندسه":"📐","حسابان":"∫","آمار و احتمال":"📊","ریاضیات گسسته":"🔢","زمین شناسی":"🌍","منطق":"🔎","جغرافیا":"🗺️","تاریخ":"🏛️","اقتصاد":"💰","علوم و فنون":"✒️","جامعه شناسی":"👥","فلسفه":"💭","روان":"🧠","عربی":"📝"};
function skillBookIcon(name){const k=Object.keys(SKILL_BOOK_ICONS).find(x=>name.startsWith(x)||name.includes(x));return SKILL_BOOK_ICONS[k]||'📘'}
function skillBookState(id){state.skillBooks=state.skillBooks||{};return state.skillBooks[id]||(state.skillBooks[id]={xp:0,level:1,knowledge:0,accuracy:0,retention:0,episodes:0});}
function skillBookCount(curriculum, grade){return (SKILL_CONCOURS_BOOKS[curriculum]?.[String(grade)]||[]).length;}
function skillBookCountLabel(curriculum, grade){return `${fmt(skillBookCount(curriculum,grade))} درس کنکور`;}

/* فهرست کامل امتحان نهایی و نوبت دوم، هماهنگ با درخت مهارت */
const SKILL_FINAL_BOOKS = {
  experimental:{
    "10":["فارسی ۱","دین و زندگی ۱ (مشترک)","انگلیسی ۱","عربی ۱ (مشترک)","جغرافیای ایران","آمادگی دفاعی","تفکر و سواد رسانه‌ای","زیست شناسی ۱","شیمی ۱","فیزیک ۱ تجربی","ریاضی ۱"],
    "11":["فارسی ۲","دین و زندگی ۲","عربی ۲ (مشترک)","انگلیسی ۲","زیست شناسی ۲","شیمی ۲"],
    "12":["فارسی ۳","دین و زندگی ۳ (مشترک)","انگلیسی ۳","عربی ۳ (مشترک)","سلامت و بهداشت","هویت اجتماعی","زیست شناسی ۳","شیمی ۳","فیزیک ۳ تجربی","ریاضی ۳","زمین شناسی"]
  },
  mathematics:{
    "10":["فارسی ۱","دین و زندگی ۱ (مشترک)","انگلیسی ۱","عربی ۱ (مشترک)","جغرافیای ایران","آمادگی دفاعی","تفکر و سواد رسانه‌ای","هندسه ۱","شیمی ۱","فیزیک ۱","ریاضی ۱"],
    "11":["فارسی ۲","دین و زندگی ۲","عربی ۲ (مشترک)","انگلیسی ۲","هندسه ۲","فیزیک ۲"],
    "12":["فارسی ۳","دین و زندگی ۳ (مشترک)","انگلیسی ۳","عربی ۳ (مشترک)","سلامت و بهداشت","هویت اجتماعی","هندسه ۳","شیمی ۳","فیزیک ۳","حسابان ۲","ریاضیات گسسته"]
  },
  humanities:{
    "10":["فارسی ۱","دین و زندگی ۱ (انسانی)","انگلیسی ۱","آمادگی دفاعی","تفکر و سواد رسانه‌ای","عربی ۱ (تخصصی)","جغرافیا ایران","تاریخ ۱","ریاضی و آمار ۱","علوم و فنون ادبی ۱","منطق","جامعه شناسی ۱"],
    "11":["فارسی ۲","دین و زندگی ۲","عربی ۲ (تخصصی)","انگلیسی ۲","تاریخ ۲","جامعه شناسی ۲"],
    "12":["فارسی ۳","دین و زندگی ۳ (انسانی)","انگلیسی ۳","سلامت و بهداشت","عربی ۳ (تخصصی)","جغرافیا ۳","تاریخ ۳","ریاضی و آمار ۳","علوم و فنون ادبی ۳","فلسفه ۲","جامعه شناسی ۳"]
  }
};
const SKILL_SECONDTERM_BOOKS_11={
  experimental:["تاریخ معاصر","انسان و محیط زیست","فیزیک ۲ تجربی","ریاضی ۲","زمین شناسی"],
  mathematics:["تاریخ معاصر","انسان و محیط زیست","شیمی ۲","حسابان ۲","آمار و احتمال","زمین شناسی"],
  humanities:["انسان و محیط","فلسفه ۱","علوم و فنون ۲","ریاضی و آمار ۲","جغرافیا ۲","روان‌شناسی"]
};
function skillFinalBookState(curriculum,grade,name){state.skillFinalBooks=state.skillFinalBooks||{};const id=`${curriculum}_${grade}_${name}`;return state.skillFinalBooks[id]||(state.skillFinalBooks[id]={xp:0,level:1,knowledge:0,accuracy:0,retention:0,episodes:0});}
function skillSecondTermBookState(curriculum,grade,name){state.skillSecondTermBooks=state.skillSecondTermBooks||{};const id=`${curriculum}_${grade}_${name}`;return state.skillSecondTermBooks[id]||(state.skillSecondTermBooks[id]={xp:0,level:1,knowledge:0,accuracy:0,retention:0,episodes:0});}
function skillFinalSubjects(curriculum, grade, finalKeys){
  const keys = Array.isArray(finalKeys) ? finalKeys : (SKILL_FINAL_BOOKS[curriculum]?.[String(grade)] || []);
  const rule = (SKILL_FINAL_GRADE_RULES[curriculum] || {})[String(grade)];
  if(rule === "ALL_GRADE_MATCHING"){
    const all = [...new Set(curriculumSubjectKeys(curriculum) || [])];
    return all.filter(k => CHECKLIST_TEMPLATES[k] && subjectMatchesGrade(k, grade, curriculum));
  }
  if(Array.isArray(rule)) return keys.filter(k => rule.includes(k));
  return keys.filter(k => subjectMatchesGrade(k, grade, curriculum));
}
function skillSecondTermSubjects(curriculum,grade){return String(grade)==='11'?(SKILL_SECONDTERM_BOOKS_11[curriculum]||[]):[]}
const SKILL_FINAL_ICON_RULES=[[/زیست شناسی/,'🧬'],[/شیمی/,'⚗️'],[/فیزیک/,'⚛️'],[/ریاضی/,'🧮'],[/هندسه/,'📐'],[/حسابان/,'∫'],[/گسسته/,'🔢'],[/زمین شناسی/,'🌍'],[/فارسی/,'📖'],[/دین و زندگی/,'📜'],[/انگلیسی/,'🔤'],[/عربی/,'📝'],[/جغرافیا/,'🗺️'],[/تاریخ/,'🏛️'],[/آمادگی دفاعی/,'🛡️'],[/تفکر و سواد رسانه‌ای/,'📱'],[/سلامت و بهداشت/,'❤️‍🩹'],[/هویت اجتماعی/,'🧑‍🤝‍🧑'],[/علوم و فنون/,'✒️'],[/منطق/,'🔎'],[/جامعه شناسی/,'👥'],[/فلسفه/,'💭']];
function skillFinalBookIcon(name){const r=SKILL_FINAL_ICON_RULES.find(([re])=>re.test(name));return r?r[1]:'📘'}
function renderSkillSecondTermCard(c,gr,name){const st=skillSecondTermBookState(c,gr,name),xp=+st.xp||0,lv=+st.level||1,know=Math.round(+st.knowledge||0);const next=threshold(lv+1),prev=lv<=1?0:threshold(lv),pct=Math.max(0,Math.min(100,(xp-prev)/Math.max(1,next-prev)*100)),tier=tierFor(lv,know);return `<article class="skill-v11-card ${tier.cls}"><div class="skill-v11-head"><div class="skill-v11-icon">${skillFinalBookIcon(name)}</div><div class="skill-v11-name"><b>${esc(name)}</b><small>${tier.icon} ${tier.name} • نوبت دوم</small></div><div class="skill-v11-level">Lv ${lv}</div></div><div class="skill-v11-progress-wrap"><div class="skill-v11-progress-meta"><span>${fmt(xp)} XP</span><b>${know}% تسلط</b></div><div class="skill-v11-bar"><i style="width:${pct}%"></i></div></div><div class="skill-v11-chips"><div class="skill-v11-chip"><b>${Math.round(+st.accuracy||0)}%</b>دقت</div><div class="skill-v11-chip"><b>${Math.round(+st.retention||0)}%</b>ماندگاری</div><div class="skill-v11-chip"><b>${+st.episodes||0}</b>جلسه</div></div></article>`}

function skillLastStudy(c,gr,name){
  const keys=Object.keys(SUBJECTS);
  const match=keys.find(k=>{const n=subjectDisplayName(k,c);return name===n||name.includes(n)||n.includes(name)});
  if(!match)return null;
  const arr=(state.episodes||[]).filter(e=>e.subject===match&&e.date).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  return arr[0]?.date||null;
}
function skillDaysSince(date){if(!date)return 999;const a=new Date(String(date).slice(0,10));const b=new Date();a.setHours(12,0,0,0);b.setHours(12,0,0,0);return Math.max(0,Math.round((b-a)/86400000));}
function skillTierRank(knowledge){const k=+knowledge||0;return k>=80?4:k>=60?3:k>=40?2:k>=20?1:0}
function skillMasteryRank(avg){const a=+avg||0;if(a>=85)return ['👑','استاد'];if(a>=70)return ['💎','مسلط'];if(a>=50)return ['🥇','در حال پیشرفت'];return ['🥉','مبتدی']}
function skillFilterState(){return state.settings.skillFilter||'all'}
function skillSortState(){return state.settings.skillSort||'default'}
window.setSkillViewFilter=function(v){state.settings.skillFilter=v||'all';save();if(window.renderSkillHub)renderSkillHub();}
window.setSkillViewSort=function(v){state.settings.skillSort=v||'default';save();if(window.renderSkillHub)renderSkillHub();}

/* ===================== SKILL HUB (مرکز مهارت‌ها) ===================== */
function hubCollection(c,gr){
  const books=(SKILL_CONCOURS_BOOKS[c]?.[gr]||[]).map(n=>({name:n,kind:'concours'}));
  const finals=skillFinalSubjects(c,gr).map(n=>({name:n,kind:'final'}));
  const seconds=skillSecondTermSubjects(c,gr).map(n=>({name:n,kind:'secondterm'}));
  return [...books,...finals,...seconds];
}
function hubEntryState(c,gr,e){
  return e.kind==='concours'?skillBookState(`${c}_${gr}_${e.name}`):e.kind==='final'?skillFinalBookState(c,gr,e.name):skillSecondTermBookState(c,gr,e.name);
}
function hubEntryIcon(e){return e.kind==='concours'?skillBookIcon(e.name):skillFinalBookIcon(e.name)}
function hubEntryGroupLabel(e){return e.kind==='concours'?'کنکور':e.kind==='final'?(state.settings.statusGrade==="10"?'نوبت دوم':'امتحان نهایی'):'نوبت دوم'}
function hubKnowColor(k){return k<40?'var(--bad)':k<70?'var(--warn)':'var(--good)'}
function hubTopicEfficiency(c,gr){
  const keys=curriculumSubjectKeys(c);
  const rows=[];
  keys.forEach(k=>{
    const s=state.subjects[k];if(!s)return;
    const eps=(state.episodes||[]).filter(e=>e.subject===k);
    if(!eps.length)return;
    const minutes=eps.reduce((a,e)=>a+(+e.minutes||0),0);
    const tests=eps.reduce((a,e)=>a+(+e.tests||0),0);
    const correct=eps.reduce((a,e)=>a+(+e.correct||0),0);
    if(minutes<20)return;
    const gain=Math.max(0,(+s.knowledge||0));
    const eff=tests?Math.round(correct/tests*100):Math.round(gain);
    rows.push({key:k,name:subjectDisplayName(k,c),minutes,tests,eff,icon:SUBJECTS[k]?.icon||'📘'});
  });
  return rows.sort((a,b)=>b.eff-a.eff);
}
function hubReadiness(c,gr){
  const col=hubCollection(c,gr);
  if(!col.length)return 0;
  let sum=0;
  col.forEach(e=>{
    const st=hubEntryState(c,gr,e);
    const know=Math.max(0,Math.min(100,+st.knowledge||0));
    const acc=+st.accuracy||0;
    const days=skillDaysSince(skillLastStudy(c,gr,e.name));
    const fresh=days<=2?1:days<=7?.75:days<=14?.5:days<=30?.3:.1;
    sum+=know*.55+(acc?acc*.25:know*.125)+fresh*20*.2;
  });
  return Math.max(0,Math.min(100,Math.round(sum/col.length)));
}
function hubHeatmap(){
  const days=90,t=new Date();t.setHours(12,0,0,0);
  let cells='';
  for(let i=days-1;i>=0;i--){
    const d=new Date(t);d.setDate(d.getDate()-i);
    const k=localKey(d);
    let xp=0,done=false;
    (state.episodes||[]).forEach(e=>{if(String(e.date||'').slice(0,10)===k){xp+=+e.xp||0;done=true}});
    (state.quests||[]).forEach(q=>{if(String(q.date||'').slice(0,10)===k&&(q.completed||q.done))xp+=+q.xp||+q.rewardXP||5});
    const lvl=!done&&xp===0?0:xp<60?1:xp<150?2:xp<300?3:4;
    const tip=`${new Intl.DateTimeFormat("fa-IR",{month:"numeric",day:"numeric"}).format(d)} • ${lvl?fmt(xp)+' XP':'بدون فعالیت'}`;
    cells+=`<div class="hub-heat-cell l${lvl}${i===0?' today':''}" data-tip="${esc(tip)}"></div>`;
  }
  return `<div class="hub-heatmap">${cells}</div>
    <div class="hub-heat-legend">کمتر
      <i style="background:rgba(125,145,190,.13)"></i><i class="l1" style="background:rgba(110,231,255,.28)"></i><i class="l2" style="background:rgba(110,231,255,.55)"></i><i class="l3" style="background:var(--accent)"></i><i style="background:linear-gradient(135deg,var(--accent),var(--accent2))"></i>
    بیشتر • ۹۰ روز اخیر</div>`;
}
function hubEfficiencyRows(){
  const c=state.settings.selectedCurriculum||"experimental";
  const rows=hubTopicEfficiency(c,String(state.settings.statusGrade||"10"));
  if(!rows.length)return '<div class="empty">پس از ثبت چند پارت مطالعه، بازده زمانی هر درس اینجا نمایش داده می‌شود.</div>';
  const min=Math.min(...rows.map(r=>r.eff)),max=Math.max(...rows.map(r=>r.eff)),span=Math.max(1,max-min);
  return rows.map(r=>{
    const pct=Math.round((r.eff-min)/span*100);
    return `<div class="hub-eff-row">
      <div class="hub-eff-top"><b>${r.icon} ${esc(r.name)}</b><span class="hub-eff-num">${fmt(r.minutes)} دقیقه • ${fmt(r.tests)} تست • بازده ${fmt(r.eff)}</span></div>
      <div class="hub-eff-bar"><i class="${pct<40?'warn':''}" style="width:${Math.max(6,pct)}%"></i></div>
    </div>`;
  }).join('');
}
function hubSuggestions(c,gr){
  const col=hubCollection(c,gr);
  const scored=col.map(e=>{
    const st=hubEntryState(c,gr,e);
    const know=+st.knowledge||0,days=skillDaysSince(skillLastStudy(c,gr,e.name));
    const score=know<40?100-know:know<70?40-know*.25:10-(know-70)*.1;
    return {e,st,know,days,score:score+(days>=7?25:days>=3?10:0)};
  }).sort((a,b)=>b.score-a.score);
  const urgent=scored.filter(x=>x.know<40||x.days>=7).slice(0,3);
  if(!urgent.length){
    const top=scored[0];
    if(!top)return '<div class="empty">درسی برای پیشنهاد وجود ندارد.</div>';
    return `<div class="hub-suggest-item"><div><b>✅ همه درس‌ها وضعیت خوبی دارند!</b><div class="why">برای حفظ روند، یک مرور کوتاه از <b>${esc(top.e.name)}</b> انجام بده.</div></div><button class="btn" onclick="switchToPage('episodes')">📖 ثبت پارت</button></div>`;
  }
  return urgent.map((u,i)=>{
    const sKey=hubBookSubjectKeys(u.e)[0]||'';
    const canStart=!!(sKey&&state.subjects[sKey]);
    return `<div class="hub-suggest-item ${u.know<40?'urgent':''}">
    <div><b>${i+1}. ${hubEntryIcon(u.e)} ${esc(u.e.name)}</b>
      <div class="why">تسلط: ${Math.round(u.know)}٪ • آخرین مطالعه: ${u.days>=999?'هرگز':u.days===0?'امروز':fmt(u.days)+' روز پیش'}${+u.st.accuracy?` • دقت تست: ${Math.round(+u.st.accuracy)}٪`:''}</div>
      <div class="why">${u.know<40?'🔴 نیاز به تمرکز جدی — آموزش + ۱۵ تست پیشنهاد می‌شود.':u.days>=7?'⏱ مدت‌ها مطالعه نشده — مرور + ۱۰ تست پیشنهاد می‌شود.':'🟡 تسلط متوسط — یک جلسه کوتاه کمکت می‌کند.'}</div>
    </div>
    ${canStart?`<button class="btn primary" onclick="startSmartTask('${esc(sKey)}','',35)">▶ شروع مطالعه</button>`:`<button class="btn" onclick="switchToPage('episodes')">📖 ثبت پارت</button>`}
  </div>`}).join('');
}
function hubBookCard(c,gr,e){
  const st=hubEntryState(c,gr,e);
  const xp=+st.xp||0,lv=+st.level||1,know=Math.round(+st.knowledge||0),acc=Math.round(+st.accuracy||0),ret=Math.round(+st.retention||0);
  const next=threshold(lv+1),prev=lv<=1?0:threshold(lv);
  const pct=Math.max(0,Math.min(100,(xp-prev)/Math.max(1,next-prev)*100));
  const tier=tierFor(lv,know);
  const last=skillLastStudy(c,gr,e.name),days=skillDaysSince(last);
  const open=state.settings.hubOpenBook===hubBookId(e)?'open':'';
  const tree=hubBookTreeHtml(c,gr,e);
  return `<article class="hub-book ${tier.cls} ${open}" id="${hubBookId(e)}" onclick="window.hubToggleBook('${hubBookId(e)}',event)">
    <div class="hub-book-head">
      <div class="hub-book-icon">${hubEntryIcon(e)}</div>
      <div class="hub-book-name"><b>${esc(e.name)}</b><small>${tier.icon} ${tier.name} • ${hubEntryGroupLabel(e)}</small></div>
      <div class="hub-book-level">Lv ${fmt(lv)}</div>
    </div>
    <div class="hub-book-bar"><i style="width:${pct}%"></i></div>
    <div class="hub-book-xpmeta"><span>${fmt(xp)} XP</span><b style="color:${hubKnowColor(know)}">${know}٪ تسلط</b></div>
    <div class="hub-chips">
      <div class="hub-chip"><b>${acc}٪</b>دقت</div>
      <div class="hub-chip"><b>${ret}٪</b>ماندگاری</div>
      <div class="hub-chip"><b>${fmt(+st.episodes||0)}</b>جلسه</div>
    </div>
    <div class="hub-book-last ${days>=3?'warn':''}">${last?(days===0?'📚 مطالعه امروز':`⏱ ${fmt(days)} روز پیش`):'⚪ هنوز مطالعه نشده'} • برای دیدن درخت مباحث کلیک کن ▾</div>
    ${tree}
  </article>`;
}
function hubBookId(e){return 'hub-'+e.kind+'-'+e.name.replace(/[^؀-ۿ\w]/g,'')}
window.hubToggleBook=function(id,ev){
  if(ev&&ev.target.closest('button'))return;
  const el=document.getElementById(id);if(!el)return;
  const wasOpen=el.classList.contains('open');
  document.querySelectorAll('.hub-book.open').forEach(x=>x.classList.remove('open'));
  if(!wasOpen){el.classList.add('open');state.settings.hubOpenBook=id;}
  else state.settings.hubOpenBook='';
  save();
};
function hubBookSubjectKeys(e){
  const c=state.settings.selectedCurriculum||"experimental";
  const names=Object.keys(SUBJECTS);
  return names.filter(k=>{
    const n=subjectDisplayName(k,c);
    return e.name===n||e.name.includes(n)||n.includes(e.name.split(' ')[0]);
  });
}
function hubBookTreeHtml(c,gr,e){
  const keys=hubBookSubjectKeys(e);
  const topicMap={};
  keys.forEach(k=>{
    const s=state.subjects[k];if(!s)return;
    Object.entries(s.topics||{}).forEach(([name,t])=>{
      const cur=topicMap[name]||(topicMap[name]={retention:0,last:'',seen:0});
      cur.retention=Math.max(cur.retention,+t.retention||0);
      cur.seen+=(+t.seen||0);
      if(String(t.last||'').localeCompare(String(cur.last||''))>0)cur.last=t.last;
    });
  });
  const topics=Object.entries(topicMap);
  if(!topics.length){
    const tplKeys=Object.keys(CHECKLIST_TEMPLATES||{});
    const firstWord=e.name.split(' ')[0];
    const tpl=tplKeys.find(k=>CHECKLIST_TEMPLATES[k].name===firstWord||e.name.includes(CHECKLIST_TEMPLATES[k].name));
    if(tpl){
      const gradeLabel=gr==="10"?"دهم":gr==="11"?"یازدهم":"دوازدهم";
      const sec=(CHECKLIST_TEMPLATES[tpl].sections||[]).find(s=>s.label.includes(gradeLabel)&&(!s.major||s.major===c));
      if(sec)return `<div class="hub-book-tree"><div class="hub-tree-head"><small>🗺 سرفصل مباحث (از چک‌لیست)</small><small>${fmt(sec.rows.length)} مبحث</small></div><div class="hub-tree-list">${sec.rows.slice(0,30).map(r=>`<div class="hub-tree-item" onclick="event.stopPropagation()"><span class="hub-tree-name"><i class="hub-tree-dot" style="background:rgba(125,145,190,.35)"></i><span>${esc(r.label)}</span></span><span class="hub-tree-pct" style="color:var(--muted)">—</span></div>`).join('')}${sec.rows.length>30?`<div class="muted small" style="text-align:center;padding-top:6px">و ${fmt(sec.rows.length-30)} مبحث دیگر…</div>`:''}</div></div>`;
    }
    return '<div class="hub-book-tree"><div class="empty">با ثبت پارت مطالعه (با موضوع)، درخت مباحث این درس اینجا ساخته می‌شود.</div></div>';
  }
  return `<div class="hub-book-tree"><div class="hub-tree-head"><small>🗺 درخت مباحث — رنگ هر گره نشان‌دهنده ماندگاری است</small><small>${fmt(topics.length)} مبحث</small></div><div class="hub-tree-list">${topics.sort((a,b)=>String(b[1].last||'').localeCompare(String(a[1].last||''))).map(([name,t])=>{
    const r=Math.round(+t.retention||0);
    const d=skillDaysSince(t.last);
    return `<div class="hub-tree-item" onclick="event.stopPropagation();switchToPage('episodes')" title="ثبت مرور از پارت‌های مطالعه">
      <span class="hub-tree-name"><i class="hub-tree-dot" style="background:${hubKnowColor(r)}"></i><span>${esc(name)}</span></span>
      <span class="hub-tree-pct" style="color:${hubKnowColor(r)}">${r}٪</span>
      <span class="hub-tree-study">${d===0?'امروز':d<999?fmt(d)+' روز پیش':''}</span>
    </div>`;
  }).join('')}</div></div>`;
}
function renderSkillHub(){
  const host=document.getElementById("skillHubContent");if(!host)return;
  const c=state.settings.selectedCurriculum||"experimental", gr=String(state.settings.statusGrade||"10");
  const sc=document.getElementById("statusCurriculum");if(sc)sc.value=c;
  const sg=document.getElementById("statusGrade");if(sg)sg.value=gr;
  const g=curriculumGroups[c]||curriculumGroups.experimental;
  const gradeName={"10":"دهم","11":"یازدهم","12":"دوازدهم"}[gr];
  const col=hubCollection(c,gr);
  const entries=col.map(e=>({e,st:hubEntryState(c,gr,e)}));
  const totalXP=entries.reduce((a,x)=>a+(+x.st.xp||0),0);
  const avgKnow=entries.length?Math.round(entries.reduce((a,x)=>a+(+x.st.knowledge||0),0)/entries.length):0;
  const avgAcc=entries.length?Math.round(entries.reduce((a,x)=>a+(+x.st.accuracy||0),0)/entries.length):0;
  const avgRet=entries.length?Math.round(entries.reduce((a,x)=>a+(+x.st.retention||0),0)/entries.length):0;
  const totalEpisodes=entries.reduce((a,x)=>a+(+x.st.episodes||0),0);
  const [rankIcon,rankName]=skillMasteryRank(avgKnow);
  const counts={strong:entries.filter(x=>(+x.st.knowledge||0)>=70).length,mid:entries.filter(x=>(+x.st.knowledge||0)>=40&&(+x.st.knowledge||0)<70).length,focus:entries.filter(x=>(+x.st.knowledge||0)<40).length,stale:col.filter(x=>skillDaysSince(skillLastStudy(c,gr,x.name))>=3).length};
  const readiness=hubReadiness(c,gr);
  const filter=skillFilterState(),sort=skillSortState();
  const applyView=(arr)=>{let out=arr.slice();if(filter==='strong')out=out.filter(x=>(+x.st.knowledge||0)>=70);if(filter==='mid')out=out.filter(x=>(+x.st.knowledge||0)>=40&&(+x.st.knowledge||0)<70);if(filter==='focus')out=out.filter(x=>(+x.st.knowledge||0)<40);if(filter==='stale')out=out.filter(x=>skillDaysSince(skillLastStudy(c,gr,x.name))>=3);if(sort==='weak')out.sort((a,b)=>(+a.st.knowledge||0)-(+b.st.knowledge||0));else if(sort==='strong')out.sort((a,b)=>(+b.st.knowledge||0)-(+a.st.knowledge||0));else if(sort==='xp')out.sort((a,b)=>(+b.st.xp||0)-(+a.st.xp||0));else if(sort==='study')out.sort((a,b)=>skillDaysSince(skillLastStudy(c,gr,b.e.name))-skillDaysSince(skillLastStudy(c,gr,a.e.name)));return out};
  const visibleConcours=applyView(entries.filter(x=>x.e.kind==='concours'));
  const visibleFinal=applyView(entries.filter(x=>x.e.kind==='final'));
  const visibleSecond=applyView(entries.filter(x=>x.e.kind==='secondterm'));
  const r7=xpHistory(7),r30=xpHistory(30);
  const now=new Date();
  const {cal,j}=renderUnifiedCalendar(now);
  const monthName=new Intl.DateTimeFormat("fa-IR-u-ca-persian",{month:"long"}).format(now);
  const weekNow=xpSumForDays(0,6),weekPrev=xpSumForDays(7,13);
  const subjectOptionsFor=(sel)=>'<option value="">انتخاب درس...</option>'+(SKILL_CONCOURS_BOOKS[c]?.[gr]||[]).map(n=>`<option value="${esc(n)}" ${sel===n?"selected":""}>${skillBookIcon(n)} ${esc(n)}</option>`).join("");
  const effRows=hubEfficiencyRows();
  const grid=(arr)=>arr.length?`<div class="hub-grid">${arr.map(x=>hubBookCard(c,gr,x.e)).join('')}</div>`:'<div class="empty">با این فیلتر درسی پیدا نشد.</div>';
  host.innerHTML=`<div class="hub-v1">
    <div class="hub-hero">
      <div>
        <div class="skill-v7-eyebrow">SKILL HUB</div>
        <h2 style="margin:4px 0">${g.icon} ${g.name} — پایه ${gradeName}</h2>
        <p class="muted" style="margin:0">وضعیت دروس، آمار و درخت مباحث — همه در یک صفحه.</p>
      </div>
      <div class="hub-hero-score"><b>${readiness}</b><span>🎯 آمادگی کنکور</span></div>
    </div>
    <div class="hub-card">
      <h3>🎯 شاخص آمادگی کنکور</h3>
      <div class="hub-readiness-bar"><i style="width:${readiness}%"></i></div>
      <div class="hub-readiness-meta"><span>${rankIcon} ${rankName} • میانگین تسلط ${avgKnow}٪</span><span>ترکیب تسلط + دقت + تازگی مطالعه</span></div>
    </div>
    <div class="hub-kpis">
      <div class="hub-kpi"><b>${fmt(totalXP)}</b><span>کل XP</span></div>
      <div class="hub-kpi"><b>${fmt(col.length)}</b><span>تعداد دروس</span></div>
      <div class="hub-kpi"><b>${counts.strong}</b><span>🟢 درس قوی</span></div>
      <div class="hub-kpi"><b>${counts.focus}</b><span>🔴 نیاز به تمرکز</span></div>
      <div class="hub-kpi"><b>${counts.stale}</b><span>⏱ ۳+ روز بدون مطالعه</span></div>
      <div class="hub-kpi"><b>${fmt(totalEpisodes)}</b><span>جلسات انجام‌شده</span></div>
    </div>
    <div class="hub-smart">📈 مقایسه هفتگی: این هفته <strong>${fmt(weekNow)} XP</strong> در برابر <strong>${fmt(weekPrev)} XP</strong> هفته قبل؛ ${weekNow>=weekPrev?'روند رو به رشد است 🚀':'جا برای جبران هست 💪'}<small>${(()=>{const w=col.find(x=>skillDaysSince(skillLastStudy(c,gr,x.name))>=3&&(+hubEntryState(c,gr,x).knowledge||0)<50);return w?`🎯 پیشنهاد امروز: <b>${esc(w.name)}</b> — کم‌تسلط و بی‌مطالعه`:''})()}</small></div>
    <div class="hub-card"><h3>🔥 تقویم فعالیت</h3>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px"><small class="muted">${monthName} ${j.jy} • ${j.jd}</small><div class="streak-badge-v9">${currentStreak()} روز پیوسته</div></div>
      <div class="shamsi-grid-v9">${cal}</div>
    </div>
    <div class="hub-card"><h3>🗓️ نقشه حرارتی مطالعه — ۹۰ روز</h3>${hubHeatmap()}</div>
    <div class="hub-charts">
      <div class="hub-card hub-chart-card">${statusLineChart(r7,"روند XP در ۷ روز")}</div>
      <div class="hub-card hub-chart-card">${statusLineChart(r30,"روند XP در ۳۰ روز")}</div>
    </div>
    <div class="hub-card"><h3>⏱️ تحلیل بازده زمانی</h3><p class="muted small" style="margin:0 0 6px">بازده = نسبت درستی تست‌ها به زمان و تست صرف‌شده در هر درس. نوار قرمز یعنی وقت می‌گذاری ولی نتیجه کم است.</p>${effRows}</div>
    <div class="hub-card"><h3>🎯 پیشنهاد مطالعه</h3><div class="hub-suggest">${hubSuggestions(c,gr)}</div></div>
    <div class="hub-tools">
      <div><label>فیلتر وضعیت</label><select onchange="window.setSkillViewFilter(this.value)"><option value="all" ${filter==='all'?'selected':''}>همه دروس</option><option value="strong" ${filter==='strong'?'selected':''}>🟢 قوی</option><option value="mid" ${filter==='mid'?'selected':''}>🟡 متوسط</option><option value="focus" ${filter==='focus'?'selected':''}>🔴 نیاز به تمرکز</option><option value="stale" ${filter==='stale'?'selected':''}>⏱ بدون مطالعه ۳+ روز</option></select></div>
      <div><label>مرتب‌سازی</label><select onchange="window.setSkillViewSort(this.value)"><option value="default" ${sort==='default'?'selected':''}>پیش‌فرض</option><option value="weak" ${sort==='weak'?'selected':''}>ضعیف‌ترین اول</option><option value="strong" ${sort==='strong'?'selected':''}>قوی‌ترین اول</option><option value="xp" ${sort==='xp'?'selected':''}>بیشترین XP</option><option value="study" ${sort==='study'?'selected':''}>قدیمی‌ترین مطالعه</option></select></div>
      <div><label>راهنما</label><div class="muted small" style="padding-top:7px">🔴 زیر ۴۰٪ • 🟡 ۴۰–۶۹٪ • 🟢 ۷۰٪+</div></div>
    </div>
    <div class="hub-manual">
      <div class="hub-manual-card"><label>💪 قوی‌ترین درس (دستی)</label><select onchange="window.setSkillManual('strong',this.value)">${subjectOptionsFor(state.settings.manualStrongSubject)}</select></div>
      <div class="hub-manual-card"><label>🎯 نیاز به تمرکز (دستی)</label><select onchange="window.setSkillManual('focus',this.value)">${subjectOptionsFor(state.settings.manualFocusSubject)}</select></div>
    </div>
    <div class="hub-group-head"><h3>🎓 دروس کنکور</h3><span>${visibleConcours.length} از ${(SKILL_CONCOURS_BOOKS[c]?.[gr]||[]).length} درس</span></div>
    ${grid(visibleConcours)}
    <div class="hub-group-head"><h3>📝 ${gr==="10"?"دروس نوبت دوم":"دروس امتحان نهایی"}</h3><span>${visibleFinal.length} از ${skillFinalSubjects(c,gr).length} درس</span></div>
    ${grid(visibleFinal)}
    ${gr==="11"?`<div class="hub-group-head"><h3>📚 دروس امتحان نوبت دوم</h3><span>${visibleSecond.length} از ${skillSecondTermSubjects(c,gr).length} درس</span></div>${grid(visibleSecond)}`:""}
  </div>`;
}
window.setSkillManual=function(type,k){
  state.settings[type==="strong"?"manualStrongSubject":"manualFocusSubject"]=k;
  save();if(window.renderSkillHub)renderSkillHub();
};

/* ===================== STATUS ===================== */
function localKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function activityFor(d){
  const k=localKey(d);
  return (state.episodes||[]).some(e=>String(e.date||"").slice(0,10)===k)||
    (state.quests||[]).some(q=>String(q.date||"").slice(0,10)===k&&(q.completed||q.done));
}
function currentStreak(){let n=0,d=new Date();d.setHours(12,0,0,0);while(n<3650&&activityFor(d)){n++;d.setDate(d.getDate()-1)}return n}
function xpHistory(days){
  const t=new Date();t.setHours(12,0,0,0);const out=[];
  for(let i=days-1;i>=0;i--){
    const d=new Date(t);d.setDate(d.getDate()-i);const k=localKey(d);
    let xp=0;
    (state.episodes||[]).forEach(e=>{if(String(e.date||"").slice(0,10)===k)xp+=+e.xp||0});
    (state.quests||[]).forEach(q=>{if(String(q.date||"").slice(0,10)===k&&(q.completed||q.done))xp+=+q.xp||+q.rewardXP||5});
    out.push({date:d,label:new Intl.DateTimeFormat("fa-IR",{month:"numeric",day:"numeric"}).format(d),xp});
  }
  return out;
}
function statusLineChart(rows,title){
  const w=520,h=190,p={l:28,r:12,t:20,b:28};
  const max=Math.max(1,...rows.map(r=>r.xp));
  const pts=rows.map((r,i)=>({x:p.l+i*(w-p.l-p.r)/Math.max(1,rows.length-1),y:h-p.b-(r.xp/max)*(h-p.t-p.b)}));
  const path=pts.map((q,i)=>(i?"L":"M")+q.x.toFixed(1)+" "+q.y.toFixed(1)).join(" ");
  const area=path+` L ${pts[pts.length-1].x} ${h-p.b} L ${pts[0].x} ${h-p.b} Z`;
  const step=Math.max(1,Math.ceil(rows.length/6));
  return `<div class="status-chart-v9"><h3>${title}</h3><small>XP ثبت‌شده در هر روز</small>
    <svg class="xp-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      ${[0,1,2,3].map(i=>{const y=p.t+i*(h-p.t-p.b)/3;return `<line class="xp-grid" x1="${p.l}" x2="${w-p.r}" y1="${y}" y2="${y}"/>`}).join("")}
      <path class="xp-area" d="${area}"/>
      <path class="xp-line" d="${path}"/>
      ${pts.map((q,i)=>{
        const showLabel=(i===0||i===pts.length-1||i%step===0);
        const rotate=rows.length>10?` transform='rotate(-35 ${q.x} ${h-4})'`:"";
        const anchor=rows.length>10?"end":"middle";
        return `<circle class="xp-dot" cx="${q.x}" cy="${q.y}" r="3"/>`+
          (showLabel?`<text class="xp-label" x="${q.x}" y="${h-8}" text-anchor="${anchor}"${rotate}>${rows[i].label}</text>`:"");
      }).join("")}
    </svg></div>`;
}
function jalaliToGregorian(jy,jm,jd){
  let gy=jy<=979?621:1600;jy-=jy<=979?0:979;
  let days=365*jy+Math.floor(jy/33)*8+Math.floor((jy%33+3)/4)+78+jd;
  days+=jm<7?(jm-1)*31:(jm-7)*30+186;
  gy+=400*Math.floor(days/146097);days%=146097;
  if(days>36524){gy+=100*Math.floor(--days/36524);days%=36524;if(days>=365)days++}
  gy+=4*Math.floor(days/1461);days%=1461;
  if(days>365){gy+=Math.floor((days-1)/365);days=(days-1)%365}
  let gd=days+1,leap=gy%4===0&&(gy%100!==0||gy%400===0),
    md=[0,31,leap?29:28,31,30,31,30,31,31,30,31,30,31],gm=1;
  while(gd>md[gm]){gd-=md[gm];gm++}
  return new Date(gy,gm-1,gd);
}
function gregorianToJalali(gy,gm,gd){
  gy-=1600;gm--;
  const gdm=[31,28,31,30,31,30,31,31,30,31,30,31];
  let days=365*gy+Math.floor((gy+3)/4)-Math.floor((gy+99)/100)+Math.floor((gy+399)/400);
  for(let i=0;i<gm;i++)days+=gdm[i];
  if(gm>1&&((gy+1600)%4===0&&((gy+1600)%100!==0||(gy+1600)%400===0)))days++;
  days+=gd-1;
  let jdays=days-79;
  const j_np=Math.floor(jdays/12053);jdays%=12053;
  let jy=979+33*j_np+4*Math.floor(jdays/1461);jdays%=1461;
  if(jdays>=366){jy+=Math.floor((jdays-1)/365);jdays=(jdays-1)%365}
  let jm=jdays<186?1+Math.floor(jdays/31):7+Math.floor((jdays-186)/30);
  return {jy,jm,jd:1+(jdays%31)};
}
function xpSumForDays(startOffset,endOffset){const t=new Date();t.setHours(12,0,0,0);let total=0;for(let i=startOffset;i<=endOffset;i++){const d=new Date(t);d.setDate(d.getDate()-i);const k=localKey(d);(state.episodes||[]).forEach(e=>{if(String(e.date||'').slice(0,10)===k)total+=+e.xp||0});(state.quests||[]).forEach(q=>{if(String(q.date||'').slice(0,10)===k&&(q.completed||q.done))total+=+q.xp||+q.rewardXP||5})}return total}
function renderUnifiedCalendar(now){
  const j=gregorianToJalali(now.getFullYear(),now.getMonth()+1,now.getDate());
  const daysInMonth=j.jm<=6?31:(j.jm<=11?30:(j.jy%4===3?30:29));
  const firstG=jalaliToGregorian(j.jy,j.jm,1);
  const startIdx=(firstG.getDay()+1)%7;
  const dayNames=["ش","ی","د","س","چ","پ","ج"];
  let cal=dayNames.map(x=>`<div class="shamsi-day-name">${x}</div>`).join("");
  for(let i=0;i<startIdx;i++)cal+=`<div class="shamsi-day empty"></div>`;
  for(let d=1;d<=daysInMonth;d++){
    const gd=jalaliToGregorian(j.jy,j.jm,d);
    const active=activityFor(gd),isToday=d===j.jd;
    cal+=`<div class="shamsi-day ${active?"active":""} ${isToday?"today":""}">
      <b>${d}</b>
      <span class="shamsi-day-dot" style="background:${active?"var(--good)":"rgba(125,145,190,.2)"}"></span>
    </div>`;
  }
  return {cal,j,daysInMonth};
}
/* ===================== ACHIEVEMENTS ===================== */
function renderAchievements(){
  const box=document.getElementById("achievementList");if(!box)return;
  const totalEpisodes=state.episodes.length;
  const totalCompleted=state.quests.filter(q=>q.completed||q.done===true).length;
  const totalXP=Object.values(state.subjects).reduce((a,s)=>a+(+s.xp||0),0);
  const totalTests=Object.values(state.subjects).reduce((a,s)=>a+(+s.tests||0),0);
  const leitnerCount=(state.leitner.cards||[]).length;
  const leitnerMastered=(state.leitner.cards||[]).filter(c=>c.box===5).length;
  const classesCount=(state.classes||[]).length;
  const checklistDone=(()=>{let n=0;Object.values(state.checklists||{}).forEach(obj=>{Object.values(obj).forEach(v=>{if(v===2)n++})});return n})();
  const avgKnow=avg("knowledge");
  const defs=[
    {icon:"🌱",name:"شروع قدرتمند",desc:"اولین پارت مطالعه را ثبت کن",ok:()=>totalEpisodes>=1,group:"پیشرفت"},
    {icon:"📚",name:"پرتلاش",desc:"۱۰ پارت مطالعه ثبت کن",ok:()=>totalEpisodes>=10,group:"پیشرفت"},
    {icon:"📖",name:"نیمه راه",desc:"۵۰ پارت مطالعه ثبت کن",ok:()=>totalEpisodes>=50,group:"پیشرفت"},
    {icon:"🏆",name:"صد پارت مطالعه",desc:"۱۰۰ پارت مطالعه ثبت کن",ok:()=>totalEpisodes>=100,group:"پیشرفت"},
    {icon:"🔥",name:"۳ روز پیوسته",desc:"Streak را به ۳ برسان",ok:()=>+state.streak>=3,group:"پیوستگی"},
    {icon:"🔥",name:"هفت‌روزه",desc:"Streak را به ۷ برسان",ok:()=>+state.streak>=7,group:"پیوستگی"},
    {icon:"⚡",name:"جنگجوی ماه",desc:"Streak را به ۳۰ برسان",ok:()=>+state.streak>=30,group:"پیوستگی"},
    {icon:"⚔️",name:"اولین Quest",desc:"اولین مأموریت را کامل کن",ok:()=>totalCompleted>=1,group:"Quest"},
    {icon:"⚔️",name:"Quest Hunter",desc:"۱۰ Quest را کامل کن",ok:()=>totalCompleted>=10,group:"Quest"},
    {icon:"🎯",name:"شکارچی بزرگ",desc:"۵۰ Quest را کامل کن",ok:()=>totalCompleted>=50,group:"Quest"},
    {icon:"🎯",name:"دقت ۷۰٪",desc:"میانگین دقت به ۷۰٪ برسد",ok:()=>avgAccuracy()>=70,group:"مهارت"},
    {icon:"🎯",name:"دقت ۹۰٪",desc:"میانگین دقت به ۹۰٪ برسد",ok:()=>avgAccuracy()>=90,group:"مهارت"},
    {icon:"💎",name:"کمال‌گرا",desc:"میانگین تسلط به ۸۰٪ برسد",ok:()=>avgKnow>=80,group:"مهارت"},
    {icon:"🔬",name:"آزمون‌گر",desc:"۱۰۰ تست بزن",ok:()=>totalTests>=100,group:"تست"},
    {icon:"📊",name:"تست‌باز حرفه‌ای",desc:"۵۰۰ تست بزن",ok:()=>totalTests>=500,group:"تست"},
    {icon:"🧪",name:"استاد تست",desc:"۱۰۰۰ تست بزن",ok:()=>totalTests>=1000,group:"تست"},
    {icon:"🔥",name:"Combo ×5",desc:"Combo را به ۵ برسان",ok:()=>+state.combo>=5,group:"پیوستگی"},
    {icon:"🔥",name:"Combo ×10",desc:"Combo را به ۱۰ برسان",ok:()=>+state.combo>=10,group:"پیوستگی"},
    {icon:"💰",name:"خزانه‌دار",desc:"موجودی به ۱۰۰ سکه",ok:()=>+state.gold>=100,group:"اقتصاد"},
    {icon:"💰",name:"ثروتمند",desc:"موجودی به ۵۰۰ سکه",ok:()=>+state.gold>=500,group:"اقتصاد"},
    {icon:"💎",name:"گنج‌دار",desc:"موجودی به ۱۰۰۰ سکه",ok:()=>+state.gold>=1000,group:"اقتصاد"},
    {icon:"🌳",name:"Level 10",desc:"یک درس را به Level 10 برسان",ok:()=>Object.values(state.subjects).some(s=>+s.level>=10),group:"درخت مهارت"},
    {icon:"👑",name:"استاد",desc:"یک درس را به Level 25 برسان",ok:()=>Object.values(state.subjects).some(s=>+s.level>=25),group:"درخت مهارت"},
    {icon:"🌟",name:"افسانه",desc:"یک درس را به Level 50 برسان",ok:()=>Object.values(state.subjects).some(s=>+s.level>=50),group:"درخت مهارت"},
    {icon:"👑",name:"قهرمان مطلق",desc:"یک درس را به Level 100 برسان",ok:()=>Object.values(state.subjects).some(s=>+s.level>=100),group:"درخت مهارت"},
    {icon:"💎",name:"XP 1000",desc:"۱۰۰۰ XP جمع کن",ok:()=>totalXP>=1000,group:"درخت مهارت"},
    {icon:"💠",name:"XP 5000",desc:"۵۰۰۰ XP جمع کن",ok:()=>totalXP>=5000,group:"درخت مهارت"},
    {icon:"🌌",name:"XP 10000",desc:"۱۰۰۰۰ XP جمع کن",ok:()=>totalXP>=10000,group:"درخت مهارت"},
    {icon:"🧠",name:"آشنای لایتنر",desc:"اولین کارت لایتنر",ok:()=>leitnerCount>=1,group:"لایتنر"},
    {icon:"🧠",name:"مبتدی لایتنر",desc:"۱۰ کارت در لایتنر",ok:()=>leitnerCount>=10,group:"لایتنر"},
    {icon:"📚",name:"استاد لایتنر",desc:"۵۰ کارت",ok:()=>leitnerCount>=50,group:"لایتنر"},
    {icon:"🏅",name:"مسلط لایتنر",desc:"۱۰ کارت به جعبه ۵",ok:()=>leitnerMastered>=10,group:"لایتنر"},
    {icon:"🧬",name:"هرم دانش",desc:"۳ درس به Level 10",ok:()=>Object.values(state.subjects).filter(s=>+s.level>=10).length>=3,group:"پیشرفت"},
    {icon:"🛡️",name:"سپر شکست‌ناپذیر",desc:"میانگین ماندگاری ۶۰٪",ok:()=>avg("retention")>=60,group:"مهارت"},
    {icon:"📅",name:"برنامه‌ریز",desc:"اولین برنامه روزانه",ok:()=>classesCount>=1,group:"برنامه روزانه"},
    {icon:"🗓️",name:"مدیر برنامه",desc:"۱۰ آیتم در برنامه",ok:()=>classesCount>=10,group:"برنامه روزانه"},
    {icon:"🧭",name:"سازمان‌ده",desc:"۵ کلاس مدرسه",ok:()=>(state.classes||[]).filter(c=>c.type==="school").length>=5,group:"برنامه روزانه"},
    {icon:"💻",name:"دانش‌آموز آنلاین",desc:"۳ کلاس آنلاین",ok:()=>(state.classes||[]).filter(c=>c.type==="online").length>=3,group:"برنامه روزانه"},
    {icon:"🏃",name:"ورزشکار",desc:"۳ برنامه ورزشی",ok:()=>(state.classes||[]).filter(c=>c.type==="sport").length>=3,group:"برنامه روزانه"},
    {icon:"📋",name:"شروع چک‌لیست",desc:"اولین سلول را تیک بزن",ok:()=>checklistDone>=1,group:"چک‌لیست"},
    {icon:"✅",name:"چک‌لیست‌باز",desc:"۱۰۰ سلول را تیک بزن",ok:()=>checklistDone>=100,group:"چک‌لیست"},
    {icon:"🏁",name:"استاد چک‌لیست",desc:"۵۰۰ سلول را تیک بزن",ok:()=>checklistDone>=500,group:"چک‌لیست"},
    {icon:"🔨",name:"تسک‌باز",desc:"اولین تسک روزانه را انجام بده",ok:()=>Object.keys(state.tasksDone||{}).length>=1,group:"تسک‌ها"},
    {icon:"🌅",name:"شروع پرانرژی",desc:"۵ تسک در یک روز انجام بده",ok:()=>Object.values(state.tasksDone||{}).filter(v=>v===today()).length>=5,group:"تسک‌ها"},
    {icon:"🏠",name:"خانه‌تکانی",desc:"همه تسک‌های خانه را یک روز انجام بده",ok:()=>{
      const homeTasks=DEFAULT_TASKS.filter(t=>t.cat==="home");
      return homeTasks.every(t=>state.tasksDone&&state.tasksDone[t.id]===today());
          },group:"تسک‌ها"},
    {icon:"💪",name:"ورزشکار حرفه‌ای",desc:"همه تسک‌های ورزش را یک روز انجام بده",ok:()=>{
      const sportTasks=DEFAULT_TASKS.filter(t=>t.cat==="sport");
      return sportTasks.every(t=>state.tasksDone&&state.tasksDone[t.id]===today());
    },group:"تسک‌ها"}
  ];
  const unlocked=defs.filter(a=>a.ok()).length;
  const achievementKey=a=>`${a.group}::${a.name}`;
  const prevUnlocked=state.achievementUnlocked||{};
  const wasInitialized=state.achievementInitialized===true;
  const newlyUnlocked=wasInitialized?defs.filter(a=>a.ok()&&!prevUnlocked[achievementKey(a)]):[];
  state.achievementUnlocked={};
  defs.forEach(a=>{if(a.ok())state.achievementUnlocked[achievementKey(a)]=true;});
  state.achievementInitialized=true;
  if(newlyUnlocked.length){save();newlyUnlocked.forEach((a,i)=>setTimeout(()=>showToast(`🎉 تبریک! دستاورد «${a.name}» باز شد!`),i*350));}
  else if(!wasInitialized)save();
  const pct=Math.round(unlocked/defs.length*100);
  const groups=[...new Set(defs.map(a=>a.group))];
  box.innerHTML=`<div class="ach-v7">
    <div class="ach-v7-hero">
      <div><div class="skill-v7-eyebrow">ACHIEVEMENT HALL</div>
        <h2>🏆 تالار افتخارات</h2>
        <p>پیشرفت واقعی‌ات را به دستاوردهای قابل اندازه‌گیری تبدیل کن.</p></div>
      <div class="ach-v7-score"><b>${unlocked}/${defs.length}</b><span>بازشده</span></div>
    </div>
    <div class="ach-v7-progress"><i style="width:${pct}%"></i></div>
    <div class="ach-v7-percent">${pct}% از مسیر تکمیل شده</div>
    ${groups.map(g=>`<section class="ach-v7-group">
      <div class="ach-v7-group-title"><h3>${esc(g)}</h3>
        <span>${defs.filter(a=>a.group===g&&a.ok()).length}/${defs.filter(a=>a.group===g).length}</span></div>
      <div class="ach-v7-grid">
        ${defs.filter(a=>a.group===g).map(a=>{const ok=a.ok();
          return `<article class="ach-v7-card ${ok?"unlocked":"locked"}">
            <div class="ach-v7-icon">${a.icon}</div>
            <div><h4>${esc(a.name)}</h4><p>${esc(a.desc)}</p>
              <span>${ok?"✓ باز شده":"🔒 قفل"}</span></div></article>`}).join("")}
      </div></section>`).join("")}
  </div>`;
}

/* ===================== SHOP ===================== */
function allRewards(){return SHOP.concat((state.customRewards||[]).map(x=>({...x,custom:true})))}
function renderShop(){
  const bal=document.getElementById("shopGoldBalance");
  if(bal)bal.textContent=fmt(state.gold);
  const el=document.getElementById("shopItems");if(!el)return;
  el.className="shop-v8";
  el.innerHTML=allRewards().map(x=>`
    <article class="reward-v8 ${x.custom?"custom-reward":""}">
      <div class="reward-v8-icon">${x.icon||"🎁"}</div>
      <div class="reward-v8-copy">
        <h3>${esc(x.name)}</h3>
        <p class="muted">${esc(x.desc||"")}</p>
        <div class="reward-v8-price">💰 ${fmt(x.price)} سکه</div>
      </div>
      <div class="reward-v8-actions">
        <button class="btn primary" onclick="buyReward('${esc(x.id)}')">خرید</button>
        ${x.custom?`<button class="btn danger" onclick="deleteCustomReward('${esc(x.id)}')">حذف</button>`:""}
      </div>
    </article>`).join("");
}
window.buyReward=function(id){
  const r=allRewards().find(a=>String(a.id)===String(id));if(!r)return;
  const price=Math.max(0,+r.price||0);
  if((+state.gold||0)<price){showToast("سکه کافی نیست.");return}
  state.gold-=price;
  state.rewardPurchases=Array.isArray(state.rewardPurchases)?state.rewardPurchases:[];
  state.rewardPurchases.push({id:r.id,name:r.name,price,date:today()});
  save();render();showToast(`خرید شد: ${r.name}`);
};
window.addCustomReward=function(){
  const name=document.getElementById("customRewardName")?.value.trim();
  const price=Math.max(1,+document.getElementById("customRewardPrice")?.value||0);
  const desc=document.getElementById("customRewardDesc")?.value.trim();
  const icon=document.getElementById("customRewardIcon")?.value.trim()||"🎁";
  if(!name){showToast("اسم پاداش را وارد کن.");return}
  state.customRewards=Array.isArray(state.customRewards)?state.customRewards:[];
  state.customRewards.push({id:"custom_"+Date.now(),name,price,desc:desc||"پاداش سفارشی",icon});
  save();
  ["customRewardName","customRewardPrice","customRewardDesc"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=""});
  render();showToast("پاداش سفارشی اضافه شد.");
};
window.deleteCustomReward=function(id){
  if(!confirm("این پاداش سفارشی حذف شود؟"))return;
  state.customRewards=(state.customRewards||[]).filter(x=>String(x.id)!==String(id));
  save();render();showToast("پاداش حذف شد.");
};

/* ===================== BOSS ===================== */
function renderBosses(){
  const el=document.getElementById("bossHistory");if(!el)return;
  const arr=state.bosses||[];
  const countEl=document.getElementById("bossHistoryCount");
  if(countEl)countEl.textContent=fmt(arr.length)+" نبرد";
  if(!arr.length){el.innerHTML='<div class="boss-empty">هنوز نبرد غولی ثبت نشده است.</div>';return}
  el.innerHTML=arr.slice(0,20).map(b=>{
    const pct=b.total?Math.round(b.correct/b.total*100):0;
    return `<div class="boss-history-item">
      <div style="font-size:1.25rem">${SUBJECTS[b.subject]?.icon||"⚔️"}</div>
      <div style="min-width:0">
        <strong style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(SUBJECTS[b.subject]?.name||b.subject)} — ${esc(b.topic||"")}</strong>
        <small style="opacity:.7;margin-top:3px;display:block">${esc(b.level)} • ${b.date} • ${b.minutes} دقیقه</small>
      </div>
      <div style="text-align:left;white-space:nowrap"><b style="display:block">${pct}%</b><small style="opacity:.7">+${fmt(b.xp)} XP</small></div>
    </div>`;
  }).join("");
}
function fightBoss(){
  const level=document.getElementById("bossLevel").value;
  const subject=document.getElementById("bossSubject").value;
  const grade=document.getElementById("bossGrade").value;
  const topic=document.getElementById("bossTopic").value.trim()||"بدون موضوع";
  const total=Math.max(1,+document.getElementById("bossTotal").value||1);
  const correct=+document.getElementById("bossCorrect").value||0;
  const wrong=+document.getElementById("bossWrong").value||0;
  const blank=+document.getElementById("bossBlank").value||0;
  const minutes=+document.getElementById("bossMinutes").value||30;
  const pct=Math.round(correct/total*100);
  const levels={mini:90,boss:180,major:300,final:450};
  const xp=Math.round((levels[level]||180)*(.65+Math.min(1,pct/100)*.75)*(1+Math.min(state.streak,10)*.015));
  const bossGold=Math.min(100,Math.max(8,Math.round(xp/8)));
  const oldLevel=levelFromXP(state.playerXP);
  const s=state.subjects[subject];
  s.xp+=xp;s.level=levelFromXP(s.xp);s.episodes++;
  s.knowledge=Math.max(0,Math.min(100,s.knowledge+(pct>=70?2:pct>=50?0:-1)));
  s.accuracy=Math.max(0,Math.min(100,s.accuracy*.6+pct*.4));
  state.playerXP+=xp;state.gold+=bossGold;
  state.bosses=state.bosses||[];
  state.bosses.unshift({id:crypto.randomUUID(),date:today(),level,subject,grade,topic,total,correct,wrong,blank,minutes,pct,xp,gold:bossGold});
  const newLevel=levelFromXP(state.playerXP);save();render();showToast(`غول شکست خورد • +${fmt(xp)} XP • +${fmt(bossGold)} سکه مطالعه • ${pct}%`);if(newLevel>oldLevel)setTimeout(()=>showToast(`🎉 تبریک! به سطح ${fmt(newLevel)} رسیدی!`),500);
}
window.resetBossForm=function(){
  ["bossTopic"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=""});
  ["bossCorrect","bossWrong","bossBlank"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=0});
  const t=document.getElementById("bossTotal");if(t)t.value=20;
  const m=document.getElementById("bossMinutes");if(m)m.value=30;
};

/* ===================== LEITNER ===================== */
const LEITNER_INTERVALS={1:0,2:1,3:3,4:7,5:14};
function leitnerTodayKey(){return new Date().toISOString().slice(0,10)}
function leitnerNextDate(box){
  const d=new Date();d.setDate(d.getDate()+(LEITNER_INTERVALS[box]||0));
  return d.toISOString().slice(0,10);
}
function leitnerIsDue(c){return !c.nextReview||c.nextReview<=leitnerTodayKey()}
window.previewLeitnerImage=function(ev){
  const file=ev.target.files&&ev.target.files[0];
  const box=document.getElementById("leitnerImagePreview");
  if(!box)return;
  box.innerHTML="";
  if(!file)return;
  const r=new FileReader();
  r.onload=e=>{const img=document.createElement("img");img.src=e.target.result;box.appendChild(img)};
  r.readAsDataURL(file);
};
window.addLeitnerCard=function(){
  const word=document.getElementById("leitnerWord").value.trim();
  const meaning=document.getElementById("leitnerMeaning").value.trim();
  const subject=document.getElementById("leitnerSubject").value;
  const fileEl=document.getElementById("leitnerImage");
  const file=fileEl&&fileEl.files&&fileEl.files[0];
  if(!word){showToast("واژه را وارد کن.");return}
  const finalize=imgData=>{
    state.leitner.cards.unshift({
      id:"ltn_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),
      word,meaning,subject:subject||"",image:imgData||"",
      box:1,nextReview:leitnerTodayKey(),correct:0,wrong:0,createdAt:new Date().toISOString()
    });
    save();renderLeitner();
    document.getElementById("leitnerWord").value="";
    document.getElementById("leitnerMeaning").value="";
    if(fileEl)fileEl.value="";
    const prev=document.getElementById("leitnerImagePreview");if(prev)prev.innerHTML="";
    showToast("کارت اضافه شد.");
  };
  if(file){const r=new FileReader();r.onload=e=>finalize(e.target.result);r.onerror=()=>finalize("");r.readAsDataURL(file)}
  else finalize("");
};
window.deleteLeitnerCard=function(id){
  const c=(state.leitner.cards||[]).find(x=>x.id===id);if(!c)return;
  if(!confirm(`کارت «${c.word}» حذف شود؟`))return;
  state.leitner.cards=state.leitner.cards.filter(x=>x.id!==id);
  save();renderLeitner();showToast("کارت حذف شد.");
};
window.clearLeitner=function(){
  if(!(state.leitner.cards||[]).length){showToast("جعبه خالی است.");return}
  if(!confirm("همه کارت‌های لایتنر حذف شوند؟"))return;
  state.leitner.cards=[];save();renderLeitner();showToast("جعبه لایتنر خالی شد.");
};
window.startLeitnerReview=function(){
  const due=state.leitner.cards.filter(leitnerIsDue);
  const area=document.getElementById("leitnerReviewArea");
  if(!due.length){area.innerHTML='<div class="leitner-empty">🎉 امروز کارت سررسیدی نداری. فردا سر بزن.</div>';return}
  showLeitnerCard(due[0].id);
};
window.showLeitnerCard=function(id){
  const card=(state.leitner.cards||[]).find(c=>c.id===id);
  const area=document.getElementById("leitnerReviewArea");
  if(!card){area.innerHTML="";return}
  area.innerHTML=`<div class="leitner-review">
    <div class="skill-v7-eyebrow">REVIEW • جعبه ${card.box}</div>
    ${card.image?`<img src="${card.image}" alt="">`:""}
    <div class="word">${esc(card.word)}</div>
    <div class="meaning" id="leitnerAnswer" style="visibility:hidden">${esc(card.meaning||"—")}</div>
    <div class="answers">
      <button class="btn" onclick="revealLeitnerAnswer()">👁 نمایش پاسخ</button>
      <button class="btn primary" onclick="answerLeitner('${card.id}',true)">✓ درست بود</button>
      <button class="btn danger" onclick="answerLeitner('${card.id}',false)">✗ غلط بود</button>
      <button class="btn" onclick="document.getElementById('leitnerReviewArea').innerHTML=''">✕ بستن</button>
    </div>
  </div>`;
};
window.revealLeitnerAnswer=function(){
  const a=document.getElementById("leitnerAnswer");if(a)a.style.visibility="visible";
};
window.answerLeitner=function(id,correct){
  const card=(state.leitner.cards||[]).find(c=>c.id===id);if(!card)return;
  if(correct){card.correct++;card.box=Math.min(5,card.box+1)}
  else{card.wrong++;card.box=1}
  card.nextReview=leitnerNextDate(card.box);
  save();renderLeitner();
  showToast(correct?`✓ درست — جعبه ${card.box}`:"✗ غلط — برگشت به جعبه ۱");
  const nextDue=state.leitner.cards.find(c=>c.id!==id&&leitnerIsDue(c));
  if(nextDue)showLeitnerCard(nextDue.id);
  else document.getElementById("leitnerReviewArea").innerHTML='<div class="leitner-empty">✅ مرور امروز تمام شد.</div>';
};
window.renderLeitner=function(){
  const listEl=document.getElementById("leitnerList");
  const statsEl=document.getElementById("leitnerStats");
  if(!listEl)return;
  const cards=state.leitner.cards||[];
  const subjFilter=document.getElementById("leitnerFilterSubject");
  if(subjFilter){
    const usedSubjects=[...new Set(cards.map(c=>c.subject).filter(Boolean))];
    const cur=subjFilter.value||"all";
    subjFilter.innerHTML='<option value="all">همه دروس</option>'+
      usedSubjects.map(k=>`<option value="${k}">${SUBJECTS[k]?.name||k}</option>`).join("");
    if([...subjFilter.options].some(o=>o.value===cur))subjFilter.value=cur;
  }
  const counts={1:0,2:0,3:0,4:0,5:0};
  cards.forEach(c=>counts[c.box]=(counts[c.box]||0)+1);
  const dueCount=cards.filter(leitnerIsDue).length;
  if(statsEl)statsEl.innerHTML=`
    <div class="leitner-stat"><span>کل کارت‌ها</span><b>${cards.length}</b></div>
    <div class="leitner-stat"><span>سررسید امروز</span><b style="color:var(--warn)">${dueCount}</b></div>
    <div class="leitner-stat"><span>جعبه ۱</span><b>${counts[1]}</b></div>
    <div class="leitner-stat"><span>جعبه ۲-۴</span><b>${counts[2]+counts[3]+counts[4]}</b></div>
    <div class="leitner-stat"><span>مسلط (۵)</span><b style="color:var(--good)">${counts[5]}</b></div>`;
  const boxFilter=document.getElementById("leitnerFilterBox")?.value||"all";
  const subjF=document.getElementById("leitnerFilterSubject")?.value||"all";
  let arr=cards.slice();
  if(boxFilter==="due")arr=arr.filter(leitnerIsDue);
  else if(boxFilter!=="all")arr=arr.filter(c=>String(c.box)===String(boxFilter));
  if(subjF!=="all")arr=arr.filter(c=>c.subject===subjF);
  if(!arr.length){
    listEl.innerHTML=`<div class="leitner-empty" style="grid-column:1/-1">هنوز کارتی مطابق این فیلتر نداری.</div>`;
    return;
  }
  listEl.innerHTML=arr.map(c=>{
    const due=leitnerIsDue(c);
    return `<article class="leitner-card">
      ${c.image?`<img src="${c.image}" alt="">`:`<div class="ph">🖼️</div>`}
      <div>
        <b>${esc(c.word)}</b>
        <small>${esc(c.meaning||"—")}</small>
        ${c.subject?`<small>📚 ${esc(SUBJECTS[c.subject]?.name||c.subject)}</small>`:""}
        <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
          <span class="leitner-box-badge">جعبه ${c.box}</span>
          <span class="leitner-box-badge" style="background:rgba(83,230,166,.12);color:var(--good)">✓ ${c.correct}</span>
          <span class="leitner-box-badge" style="background:rgba(255,107,129,.12);color:var(--bad)">✗ ${c.wrong}</span>
        </div>
        ${due?`<span class="leitner-due">🔥 سررسید</span>`:`<small class="muted" style="margin-top:4px">سررسید: ${c.nextReview||"—"}</small>`}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${due?`<button class="btn primary" onclick="showLeitnerCard('${c.id}')">مرور</button>`:""}
        <button class="btn danger" onclick="deleteLeitnerCard('${c.id}')">حذف</button>
      </div>
    </article>`;
  }).join("");
};

/* ===================== ELECTRON CONFIG ===================== */
function getElectronConfigArray(z){
  const order=[
    ["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],
    ["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],
    ["7s",2],["5f",14],["6d",10],["7p",6]
  ];
  const EXC={
    24:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["3d",5],["4s",1]],
    29:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["3d",10],["4s",1]],
    41:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["4d",4],["5s",1]],
    42:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["4d",5],["5s",1]],
    44:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["4d",7],["5s",1]],
    45:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["4d",8],["5s",1]],
    46:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["4d",10]],
    47:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["4d",10],["5s",1]],
    57:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",1]],
    58:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",1],["5d",1]],
    64:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",7],["5d",1]],
    78:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",1],["4f",14],["5d",9]],
    79:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",1],["4f",14],["5d",10]],
    89:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],["7s",2],["5f",1]],
    90:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],["7s",2],["6d",2]],
    91:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],["7s",2],["5f",2],["6d",1]],
    92:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],["7s",2],["5f",3],["6d",1]],
    93:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],["7s",2],["5f",4],["6d",1]],
    96:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],["7s",2],["5f",7],["6d",1]],
    103:[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],["7s",2],["5f",14],["7p",1]]
  };
  if(EXC[z]) return EXC[z];
  const config=[];let rem=z;
  for(const [orb,cap] of order){
    if(rem<=0) break;
    const f=Math.min(cap,rem);
    config.push([orb,f]);rem-=f;
  }
  return config;
}
function formatElectronConfig(config){
  const fillOrder=["1s","2s","2p","3s","3p","4s","3d","4p","5s","4d","5p","6s","4f","5d","6p","7s","5f","6d","7p"];
  const rank=new Map(fillOrder.map((x,i)=>[x,i]));
  const ordered=[...(config||[])].sort((a,b)=>(rank.get(a[0])??999)-(rank.get(b[0])??999));
  return ordered.map(([orb,n])=> n===1 ? orb : `${orb}<sup>${n}</sup>`).join(" ");
}
function getShorthandConfig(z){
  if(z<=2) return "";
  const cores=[[2,"He"],[10,"Ne"],[18,"Ar"],[36,"Kr"],[54,"Xe"],[86,"Rn"]];
  let coreZ=0,coreName="";
  for(const [cz,cn] of cores){ if(cz<z){ coreZ=cz;coreName=cn; } }
  if(!coreZ) return "";
  const full=getElectronConfigArray(z);
  const core=getElectronConfigArray(coreZ);
  const coreMap={};core.forEach(([o,n])=>{coreMap[o]=n;});
  const res=[];
  full.forEach(([o,n])=>{const r=n-(coreMap[o]||0);if(r>0)res.push([o,r]);});
  return `[${coreName}] ` + formatElectronConfig(res);
}

/* ===================== PERIODIC TABLE ===================== */
const PERIODIC_ELEMENTS=[
  [1,"H","هیدروژن","nonmetal",1,1,1.008],[2,"He","هلیوم","noble",1,18,4.003],
  [3,"Li","لیتیوم","alkali",2,1,6.94],[4,"Be","بریلیم","alkaline",2,2,9.012],
  [5,"B","بور","metalloid",2,13,10.81],[6,"C","کربن","nonmetal",2,14,12.011],
  [7,"N","نیتروژن","nonmetal",2,15,14.007],[8,"O","اکسیژن","nonmetal",2,16,15.999],
  [9,"F","فلوئور","halogen",2,17,18.998],[10,"Ne","نئون","noble",2,18,20.180],
  [11,"Na","سدیم","alkali",3,1,22.990],[12,"Mg","منیزیم","alkaline",3,2,24.305],
  [13,"Al","آلومینیم","post",3,13,26.982],[14,"Si","سیلیسیم","metalloid",3,14,28.085],
  [15,"P","فسفر","nonmetal",3,15,30.974],[16,"S","گوگرد","nonmetal",3,16,32.06],
  [17,"Cl","کلر","halogen",3,17,35.45],[18,"Ar","آرگون","noble",3,18,39.948],
  [19,"K","پتاسیم","alkali",4,1,39.098],[20,"Ca","کلسیم","alkaline",4,2,40.078],
  [21,"Sc","اسکاندیم","transition",4,3,44.956],[22,"Ti","تیتانیم","transition",4,4,47.867],
  [23,"V","وانادیم","transition",4,5,50.942],[24,"Cr","کروم","transition",4,6,51.996],
  [25,"Mn","منگنز","transition",4,7,54.938],[26,"Fe","آهن","transition",4,8,55.845],
  [27,"Co","کبالت","transition",4,9,58.933],[28,"Ni","نیکل","transition",4,10,58.693],
  [29,"Cu","مس","transition",4,11,63.546],[30,"Zn","روی","transition",4,12,65.38],
  [31,"Ga","گالیم","post",4,13,69.723],[32,"Ge","ژرمانیم","metalloid",4,14,72.63],
  [33,"As","آرسنیک","metalloid",4,15,74.922],[34,"Se","سلنیم","nonmetal",4,16,78.971],
  [35,"Br","برم","halogen",4,17,79.904],[36,"Kr","کریپتون","noble",4,18,83.798],
  [37,"Rb","روبیدیم","alkali",5,1,85.468],[38,"Sr","استرانسیوم","alkaline",5,2,87.62],
  [39,"Y","ایتریم","transition",5,3,88.906],[40,"Zr","زیرکونیم","transition",5,4,91.224],
  [41,"Nb","نیوبیم","transition",5,5,92.906],[42,"Mo","مولیبدن","transition",5,6,95.95],
  [43,"Tc","تکنسیوم","transition",5,7,98],[44,"Ru","روتنیم","transition",5,8,101.07],
  [45,"Rh","رودیم","transition",5,9,102.906],[46,"Pd","پالادیم","transition",5,10,106.42],
  [47,"Ag","نقره","transition",5,11,107.868],[48,"Cd","کادمیم","transition",5,12,112.414],
  [49,"In","ایندیم","post",5,13,114.818],[50,"Sn","قلع","post",5,14,118.710],
  [51,"Sb","آنتیموان","metalloid",5,15,121.760],[52,"Te","تلوریم","metalloid",5,16,127.60],
  [53,"I","ید","halogen",5,17,126.904],[54,"Xe","گزنون","noble",5,18,131.293],
  [55,"Cs","سزیم","alkali",6,1,132.905],[56,"Ba","باریم","alkaline",6,2,137.327],
  [72,"Hf","هافنیم","transition",6,4,178.486],[73,"Ta","تانتال","transition",6,5,180.948],
  [74,"W","تنگستن","transition",6,6,183.84],[75,"Re","رنیوم","transition",6,7,186.207],
  [76,"Os","اسمیم","transition",6,8,190.23],[77,"Ir","ایریدیم","transition",6,9,192.217],
  [78,"Pt","پلاتین","transition",6,10,195.084],[79,"Au","طلا","transition",6,11,196.967],
  [80,"Hg","جیوه","transition",6,12,200.592],[81,"Tl","تالیم","post",6,13,204.38],
  [82,"Pb","سرب","post",6,14,207.2],[83,"Bi","بیسموت","post",6,15,208.980],
  [84,"Po","پولونیم","post",6,16,209],[85,"At","آستاتین","halogen",6,17,210],
  [86,"Rn","رادون","noble",6,18,222],[87,"Fr","فرانسیم","alkali",7,1,223],
  [88,"Ra","رادیم","alkaline",7,2,226],[104,"Rf","رادرفوردیم","transition",7,4,267],
  [105,"Db","دوبنیم","transition",7,5,268],[106,"Sg","سیبورگیم","transition",7,6,269],
  [107,"Bh","بوریم","transition",7,7,270],[108,"Hs","هاسیم","transition",7,8,269],
  [109,"Mt","مایتنریم","unknown",7,9,278],[110,"Ds","دارمشتاتیم","unknown",7,10,281],
  [111,"Rg","رونتگنیم","unknown",7,11,282],[112,"Cn","کوپرنیسیم","transition",7,12,285],
  [113,"Nh","نیهونیم","post",7,13,286],[114,"Fl","فلرویم","post",7,14,289],
  [115,"Mc","مسکوویم","post",7,15,290],[116,"Lv","لیورموریم","post",7,16,293],
  [117,"Ts","تنسین","halogen",7,17,294],[118,"Og","اوگانسون","noble",7,18,294],
  [57,"La","لانتان","lanthanide",9,3,138.905],[58,"Ce","سریم","lanthanide",9,4,140.116],
  [59,"Pr","پرازئودیم","lanthanide",9,5,140.908],[60,"Nd","نئودیم","lanthanide",9,6,144.242],
  [61,"Pm","پرومتیم","lanthanide",9,7,145],[62,"Sm","ساماریم","lanthanide",9,8,150.36],
  [63,"Eu","اروپیم","lanthanide",9,9,151.964],[64,"Gd","گادولینیم","lanthanide",9,10,157.25],
  [65,"Tb","تربیوم","lanthanide",9,11,158.925],[66,"Dy","دیسپروزیم","lanthanide",9,12,162.500],
  [67,"Ho","هولمیم","lanthanide",9,13,164.930],[68,"Er","اربیوم","lanthanide",9,14,167.259],
  [69,"Tm","تولیم","lanthanide",9,15,168.934],[70,"Yb","ایتربیم","lanthanide",9,16,173.045],
  [71,"Lu","لوتسیم","lanthanide",9,17,174.967],[89,"Ac","اکتینیم","actinide",10,3,227],
  [90,"Th","توریم","actinide",10,4,232.038],[91,"Pa","پروتاکتینیم","actinide",10,5,231.036],
  [92,"U","اورانیم","actinide",10,6,238.029],[93,"Np","نپتونیم","actinide",10,7,237],
  [94,"Pu","پلوتونیم","actinide",10,8,244],[95,"Am","امریسیم","actinide",10,9,243],
  [96,"Cm","کوریم","actinide",10,10,247],[97,"Bk","برکلیم","actinide",10,11,247],
  [98,"Cf","کالیفرنیم","actinide",10,12,251],[99,"Es","اینشتینیم","actinide",10,13,252],
  [100,"Fm","فرمیم","actinide",10,14,257],[101,"Md","مندلیفیم","actinide",10,15,258],
  [102,"No","نوبلیم","actinide",10,16,259],[103,"Lr","لورنسیم","actinide",10,17,262]
];
const PT_CAT_NAMES={
  alkali:"فلز قلیایی",alkaline:"فلز قلیایی خاکی",transition:"فلز واسطه",
  post:"فلز پس‌واسطه",metalloid:"شبه‌فلز",nonmetal:"نافلز",
  halogen:"هالوژن",noble:"گاز نجیب",lanthanide:"لانتانید",
  actinide:"اکتینید",unknown:"خواص نامعلوم"
};
function buildPeriodicTable(){
  const grid=document.getElementById("periodicTable");
  if(!grid) return;
  if(grid.dataset.built==="1") return;
  let html="";
  html+=`<div class="pt-element cat-ln-placeholder" style="grid-column:3;grid-row:6">57-71</div>`;
  html+=`<div class="pt-element cat-an-placeholder" style="grid-column:3;grid-row:7">89-103</div>`;
  PERIODIC_ELEMENTS.forEach(e=>{
    const [z,sym,nameFa,cat,row,col]=e;
    html+=`<div class="pt-element cat-${cat}" style="grid-column:${col};grid-row:${row}" data-z="${z}" onclick="showPeriodicDetail(${z})" title="${nameFa}">
      <span class="pt-z">${z}</span>
      <span class="pt-sym">${sym}</span>
      <span class="pt-name">${nameFa}</span>
    </div>`;
  });
  grid.innerHTML=html;
  grid.dataset.built="1";
}
window.showPeriodicDetail=function(z){
  const e=PERIODIC_ELEMENTS.find(x=>x[0]===z);
  if(!e) return;
  const [zNum,sym,nameFa,cat,row,col,mass]=e;
  const box=document.getElementById("ptDetail");
  if(!box) return;
  const full=getElectronConfigArray(zNum);
  const fullStr=formatElectronConfig(full);
  const shortStr=getShorthandConfig(zNum);
  box.className="pt-detail show";
  box.innerHTML=`
    <div class="pt-detail-head">
      <div class="pt-detail-sym" style="background:linear-gradient(135deg,rgba(110,231,255,.18),rgba(155,140,255,.18))">${sym}</div>
      <div class="pt-detail-info">
        <h3>${nameFa} <small style="font-weight:400">(${sym})</small></h3>
        <small>${PT_CAT_NAMES[cat]||cat} • دوره ${row<=7?row:"لانتانید/اکتینید"} • گروه ${col}</small>
      </div>
      <button class="btn" onclick="document.getElementById('ptDetail').classList.remove('show')">✕</button>
    </div>
    <div class="pt-detail-grid">
      <div class="pt-detail-item"><span>عدد اتمی</span><b>${zNum}</b></div>
      <div class="pt-detail-item"><span>جرم اتمی</span><b>${mass} u</b></div>
      <div class="pt-detail-item"><span>نماد</span><b>${sym}</b></div>
      <div class="pt-detail-item"><span>دسته</span><b>${PT_CAT_NAMES[cat]||cat}</b></div>
      <div class="pt-detail-item"><span>دوره</span><b>${row<=7?row:"—"}</b></div>
      <div class="pt-detail-item"><span>گروه</span><b>${col}</b></div>
    </div>
    <div class="pt-config-box">
      <div class="pt-config-row">
        <span class="pt-config-label">ترتیب پر شدن زیرلایه‌ها:</span>
        <span class="pt-config-value">1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f → 5d → 6p → 7s → 5f → 6d → 7p</span>
      </div>
      <div class="pt-config-row">
        <span class="pt-config-label">آرایش الکترونی (ترتیب پرشدن):</span>
        <span class="pt-config-value">${fullStr}</span>
      </div>
      ${shortStr?`<div class="pt-config-row">
        <span class="pt-config-label">آرایش الکترونی فشرده:</span>
        <span class="pt-config-value">${shortStr}</span>
      </div>`:""}
    </div>`;
};

/* ===================== TOOLBOX ===================== */
window.switchToolboxTab=function(tab){
  document.querySelectorAll(".toolbox-tab").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".tool-panel").forEach(p=>p.classList.remove("active"));
  const map={leitner:"toolLeitner",timer:"toolTimer",periodic:"toolPeriodic",noise:"toolNoise",notes:"toolNotes",formulas:"toolFormulas",calc:"toolCalc"};
  const btn=[...document.querySelectorAll(".toolbox-tab")].find(b=>b.getAttribute("onclick").includes(`'${tab}'`));
  const panel=document.getElementById(map[tab]);
  if(btn)btn.classList.add("active");
  if(panel)panel.classList.add("active");
  if(tab==="leitner")renderLeitner();
  if(tab==="timer"){populateStudyTimerSubjects();updateOfflineStudyTimer();}
  if(tab==="periodic")buildPeriodicTable();
  if(tab==="noise")renderNoiseTypes();
  if(tab==="notes"){populateQuickNoteSubjects();renderQuickNotes();}
  if(tab==="formulas")renderFormulaSheet("");
  if(tab==="calc"){buildCalcGrid();buildUnitConverter();}
};

/* ===================== NOISE / FOCUS SOUND ===================== */
let noiseCtx=null,noiseSourceNode=null,noiseGainNode=null,noisePlaying=false,noiseCurrentType="white",noiseAutoStopTimer=null;
const NOISE_TYPES=[
  {id:"white",label:"نویز سفید",desc:"صدای یکنواخت پرطیف، برای پوشاندن صداهای اطراف"},
  {id:"pink",label:"نویز صورتی",desc:"نرم‌تر از سفید، بیشتر روی فرکانس‌های پایین"},
  {id:"brown",label:"نویز قهوه‌ای",desc:"عمیق و آرام‌بخش‌تر، شبیه صدای رعد دور"}
];
function renderNoiseTypes(){
  const el=document.getElementById("noiseTypes");if(!el)return;
  el.innerHTML=NOISE_TYPES.map(n=>`<button type="button" class="noise-type-btn${n.id===noiseCurrentType?" active":""}" onclick="setNoiseType('${n.id}')">
    <b>${esc(n.label)}</b><span>${esc(n.desc)}</span>
  </button>`).join("");
}
function ensureNoiseAudio(){
  if(noiseCtx)return;
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return;
  noiseCtx=new AC();
  noiseGainNode=noiseCtx.createGain();
  const slider=document.getElementById("noiseVolume");
  noiseGainNode.gain.value=((slider?Number(slider.value):55)/100)*0.35;
  noiseGainNode.connect(noiseCtx.destination);
}
function buildNoiseBuffer(type){
  const bufferSize=2*noiseCtx.sampleRate;
  const buffer=noiseCtx.createBuffer(1,bufferSize,noiseCtx.sampleRate);
  const data=buffer.getChannelData(0);
  if(type==="white"){
    for(let i=0;i<bufferSize;i++)data[i]=Math.random()*2-1;
  }else if(type==="pink"){
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for(let i=0;i<bufferSize;i++){
      const w=Math.random()*2-1;
      b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520;
      b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980;
      const out=b0+b1+b2+b3+b4+b5+b6+w*0.5362;b6=w*0.115926;
      data[i]=out*0.11;
    }
  }else{
    let last=0;
    for(let i=0;i<bufferSize;i++){
      const w=Math.random()*2-1;
      last=(last+0.02*w)/1.02;
      data[i]=last*3.5;
    }
  }
  return buffer;
}
function startNoiseSource(){
  ensureNoiseAudio();
  if(!noiseCtx)return;
  if(noiseSourceNode){try{noiseSourceNode.stop();}catch(e){}noiseSourceNode.disconnect();}
  noiseSourceNode=noiseCtx.createBufferSource();
  noiseSourceNode.buffer=buildNoiseBuffer(noiseCurrentType);
  noiseSourceNode.loop=true;
  noiseSourceNode.connect(noiseGainNode);
  noiseSourceNode.start(0);
}
window.setNoiseType=function(type){
  noiseCurrentType=type;
  renderNoiseTypes();
  if(noisePlaying)startNoiseSource();
};
window.toggleNoisePlayback=function(){
  const btn=document.getElementById("noiseToggleBtn");
  const status=document.getElementById("noiseStatus");
  if(!noisePlaying){
    ensureNoiseAudio();
    if(!noiseCtx){if(status)status.textContent="مرورگر شما از پخش صدا پشتیبانی نمی‌کند.";return;}
    if(noiseCtx.state==="suspended")noiseCtx.resume();
    startNoiseSource();
    noisePlaying=true;
    if(btn){btn.textContent="⏸ توقف";btn.classList.add("active-noise")}
    if(status)status.textContent=`در حال پخش: ${esc((NOISE_TYPES.find(n=>n.id===noiseCurrentType)||{}).label||"")}`;
  }else{
    stopNoisePlayback();
  }
};
function stopNoisePlayback(){
  if(noiseSourceNode){try{noiseSourceNode.stop();}catch(e){}noiseSourceNode.disconnect();noiseSourceNode=null;}
  noisePlaying=false;
  const btn=document.getElementById("noiseToggleBtn");
  const status=document.getElementById("noiseStatus");
  if(btn){btn.textContent="▶ پخش";btn.classList.remove("active-noise")}
  if(status)status.textContent="در حال حاضر متوقف است.";
  if(noiseAutoStopTimer){clearTimeout(noiseAutoStopTimer);noiseAutoStopTimer=null;}
}
window.setNoiseVolume=function(v){
  ensureNoiseAudio();
  if(noiseGainNode)noiseGainNode.gain.value=(Number(v)/100)*0.35;
};
window.setNoiseAutoStop=function(mins){
  if(noiseAutoStopTimer){clearTimeout(noiseAutoStopTimer);noiseAutoStopTimer=null;}
  const m=Number(mins)||0;
  if(m>0)noiseAutoStopTimer=setTimeout(()=>{stopNoisePlayback();},m*60*1000);
};

/* ===================== QUICK NOTES ===================== */
function populateQuickNoteSubjects(){
  const sel=document.getElementById("quickNoteSubject");if(!sel)return;
  const cur=sel.value;
  const key=state.settings.selectedCurriculum||"";
  const keys=key?curriculumSubjectKeys(key):Object.keys(SUBJECTS);
  sel.innerHTML='<option value="">— بدون دسته —</option>'+keys.map(k=>`<option value="${k}">${esc(subjectDisplayName(k,key))}</option>`).join("");
  if(keys.includes(cur))sel.value=cur;
}
window.addQuickNote=function(){
  const ta=document.getElementById("quickNoteText");
  const sel=document.getElementById("quickNoteSubject");
  const text=(ta&&ta.value||"").trim();
  if(!text)return;
  state.quickNotes.unshift({id:"n"+Date.now()+Math.random().toString(36).slice(2,6),text:text.slice(0,500),subject:(sel&&sel.value)||"",createdAt:Date.now()});
  if(state.quickNotes.length>300)state.quickNotes.length=300;
  save();
  if(ta)ta.value="";
  renderQuickNotes();
  showToast("یادداشت ثبت شد.");
};
window.deleteQuickNote=function(id){
  state.quickNotes=state.quickNotes.filter(n=>n.id!==id);
  save();
  renderQuickNotes();
};
window.copyQuickNote=function(id){
  const n=state.quickNotes.find(x=>x.id===id);if(!n)return;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(n.text).then(()=>showToast("کپی شد.")).catch(()=>{});
  }
};
function renderQuickNotes(){
  const el=document.getElementById("quickNotesList");if(!el)return;
  const key=state.settings.selectedCurriculum||"";
  if(!state.quickNotes.length){el.innerHTML='<div class="empty">هنوز یادداشتی ثبت نشده.</div>';return}
  el.innerHTML=state.quickNotes.map(n=>{
    const subj=n.subject&&SUBJECTS[n.subject]?`<span class="pill">${esc(subjectDisplayName(n.subject,key))}</span>`:"";
    const d=new Date(n.createdAt);
    const when=Number.isFinite(n.createdAt)?d.toLocaleDateString("fa-IR")+" — "+d.toLocaleTimeString("fa-IR",{hour:"2-digit",minute:"2-digit"}):"";
    return `<div class="note-card">
      <div class="note-card-top">${subj}<span class="muted small">${when}</span></div>
      <div class="note-card-text">${esc(n.text)}</div>
      <div class="note-card-actions">
        <button class="btn" onclick="copyQuickNote('${n.id}')">📋 کپی</button>
        <button class="btn danger" onclick="deleteQuickNote('${n.id}')">🗑 حذف</button>
      </div>
    </div>`;
  }).join("");
}

/* ===================== FORMULA SHEET ===================== */
const FORMULA_SHEET=[
  {subject:"ریاضی",icon:"📐",groups:[
    {title:"جبر و معادلات",items:[
      {t:"معادله درجه دوم",f:"x = (−b ± √(b²−4ac)) / 2a"},
      {t:"تشخیص‌دهنده (دلتا)",f:"Δ = b² − 4ac"}
    ]},
    {title:"مثلثات",items:[
      {t:"اتحاد اصلی",f:"sin²θ + cos²θ = 1"},
      {t:"تانژانت",f:"tan θ = sin θ / cos θ"},
      {t:"فرمول جمع سینوس",f:"sin(a±b) = sin a·cos b ± cos a·sin b"},
      {t:"فرمول جمع کسینوس",f:"cos(a±b) = cos a·cos b ∓ sin a·sin b"}
    ]},
    {title:"مشتق",items:[
      {t:"توان",f:"(xⁿ)′ = n·xⁿ⁻¹"},
      {t:"سینوس و کسینوس",f:"(sin x)′ = cos x  ،  (cos x)′ = −sin x"},
      {t:"نمایی و لگاریتم طبیعی",f:"(eˣ)′ = eˣ  ،  (ln x)′ = 1/x"},
      {t:"قاعده ضرب",f:"(f·g)′ = f′g + fg′"},
      {t:"قاعده زنجیره‌ای",f:"(f(g(x)))′ = f′(g(x))·g′(x)"}
    ]},
    {title:"انتگرال",items:[
      {t:"توان",f:"∫xⁿ dx = xⁿ⁺¹/(n+1) + C"},
      {t:"1/x",f:"∫(1/x) dx = ln|x| + C"},
      {t:"نمایی",f:"∫eˣ dx = eˣ + C"},
      {t:"مثلثاتی",f:"∫sin x dx = −cos x + C  ،  ∫cos x dx = sin x + C"}
    ]},
    {title:"هندسه",items:[
      {t:"مساحت و محیط دایره",f:"A = πr²  ،  C = 2πr"},
      {t:"قضیه فیثاغورس",f:"a² + b² = c²"},
      {t:"حجم و سطح کره",f:"V = (4/3)πr³  ،  S = 4πr²"},
      {t:"حجم استوانه",f:"V = πr²h"},
      {t:"حجم مخروط",f:"V = (1/3)πr²h"}
    ]},
    {title:"آمار و احتمال",items:[
      {t:"میانگین",f:"x̄ = Σx / n"},
      {t:"واریانس",f:"σ² = Σ(x−x̄)² / n"},
      {t:"احتمال کلاسیک",f:"P(A) = حالت‌های مطلوب / کل حالت‌ها"},
      {t:"اجتماع دو پیشامد",f:"P(A∪B) = P(A) + P(B) − P(A∩B)"}
    ]}
  ]},
  {subject:"فیزیک",icon:"⚛️",groups:[
    {title:"سینماتیک",items:[
      {t:"سرعت بر حسب زمان",f:"v = v₀ + at"},
      {t:"جابه‌جایی",f:"x = x₀ + v₀t + ½at²"},
      {t:"رابطه سرعت-جابه‌جایی",f:"v² = v₀² + 2aΔx"}
    ]},
    {title:"دینامیک",items:[
      {t:"قانون دوم نیوتن",f:"F = m·a"},
      {t:"وزن",f:"W = m·g"},
      {t:"نیروی اصطکاک",f:"f = μN"}
    ]},
    {title:"کار و انرژی",items:[
      {t:"کار",f:"W = F·d·cosθ"},
      {t:"انرژی جنبشی",f:"KE = ½mv²"},
      {t:"انرژی پتانسیل گرانشی",f:"PE = mgh"},
      {t:"توان",f:"P = W / t"}
    ]},
    {title:"الکتریسیته",items:[
      {t:"قانون اهم",f:"V = IR"},
      {t:"توان الکتریکی",f:"P = VI = I²R = V²/R"},
      {t:"مقاومت‌های سری",f:"R = R₁ + R₂ + ..."},
      {t:"مقاومت‌های موازی",f:"1/R = 1/R₁ + 1/R₂ + ..."}
    ]},
    {title:"موج",items:[
      {t:"رابطه سرعت موج",f:"v = f·λ"},
      {t:"دوره تناوب",f:"T = 1/f"}
    ]}
  ]},
  {subject:"شیمی",icon:"🧪",groups:[
    {title:"مول و جرم",items:[
      {t:"تعداد مول",f:"n = m / M"},
      {t:"تعداد ذرات",f:"N = n × Nₐ   (Nₐ = 6.022×10²³)"}
    ]},
    {title:"غلظت",items:[
      {t:"غلظت مولار",f:"M = n / V(لیتر)"},
      {t:"درصد جرمی",f:"%w/w = (جرم حل‌شونده / جرم محلول) × 100"}
    ]},
    {title:"گازها",items:[
      {t:"معادله گاز کامل",f:"PV = nRT"},
      {t:"قانون بویل (دمای ثابت)",f:"P₁V₁ = P₂V₂"},
      {t:"قانون شارل (فشار ثابت)",f:"V₁/T₁ = V₂/T₂"}
    ]},
    {title:"استوکیومتری",items:[
      {t:"پایستگی جرم",f:"مجموع جرم واکنش‌دهنده‌ها = مجموع جرم فرآورده‌ها"},
      {t:"بازده درصدی",f:"بازده = (مقدار واقعی / مقدار نظری) × 100"}
    ]}
  ]}
];
window.renderFormulaSheet=function(query){
  const el=document.getElementById("formulaSheetList");if(!el)return;
  const q=(query||"").trim().toLowerCase();
  let html="";
  FORMULA_SHEET.forEach(subj=>{
    const groups=subj.groups.map(g=>{
      const items=g.items.filter(it=>!q||it.t.toLowerCase().includes(q)||it.f.toLowerCase().includes(q)||subj.subject.includes(q)||g.title.includes(q));
      if(!items.length)return "";
      return `<div class="formula-group">
        <div class="formula-group-title">${esc(g.title)}</div>
        ${items.map(it=>`<div class="formula-item"><span>${esc(it.t)}</span><b dir="ltr">${esc(it.f)}</b></div>`).join("")}
      </div>`;
    }).join("");
    if(groups)html+=`<div class="formula-subject"><h3>${subj.icon} ${esc(subj.subject)}</h3>${groups}</div>`;
  });
  el.innerHTML=html||'<div class="empty">فرمولی با این جست‌وجو پیدا نشد.</div>';
};

/* ===================== SCIENTIFIC CALCULATOR ===================== */
let calcExprValue="",calcAngleMode="deg";
const CALC_BUTTONS=[
  ["AC","DEL","(",")"],
  ["sin","cos","tan","√"],
  ["log","ln","π","e"],
  ["7","8","9","÷"],
  ["4","5","6","×"],
  ["1","2","3","−"],
  ["0",".","%","+"],
  ["x²","xʸ","=","="]
];
function buildCalcGrid(){
  const grid=document.getElementById("calcGrid");if(!grid||grid.dataset.built==="1")return;
  let html="";
  CALC_BUTTONS.forEach((row,ri)=>{
    row.forEach((b,ci)=>{
      if(ri===7&&ci===3)return;
      const span=(ri===7&&ci===2)?' style="grid-column:span 2"':"";
      const cls=["AC","DEL"].includes(b)?"calc-btn calc-op":(["÷","×","−","+","="].includes(b)?"calc-btn calc-op":"calc-btn");
      html+=`<button type="button" class="${cls}"${span} onclick="calcPress('${b.replace("'","\\'")}')">${b}</button>`;
    });
  });
  grid.innerHTML=html;
  grid.dataset.built="1";
}
window.setCalcAngleMode=function(mode){
  calcAngleMode=mode;
  const d=document.getElementById("calcDegBtn"),r=document.getElementById("calcRadBtn");
  if(d)d.classList.toggle("active",mode==="deg");
  if(r)r.classList.toggle("active",mode==="rad");
};
function calcUpdateScreen(){
  const s=document.getElementById("calcExpr");if(!s)return;
  s.value=calcExprValue||"0";
}
window.calcPress=function(b){
  if(b==="AC"){calcExprValue="";calcUpdateScreen();return}
  if(b==="DEL"){calcExprValue=calcExprValue.slice(0,-1);calcUpdateScreen();return}
  if(b==="="){calcEvaluate();return}
  if(b==="x²"){calcExprValue+="^2";calcUpdateScreen();return}
  if(b==="xʸ"){calcExprValue+="^";calcUpdateScreen();return}
  if(b==="√"){calcExprValue+="√(";calcUpdateScreen();return}
  if(["sin","cos","tan","log","ln"].includes(b)){calcExprValue+=b+"(";calcUpdateScreen();return}
  if(b==="π"){calcExprValue+="π";calcUpdateScreen();return}
  if(b==="e"){calcExprValue+="e";calcUpdateScreen();return}
  if(b==="÷"){calcExprValue+="/";calcUpdateScreen();return}
  if(b==="×"){calcExprValue+="*";calcUpdateScreen();return}
  if(b==="−"){calcExprValue+="-";calcUpdateScreen();return}
  calcExprValue+=b;
  calcUpdateScreen();
};
function calcEvaluate(){
  try{
    let expr=calcExprValue;
    if(!expr){return}
    if(!/^[0-9+\-*/^%().√πe a-z]*$/i.test(expr))throw new Error("bad chars");
    const openCount=(expr.match(/\(/g)||[]).length,closeCount=(expr.match(/\)/g)||[]).length;
    if(openCount>closeCount)expr+=")".repeat(openCount-closeCount);
    // ضرب ضمنی روی عبارت خام (قبل از تبدیل نام توابع)، تا با رقم داخل نام تابع مثل log10 تداخل نکند
    expr=expr.replace(/(\d)(\()/g,"$1*$2").replace(/(\))(\d)/g,"$1*$2").replace(/(\))(\()/g,"$1*$2");
    expr=expr.replace(/√\(/g,"Math.sqrt(");
    expr=expr.replace(/sin\(/g,"__sin(").replace(/cos\(/g,"__cos(").replace(/tan\(/g,"__tan(");
    expr=expr.replace(/log\(/g,"Math.log10(").replace(/ln\(/g,"Math.log(");
    expr=expr.replace(/π/g,"Math.PI").replace(/(?<![a-zA-Z])e(?![a-zA-Z(])/g,"Math.E");
    expr=expr.replace(/\^/g,"**");
    expr=expr.replace(/(\d)(Math\.)/g,"$1*$2");
    const toRad=x=>calcAngleMode==="deg"?x*Math.PI/180:x;
    const __sin=x=>Math.sin(toRad(x)),__cos=x=>Math.cos(toRad(x)),__tan=x=>Math.tan(toRad(x));
    // eslint-disable-next-line no-new-func
    const val=Function("Math","__sin","__cos","__tan",`"use strict";return (${expr});`)(Math,__sin,__cos,__tan);
    if(!Number.isFinite(val))throw new Error("invalid");
    calcExprValue=String(Math.round(val*1e10)/1e10);
    calcUpdateScreen();
  }catch(e){
    const s=document.getElementById("calcExpr");if(s)s.value="خطا در عبارت";
    calcExprValue="";
  }
}

/* ===================== UNIT CONVERTER ===================== */
const UNIT_CATEGORIES=[
  {id:"length",label:"طول",base:"m",units:{"میلی‌متر (mm)":0.001,"سانتی‌متر (cm)":0.01,"متر (m)":1,"کیلومتر (km)":1000,"اینچ (in)":0.0254,"فوت (ft)":0.3048,"مایل (mi)":1609.34}},
  {id:"mass",label:"جرم",base:"kg",units:{"میلی‌گرم (mg)":0.000001,"گرم (g)":0.001,"کیلوگرم (kg)":1,"تن (t)":1000,"پوند (lb)":0.453592,"اونس (oz)":0.0283495}},
  {id:"volume",label:"حجم",base:"l",units:{"میلی‌لیتر (ml)":0.001,"لیتر (l)":1,"متر مکعب (m³)":1000,"گالن (gal)":3.78541}},
  {id:"speed",label:"سرعت",base:"mps",units:{"متر بر ثانیه (m/s)":1,"کیلومتر بر ساعت (km/h)":0.277778,"مایل بر ساعت (mph)":0.44704}},
  {id:"time",label:"زمان",base:"s",units:{"ثانیه (s)":1,"دقیقه (min)":60,"ساعت (h)":3600,"روز":86400}},
  {id:"energy",label:"انرژی",base:"j",units:{"ژول (J)":1,"کیلوژول (kJ)":1000,"کالری (cal)":4.184,"کیلوکالری (kcal)":4184,"کیلووات‌ساعت (kWh)":3600000}},
  {id:"temp",label:"دما",base:"c",units:{"سلسیوس (°C)":"c","فارنهایت (°F)":"f","کلوین (K)":"k"}}
];
let convCurrentCat="length";
function buildUnitConverter(){
  const cats=document.getElementById("convCats");
  if(cats&&!cats.dataset.built){
    cats.innerHTML=UNIT_CATEGORIES.map(c=>`<button type="button" class="conv-cat-btn${c.id===convCurrentCat?" active":""}" onclick="setConverterCategory('${c.id}')">${esc(c.label)}</button>`).join("");
    cats.dataset.built="1";
  }
  populateConverterUnits();
}
window.setConverterCategory=function(id){
  convCurrentCat=id;
  document.querySelectorAll(".conv-cat-btn").forEach(b=>b.classList.remove("active"));
  const btn=[...document.querySelectorAll(".conv-cat-btn")].find(b=>b.getAttribute("onclick").includes(`'${id}'`));
  if(btn)btn.classList.add("active");
  populateConverterUnits();
};
function populateConverterUnits(){
  const cat=UNIT_CATEGORIES.find(c=>c.id===convCurrentCat);if(!cat)return;
  const fromSel=document.getElementById("convFromUnit"),toSel=document.getElementById("convToUnit");
  if(!fromSel||!toSel)return;
  const opts=Object.keys(cat.units).map(u=>`<option value="${esc(u)}">${esc(u)}</option>`).join("");
  fromSel.innerHTML=opts;toSel.innerHTML=opts;
  const keys=Object.keys(cat.units);
  if(keys.length>1)toSel.selectedIndex=1;
  runConversion();
}
function convertTemp(val,from,to){
  let c;
  if(from==="سلسیوس (°C)")c=val;
  else if(from==="فارنهایت (°F)")c=(val-32)*5/9;
  else c=val-273.15;
  if(to==="سلسیوس (°C)")return c;
  if(to==="فارنهایت (°F)")return c*9/5+32;
  return c+273.15;
}
window.runConversion=function(){
  const cat=UNIT_CATEGORIES.find(c=>c.id===convCurrentCat);if(!cat)return;
  const fromSel=document.getElementById("convFromUnit"),toSel=document.getElementById("convToUnit");
  const fromInput=document.getElementById("convFrom"),toInput=document.getElementById("convTo");
  if(!fromSel||!toSel||!fromInput||!toInput)return;
  const val=Number(fromInput.value);
  if(!Number.isFinite(val)){toInput.value="";return}
  let result;
  if(cat.id==="temp"){
    result=convertTemp(val,fromSel.value,toSel.value);
  }else{
    const base=val*cat.units[fromSel.value];
    result=base/cat.units[toSel.value];
  }
  toInput.value=String(Math.round(result*1e6)/1e6);
};
window.switchCalcSubtab=function(tab){
  document.querySelectorAll(".calc-subtab").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".calc-panel").forEach(p=>p.classList.remove("active"));
  document.getElementById(tab==="calc"?"calcSubtabCalc":"calcSubtabConv").classList.add("active");
  document.getElementById(tab==="calc"?"calcPanelCalc":"calcPanelConv").classList.add("active");
};

/* ===================== SETTINGS ===================== */
function syncUiToDefaults(){
  const c = state.settings.defaultCurriculum || state.settings.selectedCurriculum || "";
  const gr = state.settings.defaultGrade || "10";
  state.settings.selectedCurriculum = c;
  state.settings.weakCurriculum = c;
  state.settings.mockExamCurriculum = c;
  state.settings.dashboardGrade = gr;
  state.settings.checklistGrade = gr;
  state.settings.episodeGrade = gr;
  state.settings.statusGrade = gr;
  state.settings.skillGrade = gr;
  state.settings.weakGrade = gr;
  state.settings.mockExamGrade = gr;
  currentChecklistGrade = gr;
  const ids = ["dashboardCurriculum","checklistCurriculum","episodeCurriculum","statusCurriculum","weakCurriculum","mockExamCurriculum"];
  ids.forEach(id=>{const el=document.getElementById(id);if(el)el.value=c;});
  const gradeIds = ["dashboardGrade","checklistGrade","epGrade","statusGrade","weakGrade","mockExamGrade"];
  gradeIds.forEach(id=>{const el=document.getElementById(id);if(el)el.value=gr;});
  if(c) populateEpisodeSubjects(c);
  populateWeakSubjectSelect();
  populateRoutineSubjectSelect();
  populateMockExamSubjects();
  // تایمر هم باید بلافاصله از رشته/پایه پیش‌فرض جدید تغذیه شود؛
  // منتظر باز و بسته شدن دوباره تب ابزارها نمی‌مانیم.
  if(typeof populateStudyTimerSubjects === "function") populateStudyTimerSubjects();
  if(window.renderSkillHub) renderSkillHub();
  renderMiniSubjects();
  renderChecklist();
  render();
}
function saveSettings(){
  const name=document.getElementById("playerName").value.trim();
  const raw={
    t:document.getElementById("targetEpisodes").value,study:document.getElementById("studyMinutes").value,brk:document.getElementById("breakMinutes").value,
    c:document.getElementById("concoursWeight").value,f:document.getElementById("finalWeight").value,cap:document.getElementById("dailyXPSoftCap").value,gm:document.getElementById("goldMultiplier").value
  };
  if(Object.values(raw).some(v=>v==="")){showToast("همه گزینه‌های تنظیمات مطالعه را خودت مشخص کن.");return}
  const t=Math.max(1,Math.min(20,+raw.t));
  const study=Math.max(5,Math.min(180,+raw.study));
  const brk=Math.max(1,Math.min(60,+raw.brk));
  const c=Math.max(0,Math.min(100,+raw.c));
  const f=Math.max(0,Math.min(100,+raw.f));
  const cap=Math.max(100,Math.min(3000,+raw.cap));
  const gm=Math.max(.1,Math.min(5,+raw.gm));
  const fs=Math.max(12,Math.min(22,+document.getElementById("baseFontSize").value||16));
  const fw=Math.max(100,Math.min(900,+document.getElementById("fontWeight").value||400));
  const ff=document.getElementById("fontFamily").value;
const defCur=document.getElementById("defaultCurriculum").value||"";
const defGrade=document.getElementById("defaultGrade").value||"10";
const examDate=jalaliSelectsToISO("examDateDay","examDateMonth","examDateYear");
const planStartDate=jalaliSelectsToISO("planStartDateDay","planStartDateMonth","planStartDateYear");
if(c+f!==100){showToast("سهم کنکور و نهایی باید جمعاً ۱۰۰٪ باشند.");return}
state.settings=Object.assign(state.settings,{
  playerName:name,targetEpisodes:t,studyMinutes:study,breakMinutes:brk,
  concoursWeight:c,finalWeight:f,dailyXPSoftCap:cap,goldMultiplier:gm,
  autoGenerateQuests:false,
  studySettingsConfigured:true,
  desktopDensity:document.getElementById("desktopDensity").value,
  appTheme:document.getElementById("appTheme").value||"dark",
  baseFontSize:fs,baseFontWeight:fw,baseFontFamily:ff,
  defaultCurriculum:defCur,defaultGrade:defGrade,
  examDate:examDate,planStartDate:planStartDate
});
applyFontSize(fs);applyFontWeight(fw);applyFontFamily(ff);applyTheme(state.settings.appTheme||"dark");
save();
syncUiToDefaults();
applySettingsUI();loadSettingsForm();
render();
renderExamCountdown();
const st=document.getElementById("settingsStatus");if(st)st.textContent="تنظیمات با موفقیت ذخیره شد.";
  showToast("تنظیمات ذخیره و اعمال شد.");
}
function loadSettingsForm(){
  const x=state.settings;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v};
  set("playerName",x.playerName||"");
  set("targetEpisodes",x.targetEpisodes??"");
  set("studyMinutes",x.studyMinutes??"");
  set("breakMinutes",x.breakMinutes??"");
  set("concoursWeight",x.concoursWeight??"");
  set("finalWeight",x.finalWeight??"");
  set("dailyXPSoftCap",x.dailyXPSoftCap??"");
  set("goldMultiplier",x.goldMultiplier??"");
  set("desktopDensity",x.desktopDensity||"comfortable");
  set("appTheme",x.appTheme||localStorage.getItem("studyRPG_theme")||"dark");
  applyTheme(x.appTheme||localStorage.getItem("studyRPG_theme")||"dark");
  set("baseFontSize",String(x.baseFontSize||16));
  set("fontWeight",String(x.baseFontWeight||400));
  set("fontFamily",x.baseFontFamily||"'Vazirmatn', Tahoma, sans-serif");
set("defaultCurriculum",x.defaultCurriculum||x.selectedCurriculum||"");
set("defaultGrade",String(x.defaultGrade||x.dashboardGrade||"10"));
populateJalaliSelects("examDateDay","examDateMonth","examDateYear",x.examDate||"",1,3);
const planWrap=document.getElementById("planStartDateFields");if(planWrap)planWrap.style.display="flex";
populateJalaliSelects("planStartDateDay","planStartDateMonth","planStartDateYear",x.planStartDate||"",2,1);
applyFontSize(x.baseFontSize||16);
  applyFontWeight(x.baseFontWeight||400);
  applyFontFamily(x.baseFontFamily||"'Vazirmatn', Tahoma, sans-serif");
  applySettingsUI();
  renderExamCountdown();updateLastBackupInfo();updateNotifyRoutinesUI();
}
function applySettingsUI(){
  const x=state.settings;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  set("playerNameDisplay",(x.playerName||"").trim()||"بازیکن");
  set("dashboardTarget",x.targetEpisodes?`${x.targetEpisodes} پارت مطالعه`:"تنظیم نشده"); set("todayConcours",x.concoursWeight!=null?`${x.concoursWeight}%`:"—"); set("todayFinal",x.finalWeight!=null?`${x.finalWeight}%`:"—"); set("campaignConcoursWeight",x.concoursWeight!=null?`${x.concoursWeight}%`:"—"); set("campaignFinalWeight",x.finalWeight!=null?`${x.finalWeight}%`:"—");
  set("dashboardEpisodeFormat",x.studyMinutes!=null&&x.breakMinutes!=null?`${x.studyMinutes} دقیقه مطالعه + ${x.breakMinutes} دقیقه استراحت`:"تنظیم نشده");
  set("episodeFormatText",x.studyMinutes!=null&&x.breakMinutes!=null?`هر پارت مطالعه = ${x.studyMinutes} دقیقه مطالعه + ${x.breakMinutes} دقیقه استراحت.`:"مدت پارت مطالعه را از تنظیمات مشخص کن.");
  set("settingEpisodeFormat",x.studyMinutes!=null&&x.breakMinutes!=null?`${x.studyMinutes} + ${x.breakMinutes} دقیقه`:"تنظیم نشده");
  set("settingWeights",x.concoursWeight!=null&&x.finalWeight!=null?`${x.concoursWeight}% / ${x.finalWeight}%`:"تنظیم نشده");
  set("settingCapacity",x.targetEpisodes?`${x.targetEpisodes} پارت مطالعه`:"تنظیم نشده");
  set("settingAutoQuest","خاموش");
  set("settingFontSize",currentFontSizeLabel(x.baseFontSize||16));
  set("settingAppTheme",({dark:"تاریک",light:"روشن",harry:"هری پاتر"}[x.appTheme||"dark"]||"تاریک"));
set("settingFontWeight",currentFontWeightLabel(x.baseFontWeight||400));
const dcLabel = {experimental:"🧬 تجربی",mathematics:"📐 ریاضی",humanities:"📚 انسانی"}[x.defaultCurriculum||x.selectedCurriculum] || "—";
const dgLabel = {10:"دهم",11:"یازدهم",12:"دوازدهم"}[String(x.defaultGrade||"10")] || "—";
set("settingDefaultCurriculum",dcLabel);
set("settingDefaultGrade",dgLabel);
const epMin=document.getElementById("epMinutes");if(epMin)epMin.value=x.studyMinutes;
  document.body.dataset.density=x.desktopDensity||"comfortable";
  const dc=document.getElementById("dashboardCurriculum");if(dc)dc.value=x.selectedCurriculum||"";
  const ec=document.getElementById("episodeCurriculum");if(ec)ec.value=x.selectedCurriculum||"";
}
function populateWeakSubjectSelect(){
  const e=document.getElementById("manualWeakSubject");if(!e)return;
  const wcSel=document.getElementById("weakCurriculum");
  const wgSel=document.getElementById("weakGrade");
  const wc=state.settings.weakCurriculum||state.settings.selectedCurriculum||"";
  const wg=state.settings.weakGrade||"10";
  if(wcSel)wcSel.value=wc;
  if(wgSel)wgSel.value=wg;
  if(!wc){e.innerHTML='<option value="">ابتدا رشته را انتخاب کن</option>';return}
  const keys=curriculumSubjectKeys(wc).filter(k=>subjectMatchesGrade(k,wg));
  const cur=e.value;
  e.innerHTML='<option value="">خودکار (بر اساس عملکرد)</option>'+
    keys.map(k=>`<option value="${k}">${SUBJECTS[k].icon} ${subjectDisplayName(k,wc)}</option>`).join("");
  if([...e.options].some(o=>o.value===cur)) e.value=cur;
  else e.value=state.settings.manualWeakSubject||"";
}
window.setManualWeakSubject=function(v){
  state.settings.manualWeakSubject=v;save();render();
};
window.setEpisodeCurriculum=function(key){
  state.settings.selectedCurriculum=key||"";save();
  populateEpisodeSubjects(key);
  renderMiniSubjects();renderChecklist();
  populateStudyTimerSubjects();
  const dc=document.getElementById("dashboardCurriculum");if(dc)dc.value=key||"";
  const cc=document.getElementById("checklistCurriculum");if(cc)cc.value=key||"";
};
window.setEpisodeGrade=function(g){
  state.settings.episodeGrade=String(g||"10");save();
  populateEpisodeSubjects(state.settings.selectedCurriculum);
};
function populateEpisodeSubjects(key){
  const sel=document.getElementById("epSubject");if(!sel)return;
  const gradeSel=document.getElementById("epGrade");
  const gr=(gradeSel&&gradeSel.value)||state.settings.episodeGrade||"10";
  const badge=document.getElementById("episodeFieldBadge");
  if(!key){
    sel.innerHTML='<option value="">ابتدا رشته را انتخاب کن</option>';
    if(badge)badge.textContent="رشته انتخاب نشده";
    return;
  }
  const keys=curriculumSubjectKeys(key).filter(k=>{
    if(!CHECKLIST_TEMPLATES[k]) return false;
    return subjectMatchesGrade(k,gr);
  });
  if(!keys.length){
    sel.innerHTML='<option value="">درسی برای این پایه یافت نشد</option>';
  }else{
    sel.innerHTML=keys.map(k=>{
      const display=subjectDisplayName(k,key);
      return `<option value="${k}">${SUBJECTS[k].icon} ${display}</option>`;
    }).join("");
  }
  const label={experimental:"تجربی",mathematics:"ریاضی",humanities:"انسانی"}[key]||key;
  if(badge)badge.textContent=`رشته ${label}`;
}
function populateSelects(){
  const allOpts=Object.entries(SUBJECTS).map(([k,v])=>`<option value="${k}">${v.icon} ${v.name}</option>`).join("");
  const boss=document.getElementById("bossSubject");if(boss)boss.innerHTML=allOpts;
  const epType=document.getElementById("epType");if(epType)epType.innerHTML=Object.entries(TYPES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join("");
  const mqType=document.getElementById("manualQuestType");if(mqType)mqType.innerHTML=Object.entries(TYPES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join("");
  const ltSub=document.getElementById("leitnerSubject");
  if(ltSub)ltSub.innerHTML='<option value="">— بدون دسته —</option>'+allOpts;
}
function exportData(){
  state.settings.lastBackupAt=Date.now();
  save();
  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="study-rpg-backup.json";
  a.click();
  URL.revokeObjectURL(a.href);
  renderBackupReminder();updateLastBackupInfo();
  showToast("بکاپ دانلود شد.");
}
/* ===================== BACKUP REMINDER ===================== */
function renderBackupReminder(){
  const card=document.getElementById('backupReminderCard');if(!card)return;
  const hasData=(state.episodes||[]).length>0||(state.quests||[]).length>0||Object.keys(state.checklists||{}).length>0||(state.mockExams||[]).length>0;
  const now=Date.now();
  const snoozeUntil=state.settings.backupReminderSnoozeUntil||0;
  if(!hasData||now<snoozeUntil){card.style.display='none';return;}
  const last=state.settings.lastBackupAt;
  const days=last?Math.floor((now-last)/86400000):null;
  if(last!=null&&days<7){card.style.display='none';return;}
  const txt=document.getElementById('backupReminderText');
  if(txt)txt.textContent=last?`آخرین بکاپ ${fmt(days)} روز پیش بوده. برای جلوگیری از از دست رفتن XP و استریک، یک بکاپ تازه بگیر.`:'هنوز هیچ بکاپی نگرفتی. اگر مرورگر پاک شود یا گوشی عوض شود، همه اطلاعات از بین می‌رود.';
  card.style.display='';
}
function dismissBackupReminder(){
  state.settings.backupReminderSnoozeUntil=Date.now()+3*86400000;
  save();renderBackupReminder();
}
function updateLastBackupInfo(){
  const el=document.getElementById('lastBackupInfo');if(!el)return;
  const last=state.settings.lastBackupAt;
  if(!last){el.textContent='آخرین بکاپ: هنوز گرفته نشده.';return;}
  const days=Math.floor((Date.now()-last)/86400000);
  el.textContent=`آخرین بکاپ: ${days<=0?'امروز':days+' روز پیش'}`;
}
window.renderBackupReminder=renderBackupReminder;window.dismissBackupReminder=dismissBackupReminder;window.updateLastBackupInfo=updateLastBackupInfo;
function importData(ev){
  const f=ev.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    try{
      state=JSON.parse(r.result);
      state.settings=Object.assign(freshState().settings,state.settings||{});
      if(!state.leitner)state.leitner={cards:[]};
      if(!Array.isArray(state.leitner.cards))state.leitner.cards=[];
      if(!Array.isArray(state.customRewards))state.customRewards=[];
      if(!Array.isArray(state.classes))state.classes=[];
      if(!state.checklists)state.checklists={};
      if(!Array.isArray(state.customTasks))state.customTasks=[];
      if(!Array.isArray(state.hiddenTasks))state.hiddenTasks=[];
      if(!state.taskOverrides||typeof state.taskOverrides!=="object")state.taskOverrides={};
      if(!state.tasksDone||typeof state.tasksDone!=="object")state.tasksDone={};
if(!Array.isArray(state.routines))state.routines=[];
      if(!Array.isArray(state.mockExams))state.mockExams=[];
      if(!Array.isArray(state.mistakes))state.mistakes=[];
      Object.keys(SUBJECTS).forEach(k=>{if(!state.subjects[k])state.subjects[k]={xp:0,level:1,knowledge:0,accuracy:0,speed:0,retention:0,consistency:0,episodes:0,tests:0,correct:0,wrong:0,blank:0,topics:{}}});
      applyFontSize(state.settings.baseFontSize||16);
      applyFontWeight(state.settings.baseFontWeight||400);
      applyFontFamily(state.settings.baseFontFamily||"'Vazirmatn', Tahoma, sans-serif");
      ensureMistakes();ensureMockExams();
      save();populateSelects();loadSettingsForm();render();
syncUiToDefaults();
applyMoodToHeader();
renderExamCountdown();renderBackupReminder();updateNotifyRoutinesUI();updateLastBackupInfo();
showToast("Backup وارد شد.");
    }catch(e){showToast("فایل نامعتبر است.")}
  };
  r.readAsText(f);
}
function resetAll(){
  if(!confirm("تمام اطلاعات Study RPG حذف شود؟"))return;
  state=freshState();save();populateSelects();loadSettingsForm();render();
  applyMoodToHeader();
  showToast("سیستم ریست شد.");
}
function openEpisodeModal(){
  switchToPage('episodes');
  setTimeout(()=>document.getElementById("epSubject")?.focus(),80);
}

/* ===================== ROUTINES v1.24 ===================== */
function routineTypeLabel(type){return type==='study'?'📚 درسی':'🌱 غیردرسی';}
function localDateKey(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`;}
function routineDayNames(days){const names={0:'یکشنبه',1:'دوشنبه',2:'سه‌شنبه',3:'چهارشنبه',4:'پنجشنبه',5:'جمعه',6:'شنبه'};return (Array.isArray(days)?days:[]).sort((a,b)=>((a+1)%7)-((b+1)%7)).map(d=>names[d]||'').filter(Boolean).join('، ')||'بدون روز تکرار';}
function routineDateIsScheduled(r,date){return Array.isArray(r.days)&&r.days.includes(date.getDay());}
function routineChecked(r,dateKey){return !!(state.routineChecks[dateKey]&&state.routineChecks[dateKey][r.id]);}
function toggleRoutineDone(id,dateKey=localDateKey()){const r=state.routines.find(x=>x.id===id);if(!r)return;if(!state.routineChecks[dateKey])state.routineChecks[dateKey]={};state.routineChecks[dateKey][id]=!routineChecked(r,dateKey);save();renderRoutines();}
function routineRecentDays(){const out=[];for(let i=6;i>=0;i--){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-i);out.push(d);}return out;}
function routineDayShort(d){return ['ی','د','س','چ','پ','ج','ش'][d.getDay()];}
function renderRoutines(){const list=document.getElementById('routineList'),count=document.getElementById('routineCount');if(!list)return;const arr=Array.isArray(state.routines)?state.routines:[];if(count)count.textContent=fmt(arr.length)+' روتین';if(!arr.length){list.innerHTML='<div class="routine-empty">هنوز روتینی نساختی. از فرم کنار صفحه اولین روتینت را اضافه کن.</div>';return;}const todayKey=localDateKey(),recent=routineRecentDays();list.innerHTML=arr.map(r=>{const checked=routineChecked(r,todayKey);const subject=r.subject?subjectDisplayName(r.subject,state.settings.selectedCurriculum||'experimental'):'';return `<div class="routine-item ${r.active===false?'off':''}"><div class="routine-icon">${r.type==='study'?'📚':'🌱'}</div><div class="routine-main"><div class="routine-title">${esc(r.name)}</div><div class="routine-meta"><span>${routineTypeLabel(r.type)}</span>${subject?`<span>📘 ${esc(subject)}</span>`:''}<span>🗓 ${esc(routineDayNames(r.days))}</span><span>⏰ ${esc(r.time||'بدون ساعت')}</span><span>⏱ ${fmt(r.duration||0)} دقیقه</span></div>${r.note?`<div class="routine-note">${esc(r.note)}</div>`:''}<div class="routine-week"><span class="week-label">۷ روز اخیر</span>${recent.map(d=>{const key=localDateKey(d),done=routineChecked(r,key),scheduled=routineDateIsScheduled(r,d);return `<button class="routine-day ${done?'done':''} ${scheduled?'scheduled':'not-scheduled'}" title="${key}" onclick="toggleRoutineDone('${r.id}','${key}')"><span>${routineDayShort(d)}</span><b>${done?'✓':'·'}</b></button>`}).join('')}</div></div><div class="routine-actions"><button class="btn ${checked?'primary':''}" onclick="toggleRoutineDone('${r.id}')">${checked?'✓ امروز انجام شد':'☐ تیک امروز'}</button><button class="btn" onclick="toggleRoutine('${r.id}')">${r.active===false?'▶ فعال':'⏸ غیرفعال'}</button><button class="btn danger" onclick="deleteRoutine('${r.id}')">🗑 حذف</button></div></div>`;}).join('');}
let editingRoutineId=null;
function clearRoutineForm(){editingRoutineId=null;['routineName','routineTime','routineNote'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});const d=document.getElementById('routineDuration');if(d)d.value=30;const t=document.getElementById('routineType');if(t)t.value='study';const sub=document.getElementById('routineSubject');if(sub)sub.value='';document.querySelectorAll('#routineDays input').forEach(x=>x.checked=false);toggleRoutineStudyField();const b=document.getElementById('routineSaveBtn');if(b)b.textContent='＋ افزودن روتین';}
function populateRoutineSubjectSelect(){const sel=document.getElementById('routineSubject');if(!sel)return;const c=state.settings.selectedCurriculum||state.settings.defaultCurriculum||'experimental',g=state.settings.dashboardGrade||state.settings.defaultGrade||'10';const keys=curriculumSubjectKeys(c).filter(k=>state.subjects[k]&&subjectMatchesGrade(k,g,c));const cur=sel.value;sel.innerHTML='<option value="">انتخاب درس...</option>'+keys.map(k=>`<option value="${k}">${SUBJECTS[k]?.icon||'📘'} ${esc(subjectDisplayName(k,c))}</option>`).join('');if(cur&&keys.includes(cur))sel.value=cur;}
function toggleRoutineStudyField(){const field=document.getElementById('routineStudyField'),type=document.getElementById('routineType');if(field)field.style.display=type?.value==='nonstudy'?'none':'';}
function readRoutineForm(){const name=(document.getElementById('routineName')?.value||'').trim(),type=document.getElementById('routineType')?.value==='nonstudy'?'nonstudy':'study';let duration=Math.round(Number(document.getElementById('routineDuration')?.value)||30);duration=Math.max(1,Math.min(1440,duration));const time=document.getElementById('routineTime')?.value||'',note=(document.getElementById('routineNote')?.value||'').trim().slice(0,180),subject=type==='study'?(document.getElementById('routineSubject')?.value||''):'';const days=[...document.querySelectorAll('#routineDays input:checked')].map(x=>Number(x.value));return{name,type,duration,time,note,subject,days};}
function addRoutine(){const f=readRoutineForm();if(!f.name){showToast('عنوان روتین را وارد کن.');return;}if(f.type==='study'&&!f.subject){showToast('برای روتین درسی یک درس انتخاب کن.');return;}if(!f.days.length){showToast('حداقل یک روز برای روتین انتخاب کن.');return;}if(editingRoutineId){const r=state.routines.find(x=>x.id===editingRoutineId);if(r)Object.assign(r,f);showToast('روتین ویرایش شد.');}else{state.routines.push({id:'rt_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),...f,active:true,createdAt:Date.now(),order:state.routines.length});showToast('روتین اضافه شد.');}save();renderRoutines();clearRoutineForm();}
function editRoutine(id){const r=state.routines.find(x=>x.id===id);if(!r)return;editingRoutineId=id;document.getElementById('routineName').value=r.name||'';document.getElementById('routineType').value=r.type||'study';populateRoutineSubjectSelect();document.getElementById('routineSubject').value=r.subject||'';document.getElementById('routineTime').value=r.time||'';document.getElementById('routineDuration').value=r.duration||30;document.getElementById('routineNote').value=r.note||'';document.querySelectorAll('#routineDays input').forEach(x=>x.checked=(r.days||[]).includes(Number(x.value)));toggleRoutineStudyField();const b=document.getElementById('routineSaveBtn');if(b)b.textContent='💾 ذخیره ویرایش';document.getElementById('routineName')?.focus();showToast('حالت ویرایش فعال شد.');}
function moveRoutine(id,dir){const arr=state.routines||[],i=arr.findIndex(r=>r.id===id),j=i+dir;if(i<0||j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];arr.forEach((r,n)=>r.order=n);save();renderRoutines();}
function toggleRoutine(id){const r=state.routines.find(x=>x.id===id);if(!r)return;r.active=r.active===false;save();renderRoutines();}
function deleteRoutine(id){const r=state.routines.find(x=>x.id===id);if(!r)return;if(!confirm(`روتین «${r.name}» حذف شود؟`))return;state.routines=state.routines.filter(x=>x.id!==id);Object.keys(state.routineChecks).forEach(k=>{delete state.routineChecks[k][id];if(!Object.keys(state.routineChecks[k]).length)delete state.routineChecks[k];});if(editingRoutineId===id)clearRoutineForm();state.routines.forEach((x,n)=>x.order=n);save();renderRoutines();showToast('روتین حذف شد.');}
function renderRoutines(){const list=document.getElementById('routineList'),count=document.getElementById('routineCount');if(!list)return;const arr=Array.isArray(state.routines)?state.routines:[];arr.sort((a,b)=>(a.order??0)-(b.order??0));if(count)count.textContent=fmt(arr.length)+' روتین';if(!arr.length){list.innerHTML='<div class="routine-empty">هنوز روتینی نساختی. از فرم کنار صفحه اولین روتینت را اضافه کن.</div>';return;}const todayKey=localDateKey(),recent=routineRecentDays();list.innerHTML=arr.map((r,idx)=>{const checked=routineChecked(r,todayKey),subject=r.subject?subjectDisplayName(r.subject,state.settings.selectedCurriculum||'experimental'):'';return `<div class="routine-item ${r.active===false?'off':''}"><div class="routine-icon">${r.type==='study'?'📚':'🌱'}</div><div class="routine-main"><div class="routine-title">${esc(r.name)}</div><div class="routine-meta"><span>${routineTypeLabel(r.type)}</span>${subject?`<span>📘 ${esc(subject)}</span>`:''}<span>🗓 ${esc(routineDayNames(r.days))}</span><span>⏰ ${esc(r.time||'بدون ساعت')}</span><span>⏱ ${fmt(r.duration||0)} دقیقه</span></div>${r.note?`<div class="routine-note">${esc(r.note)}</div>`:''}<div class="routine-week"><span class="week-label">۷ روز اخیر</span>${recent.map(d=>{const key=localDateKey(d),done=routineChecked(r,key),scheduled=routineDateIsScheduled(r,d);return `<button class="routine-day ${done?'done':''} ${scheduled?'scheduled':'not-scheduled'}" title="${key}" onclick="toggleRoutineDone('${r.id}','${key}')"><span>${routineDayShort(d)}</span><b>${done?'✓':'·'}</b></button>`}).join('')}</div></div><div class="routine-actions"><button class="btn ${checked?'primary':''}" onclick="toggleRoutineDone('${r.id}')">${checked?'✓ امروز انجام شد':'☐ تیک امروز'}</button><button class="btn" onclick="editRoutine('${r.id}')" title="ویرایش این روتین">✏️ ویرایش</button><div class="routine-order-actions" title="جابه‌جایی ترتیب در برنامه فعال"><button class="btn" onclick="moveRoutine('${r.id}',-1)" ${idx===0?'disabled':''}>↑ بالا</button><button class="btn" onclick="moveRoutine('${r.id}',1)" ${idx===arr.length-1?'disabled':''}>↓ پایین</button></div><button class="btn" onclick="toggleRoutine('${r.id}')">${r.active===false?'▶ فعال':'⏸ غیرفعال'}</button><button class="btn danger" onclick="deleteRoutine('${r.id}')">🗑 حذف</button></div></div>`;}).join('');}
window.renderRoutines=renderRoutines;window.addRoutine=addRoutine;window.editRoutine=editRoutine;window.moveRoutine=moveRoutine;window.toggleRoutine=toggleRoutine;window.deleteRoutine=deleteRoutine;window.clearRoutineForm=clearRoutineForm;window.toggleRoutineDone=toggleRoutineDone;window.toggleRoutineStudyField=toggleRoutineStudyField;

/* ===================== PWA: MANIFEST + SERVICE WORKER ===================== */
(function setupPWA(){
  try{
    const iconSvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0" y1="0" x2="200" y2="200"><stop offset="0" stop-color="#6ee7ff"/><stop offset="1" stop-color="#9b8cff"/></linearGradient></defs><rect width="200" height="200" rx="42" fill="url(#g)"/><text x="100" y="138" font-size="112" text-anchor="middle" font-family="sans-serif">📚</text></svg>`;
    const iconUri="data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(iconSvg)));
    const manifest={
      name:"درس بخون! - سیستم مطالعه کنکور",
      short_name:"درس بخون",
      start_url:".",
      display:"standalone",
      background_color:"#0b1020",
      theme_color:"#121a2e",
      orientation:"portrait",
      icons:[
        {src:iconUri,sizes:"192x192",type:"image/svg+xml",purpose:"any"},
        {src:iconUri,sizes:"512x512",type:"image/svg+xml",purpose:"any"}
      ]
    };
    const link=document.createElement("link");
    link.rel="manifest";
    link.href="data:application/manifest+json,"+encodeURIComponent(JSON.stringify(manifest));
    document.head.appendChild(link);
    let appleIcon=document.querySelector('link[rel="apple-touch-icon"]');
    if(!appleIcon){appleIcon=document.createElement("link");appleIcon.rel="apple-touch-icon";document.head.appendChild(appleIcon);}
    appleIcon.href=iconUri;
  }catch(e){console.warn("PWA manifest setup failed",e);}
  try{
    if("serviceWorker" in navigator && (location.protocol==="https:"||location.hostname==="localhost")){
      const swCode=`
        const CACHE='darsbekhon-v1';
        self.addEventListener('install',e=>{self.skipWaiting();});
        self.addEventListener('activate',e=>{self.clients.claim();});
        self.addEventListener('fetch',e=>{
          if(e.request.method!=='GET')return;
          e.respondWith(
            caches.open(CACHE).then(async cache=>{
              const cached=await cache.match(e.request);
              const fetchPromise=fetch(e.request).then(res=>{
                if(res && res.status===200){ cache.put(e.request,res.clone()); }
                return res;
              }).catch(()=>cached);
              return cached||fetchPromise;
            })
          );
        });
      `;
      const blob=new Blob([swCode],{type:"application/javascript"});
      const swUrl=URL.createObjectURL(blob);
      navigator.serviceWorker.register(swUrl,{scope:"./"}).catch(e=>console.warn("SW register failed",e));
    }
  }catch(e){console.warn("PWA service worker setup failed",e);}
})();

/* ===================== ROUTINE NOTIFICATIONS ===================== */
let routineNotifyTimer=null;
function updateNotifyRoutinesUI(){
  const btn=document.getElementById("notifyRoutinesBtn");
  const status=document.getElementById("notifyRoutinesStatus");
  const on=!!state.settings.notifyRoutines;
  if(btn)btn.textContent=on?"🔕 غیرفعال‌سازی یادآوری روتین‌ها":"🔔 فعال‌سازی یادآوری روتین‌ها";
  if(status){
    const perm=(typeof Notification!=="undefined")?Notification.permission:"—";
    status.textContent="وضعیت: "+(on?`فعال (مجوز مرورگر: ${perm})`:"غیرفعال");
  }
}
async function toggleRoutineNotifications(){
  if(state.settings.notifyRoutines){
    state.settings.notifyRoutines=false;save();
    stopRoutineNotifyLoop();
    updateNotifyRoutinesUI();
    showToast("یادآوری روتین‌ها خاموش شد.");
    return;
  }
  if(typeof Notification==="undefined"){showToast("مرورگر شما از نوتیفیکیشن پشتیبانی نمی‌کند.");return;}
  let perm=Notification.permission;
  if(perm==="default")perm=await Notification.requestPermission();
  if(perm!=="granted"){showToast("اجازه نوتیفیکیشن داده نشد.");return;}
  state.settings.notifyRoutines=true;save();
  startRoutineNotifyLoop();
  updateNotifyRoutinesUI();
  showToast("یادآوری روتین‌ها فعال شد؛ تا برنامه باز است، سر ساعت یادآوری می‌گیری.");
}
function startRoutineNotifyLoop(){
  stopRoutineNotifyLoop();
  routineNotifyTimer=setInterval(checkRoutineNotifications,30000);
  checkRoutineNotifications();
}
function stopRoutineNotifyLoop(){if(routineNotifyTimer){clearInterval(routineNotifyTimer);routineNotifyTimer=null;}}
function checkRoutineNotifications(){
  if(!state.settings.notifyRoutines||typeof Notification==="undefined"||Notification.permission!=="granted")return;
  const now=new Date();
  const nowHM=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0");
  const dateKey=localDateKey(now);
  if(!state.routineNotifiedLog||state.routineNotifiedLog.date!==dateKey){
    state.routineNotifiedLog={date:dateKey,ids:{}};
  }
  let fired=false;
  (state.routines||[]).forEach(r=>{
    if(r.active===false||!r.time||!Array.isArray(r.days)||!r.days.includes(now.getDay()))return;
    if(r.time!==nowHM)return;
    if(state.routineNotifiedLog.ids[r.id])return;
    try{
      new Notification("⏰ یادآوری روتین",{
        body:`وقت «${r.name}» رسیده${r.subject?` (${subjectDisplayName(r.subject,state.settings.selectedCurriculum)})`:""}`,
        tag:"routine_"+r.id
      });
    }catch(e){}
    state.routineNotifiedLog.ids[r.id]=true;
    fired=true;
  });
  if(fired)save();
}
window.toggleRoutineNotifications=toggleRoutineNotifications;window.updateNotifyRoutinesUI=updateNotifyRoutinesUI;

/* ===================== INIT ===================== */
if(!state.checklistVersion||state.checklistVersion<10){
  state.checklistVersion=10;
  save();
}
applyFontSize(state.settings.baseFontSize||16);
applyFontWeight(state.settings.baseFontWeight||400);
applyFontFamily(state.settings.baseFontFamily||"'Vazirmatn', Tahoma, sans-serif");
populateSelects();
currentChecklistGrade=String(state.settings.checklistGrade||state.settings.defaultGrade||"10");
syncUiToDefaults();
loadSettingsForm();
applyMoodToHeader();
const _defaultCur=document.getElementById("defaultCurriculum");
const _defaultGrade=document.getElementById("defaultGrade");
if(_defaultCur)_defaultCur.addEventListener("change",()=>{
  state.settings.defaultCurriculum=_defaultCur.value||"experimental";
  syncUiToDefaults();save();
  showToast("رشته پیش‌فرض در همه‌ی بخش‌ها به‌روزرسانی شد.");
});
if(_defaultGrade)_defaultGrade.addEventListener("change",()=>{
  state.settings.defaultGrade=String(_defaultGrade.value||"10");
  syncUiToDefaults();save();
  showToast("پایه پیش‌فرض در همه‌ی بخش‌ها به‌روزرسانی شد.");
});
const _epGrade=document.getElementById("epGrade");
if(_epGrade)_epGrade.value=String(state.settings.episodeGrade||"10");
if(state.settings.selectedCurriculum){
  populateEpisodeSubjects(state.settings.selectedCurriculum);
}
buildPeriodicTable();
populateRoutineSubjectSelect();
const _rt=document.getElementById("routineType");if(_rt)_rt.addEventListener("change",toggleRoutineStudyField);
toggleRoutineStudyField();
ensureMistakes();populateMistakeSubjects();
ensureMockExams();populateMockExamSubjects();
render();
loadOfflineStudyTimer();
renderExamCountdown();
renderBackupReminder();
updateLastBackupInfo();
updateNotifyRoutinesUI();
updateFeedbackSoundUI();
if(state.settings.notifyRoutines && typeof Notification!=="undefined" && Notification.permission==="granted"){
  startRoutineNotifyLoop();
}

const _ps=document.getElementById("pageSelect");
if(_ps){
  const activePage=document.querySelector(".page.active");
  if(activePage)_ps.value=activePage.id;
}

/* ===================== SUBJECT DROPDOWN PATCH (based on official book list) ===================== */
(function(){
  // --- افزودن درس «تفکر و سواد رسانه‌ای» که در کد قبلی نبود ---
  if(typeof SUBJECTS !== "undefined" && !SUBJECTS.mediaLiteracy){
    SUBJECTS.mediaLiteracy = {name:"تفکر و سواد رسانه‌ای", icon:"📱", mode:"final"};
  }
  if(!state.subjects.mediaLiteracy){
    state.subjects.mediaLiteracy = {xp:0,level:1,knowledge:0,accuracy:0,speed:0,retention:0,consistency:0,episodes:0,tests:0,correct:0,wrong:0,blank:0,marked:0,topics:{}};
  }

  // --- داده‌ها: [base key, icon, label] ---
  const STUDY_SUBJECT_OPTIONS = {
    experimental: {
      "10": [
        ["biology","🧬","زیست‌شناسی ۱"],["physics","⚛️","فیزیک ۱"],["chemistry","⚗️","شیمی ۱"],["math","🧮","ریاضی ۱"],
        ["persian","📖","فارسی ۱"],["dini","📜","دین و زندگی ۱ (ریاضی و تجربی)"],["arabic","📝","عربی ۱ (ریاضی و تجربی)"],["english","🔤","انگلیسی ۱"],
        ["defensePrep","🛡️","آمادگی دفاعی"],["mediaLiteracy","📱","تفکر و سواد رسانه‌ای"],["geographyIran","🗺️","جغرافیا ایران"]
      ],
      "11": [
        ["biology","🧬","زیست‌شناسی ۲"],["physics","⚛️","فیزیک ۲"],["chemistry","⚗️","شیمی ۲"],["math","🧮","ریاضی ۲"],["geology","🌍","زمین‌شناسی (جامع)"],
        ["persian","📖","فارسی ۲"],["dini","📜","دین و زندگی ۲ (ریاضی و تجربی)"],["arabic","📝","عربی ۲ (ریاضی و تجربی)"],["english","🔤","انگلیسی ۲"],
        ["humanEnvironment","🌍","انسان و محیط زیست"],["contemporaryHistory","📜","تاریخ معاصر"]
      ],
      "12": [
        ["biology","🧬","زیست‌شناسی ۱ و ۲ (پایه)"],["biology","🧬","زیست‌شناسی ۳ (دوازدهم)"],
        ["physics","⚛️","فیزیک ۱ و ۲ (پایه)"],["physics","⚛️","فیزیک ۳ (دوازدهم)"],
        ["chemistry","⚗️","شیمی ۱ و ۲ (پایه)"],["chemistry","⚗️","شیمی ۳ (دوازدهم)"],
        ["math","🧮","ریاضی ۱ و ۲ (پایه)"],["math","🧮","ریاضی ۳ (دوازدهم)"],
        ["geology","🌍","زمین‌شناسی (جامع)"],
        ["persian","📖","فارسی ۳"],["dini","📜","دین و زندگی ۳ (ریاضی و تجربی)"],["arabic","📝","عربی ۳ (ریاضی و تجربی)"],["english","🔤","انگلیسی ۳"],
        ["health","❤️‍🩹","سلامت و بهداشت"],["identity","🧑‍🤝‍🧑","هویت اجتماعی"]
      ]
    },
    mathematics: {
      "10": [
        ["math","🧮","ریاضی ۱"],["geometry","📐","هندسه ۱"],["physics","⚛️","فیزیک ۱"],["chemistry","⚗️","شیمی ۱"],
        ["persian","📖","فارسی ۱"],["dini","📜","دین و زندگی ۱ (ریاضی و تجربی)"],["arabic","📝","عربی ۱ (ریاضی و تجربی)"],["english","🔤","انگلیسی ۱"],
        ["defensePrep","🛡️","آمادگی دفاعی"],["mediaLiteracy","📱","تفکر و سواد رسانه‌ای"],["geographyIran","🗺️","جغرافیا ایران"]
      ],
      "11": [
        ["calculus","∫","حسابان ۱"],["geometry","📐","هندسه ۲"],["statistics","📊","آمار و احتمال"],["physics","⚛️","فیزیک ۲"],["chemistry","⚗️","شیمی ۲"],
        ["persian","📖","فارسی ۲"],["dini","📜","دین و زندگی ۲ (ریاضی و تجربی)"],["arabic","📝","عربی ۲ (ریاضی و تجربی)"],["english","🔤","انگلیسی ۲"],
        ["humanEnvironment","🌍","انسان و محیط زیست"],["contemporaryHistory","📜","تاریخ معاصر"]
      ],
      "12": [
        ["math","🧮","ریاضی ۱ و حسابان ۱ (پایه)"],["calculus","∫","حسابان ۲ (دوازدهم)"],
        ["geometry","📐","هندسه ۱ و ۲ (پایه)"],["geometry","📐","هندسه ۳ (دوازدهم)"],
        ["statistics","📊","آمار و احتمال"],["discrete","🔢","ریاضیات گسسته"],
        ["physics","⚛️","فیزیک ۱ و ۲ (پایه)"],["physics","⚛️","فیزیک ۳ (دوازدهم)"],
        ["chemistry","⚗️","شیمی ۱ و ۲ (پایه)"],["chemistry","⚗️","شیمی ۳ (دوازدهم)"],
        ["persian","📖","فارسی ۳"],["dini","📜","دین و زندگی ۳ (ریاضی و تجربی)"],["arabic","📝","عربی ۳ (ریاضی و تجربی)"],["english","🔤","انگلیسی ۳"],
        ["health","❤️‍🩹","سلامت و بهداشت"],["identity","🧑‍🤝‍🧑","هویت اجتماعی"]
      ]
    },
    humanities: {
      "10": [
        ["mathStats","📊","ریاضی و آمار ۱"],["literaryArts","✒️","علوم و فنون ادبی ۱"],["sociology","👥","جامعه‌شناسی ۱"],
        ["arabicSpec","📗","عربی تخصصی ۱"],["history","🏛️","تاریخ ۱"],["geographyIran","🗺️","جغرافیا ایران"],["logic","🔎","منطق"],
        ["persian","📖","فارسی ۱"],["dini","📜","دین و زندگی ۱ (انسانی)"],["english","🔤","انگلیسی ۱"],
        ["defensePrep","🛡️","آمادگی دفاعی"],["mediaLiteracy","📱","تفکر و سواد رسانه‌ای"]
      ],
      "11": [
        ["mathStats","📊","ریاضی و آمار ۲"],["literaryArts","✒️","علوم و فنون ادبی ۲"],["sociology","👥","جامعه‌شناسی ۲"],
        ["psychology","🧠","روان‌شناسی"],["arabicSpec","📗","عربی تخصصی ۲"],["history","🏛️","تاریخ ۲"],["geography","🗺️","جغرافیا ۲"],["philosophy","💭","فلسفه ۱"],
        ["persian","📖","فارسی ۲"],["dini","📜","دین و زندگی ۲ (انسانی)"],["english","🔤","انگلیسی ۲"],
        ["humanEnvironment","🌍","انسان و محیط زیست"]
      ],
      "12": [
        ["mathStats","📊","ریاضی و آمار ۱ و ۲ (پایه)"],["mathStats","📊","ریاضی و آمار ۳ (دوازدهم)"],
        ["literaryArts","✒️","علوم و فنون ادبی ۱ و ۲ (پایه)"],["literaryArts","✒️","علوم و فنون ادبی ۳ (دوازدهم)"],["literaryArts","🖋️","آرایه‌های ادبی"],
        ["sociology","👥","جامعه‌شناسی ۱ و ۲ (پایه)"],["sociology","👥","جامعه‌شناسی ۳ (دوازدهم)"],
        ["psychology","🧠","روان‌شناسی"],
        ["arabicSpec","📗","عربی تخصصی ۱ و ۲ (پایه)"],["arabicSpec","📗","عربی تخصصی ۳ (دوازدهم)"],
        ["history","🏛️","تاریخ ۱ و ۲ (پایه)"],["history","🏛️","تاریخ ۳ (دوازدهم)"],
        ["geography","🗺️","جغرافیا ۱ و ۲ (پایه)"],["geography","🗺️","جغرافیا ۳ (دوازدهم)"],
        ["logic","🔎","منطق"],["philosophy","💭","فلسفه ۱"],["philosophy","💭","فلسفه ۲"],["economics","💰","اقتصاد"],
        ["persian","📖","فارسی ۳"],["dini","📜","دین و زندگی ۳ (انسانی)"],["english","🔤","انگلیسی ۳"],
        ["health","❤️‍🩹","سلامت و بهداشت"],["culturalAnalysis","🎭","تحلیل فرهنگی"]
      ]
    }
  };

  const escAttr = s => String(s||"").replace(/"/g,'&quot;');

  // ---------- پارت های مطالعه ----------
  window.populateEpisodeSubjects = function(key){
    const sel = document.getElementById("epSubject");
    if(!sel) return;
    const gradeSel = document.getElementById("epGrade");
    const gr = String((gradeSel && gradeSel.value) || state.settings.episodeGrade || "10");
    const badge = document.getElementById("episodeFieldBadge");
    if(!key){
      sel.innerHTML = '<option value="">ابتدا رشته را انتخاب کن</option>';
      if(badge) badge.textContent = "رشته انتخاب نشده";
      return;
    }
    const list = STUDY_SUBJECT_OPTIONS[key] && STUDY_SUBJECT_OPTIONS[key][gr];
    if(!list || !list.length){
      sel.innerHTML = '<option value="">درسی برای این پایه یافت نشد</option>';
      return;
    }
    sel.innerHTML = list.map(([base, icon, label]) =>
      `<option value="${base}" data-label="${escAttr(label)}" data-icon="${icon}">${icon} ${label}</option>`
    ).join("");
    const curLabel = {experimental:"تجربی",mathematics:"ریاضی",humanities:"انسانی"}[key] || key;
    if(badge) badge.textContent = `رشته ${curLabel}`;
  };

  // override addEpisode برای ذخیره label اختصاصی
  window.addEpisode = function(){
    const sel = document.getElementById("epSubject");
    const opt = sel && sel.selectedOptions && sel.selectedOptions[0];
    const subject = sel ? sel.value : "";
    const subjectLabel = opt ? (opt.dataset.label || opt.textContent) : "";
    if(!subject){ showToast("ابتدا رشته و درس را انتخاب کن."); return; }
    const type = document.getElementById("epType").value;
    const tests = +document.getElementById("epTests").value || 0;
    const correct = +document.getElementById("epCorrect").value || 0;
    const wrong = +document.getElementById("epWrong").value || 0;
    const blank = +document.getElementById("epBlank").value || 0;
    const marked = +document.getElementById("epMarked").value || 0;
    const q = document.getElementById("epQuality").value;
    const d = document.getElementById("epDifficulty").value;
    const analysis = document.getElementById("epAnalysis").value === "yes";
    let completion = 1;
    const minutes = +document.getElementById("epMinutes").value || 50;
    const targetMinutes = +state.settings.studyMinutes || 50;
    const ratio = minutes / targetMinutes;
    if(ratio < .5) completion = .3;
    else if(ratio < .8) completion = .6;
    else if(ratio < .96) completion = .85;
    const oldLevel = levelFromXP(state.playerXP);
    if(q === "poor") state.combo = 0;
    else state.combo = Math.min(6, state.combo + 1);
    updateStreak();
    let { xp, gold } = calculateStudyRewards({ type, quality:q, difficulty:d, minutes, tests, analysis, completion, subject });
    const beforeTodayXP = dayXP(), cap = +state.settings.dailyXPSoftCap || 500;
    if(beforeTodayXP >= cap) xp = Math.round(xp * .5);
    else if(beforeTodayXP + xp > cap) xp = Math.round((cap - beforeTodayXP) + (xp - (cap - beforeTodayXP)) * .75);
    const accuracy = tests ? Math.max(0, correct / tests * 100) : 0;
    const e = {
      id: crypto.randomUUID(), date: today(),
      time: new Date().toLocaleTimeString("fa-IR",{hour:"2-digit",minute:"2-digit"}),
      subject, subjectLabel,
      grade: document.getElementById("epGrade").value,
      topic: document.getElementById("epTopic").value || "بدون موضوع",
      type, minutes, tests, correct, wrong, blank, marked, analysis, quality:q, difficulty:d, xp, gold, combo: state.combo
    };
    state.episodes.unshift(e);
    state.playerXP += xp; state.gold += gold; state.lastQuality = qualityName(q);
    if(!state.subjects[subject]) state.subjects[subject] = {xp:0,level:1,knowledge:0,accuracy:0,speed:0,retention:0,consistency:0,episodes:0,tests:0,correct:0,wrong:0,blank:0,marked:0,topics:{}};
    const s = state.subjects[subject];
    s.xp += xp; s.level = levelFromXP(s.xp); s.episodes++;
    s.tests += tests; s.correct += correct; s.wrong += wrong; s.blank += blank;
    if(marked > 0) s.marked = (s.marked || 0) + marked;
    const k = q === "poor" ? -.5 : q === "exceptional" ? 2 : q === "excellent" ? 1.5 : q === "good" ? 1 : .5;
    s.knowledge = Math.max(0, Math.min(100, s.knowledge + k + (type === "learn" ? 2 : type === "review" ? 1 : 0)));
    if(tests) s.accuracy = Math.max(0, Math.min(100, s.accuracy * .7 + accuracy * .3));
    if(type === "timed") s.speed = Math.min(100, s.speed + 2);
    if(type === "review") s.retention = Math.min(100, s.retention + 4);
    s.consistency = Math.min(100, s.consistency + .8);
    if(e.topic){
      s.topics[e.topic] ||= {retention:50, last:today(), seen:0};
      s.topics[e.topic].seen++;
      s.topics[e.topic].last = today();
      s.topics[e.topic].retention = Math.min(100, s.topics[e.topic].retention + 15);
    }
    state.energy = Math.max(0, state.energy - Math.max(2, Math.round(minutes / 6)));
    state.hp = Math.max(1, state.hp - (q === "poor" ? 2 : 0));
    const newLevel = levelFromXP(state.playerXP);
    save(); render();
    showToast(`+${fmt(xp)} XP • +${fmt(gold)} سکه مطالعه`);
    if(newLevel > oldLevel) setTimeout(() => showToast(`🎉 تبریک! به سطح ${fmt(newLevel)} رسیدی!`), 500);
  };

  // override renderEpisodes برای نمایش label دقیق
  window.renderEpisodes = function(){
    const el = document.getElementById("episodeList"); if(!el) return;
    const arr = state.episodes.slice(0, 40);
    if(!arr.length){ el.innerHTML = '<div class="empty">هنوز پارت مطالعه‌ای ثبت نشده.</div>'; return; }
    el.innerHTML = arr.map(e => {
      const v = SUBJECTS[e.subject] || {icon:"📘", name:e.subject};
      const displayName = e.subjectLabel || v.name;
      return `<div class="episode ${e.quality === "poor" ? "" : "done"}">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
          <b>${v.icon} ${esc(displayName)} — ${esc(e.topic)}</b>
          <span class="tag">${TYPES[e.type]?.name || e.type}</span>
        </div>
        <div class="muted small">${e.date} • ${e.time} • ${e.minutes} دقیقه • ${e.tests} تست • ${e.correct}/${e.tests||0} درست${e.marked ? ` • ✏️ ${e.marked} علامت‌دار` : ""}</div>
        <div style="display:flex;justify-content:space-between;margin-top:7px">
          <span class="good">+${fmt(e.xp)} XP</span>
          <span class="warn">+${e.gold} سکه</span>
          <span>کیفیت: ${qualityName(e.quality)}</span>
        </div></div>`;
    }).join("");
  };

  // ---------- غول بازی ----------
  // تزریق فیلد «رشته» قبل از فیلد «درس»
  const bossSubjSelect = document.getElementById("bossSubject");
  const bossFormGrid = bossSubjSelect ? bossSubjSelect.closest(".formgrid") : null;
  if(bossFormGrid && !document.getElementById("bossCurriculum")){
    const cur = state.settings.selectedCurriculum || "experimental";
    const wrap = document.createElement("div");
    wrap.innerHTML = `<label>رشته</label>
      <select id="bossCurriculum" onchange="window.setBossCurriculum(this.value)">
        <option value="experimental" ${cur==="experimental"?"selected":""}>🧬 تجربی</option>
        <option value="mathematics" ${cur==="mathematics"?"selected":""}>📐 ریاضی</option>
        <option value="humanities" ${cur==="humanities"?"selected":""}>📚 انسانی</option>
      </select>`;
    bossFormGrid.insertBefore(wrap, bossSubjSelect.parentElement);
  }

  window.populateBossSubjects = function(){
    const sel = document.getElementById("bossSubject");
    if(!sel) return;
    const cur = document.getElementById("bossCurriculum")?.value || state.settings.selectedCurriculum || "experimental";
    const gradeRaw = document.getElementById("bossGrade")?.value || "دوازدهم";
    const gradeMap = { "دهم":"10", "یازدهم":"11", "دوازدهم":"12" };
    const gr = gradeMap[gradeRaw] || String(state.settings.dashboardGrade || "10");
    const list = STUDY_SUBJECT_OPTIONS[cur] && STUDY_SUBJECT_OPTIONS[cur][gr];
    if(!list || !list.length){
      sel.innerHTML = '<option value="">درسی یافت نشد</option>';
      return;
    }
    // حذف تکراری‌های label
    const seen = new Set();
    const unique = list.filter(([, , l]) => {
      if(seen.has(l)) return false;
      seen.add(l);
      return true;
    });
    sel.innerHTML = unique.map(([base, icon, label]) =>
      `<option value="${base}" data-label="${escAttr(label)}" data-icon="${icon}">${icon} ${label}</option>`
    ).join("");
  };

  window.setBossCurriculum = function(v){
    const el = document.getElementById("bossCurriculum");
    if(el) el.value = v;
    state.settings.bossCurriculum = v;
    window.populateBossSubjects();
  };

  const bossGradeEl = document.getElementById("bossGrade");
  if(bossGradeEl) bossGradeEl.addEventListener("change", () => window.populateBossSubjects());

  // populating اولیه
  if(state.settings.selectedCurriculum){
    window.populateEpisodeSubjects(state.settings.selectedCurriculum);
  }
  window.populateBossSubjects();

  save();
  console.log("✅ Subject dropdown patch applied");
})();

/* ===================== TASK EDIT PATCH (v-patch-1) ===================== */
(function(){
  if(!Array.isArray(state.hiddenTasks)) state.hiddenTasks = [];

  window.getAllTasks = function(){
    const overrides = state.taskOverrides || {};
    const hidden = Array.isArray(state.hiddenTasks) ? state.hiddenTasks : [];
    const defaults = DEFAULT_TASKS.filter(t => !hidden.includes(t.id))
      .map(t => overrides[t.id] ? Object.assign({}, t, overrides[t.id]) : t);
    return defaults.concat(state.customTasks || []);
  };

  let editingTaskId = null;

  window.openTaskEditModal = function(id){
    const t = getAllTasks().find(x => x.id === id); if(!t) return;
    editingTaskId = id;
    document.getElementById('taskEditName').value = t.name || '';
    document.getElementById('taskEditXP').value = t.xp || 5;
    document.getElementById('taskEditGold').value = t.gold || 2;
    document.getElementById('taskEditModal').classList.add('show');
    setTimeout(() => document.getElementById('taskEditName')?.focus(), 50);
  };
  window.closeTaskEditModal = function(){
    const m = document.getElementById('taskEditModal'); if(m) m.classList.remove('show');
    editingTaskId = null;
  };
  window.saveTaskEdit = function(){
    if(!editingTaskId) return;
    const name = (document.getElementById('taskEditName').value || '').trim();
    if(!name){ showToast('نام تسک نمی‌تواند خالی باشد.'); return; }
    const xp = Math.max(1, Math.round(+document.getElementById('taskEditXP').value || 5));
    const gold = Math.max(0, Math.round(+document.getElementById('taskEditGold').value || 0));
    if(String(editingTaskId).startsWith('ct_')){
      const ct = (state.customTasks || []).find(x => x.id === editingTaskId);
      if(ct){ ct.name = name; ct.xp = xp; ct.gold = gold; }
    } else {
      if(!state.taskOverrides || typeof state.taskOverrides !== 'object') state.taskOverrides = {};
      state.taskOverrides[editingTaskId] = { name, xp, gold };
    }
    save(); render(); closeTaskEditModal(); showToast('تسک ویرایش شد.');
  };
  window.deleteTask = function(id){
    const t = getAllTasks().find(x => x.id === id); if(!t) return;
    if(!confirm(`تسک «${t.name}» حذف شود؟`)) return;
    if(String(id).startsWith('ct_')){
      state.customTasks = (state.customTasks || []).filter(x => x.id !== id);
    } else {
      if(!Array.isArray(state.hiddenTasks)) state.hiddenTasks = [];
      if(!state.hiddenTasks.includes(id)) state.hiddenTasks.push(id);
    }
    if(state.tasksDone) delete state.tasksDone[id];
    if(state.taskOverrides) delete state.taskOverrides[id];
    save(); render(); showToast('تسک حذف شد.');
  };
  window.deleteTaskFromModal = function(){
    if(!editingTaskId) return;
    const id = editingTaskId;
    closeTaskEditModal();
    deleteTask(id);
  };

  window.renderTasks = function(){
    const grid = document.getElementById("tasksGrid");
    const summary = document.getElementById("tasksSummary");
    if(!grid) return;
    const all = getAllTasks();
    const doneCount = all.filter(t => isTaskDoneToday(t.id)).length;
    const totalXP = all.filter(t => isTaskDoneToday(t.id)).reduce((a, t) => a + t.xp, 0);
    const totalGold = all.filter(t => isTaskDoneToday(t.id)).reduce((a, t) => a + t.gold, 0);
    if(summary) summary.innerHTML = `
      <div class="ts-item"><b>${doneCount}/${all.length}</b><span>انجام‌شده</span></div>
      <div class="ts-item"><b style="color:var(--accent)">${totalXP}</b><span>XP امروز</span></div>
      <div class="ts-item"><b style="color:var(--warn)">${totalGold}</b><span>سکه امروز</span></div>`;
    grid.innerHTML = Object.entries(TASK_CATS).map(([catId, cat]) => {
      const catTasks = all.filter(t => t.cat === catId);
      const doneCountCat = catTasks.filter(t => isTaskDoneToday(t.id)).length;
      const pct = catTasks.length ? Math.round(doneCountCat / catTasks.length * 100) : 0;
      return `<div class="task-cat">
        <div class="task-cat-head">
          <h3>${cat.icon} ${cat.name}</h3>
          <span class="task-cat-pct">${doneCountCat}/${catTasks.length} • ${pct}%</span>
        </div>
        <div class="task-list">
          ${catTasks.map(t => {
            const done = isTaskDoneToday(t.id);
            return `<div class="task-item ${done ? "done" : ""}" onclick="toggleTask('${t.id}')">
              <div class="task-check"></div>
              <div class="task-info">
                <span class="task-name"><span class="task-icon">${t.icon || "⭐"}</span>${esc(t.name)}</span>
              </div>
              <div class="task-reward" onclick="event.stopPropagation()">
                <span class="tr-xp">+${t.xp} XP</span>
                <span class="tr-gold">+${t.gold} 💰</span>
                <div style="display:flex;gap:3px;justify-content:flex-end;margin-top:2px">
                  <span class="task-edit" onclick="event.stopPropagation();openTaskEditModal('${t.id}')" title="ویرایش">✏️</span>
                  <span class="task-delete" onclick="event.stopPropagation();deleteTask('${t.id}')" title="حذف">🗑</span>
                </div>
              </div>
            </div>`;
          }).join("")}
        </div>
        <div class="task-add-row">
          <input class="tn" id="taskName_${catId}" maxlength="60" placeholder="تسک جدید...">
          <input class="tx" id="taskXP_${catId}" type="number" min="1" value="5" title="XP">
          <input class="tg" id="taskGold_${catId}" type="number" min="0" value="2" title="سکه">
          <button class="btn primary" onclick="addCustomTask('${catId}')">➕</button>
        </div>
      </div>`;
    }).join("");
  };

  if(typeof renderTasks === 'function') renderTasks();

  console.log('✅ Task edit patch applied');
})();

/* ===================== YPT-inspired additions (v-patch-2) =====================
   1) Study heatmap (calendar-style)
   2) Subject ranking / leaderboard
   3) 10-minute daily planner
   4) Pomodoro cycle mode + distraction-commitment for the focus timer
================================================================================= */
(function(){

  /* ---------- shared state bootstrap ---------- */
  if(!state.dailyPlans || typeof state.dailyPlans!=="object") state.dailyPlans={};
  if(!state.pomodoroCycles || typeof state.pomodoroCycles!=="object") state.pomodoroCycles={};
  if(!state.focusStats || typeof state.focusStats!=="object") state.focusStats={sessions:0,kept:0};
  if(typeof state.settings.pomodoroMode!=="boolean") state.settings.pomodoroMode=false;

  /* ===================== 1) STUDY HEATMAP ===================== */
  function dayMinutesMap(){
    const map={};
    (state.episodes||[]).forEach(e=>{
      const k=String(e.date||"").slice(0,10); if(!k) return;
      map[k]=(map[k]||0)+(+e.minutes||0);
    });
    return map;
  }
  window.renderStudyHeatmap=function(){
    const wrap=document.getElementById("studyHeatmap"); if(!wrap) return;
    const WEEKS=18, DAYS=WEEKS*7;
    const map=dayMinutesMap();
    const now=new Date(); now.setHours(12,0,0,0);
    const endDow=(now.getDay()+1)%7; // 0=Sat ... 6=Fri (Persian week)
    const pad=6-endDow;
    const totalCells=DAYS+pad;
    const start=new Date(now); start.setDate(start.getDate()-(totalCells-1));
    const cells=[];
    for(let i=0;i<totalCells;i++){
      const d=new Date(start); d.setDate(d.getDate()+i);
      const key=d.toISOString().slice(0,10);
      cells.push({date:d,key,minutes:map[key]||0,future:d>now});
    }
    const weeks=[];
    for(let i=0;i<cells.length;i+=7) weeks.push(cells.slice(i,i+7));
    const maxMinutes=Math.max(1,...cells.map(c=>c.minutes));
    const levelOf=m=>{ if(!m) return 0; const r=m/maxMinutes; return r<.25?1:r<.5?2:r<.75?3:4; };
    const dayNames=["ش","ی","د","س","چ","پ","ج"];
    let grid=`<div class="heatmap-scroll"><div class="heatmap-grid">
      <div class="heatmap-daylabels">${dayNames.map(n=>`<span>${n}</span>`).join("")}</div>
      <div class="heatmap-weeks">`;
    weeks.forEach(w=>{
      grid+=`<div class="heatmap-week">`;
      w.forEach(c=>{
        if(c.future){grid+=`<span class="heatmap-cell future"></span>`;return;}
        const tip=`${c.date.toLocaleDateString("fa-IR",{day:"numeric",month:"long"})} • ${c.minutes?fmt(c.minutes)+" دقیقه مطالعه":"بدون مطالعه"}`;
        grid+=`<span class="heatmap-cell lvl${levelOf(c.minutes)}" title="${esc(tip)}"></span>`;
      });
      grid+=`</div>`;
    });
    grid+=`</div></div></div>`;
    const activeDays=cells.filter(c=>!c.future&&c.minutes>0).length;
    const validDays=cells.filter(c=>!c.future).length;
    const totalMin=cells.reduce((a,c)=>a+c.minutes,0);
    let curStreak=0;
    for(let i=0;;i++){
      const d=new Date(now); d.setDate(d.getDate()-i);
      const k=d.toISOString().slice(0,10);
      if((map[k]||0)>0) curStreak++; else break;
      if(i>400) break;
    }
    wrap.innerHTML=`
      <div class="heatmap-stats">
        <div class="stat"><small class="label">روزهای فعال (${fmt(WEEKS)} هفته)</small><b>${fmt(activeDays)}/${fmt(validDays)}</b></div>
        <div class="stat"><small class="label">مجموع دقیقه</small><b>${fmt(totalMin)}</b></div>
        <div class="stat"><small class="label">زنجیره فعلی</small><b>${fmt(curStreak)} روز 🔥</b></div>
      </div>
      ${grid}
      <div class="heatmap-legend"><span>کمتر</span>
        <span class="heatmap-cell lvl0"></span><span class="heatmap-cell lvl1"></span>
        <span class="heatmap-cell lvl2"></span><span class="heatmap-cell lvl3"></span>
        <span class="heatmap-cell lvl4"></span><span>بیشتر</span>
      </div>`;
  };

  /* ===================== 2) SUBJECT RANKING ===================== */
  let rankingRange=30;
  window.setRankingRange=function(v){
    rankingRange=(v==="all")?"all":+v;
    document.querySelectorAll(".ranking-range-btn").forEach(b=>b.classList.toggle("active",b.dataset.range===String(v)));
    renderSubjectRanking();
  };
  function computeSubjectTotals(range){
    const totals={};
    let cutoffKey=null;
    if(range!=="all"){
      const d=new Date(); d.setDate(d.getDate()-(range-1)); d.setHours(0,0,0,0);
      cutoffKey=d.toISOString().slice(0,10);
    }
    (state.episodes||[]).forEach(e=>{
      const k=String(e.date||"").slice(0,10);
      if(cutoffKey && k<cutoffKey) return;
      if(!totals[e.subject]) totals[e.subject]={minutes:0,xp:0,episodes:0,tests:0,correct:0};
      const t=totals[e.subject];
      t.minutes+=(+e.minutes||0); t.xp+=(+e.xp||0); t.episodes++;
      t.tests+=(+e.tests||0); t.correct+=(+e.correct||0);
    });
    return totals;
  }
  window.renderSubjectRanking=function(){
    const el=document.getElementById("subjectRanking"); if(!el) return;
    const totals=computeSubjectTotals(rankingRange);
    const cur=state.settings.selectedCurriculum||"experimental";
    const rows=Object.entries(totals).map(([k,t])=>({k,...t})).sort((a,b)=>b.minutes-a.minutes);
    if(!rows.length){el.innerHTML='<div class="empty">هنوز داده‌ای برای این بازه ثبت نشده.</div>';return;}
    const max=rows[0].minutes||1;
    const medals=["🥇","🥈","🥉"];
    el.innerHTML=rows.slice(0,12).map((r,i)=>{
      const v=SUBJECTS[r.k]||{icon:"📘",name:r.k};
      const name=subjectDisplayName(r.k,cur)||v.name;
      const acc=r.tests?Math.round(r.correct/r.tests*100):null;
      return `<div class="rank-row">
        <span class="rank-medal">${medals[i]||(i+1)}</span>
        <span class="rank-icon">${v.icon}</span>
        <div class="rank-main">
          <div class="rank-top"><b>${esc(name)}</b><span class="muted small">${fmt(r.minutes)} دقیقه</span></div>
          <div class="progress"><div class="bar" style="width:${Math.max(2,Math.round(r.minutes/max*100))}%"></div></div>
          <div class="muted small">${fmt(r.episodes)} پارت • ${fmt(r.xp)} XP${acc!==null?` • دقت ${acc}٪`:""}</div>
        </div>
      </div>`;
    }).join("");
  };

  /* ===================== 3) DAILY 10-MINUTE PLANNER ===================== */
  window.openDailyPlanner=function(){
    const modal=document.getElementById("dailyPlanModal"); if(!modal) return;
    buildDailyPlanForm();
    modal.classList.add("show");
  };
  window.closeDailyPlanner=function(){
    const m=document.getElementById("dailyPlanModal"); if(m) m.classList.remove("show");
  };
  function buildDailyPlanForm(){
    const list=document.getElementById("dailyPlanSubjects"); if(!list) return;
    const keys=(typeof getSmartSubjects==="function")?getSmartSubjects():[];
    const scored=keys.map(k=>({k,score:(typeof smartSubjectScore==="function")?smartSubjectScore(k):0}))
      .sort((a,b)=>b.score-a.score);
    const existing=state.dailyPlans[today()];
    const chosen=existing?existing.subjects:scored.slice(0,3).map(x=>x.k);
    if(!scored.length){
      list.innerHTML='<div class="empty">ابتدا رشته و پایه تحصیلی را در داشبورد انتخاب کن.</div>';
    }else{
      list.innerHTML=scored.slice(0,12).map(({k})=>{
        const v=SUBJECTS[k]||{icon:"📘",name:k};
        const name=subjectDisplayName(k,state.settings.selectedCurriculum);
        const checked=chosen.includes(k)?"checked":"";
        return `<label class="plan-subject-chip"><input type="checkbox" value="${k}" ${checked} onchange="limitPlanSubjects(this)"> ${v.icon} ${esc(name)}</label>`;
      }).join("");
    }
    const tgt=document.getElementById("dailyPlanTarget");
    if(tgt) tgt.value=existing?existing.targetEpisodes:(state.settings.targetEpisodes||7);
    const moodInfo=document.getElementById("dailyPlanMood");
    if(moodInfo) moodInfo.textContent=`${state.settings.moodEmoji||"📚"} ${state.settings.moodLabel||"مطالعه‌گر"}`;
  }
  window.limitPlanSubjects=function(el){
    const boxes=[...document.querySelectorAll("#dailyPlanSubjects input[type=checkbox]")];
    const checked=boxes.filter(b=>b.checked);
    if(checked.length>3){ el.checked=false; showToast("حداکثر ۳ درس برای امروز انتخاب کن."); }
  };
  window.saveDailyPlan=function(){
    const boxes=[...document.querySelectorAll("#dailyPlanSubjects input[type=checkbox]:checked")];
    const subjects=boxes.map(b=>b.value);
    if(!subjects.length){ showToast("حداقل یک درس برای امروز انتخاب کن."); return; }
    const targetEpisodes=Math.max(1,Math.round(+document.getElementById("dailyPlanTarget").value||state.settings.targetEpisodes||7));
    state.dailyPlans[today()]={subjects,targetEpisodes,mood:{emoji:state.settings.moodEmoji,label:state.settings.moodLabel},createdAt:Date.now()};
    save(); closeDailyPlanner(); renderDailyPlanCard();
    showToast("برنامه امروز ذخیره شد. بزن بریم! 🚀");
  };
  window.renderDailyPlanCard=function(){
    const el=document.getElementById("dailyPlanCard"); if(!el) return;
    const plan=state.dailyPlans[today()];
    if(!plan){
      el.innerHTML=`<div class="empty">هنوز برای امروز برنامه نریختی.</div>
        <button class="btn primary" style="margin-top:8px;width:100%" onclick="openDailyPlanner()">📝 شروع برنامه‌ریزی ۱۰دقیقه‌ای</button>`;
      return;
    }
    const cur=state.settings.selectedCurriculum;
    const done=dayEpisodes();
    const rows=plan.subjects.map(k=>{
      const v=SUBJECTS[k]||{icon:"📘",name:k};
      const count=done.filter(e=>e.subject===k).length;
      return `<div class="quest"><span>${count>0?"✅":"⭕"} ${v.icon} ${esc(subjectDisplayName(k,cur))}</span><b>${fmt(count)} پارت</b></div>`;
    }).join("");
    const totalDone=done.length;
    const pct=Math.min(100,Math.round(totalDone/(plan.targetEpisodes||1)*100));
    el.innerHTML=`<div class="muted small" style="margin-bottom:8px">${plan.mood?.emoji||""} حال‌وهوای هنگام برنامه‌ریزی: ${esc(plan.mood?.label||"—")}</div>
      <div class="list">${rows}</div>
      <div class="xpmeta" style="margin-top:9px"><span>ظرفیت امروز</span><span>${fmt(totalDone)} / ${fmt(plan.targetEpisodes)}</span></div>
      <div class="progress"><div class="bar" style="width:${pct}%"></div></div>`;
  };

  /* ===================== 4) POMODORO CYCLE + FOCUS COMMITMENT ===================== */
  let breakTimerInterval=null, breakSecondsLeft=0;
  function updateBreakDisplay(){
    const m=String(Math.floor(breakSecondsLeft/60)).padStart(2,"0");
    const s=String(breakSecondsLeft%60).padStart(2,"0");
    const el=document.getElementById("pomodoroBreakTime"); if(el) el.textContent=m+":"+s;
  }
  function startPomodoroBreak(minutes){
    const dur=Math.max(1,Math.min(60,Math.round(minutes)||10));
    breakSecondsLeft=dur*60;
    const box=document.getElementById("pomodoroBreakBox"); if(box) box.style.display="flex";
    updateBreakDisplay();
    clearInterval(breakTimerInterval);
    breakTimerInterval=setInterval(()=>{
      breakSecondsLeft--;
      if(breakSecondsLeft<=0){
        clearInterval(breakTimerInterval); breakTimerInterval=null;
        const box2=document.getElementById("pomodoroBreakBox"); if(box2) box2.style.display="none";
        showToast("استراحت تمام شد! دور بعدی پومودورو آماده می‌شود ⏱");
        resumeNextPomodoroCycle();
        return;
      }
      updateBreakDisplay();
    },1000);
  }
  function resumeNextPomodoroCycle(){
    const lastMin=Math.max(1,Math.round((studyTimerTotal||1500)/60));
    setStudyTimerCustom(lastMin);
    setTimeout(()=>{ if(!studyTimerRunning) toggleStudyTimer(); },300);
  }
  window.skipPomodoroBreak=function(){
    clearInterval(breakTimerInterval); breakTimerInterval=null;
    const box=document.getElementById("pomodoroBreakBox"); if(box) box.style.display="none";
    resumeNextPomodoroCycle();
  };
  window.togglePomodoroMode=function(el){
    state.settings.pomodoroMode=!!el.checked; save();
    if(!el.checked){ clearInterval(breakTimerInterval); breakTimerInterval=null; const box=document.getElementById("pomodoroBreakBox"); if(box) box.style.display="none"; }
  };
  window.toggleCommitChip=function(el){ el.classList.toggle("active"); };

  window.renderPomodoroStatus=function(){
    const c=state.pomodoroCycles[today()]||0;
    const cEl=document.getElementById("pomodoroCyclesToday"); if(cEl) cEl.textContent=fmt(c);
    const fs=state.focusStats||{sessions:0,kept:0};
    const rEl=document.getElementById("focusCommitRate");
    if(rEl) rEl.textContent=fs.sessions?Math.round(fs.kept/fs.sessions*100)+"٪":"—";
    const toggle=document.getElementById("pomodoroModeToggle");
    if(toggle) toggle.checked=!!state.settings.pomodoroMode;
  };

  // Wrap the existing timer-session logger to add commitment tracking + pomodoro auto-cycling,
  // without touching the original study/episode logging logic.
  const _origLogCurrentTimerSession=logCurrentTimerSession;
  logCurrentTimerSession=function(autoFinish){
    const commitChips=[...document.querySelectorAll("#commitChips .commit-chip.active,.commit-chips .commit-chip.active")].map(c=>c.dataset.item);
    const wasPomodoro=!!state.settings.pomodoroMode;
    const ok=_origLogCurrentTimerSession(autoFinish);
    if(ok){
      state.focusStats.sessions++;
      if(commitChips.length){
        const kept=confirm(`آیا در این جلسه به تعهدت پایبند موندی؟\n(${commitChips.join("، ")})`);
        if(kept){ state.focusStats.kept++; state.gold+=3; showToast("👏 به تعهدت پایبند موندی! +۳ سکه پاداش انضباط"); }
      }
      if(wasPomodoro){
        const dk=today();
        state.pomodoroCycles[dk]=(state.pomodoroCycles[dk]||0)+1;
      }
      save();
      renderPomodoroStatus();
      if(wasPomodoro){ startPomodoroBreak(+state.settings.breakMinutes||10); }
    }
    return ok;
  };
  window.logCurrentTimerSession=logCurrentTimerSession;

  /* ---------- wire everything into the main render loop ---------- */
  const _origRender=render;
  render=function(){
    _origRender();
    if(isPageActive("dashboard")){
      renderStudyHeatmap();
      renderSubjectRanking();
      renderDailyPlanCard();
    }
    if(isPageActive("skillHub")) renderPomodoroStatus();
  };
  window.render=render;

  const _origSwitchToPage=window.switchToPage;
  window.switchToPage=function(name){
    _origSwitchToPage(name);
    if(name==="dashboard"){ renderStudyHeatmap(); renderSubjectRanking(); renderDailyPlanCard(); }
    if(name==="skillHub") renderPomodoroStatus();
  };

  // Initial paint (dashboard is the active page on load)
  renderStudyHeatmap();
  renderSubjectRanking();
  renderDailyPlanCard();
  renderPomodoroStatus();

  save();
  console.log("✅ YPT-inspired patch applied (heatmap, ranking, daily planner, pomodoro)");
})();
