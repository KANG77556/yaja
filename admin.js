document.addEventListener("DOMContentLoaded", function () {
    const adminLoginForm = document.getElementById("adminLoginForm");
    const adminMessageDiv = document.getElementById("adminMessage");
    const adminContent = document.getElementById("adminContent");
    const applicationList = document.getElementById("applicationList");
    const exportButton = document.getElementById("exportButton");
    const dateFilter = document.getElementById("dateFilter");

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
            updateApplicationList(); // 초기 목록 표시
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
        // 신청 목록을 최신 순서로 정렬
        applications.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 날짜 필터가 설정된 경우 해당 날짜로 필터링
        const selectedDate = dateFilter.value;
        const filteredApplications = selectedDate ? 
            applications.filter(app => app.date === selectedDate) : 
            applications;

        // 신청 목록 표시
        applicationList.innerHTML = "";
        filteredApplications.forEach((application, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${application.name} - ${application.grade}학년 - ${application.date}`;
            
            // 수정 버튼 추가
            const editButton = document.createElement("button");
            editButton.textContent = "수정";
            editButton.className = "editButton";
            editButton.addEventListener("click", () => editApplication(index));
            
            // 삭제 버튼 추가
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.className = "deleteButton";
            deleteButton.addEventListener("click", () => deleteApplication(index));
            
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            applicationList.appendChild(li);
        });
    }

    // 날짜 필터 변경 시 목록 업데이트
    dateFilter.addEventListener("change", function () {
        updateApplicationList();
    });

    function editApplication(index) {
        const application = applications[index];
        const newName = prompt("새 이름:", application.name);
        const newGrade = prompt("새 학년:", application.grade);
        const newDate = prompt("새 날짜 (YYYY-MM-DD):", application.date);

        if (newName && newGrade && newDate) {
            applications[index] = { name: newName, grade: newGrade, date: newDate };
            localStorage.setItem("applications", JSON.stringify(applications));
            updateApplicationList();
        }
    }

    function deleteApplication(index) {
        if (confirm("정말로 삭제하시겠습니까?")) {
            applications.splice(index, 1);
            localStorage.setItem("applications", JSON.stringify(applications));
            updateApplicationList();
        }
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
