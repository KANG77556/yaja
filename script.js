document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginMessageDiv = document.getElementById("loginMessage");
    const loginPage = document.getElementById("loginPage");
    const applicationPage = document.getElementById("applicationPage");
    const form = document.getElementById("yaForm");
    const messageDiv = document.getElementById("message");
    const applicationList = document.getElementById("applicationList");

    // 간단한 관리자 계정 설정
    const admin = {
        username: "밀성제일고",
        password: "5204"
    };

    // 야자 신청 명단을 저장할 배열
    const applications = [];

    // 로그인 폼 이벤트 리스너
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = loginForm.elements["username"].value.trim();
        const password = loginForm.elements["password"].value.trim();

        if (username === admin.username && password === admin.password) {
            displayLoginMessage("로그인 성공!", "success");
            loginPage.style.display = "none"; // 로그인 페이지 숨기기
            applicationPage.style.display = "block"; // 신청 페이지 표시
        } else {
            displayLoginMessage("잘못된 사용자 이름 또는 비밀번호입니다.", "error");
        }
    });

    // 신청 폼 이벤트 리스너
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

        // 신청을 배열에 저장
        const application = {
            name: name,
            grade: grade,
            date: date
        };
        applications.push(application);

        // 신청 성공 메시지
        displayMessage("야자 신청이 완료되었습니다!", "success");

        // 폼 초기화
        form.reset();

        // 신청 명단 업데이트
        updateApplicationList();
    });

    function displayLoginMessage(msg, type) {
        loginMessageDiv.textContent = msg;
        loginMessageDiv.className = type;
        setTimeout(() => {
            loginMessageDiv.textContent = "";
            loginMessageDiv.className = "";
        }, 3000);
    }

    function displayMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = type;
        setTimeout(() => {
            messageDiv.textContent = "";
            messageDiv.className = "";
        }, 3000);
    }

    function updateApplicationList() {
        // 명단을 비웁니다
        applicationList.innerHTML = "";

        // 배열을 순회하며 목록을 생성합니다
        applications.forEach((application, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${application.name} - ${application.grade}학년 - ${application.date}`;
            applicationList.appendChild(li);
        });
    }
});
