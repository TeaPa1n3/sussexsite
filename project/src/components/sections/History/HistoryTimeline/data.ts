import type { TimelineEvent } from './types';

export const events: TimelineEvent[] = [
  {
    id: "stamford-bridge-1066",
    year: "1066",
    title: "The Battle of Stamford Bridge",
    type: "battle",
    description: "The last major Viking invasion of England ends in defeat as Harold Godwinson's army makes a remarkable forced march north to surprise Harald Hardrada's forces.",
    battleStats: {
      location: "Stamford Bridge, Yorkshire",
      combatants: {
        side1: "Anglo-Saxon Forces under Harold Godwinson",
        side2: "Norwegian Forces under Harald Hardrada and Tostig Godwinson"
      },
      forces: {
        side1: "~15,000",
        side2: "~9,000"
      },
      victor: "Anglo-Saxon Forces",
      outcome: [
        "Death of Harald Hardrada and Tostig Godwinson",
        "End of Viking Age in England",
        "Weakened Harold's army before Hastings",
        "Remaining Norwegian forces retreated with only 24 ships"
      ]
    },
    details: {
      notableNames: [
        "Harold Godwinson - King of England",
        "Harald Hardrada - King of Norway",
        "Tostig Godwinson - Former Earl of Northumbria",
        "Eystein Orre - Norwegian commander"
      ],
      causes: [
        "Harald Hardrada's claim to English throne",
        "Tostig's desire to regain Northumbrian earldom",
        "Viking ambition for English conquest",
        "Internal English political divisions"
      ],
      results: [
        "Marked the end of the Viking Age in England",
        "Severely depleted Harold's forces before Hastings",
        "Demonstrated Anglo-Saxon military capability",
        "Changed the balance of power in northern Europe"
      ]
    }
  },
  {
    id: "hastings-1066",
    year: "1066",
    title: "The Battle of Hastings",
    type: "battle",
    description: "The decisive Norman victory that changed English history forever, marking the last successful foreign conquest of England.",
    battleStats: {
      location: "Battle, East Sussex",
      combatants: {
        side1: "Norman Forces under William, Duke of Normandy",
        side2: "Anglo-Saxon Forces under King Harold Godwinson"
      },
      forces: {
        side1: "~7,000-12,000",
        side2: "~5,000-8,000"
      },
      victor: "Norman Forces",
      outcome: [
        "Death of Harold Godwinson",
        "End of Anglo-Saxon rule in England",
        "Beginning of Norman Conquest",
        "Transformation of English society and culture"
      ]
    },
    details: {
      notableNames: [
        "William, Duke of Normandy",
        "Harold Godwinson",
        "Bishop Odo of Bayeux",
        "Gyrth and Leofwine Godwinson"
      ],
      causes: [
        "Disputed succession to Edward the Confessor",
        "William's claim to English throne",
        "Harold's alleged oath to William",
        "Norman desire for expansion"
      ],
      results: [
        "Establishment of Norman dynasty in England",
        "Introduction of feudal system",
        "Transformation of English language and culture",
        "Construction of numerous castles and cathedrals"
      ]
    }
  },
  {
    id: "dyrrhachium-1081",
    year: "1081",
    title: "The Battle of Dyrrhachium",
    type: "battle",
    description: "A significant clash between Norman and Byzantine forces, featuring Saxon warriors who had fled England after the Norman Conquest.",
    battleStats: {
      location: "Dyrrhachium (modern-day Durrës, Albania)",
      combatants: {
        side1: "Norman Forces under Robert Guiscard",
        side2: "Byzantine Army with Varangian Guard"
      },
      forces: {
        side1: "~20,000",
        side2: "~25,000"
      },
      victor: "Norman Forces",
      outcome: [
        "Destruction of the Varangian Guard",
        "Norman victory over Byzantine Empire",
        "Temporary Norman control of the Balkans",
        "Many English exiles killed in the battle"
      ]
    },
    details: {
      notableNames: [
        "Robert Guiscard - Norman leader",
        "Alexios I Komnenos - Byzantine Emperor",
        "George Palaiologos - Byzantine general",
        "Bohemond of Taranto - Norman commander"
      ],
      causes: [
        "Norman expansion into Byzantine territory",
        "Byzantine civil conflicts",
        "Anglo-Saxon exile community's resistance",
        "Control of Adriatic trade routes"
      ],
      results: [
        "Demonstrated Norman military superiority",
        "Weakened Byzantine control of Balkans",
        "End of Anglo-Saxon resistance movement",
        "Shift in Mediterranean power balance"
      ]
    }
  },
  {
    id: "domesday-1086",
    year: "1086",
    title: "Domesday Book",
    type: "survey",
    description: "Comprehensive survey of England and Wales, documenting land ownership, resources, and population - the most complete record of medieval society in Europe.",
    details: {
      notableNames: [
        "King William I (William the Conqueror)",
        "Robert, Count of Mortain",
        "Lanfranc, Archbishop of Canterbury",
        "Geoffrey de Montbray, Bishop of Coutances"
      ],
      causes: [
        "Need to assess wealth and resources of the kingdom",
        "Desire to establish clear ownership records after Norman Conquest",
        "Creation of efficient taxation system",
        "Resolution of land disputes between Norman lords"
      ],
      results: [
        "Created detailed record of English lands and resources",
        "Established clear feudal obligations",
        "Provided basis for medieval English administration",
        "Survives today as invaluable historical record",
        "Documented over 13,000 settlements",
        "Revealed economic and social structure of Norman England"
      ]
    }
  },
  {
    id: "standard-1138",
    year: "1138",
    title: "The Battle of the Standard",
    type: "battle",
    description: "Major battle between English and Scottish forces near Northallerton, marking a crucial moment in Anglo-Scottish relations.",
    battleStats: {
      location: "Northallerton, Yorkshire",
      combatants: {
        side1: "English Forces under William of Aumale",
        side2: "Scottish Forces under King David I"
      },
      forces: {
        side1: "~10,000",
        side2: "~16,000"
      },
      victor: "English Forces",
      outcome: [
        "Decisive English victory",
        "Scottish army routed",
        "Territorial concessions to Scotland in peace treaty",
        "Strengthened Norman control in northern England"
      ]
    },
    details: {
      notableNames: [
        "King David I of Scotland",
        "William of Aumale",
        "Thurstan, Archbishop of York",
        "Robert de Brus, Lord of Cleveland"
      ],
      causes: [
        "Scottish support for Empress Matilda",
        "Border disputes between England and Scotland",
        "David I's territorial ambitions",
        "Norman-Scottish power struggle"
      ],
      results: [
        "Confirmed Norman control of northern England",
        "Established pattern of Anglo-Scottish warfare",
        "Led to Treaty of Durham",
        "Influenced Scottish military tactics"
      ]
    }
  },
  {
    id: "lincoln-1141",
    year: "1141",
    title: "The First Battle of Lincoln",
    type: "battle",
    description: "Crucial battle in the civil war known as The Anarchy, where King Stephen was captured by forces loyal to Empress Matilda.",
    battleStats: {
      location: "Lincoln Castle, Lincolnshire",
      combatants: {
        side1: "Forces loyal to Empress Matilda",
        side2: "Forces loyal to King Stephen"
      },
      forces: {
        side1: "Unknown",
        side2: "Unknown"
      },
      victor: "Forces loyal to Empress Matilda",
      outcome: [
        "Capture of King Stephen",
        "Temporary victory for Empress Matilda",
        "Brief period of Matilda's rule",
        "Continuation of civil war"
      ]
    },
    details: {
      notableNames: [
        "King Stephen",
        "Empress Matilda",
        "Robert of Gloucester",
        "Ranulf of Chester"
      ],
      causes: [
        "Disputed succession after Henry I's death",
        "Breach of oath to support Matilda",
        "Noble factions seeking power",
        "Church's divided loyalties"
      ],
      results: [
        "Temporary triumph for Matilda's cause",
        "Demonstrated importance of castle warfare",
        "Highlighted role of medieval nobility",
        "Intensified period of civil strife"
      ]
    }
  },
  {
    id: "magna-carta-1215",
    year: "1215",
    title: "Magna Carta",
    type: "document",
    description: "Charter of rights agreed by King John at Runnymede, establishing key principles of law and limiting royal power - a cornerstone of English liberty.",
    details: {
      notableNames: [
        "King John",
        "Stephen Langton, Archbishop of Canterbury",
        "Robert FitzWalter, leader of rebel barons",
        "William Marshal, Earl of Pembroke",
        "Eustace de Vesci",
        "Richard de Clare"
      ],
      causes: [
        "Royal abuse of feudal rights",
        "Excessive taxation and arbitrary rule",
        "Conflict between King and barons",
        "Church-Crown tensions",
        "Loss of Normandy in 1204",
        "Failed military campaigns"
      ],
      results: [
        "Established principle that king was subject to law",
        "Created basis for common law and constitutional monarchy",
        "Introduced concepts of due process and trial by jury",
        "Influenced development of democratic institutions worldwide",
        "Protected church rights",
        "Regulated feudal payments and obligations"
      ]
    }
  },
  {
    id: "lewes-1264",
    year: "1264",
    title: "The Battle of Lewes",
    type: "battle",
    description: "Crucial battle of the Second Barons' War leading to England's first representative parliament and temporary baronial control of the monarchy.",
    battleStats: {
      location: "Lewes, East Sussex",
      combatants: {
        side1: "Baronial Forces under Simon de Montfort",
        side2: "Royal Forces under King Henry III"
      },
      forces: {
        side1: "~5,000",
        side2: "~10,000"
      },
      victor: "Baronial Forces",
      outcome: [
        "Capture of King Henry III and Prince Edward",
        "De Montfort's control of government",
        "Creation of first representative parliament",
        "Reform of royal administration"
      ]
    },
    details: {
      notableNames: [
        "Simon de Montfort, Earl of Leicester",
        "King Henry III",
        "Prince Edward (future Edward I)",
        "Gilbert de Clare, Earl of Gloucester",
        "Richard of Cornwall"
      ],
      causes: [
        "Royal resistance to baronial reform",
        "Provisions of Oxford dispute",
        "Foreign influence at court",
        "Constitutional crisis",
        "Economic grievances"
      ],
      results: [
        "Establishment of baronial government",
        "Creation of first representative parliament",
        "Reforms in local administration",
        "Temporary triumph of baronial cause",
        "New model for English governance"
      ]
    }
  },
  {
    id: "evesham-1265",
    year: "1265",
    title: "The Battle of Evesham",
    type: "battle",
    description: "The decisive battle of the Second Barons' War that ended the baronial reform movement and restored royal authority.",
    battleStats: {
      location: "Evesham, Worcestershire",
      combatants: {
        side1: "Royal Forces under Prince Edward",
        side2: "Baronial Forces under Simon de Montfort"
      },
      forces: {
        side1: "~8,000",
        side2: "~3,000"
      },
      victor: "Royal Forces",
      outcome: [
        "Death of Simon de Montfort",
        "End of the Second Barons' War",
        "Restoration of royal authority",
        "Preservation of some reforms in Dictum of Kenilworth"
      ]
    },
    details: {
      notableNames: [
        "Prince Edward (future Edward I)",
        "Simon de Montfort",
        "Henry de Montfort",
        "Roger Mortimer",
        "Gilbert de Clare"
      ],
      causes: [
        "Prince Edward's escape from captivity",
        "Baronial government's internal divisions",
        "Defection of Gilbert de Clare",
        "Royal desire to restore authority"
      ],
      results: [
        "End of baronial reform movement",
        "Restoration of royal government",
        "Death of major reform leaders",
        "Compromise through Dictum of Kenilworth",
        "Influence on future parliamentary development"
      ]
    }
  }
];