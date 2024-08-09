document.addEventListener("DOMContentLoaded", function () {
    const yaForm = document.getElementById("yaForm");
    const applicationMessageDiv = document.getElementById("applicationMessage");

    // 로컬 스토리지에서 신청 명단 불러오기
    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    // 야자 신청 폼 이벤트 리스너
    yaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = yaForm.elements["name"].value.trim();
        const grade = yaForm.elements["grade"].value;
        const date = yaForm.elements["date"].value;

        // 현재 날짜와 시간을 가져옵니다
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const currentTime = now.getHours();

        // 당일 12시 기준을 설정합니다
        const deadlineTime = 12;

        // 신청 날짜와 시간을 검사합니다
        if (new Date(date) < new Date(currentDate)) {
            displayApplicationMessage("미래 날짜를 선택해 주세요.", "error");
            return;
        }
        if (date === currentDate && currentTime >= deadlineTime) {
            displayApplicationMessage("신청은 당일 12시까지 가능합니다.", "error");
            return;
        }

        // 기본 유효성 검사
        if (name === "" || grade === "" || date === "") {
            displayApplicationMessage("모든 필드를 작성해 주세요.", "error");
            return;
        }

        // 신청을 배열에 저장
        const application = {
            name: name,
            grade: grade,
            date: date
        };
        applications.push(application);
        localStorage.setItem("applications", JSON.stringify(applications));

        // 신청 성공 메시지
        displayApplicationMessage("야자 신청이 완료되었습니다!", "success");

        // 폼 초기화
        yaForm.reset();
    });

    function displayApplicationMessage(msg, type) {
        applicationMessageDiv.textContent = msg;
        applicationMessageDiv.className = type;
        setTimeout(() => {
            applicationMessageDiv.textContent = "";
            applicationMessageDiv.className = "";
        }, 3000);
    }
});
