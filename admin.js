document.addEventListener("DOMContentLoaded", function () {
    const adminLoginForm = document.getElementById("adminLoginForm");
    const adminMessageDiv = document.getElementById("adminMessage");
    const adminContent = document.getElementById("adminContent");
    const applicationList = document.getElementById("applicationList");
    const exportButton = document.getElementById("exportButton");

    // 간단한 관리자 계정 설정
    const admin = {
        username: "밀성제일고",
        password: "5204"
    };

    // 로컬 스토리지에서 신청 명단 불러오기
    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    // 관리자 로그인 폼 이벤트 리스너
    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = adminLoginForm.elements["username"].value.trim();
        const password = adminLoginForm.elements["password"].value.trim();

        if (username === admin.username && password === admin.password) {
            displayAdminMessage("로그인 성공!", "success");
            adminLoginForm.reset();
            adminContent.style.display = "block";
            updateApplicationList();
        } else {
            displayAdminMessage("잘못된 사용자 이름 또는 비밀번호입니다.", "error");
        }
    });

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

    // 엑셀로 내보내기 버튼 클릭 이벤트 리스너
    exportButton.addEventListener("click", function () {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(applications);
        XLSX.utils.book_append_sheet(workbook, worksheet, "신청 명단");

        // 엑셀 파일 다운로드
        XLSX.writeFile(workbook, '야자신청명단.xlsx');
    });
});
