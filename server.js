
const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;

  // استضافة الملفات الثابتة من مجلد public
  app.use(express.static('public'));

  // مثال لمسار API
  app.get('/api/data', (req, res) => {
    res.json({ message: 'مرحبًا من الخادم!' });
  });

  app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhost:${port}`);
  });
