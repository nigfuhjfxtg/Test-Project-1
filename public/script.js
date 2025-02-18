document.addEventListener("DOMContentLoaded", function() {
    console.log("تم تحميل JavaScript بنجاح");

    let postForm = document.getElementById("postForm");
    let postContent = document.getElementById("postContent");
    let postList = document.getElementById("postList");

    postForm.addEventListener("submit", function(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        let content = postContent.value.trim();
        if (content !== "") {
            addPost(content);
            postContent.value = ""; // إعادة تعيين مربع النص بعد النشر
        }
    });

    function addPost(content) {
        let postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.textContent = content;
        postList.prepend(postElement); // إضافة المنشور إلى أعلى القائمة
    }
});
