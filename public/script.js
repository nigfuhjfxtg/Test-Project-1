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
// في ملف script.js - إضافة هذا الكود
document.querySelector('.logout-button')?.addEventListener('click', function() {
    localStorage.removeItem('token'); // حذف التوكن
    window.location.href = '/login.html'; // توجيه إلى تسجيل الدخول
});
document.addEventListener("DOMContentLoaded", function() { loadPosts();

document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addPost();
});

});

function addPost() { let postContent = document.getElementById("postContent").value.trim(); if (postContent === "") { alert("يرجى كتابة شيء قبل النشر!"); return; }

fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: postContent })
})
.then(response => response.json())
.then(data => {
    document.getElementById("postContent").value = "";
    loadPosts();
})
.catch(error => console.error("خطأ في إرسال البيانات:", error));

}

function loadPosts() { fetch("/api/posts") .then(response => response.json()) .then(posts => { let postList = document.getElementById("postList"); postList.innerHTML = "";

posts.forEach(post => {
        let postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerText = post.content;
        postList.appendChild(postDiv);
    });
})
.catch(error => console.error("خطأ في جلب البيانات:", error));

}

