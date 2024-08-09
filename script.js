document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("yaForm");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = form.elements["name"].value.trim();
        const grade = form.elements["grade"].value;
        const date = form.elements["date"].value;

        // 기본 유효성 검사
        if (name === "" || grade === "" || date === "") {
            displayMessage("모든 필드를 작성해 주세요.", "error");
            return;
        }

        // 미래 날짜 유효성 검사
        if (new Date(date) < new Date()) {
            displayMessage("미래 날짜를 선택해 주세요.", "error");
            return;
        }

        // 신청 성공 메시지
        displayMessage("야자 신청이 완료되었습니다!", "success");

        // 폼 초기화
        form.reset();
    });

    function displayMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = type;
        setTimeout(() => {
            messageDiv.textContent = "";
            messageDiv.className = "";
        }, 3000);
    }
});
