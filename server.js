const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// استضافة الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// وظيفة لحفظ البيانات إلى ملف محلي
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// تحميل البيانات المخزنة
const loadData = () => {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return [];
};

// نقطة نهاية لحفظ بيانات المستخدم
app.post('/api/signup', (req, res) => {
  try {
    const users = loadData();
    const { name, email, password } = req.body;
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    saveData(users);
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء حفظ البيانات' });
  }
});

// توجيه الطلبات إلى index.html إذا لم يكن هناك مسار آخر
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
