🚀 JobSpot – MERN Stack Job Portal (Student + Recruiter Mode)
JobSpot is a full-stack job portal built using the MERN stack, featuring two separate modes — Student and Recruiter — offering smooth job applications, tracking, posting, hiring, and resume management.

This platform delivers a modern, scalable, real-time experience designed for both job seekers and recruiters.

✨ Features
👨‍🎓 Student Mode

Browse all available job postings

Apply to any job with one click

Upload and view resume

Check live job application status:

🟡 Pending

🔴 Rejected

🟢 Accepted

Manage profile & applications

Clean and simple UI for easy navigation

🧑‍💼 Recruiter Mode

Create and manage job posts

Create and manage company profiles

View list of all applicants for each job

View applicant details & resume

Accept or Reject applications

Real-time status update visible to students

Dashboard for managing all job listings

🛠️ Tech Stack
Frontend

React.js

Redux Toolkit (State Management)

Tailwind CSS / ShadCN UI

Axios

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary (Resume / Logo Uploads)

Other Tools

Render / Vercel

Postman / Thunder Client

Git & GitHub

🏗️ System Architecture
Student ↔ Frontend ↔ Node/Express API ↔ MongoDB
Recruiter ↔ Frontend ↔ Node/Express API ↔ Cloudinary (Resume Upload)

🔐 Authentication Flow

JWT-based login/signup

Role-based access (Student / Recruiter)

Protected routes

Secure resume uploads

📌 Student Workflow

Register / Login

Update profile

Browse jobs

Apply for any job

Track application status in real-time

📌 Recruiter Workflow

Register / Login

Create your company

Post multiple jobs

See all who applied

View resume

Accept / Reject status

📂 Project Structure
JobSpot/
│── frontend /            # React Frontend
│── backend/            # Node.js + Express Backend
│── models/            # MongoDB Mongoose Models
│── controllers/        # API Logic
│── routes/             # API Endpoints
│── middlewares/        # Auth Middleware
│── utils/              # Helper Functions

🧪 API Endpoints (Short Overview)
Auth Routes

POST /api/auth/register

POST /api/auth/login

Student Routes

GET /api/jobs

POST /api/apply/:jobId

GET /api/applications/me

Recruiter Routes

POST /api/jobs

GET /api/jobs/applicants/:jobId

PATCH /api/application/:id/status

🌐 Live Demo

https://jobspot-om79.onrender.com/login


🚀 Installation & Setup
Clone the repo
git clone https://github.com/your-username/jobspot.git

Install dependencies
cd client
npm install

cd ../server
npm install

Add environment variables
MONGO_URI=
JWT_SECRET=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
CLOUDINARY_NAME=

Start the project
# Client
npm run dev

# Server
npm start

🖼️ Screenshots (Optional)

Add later: dashboard, job listing, recruiter panel, application status, etc.

❤️ Contributions

Pull requests are welcome! Feel free to open issues or suggestions.

📄 License

MIT License

🙋 Author

Barun Kumar Mishra
MERN Stack Developer
GitHub: https://github.com/Barun-Mishra-09

LinkedIn: https://www.linkedin.com/in/barun-kumar-mishra-bba651368/
