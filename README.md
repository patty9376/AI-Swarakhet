An Offline, Voice-Enabled, Folk-Song–Based Agricultural Assistant

AI SwaraKhet is a frontend-only, rule-based agricultural assistant designed to help small and semi-literate farmers by delivering crop and soil advice in simple Hindi/Hinglish, presented as folk-style songs for better recall and cultural connection.

The project works completely offline, requires no APIs, and runs directly in the browser using HTML, CSS, and Vanilla JavaScript.

🚜 Problem Statement

Small farmers often face:

Limited access to timely agricultural guidance

Text-heavy, technical advisory platforms

Language barriers and low literacy

Loss of traditional oral farming knowledge

AI SwaraKhet addresses these challenges by combining:

Rule-based agricultural knowledge

Voice interaction

Culturally rooted folk-song responses

✨ Key Features
🔐 User System

Mobile number–based login

Multiple users on the same device

Profile-specific chat history (localStorage)

🌱 Agriculture Advisory

Soil problem detection (hard, saline, acidic, alkaline, waterlogged, low fertility)

Crop-specific guidance for:

Rice (Dhan)

Wheat (Gehu)

Cotton (Kapas)

Maize (Makka)

Sugarcane (Ganna)

Tomato

Potato

Onion

Soybean

Groundnut

🎶 Folk-Song Responses

Advice converted into rhyming, folk-style verses

Randomized song structure for natural variation

Designed for memorability and cultural relevance

🎤 Voice Support

Voice input using browser speech recognition

Hindi text-to-speech output

Works without internet (browser dependent)

📱 Fully Responsive UI

Full-screen experience on mobile and desktop

Clean chat-style interface

Optimized for touch and keyboard input

🛠️ Tech Stack
Technology	Usage
HTML5	Structure
CSS3	Responsive UI & styling
JavaScript (Vanilla)	Logic & interactivity
Browser APIs	Speech Recognition & Text-to-Speech
localStorage	User & chat history storage
📁 Project Structure
AI-SwaraKhet/
│
├── index.html   # Main UI layout
├── style.css    # Full-screen responsive styling
├── script.js    # Login system + AI logic
└── README.md    # Project documentation

🚀 How to Run the Project

Clone the repository

git clone https://github.com/your-username/AI-SwaraKhet.git


Open the project

Simply open index.html in any modern browser (Chrome recommended)

Login

Enter your name and mobile number

Start asking questions by typing or speaking

✅ No server
✅ No API keys
✅ No installation required

🧠 How It Works (High Level)

User logs in using name + mobile number

User asks a question (text or voice)

Rule-based engine detects:

Crop

Soil condition

Relevant advice is generated

Advice is converted into a folk-style song

Song is displayed and spoken aloud

Conversation is saved per user profile

🔒 Data & Privacy

All data is stored locally in the browser

No data is sent to any server

Clearing browser storage removes all user data

📌 Limitations

Rule-based (not ML-based)

Voice input depends on browser support

No real-time weather or market data

No backend authentication

🌟 Future Enhancements

Progressive Web App (PWA)

Offline language packs

Image-based crop disease detection

Regional folk music styles

Exportable knowledge cards

AI/ML integration (optional)

🤝 Contribution

Contributions are welcome!

Fork the repository

Create a new branch

Make your changes

Submit a pull request

📜 License

This project is open-source and available under the MIT License.

🙏 Acknowledgement

Inspired by:

Indian farming communities

Traditional oral knowledge systems

The need for accessible AI in agriculture

🌾 “Kheti ek kala hai, gyaan uska saath”

AI SwaraKhet — where technology sings for farmers
