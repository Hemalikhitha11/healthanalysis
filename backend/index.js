const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
 secret: 'healthanalysis-secret',
 resave: false,
 saveUninitialized: false,
 cookie: { secure: false } // Set to true with HTTPS in production
}));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/healthanalysis', {
 useNewUrlParser: true,
 useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const userSchema = new mongoose.Schema({
 username: { type: String, unique: true },
 password: String // In production, hash this with bcrypt
});
const User = mongoose.model('User', userSchema);

const reportSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 fileName: String,
 filePath: String,
 uploadDate: { type: Date, default: Date.now },
 analysis: String
});
const Report = mongoose.model('Report', reportSchema);

const storage = multer.diskStorage({
 destination: (req, file, cb) => cb(null, 'uploads/'),
 filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const isAuthenticated = (req, res, next) => {
 if (req.session.user) return next();
 res.status(401).json({ message: 'Unauthorized' });
};

// Routes
app.post('/api/register', async (req, res) => {
 const { username, password } = req.body;
 try {
 const user = new User({ username, password });
 await user.save();
 res.json({ message: 'User registered successfully' });
 } catch (error) {
 res.status(400).json({ message: 'Username already exists' });
 }
});

app.post('/api/login', async (req, res) => {
 const { username, password } = req.body;
 const user = await User.findOne({ username, password });
 if (user) {
 req.session.user = user;
 res.json({ message: 'Login successful', userId: user._id });
 } else {
 res.status(401).json({ message: 'Invalid credentials' });
 }
});

app.get('/api/dashboard', isAuthenticated, async (req, res) => {
 const userId = req.session.user._id;
 const reports = await Report.find({ userId });
 const dashboardData = {
 bp: reports.length > 0 ? "120/80 mmHg" : "N/A",
 heartbeat: reports.length > 0 ? "72 bpm" : "N/A",
 cholesterol: reports.length > 0 ? "180 mg/dL" : "N/A",
 nextVisit: "April 15, 2025",
 doctor: "Dr. Sarah Johnson",
 reportCount: reports.length
 };
 res.json(dashboardData);
});

app.get('/api/health-alerts', isAuthenticated, async (req, res) => {
 const userId = req.session.user._id;
 const reports = await Report.find({ userId });
 const alerts = reports
 .filter(r => r.analysis && (r.analysis.includes('severe') || r.analysis.includes('moderate')))
 .map(r => ({ name: r.fileName, issue: r.analysis }));
 res.json(alerts);
});

app.post('/api/upload-report', isAuthenticated, upload.single('report'), async (req, res) => {
 const userId = req.session.user._id;
 const file = req.file;
 const prompt = `Analyze this medical report and provide key insights: Simulated content of ${file.originalname}`;
 const result = await model.generateContent(prompt);
 const analysis = result.response.text();

 const report = new Report({
 userId,
 fileName: file.originalname,
 filePath: file.path,
 analysis
 });
 await report.save();

 res.json({ message: 'Report uploaded and analyzed', analysis, reportId: report._id });
});

app.get('/api/reports', isAuthenticated, async (req, res) => {
 const userId = req.session.user._id;
 const reports = await Report.find({ userId });
 res.json(reports);
});

app.post('/api/chatbot', isAuthenticated, async (req, res) => {
 const { message, reportId } = req.body;
 let prompt;
 if (reportId) {
 const report = await Report.findById(reportId);
 prompt = `User question about this report: "${message}". Report analysis: ${report.analysis}`;
 } else {
 prompt = `Answer this medical question: "${message}"`;
 }
 const result = await model.generateContent(prompt);
 const response = result.response.text();
 res.json({ response });
});

app.post('/api/logout', (req, res) => {
 req.session.destroy();
 res.json({ message: 'Logged out' });
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});