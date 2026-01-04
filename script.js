/* ===============================
   ELEMENT REFERENCES
================================ */
const chatBody = document.getElementById("chatBody");
const sendBtn = document.getElementById("sendBtn");
const textInput = document.getElementById("textInput");
const micBtn = document.getElementById("micBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const loginContainer = document.getElementById("loginContainer");
const chatContainer = document.getElementById("chatContainer");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");
const mobileInput = document.getElementById("mobileInput");
const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");

/* ===============================
   USER & HISTORY
================================ */
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let chatHistory = [];

/* ===============================
   LOGIN HANDLING
================================ */
if (currentUser) {
  showChat(currentUser);
} else {
  loginContainer.classList.remove("hidden");
}

loginBtn.onclick = () => {
  const name = usernameInput.value.trim();
  const mobile = mobileInput.value.trim();

  if (!name || !mobile || mobile.length !== 10) {
    alert("Enter valid name and 10-digit mobile number");
    return;
  }

  currentUser = { name, mobile };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  showChat(currentUser);
};

logoutBtn.onclick = () => {
  localStorage.removeItem("currentUser");
  location.reload();
};

function showChat(user) {
  loginContainer.classList.add("hidden");
  chatContainer.classList.remove("hidden");
  welcomeUser.innerText = `👋 Namaskar, ${user.name}`;
  loadChatHistory();
}

/* ===============================
   LOAD USER CHAT HISTORY
================================ */
function loadChatHistory() {
  const key = `chatHistory_${currentUser.mobile}`;
  chatHistory = JSON.parse(localStorage.getItem(key)) || [];

  chatBody.innerHTML = "";

  if (chatHistory.length === 0) {
    addMessage("🙏 Namaskar! Apni fasal ka sawal poochiye.", "bot", false);
  } else {
    chatHistory.forEach(m => addMessage(m.text, m.sender, false));
  }
}

/* ===============================
   TEXT INPUT
================================ */
sendBtn.onclick = sendText;
textInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendText();
});

function sendText() {
  const text = textInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  textInput.value = "";
  aiFlow(text);
}

/* ===============================
   VOICE INPUT
================================ */
micBtn.onclick = () => {
  if (!("webkitSpeechRecognition" in window)) {
    addMessage("❌ Voice supported nahi hai", "bot");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "hi-IN";

  recognition.onstart = () => {
    addMessage("🎙️ Sun raha hoon…", "bot");
  };

  recognition.onresult = e => {
    const text = e.results[0][0].transcript;
    addMessage(text, "user");
    aiFlow(text);
  };

  recognition.start();
};

/* ===============================
   AI FLOW (UNCHANGED)
================================ */
function aiFlow(text) {
  const advice = getAdvice(text.toLowerCase());
  addMessage("🌱 Salah: " + advice, "bot");

  const song = generateSong(advice);
  addMessage("🎶 Gaana:\n" + song, "bot");

  speak(song);
}

/* ===============================
   MESSAGE + SAVE (USER BASED)
================================ */
function addMessage(text, sender, save = true) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;

  if (save) {
    chatHistory.push({ text, sender });
    const key = `chatHistory_${currentUser.mobile}`;
    localStorage.setItem(key, JSON.stringify(chatHistory));
  }
}

/* ===============================
   CLEAR CURRENT USER HISTORY
================================ */
clearHistoryBtn.onclick = () => {
  if (confirm("Clear all chat history?")) {
    const key = `chatHistory_${currentUser.mobile}`;
    localStorage.removeItem(key);
    chatHistory = [];
    chatBody.innerHTML = "";
    addMessage("🙏 Namaskar! Apni fasal ka sawal poochiye.", "bot");
  }
};

