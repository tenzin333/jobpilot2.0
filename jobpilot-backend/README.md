Node.js Express Prisma.

job-pilot-backend/
├─ src/
│  ├─ server.js
│  ├─ config/
│  │   └─ db.js
│  ├─ models/
│  │   ├─ User.js
│  │   ├─ Job.js
│  │   ├─ Application.js
│  │   └─ Resume.js
│  ├─ routes/
│  │   ├─ jobRoutes.js
│  │   ├─ userRoutes.js
│  │   ├─ applicationRoutes.js
│  │   └─ resumeRoutes.js
│  ├─ controllers/
│  │   ├─ jobController.js
│  │   ├─ userController.js
│  │   ├─ applicationController.js
│  │   └─ resumeController.js
│  ├─ middleware/
│  │   ├─ authMiddleware.js
│  │   └─ errorMiddleware.js
│  ├─ utils/
│  │   └─ openaiClient.js
│  └─ services/
│      └─ resumeService.js
├─ .env
├─ package.json
└─ README.md




GET https://remotive.com/api/remote-jobs
GET https://jsearch.p.rapidapi.com/search?query=frontend&location=remote
GET https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=XXX&app_key=XXX&results_per_page=20&what=developer


GET  /api/jobs/scrape?keyword=developer&jobType=remote&location=USA
GET  /api/jobs?keyword=engineer&jobType=hybrid
POST /api/jobs
DELETE /api/jobs/cleanup?days=7

