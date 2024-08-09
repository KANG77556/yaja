document.addEventListener("DOMContentLoaded", function () {
    const yaForm = document.getElementById("yaForm");
    const applicationMessageDiv = document.getElementById("applicationMessage");
    const adminLoginButton = document.getElementById("adminLoginButton");
    const adminLoginForm = document.getElementById("adminLoginForm");
    const adminMessageDiv = document.getElementById("adminMessage");
    const applicationList = document.getElementById("applicationList");

    // 간단한 관리자 계정 설정
    const admin = {
        username: "밀성제일고",
        password: "5204"
    };

    // 야자 신청 명단을 저장할 배열
    const applications = [];

    // 야자 신청 폼 이벤트 리스너
    yaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = yaForm.elements["name"].value.trim();
        const grade = yaForm.elements["grade"].value;
        const date = yaForm.elements["date"].value;

        // 기본 유효성 검사
        if (name === "" || grade === "" || date === "") {
            displayApplicationMessage("모든 필드를 작성해 주세요.", "error");
            return;
        }

        // 미래 날짜 유효성 검사
        if (new Date(date) < new Date()) {
            displayApplicationMessage("미래 날짜를 선택해 주세요.", "error");
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
        displayApplicationMessage("야자 신청이 완료되었습니다!", "success");

        // 폼 초기화
        yaForm.reset();
    });

    // 관리자 로그인 버튼 클릭 이벤트
    adminLoginButton.addEventListener("click", function () {
        document.getElementById("applicationPage").style.display = "none";
        document.getElementById("adminPage").style.display = "block";
    });

    // 관리자 로그인 폼 이벤트 리스너
    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = adminLoginForm.elements["username"].value.trim();
        const password = adminLoginForm.elements["password"].value.trim();

        if (username === admin.username && password === admin.password) {
            displayAdminMessage("로그인 성공!", "success");
            adminLoginForm.reset();
            updateApplicationList();
        } else {
            displayAdminMessage("잘못된 사용자 이름 또는 비밀번호입니다.", "error");
        }
    });

    function displayApplicationMessage(msg, type) {
        applicationMessageDiv.textContent = msg;
        applicationMessageDiv.className = type;
        setTimeout(() => {
            applicationMessageDiv.textContent = "";
            applicationMessageDiv.className = "";
        }, 3000);
    }

    function displayAdminMessage(msg, type) {
        adminMessageDiv.textContent = msg;
        adminMessageDiv.className = type;
        setTimeout(() => {
            adminMessageDiv.textContent = "";
            adminMessageDiv.className = "";
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
