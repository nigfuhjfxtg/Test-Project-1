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
// التحقق من نموذج إنشاء الحساب
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // تحقق بسيط من المدخلات
    if (password.length < 6) {
        alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل!');
        return;
    }

    // (يمكنك إضافة اتصال بالخادم هنا لاحقًا)
    console.log('البيانات:', { fullName, email, password });
    alert('تم إنشاء الحساب بنجاح! (هذا مثال تجريبي)');
    
    // توجيه المستخدم إلى الصفحة الرئيسية
    window.location.href = '/home.html';
});
