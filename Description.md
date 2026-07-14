The application is divided into three main layers:
1. React (Frontend)                    
    • Authentication             
    • Dashboard                  
    • Cycle Tracker              
    • Mood Tracker               
    • Water Tracker              
    • Health Records             
    • AI Chatbot                 
    • Analytics Dashboard        
                |
            REST API (Axios)
                │
2.Express.js (Backend)      
    • JWT Authentication         
    • Business Logic             
    • AI Controller              
    • File Upload Handling       
    • OCR & Document Parsing     
    • Analytics APIs             
    • Database Operations        
    ─┬───────────┬──────────┘
     │           │
     ┌────▼───┐   ┌──▼────────────┐
      MySQL          Groq AI API   
## Workflow

1. The user logs into the application using secure JWT authentication.
2. Users can record menstrual cycle, mood, water intake, and upload medical reports.
3. The React frontend sends requests to the Express.js REST APIs.
4. The backend validates requests and stores data in the MySQL database.
5. Uploaded PDF, DOCX, or image files are processed using document parsing and OCR.
6. The extracted report data, user health information, and chat history are combined into a prompt.
7. The backend sends the prompt to the Groq Llama 3.3 model.
8. The AI generates personalized health guidance, which is returned to the frontend.
9. Analytics APIs retrieve stored health data and display interactive charts on the dashboard.
## Phases it is built in
1. setup ,dashboard and authentication
-Initialized React, Node.js, Express.js, and MySQL
- Designed the main Dashboard
- Created Sidebar and Navigation,Database
- Added feature cards 
- Added JWT Authentication
- Encrypted passwords using Bcrypt
- Protected authenticated routes

2.Women's Health Tracking Modules
- Predicted Next Period Date
- Calculated Ovulation Day
- Calculated Fertile Window
- Displayed Cycle Status and Days Remaining
- Stored cycle information in MySQL


3.Wellness Monitoring
- Built Mood Tracker
- Added Daily Mood Logging
- Added Water Intake Tracker
- Stored wellness history for each user

 4.Digital Health Records
- Implemented Medical Record Management
- Enabled File Uploads (PDF, DOCX, Images)
- Stored uploaded reports securely
- Allowed users to view previously uploaded records

5.AI Health Assistant
- Integrated Groq Llama 3.3 AI Model
- Developed AI Chat Interface
- Maintained User Chat History
- Personalized responses using menstrual cycle data
- Processed uploaded medical reports using OCR and document parsing
- Generated easy-to-understand health guidance
- Ensured AI avoids medical diagnosis and recommends consulting healthcare professionals when appropriate

6. Health Analytics Dashboard
- Built analytics APIs
- Developed Mood Distribution Charts
- Added Cycle Analysis Dashboard
- Visualized user health trends using Chart.js

## Future Scope
- Email notifications
- Appointment booking
- Doctor portal
- Pregnancy Tracker
- Medication Reminder
- Mobile Application
- Multi-language Support

