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