/* ===============================
   KNOWLEDGE BASE
================================ */
function getAdvice(text) {
  // 🌱 SOIL PROBLEM DETECTION
if (
  text.includes("mitti") ||
  text.includes("soil") ||
  text.includes("zameen")
) {

  if (text.includes("sakht") || text.includes("hard")) {
    return soilKnowledge.hard;
  }

  if (text.includes("namak") || text.includes("salinity")) {
    return soilKnowledge.saline;
  }

  if (text.includes("paani") || text.includes("water")) {
    return soilKnowledge.waterlogging;
  }

  if (text.includes("kamjor") || text.includes("fertility")) {
    return soilKnowledge.lowFertility;
  }

  if (text.includes("fungus") || text.includes("sad")) {
    return soilKnowledge.fungus;
  }

  if (text.includes("acidic") || text.includes("khatta")) {
    return soilKnowledge.acidic;
  }

  if (text.includes("alkaline") || text.includes("namkeen")) {
    return soilKnowledge.alkaline;
  }

  return "Mitti ki problem samajhne ke liye soil test karwana sabse behtar hota hai.";
}
  // 🌾 RICE / DHAN
  if (text.includes("rice") || text.includes("धान") || text.includes("dhan")) {
    if (text.includes("peeli") || text.includes("yellow")) {
      return "Dhan ki fasal mein Nitrogen ki kami lag rahi hai. Thodi matra mein Urea ya Gobar khaad daliye.";
    }
    return "Dhan mein samay par paani rakhiye aur ropai ke 20 din baad khaad dena na bhoolen.";
  }

  // 🌾 WHEAT / GEHU
  if (text.includes("wheat") || text.includes("गेहूं") || text.includes("gehu")) {
    if (text.includes("growth") || text.includes("badhat")) {
      return "Gehu ki acchi badhat ke liye pehli sinchai 20–25 din ke andar zaroor karein.";
    }
    return "Gehu ki fasal mein samay par sinchai, nirai aur balanced khaad bahut zaroori ha.";
  }

  // 🌾 COTTON / KAPAS
  if (text.includes("cotton") || text.includes("कपास") || text.includes("kapas")) {
    if (text.includes("keet") || text.includes("pest")) {
      return "Kapas mein keet lagne par Neem oil ka chhidkav karein ya pheromone trap lagayein.";
    }
    return "Kapas ki fasal mein paani jama na hone dein aur time-time par nirai karein.";
  }

  // 🌽 MAIZE / MAKKA
  if (text.includes("maize") || text.includes("मक्का") || text.includes("makka")) {
    return "Makka ki fasal ko Nitrogen aur Phosphorus ki zyada zarurat hoti hai, sahi khaad ka use karein.";
  }

  // 🍬 SUGARCANE / GANNA
  if (text.includes("sugarcane") || text.includes("गन्ना") || text.includes("ganna")) {
    return "Ganne mein gehri sinchai karein aur trench method apnana zyada faydemand hota hai.";
  }

  // 🍅 TOMATO / TAMATAR
  if (text.includes("tomato") || text.includes("टमाटर") || text.includes("tamatar")) {
    if (text.includes("bimari") || text.includes("disease")) {
      return "Tamatar mein jhulsaa rog se bachav ke liye fungicide ka chhidkav karein.";
    }
    return "Tamatar ki fasal ke liye drip sinchai aur plants ko sahara dena zaroori hai.";
  }

  // 🥔 POTATO / AALOO
  if (text.includes("potato") || text.includes("आलू") || text.includes("aaloo")) {
    return "Aaloo ki fasal mein mitti chadhana aur thanda mausam hona bahut zaroori hota hai.";
  }

  // 🧅 ONION / PYAAZ
  if (text.includes("onion") || text.includes("प्याज") || text.includes("pyaz")) {
    return "Pyaaz ki fasal mein halki sinchai aur accha water drainage hona chahiye.";
  }

  // 🌱 SOYBEAN / SOYABEEN
  if (text.includes("soybean") || text.includes("सोयाबीन") || text.includes("soyabean")) {
    return "Soyabean ki acchi upaj ke liye beej upchar aur sahi samay par buvai karein.";
  }

  // 🥜 GROUNDNUT / MOONGPHALI
  if (text.includes("groundnut") || text.includes("मूंगफली") || text.includes("moongphali")) {
    return "Moongphali ki fasal mein Calcium zaroori hota hai, isliye Gypsum ka upyog karein.";
  }

  // 🌿 DEFAULT
  return "Fasal ki regular dekhbhaal karein, mitti parikshan karvayein aur mausam par dhyan rakhein.";
}
const soilKnowledge = {
  hard: "Mitti zyada sakht ho gayi hai. Iske liye Gobar khaad, vermicompost aur halki jootai karein.",
  
  saline: "Mitti mein namak zyada hai. Gypsum ka prayog karein aur zyada paani jama na hone dein.",
  
  waterlogging: "Mitti mein paani ruk raha hai. Proper drainage banayein aur raised bed par kheti karein.",
  
  lowFertility: "Mitti kamzor ho gayi hai. Green manure, Gobar khaad aur crop rotation apnayein.",
  
  fungus: "Mitti se phailne wali bimari ho sakti hai. Beej upchar aur Trichoderma ka use karein.",
  
  acidic: "Mitti acidic ho sakti hai. Chuna (Lime) ka sahi matra mein upyog karein.",
  
  alkaline: "Mitti zyada alkaline hai. Gypsum aur organic matter milayein."
};

