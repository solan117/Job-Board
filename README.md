# Job Portal Web Application

A modern full-stack job portal built with React.js, Node.js, Express, MongoDB, and Clerk for authentication. This
platform allows recruiters to post jobs and manage applications, while job seekers can apply for jobs, upload resumes,
and track application status.

## 🚀 Features

### 👨‍💼 For Job Seekers

- Search and filter jobs by category and location
- View job details and apply with uploaded resume
- Track application status
- Clerk-based user authentication
- Resume file upload via Cloudinary

### 🏢 For Recruiters

- Secure login with company token
- Post new job openings
- View and manage job applications
- Update application statuses
- Secure dashboard with route protection

### ⚙️ Admin & Backend

- RESTful API with Express.js
- MongoDB/Mongoose data models for jobs, users, and applications
- Clerk webhooks for user management
- Vercel rewrites for frontend routing
- Error monitoring via Sentry
- Secure file handling via multer and Cloudinary

## 🛠️ Tech Stack

**Frontend:**

- React 18 with Vite
- Tailwind CSS for styling
- React Router DOM v7.6.3
- Axios for API requests
- React Toastify for notifications

**Backend:**

- Node.js + Express.js
- MongoDB with Mongoose
- Clerk for authentication
- Multer & Cloudinary for file uploads
- Sentry for error monitoring

## 📁 Project Structure

```
├── client
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── styles/
│   └── vite.config.js
├── server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── public/
├── package.json
├── vercel.json
└── README.md
```

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/solan117/job-portal.git
cd job-portal
```

### 2. Install Dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd ../server
npm install
```

### 3. Configure Environment Variables

Create `.env` files for both frontend and backend.

**Frontend (.env):**

```
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_FRONTEND_API=your-clerk-frontend-api
```

**Backend (.env):**

```
MONGO_URI=your-mongodb-uri
CLERK_SECRET_KEY=your-clerk-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SENTRY_DSN=your-sentry-dsn
```

### 4. Run the App

**Start Backend:**

```bash
cd server
npm run dev
```

**Start Frontend:**

```bash
cd client
npm run dev
```

App will be available at `http://localhost:5173`.

## 🌐 Deployment

- Deployed using **Vercel** with `vercel.json` configured for SPA routing.
- Backend can be deployed to services like **Render**, **Railway**, or **Vercel serverless functions**.

## 🧪 Testing

Basic unit tests are written using Jest and React Testing Library (e.g., `JobListing` component).

```bash
cd client
npm test
```

### Live Demo

https://job-board-client-amber.vercel.app/

## 📜 Changelog Summary

- Integrated Clerk for secure authentication
- Developed recruiter dashboard and job posting features
- Integrated resume upload using Cloudinary
- Implemented dynamic job search and application tracking
- Enhanced UI/UX with Tailwind CSS and toast notifications
- Added error handling, status updates, and route protection

## 👨‍💻 Author

**Karan Solanki**  
[GitHub](https://github.com/solan117)

## 📝 License

This project is licensed under the [MIT License](LICENSE).
