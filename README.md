## HerHealth

An AI-powered Women Healthcare Management System built using React, Node.js, Express.js, and MySQL. 
The application helps users track menstrual health, manage digital health records, monitor wellness, and receive personalized AI-powered health guidance.

##  Features
-  Secure User Authentication (JWT)
-  Menstrual Cycle Tracker
-  Mood Tracker
-  Water Intake Tracker
-  Digital Health Records (PDF, DOCX & Images)
-  AI Health Assistant (Groq Llama 3.3)
-  Health Analytics Dashboard

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React.js, React Router, Axios, CSS3, Chart.js |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT, Bcrypt |
| **AI Integration** | Groq API |
| **File Processing** | pdf-parse, Mammoth, Tesseract.js |
| **Version Control** | Git, GitHub |
| **Development Tools** | VS Code, Postman, MySQL Workbench |

##  Installation
```bash
git clone https://github.com/yourusername/women-healthcare.git
cd women-healthcare
```
### Backend
```bash
cd server
npm install
npm start
```
### Frontend
```bash
cd client
npm install
npm run dev
```
##  Environment Variables

Create a `.env` file in the server directory:

```env
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

GROQ_API_KEY=
```

## 📌 Project Highlights
- Personalized AI health guidance
- Medical report upload and analysis
- Interactive health analytics
- Secure data management