/* ===============================
   SONG GENERATOR
================================ */
function generateSong(advice) {

  const openingLines = [
    "Sun re kisan bhai, dhyaan se sun le baat,",
    "Gaon ki mitti bole, sun le kisan saath,",
    "Kheti ek kala hai, mehnat iska saath,",
    "Mitti maa ki boli, sun le kisan baat,"
  ];

  const middleLines = [
    "Samay par kaam karega, fasal degi saath,",
    "Paani aur khaad ka rakhega poora khayal,",
    "Mehnat aur samajh se hi, badhegi har ek paat,",
    "Sahi gyaan se hi kisan ka chamkega bhavishya saath,"
  ];

  const endingLines = [
    "Yaad rakh bhai, kheti hai jeevan ka saar ",
    "Mehnat ka phal milega, hoga ghar mein bahaar ",
    "SwaraKhet gaata rahe, kheti ka uphaar ",
    "Gaate rahein hum milkar, kheti ka tyohar "
  ];

  const open = openingLines[Math.floor(Math.random() * openingLines.length)];
  const mid = middleLines[Math.floor(Math.random() * middleLines.length)];
  const end = endingLines[Math.floor(Math.random() * endingLines.length)];

  return `
${open}
${advice}
${mid}
${end}
`;
}

/* ===============================
   TEXT TO SPEECH (BROWSER)
================================ */
function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);

  const voices = synth.getVoices();

  // 🎙️ Preferred Hindi Female Voice
  const preferredVoice = voices.find(v =>
    v.lang === "hi-IN" && v.name.toLowerCase().includes("female")
  ) || voices.find(v => v.lang === "hi-IN");

  utter.voice = preferredVoice;
  utter.lang = "hi-IN";
  utter.rate = 0.9;   // slow & clear
  utter.pitch = 1.1;  // soft tone

  synth.speak(utter);
}

/* ===============================
   MESSAGE UI + HISTORY
================================ */
function addMessage(text, sender, save = true) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;

  if (save) {
    chatHistory.push({ text, sender });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }
}

/* ===============================
   CLEAR HISTORY
================================ */
clearHistoryBtn.onclick = () => {
  if (confirm("Clear all chat history?")) {
    localStorage.removeItem("chatHistory");
    chatHistory = [];
    chatBody.innerHTML = "";
    addMessage("🙏 Namaskar! Apni fasal ka sawal poochiye.", "bot");
  }
};