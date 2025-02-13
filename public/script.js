// ملف script.js - يمكنك إضافة الوظائف التفاعلية هنا

// مثال: تفعيل زر تسجيل الدخول
document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  
  if (loginButton) {
    loginButton.addEventListener('click', function(event) {
      event.preventDefault();
      alert('تم النقر على زر تسجيل الدخول!');
    });
  }
});
