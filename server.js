require('dotenv').config(); // تحميل متغيرات البيئة const express = require('express'); const path = require('path'); const mongoose = require('mongoose');

const app = express(); const port = process.env.PORT || 3000;

// دعم تحليل JSON في الطلبات app.use(express.json());

// استضافة الملفات الثابتة app.use(express.static(path.join(__dirname, 'public')));

// الاتصال بقاعدة البيانات mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => console.log('✅ تم الاتصال بقاعدة البيانات')) .catch(err => console.error('❌ فشل الاتصال:', err));

const User = require('./models/User');

// تسجيل مستخدم جديد app.post('/api/signup', async (req, res) => { try { const { name, email, password } = req.body; if (!name || !email || !password) { return res.status(400).json({ message: 'جميع الحقول مطلوبة' }); } const user = await User.create({ name, email, password }); res.status(201).json({ message: 'تم إنشاء المستخدم بنجاح', user }); } catch (err) { res.status(500).json({ message: 'خطأ في الخادم', error: err.message }); } });

// معالجة جميع الطلبات الأخرى app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

app.listen(port, () => { console.log(🚀 الخادم يعمل على المنفذ ${port}); });

