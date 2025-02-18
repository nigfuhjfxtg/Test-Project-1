const express = require('express');
const path = require('path'); // أضف هذا السطر
const app = express();
const port = process.env.PORT || 3000;

// استضافة الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// تأكد من وجود هذا السطر لإدارة المسارات
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // اسم الملف الرئيسي
});

app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
const mongoose = require('mongoose');

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ تم الاتصال بقاعدة البيانات'))
.catch(err => console.error('❌ فشل الاتصال:', err));
const User = require('./models/User');

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
const jwt = require('jsonwebtoken');

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
  }

  // إنشاء توكن
  const token = jwt.sign({ userId: user._id }, 'your-secret-key');
  res.json({ token });
});
const Post = require('./models/Post');

app.post('/api/posts', async (req, res) => {
  const { content } = req.body;
  const post = await Post.create({ 
    content, 
    author: req.user.userId 
  });
  res.status(201).json(post);
});
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'غير مصرح لك' });

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ error: 'توكن غير صالح' });
  }
};

// استخدام Middleware في المسارات المحمية
app.post('/api/posts', authenticate, ...);
// عند تسجيل الدخول
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();
localStorage.setItem('token', token);

// عند إرسال منشور
const response = await fetch('/api/posts', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({ content: 'منشور تجريبي' })
});
