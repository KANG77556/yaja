document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const adminId = document.getElementById('adminId').value;
    const adminPassword = document.getElementById('adminPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    // 관리자 로그인 정보 확인
    if (adminId === '밀성제일고' && adminPassword === '5204') {
        loginMessage.textContent = '로그인 성공!';
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('applicantsSection').style.display = 'block';

        // 전체 신청자 불러오기
        loadApplicants();
    } else {
        loginMessage.textContent = '아이디 또는 비밀번호가 잘못되었습니다.';
    }
});

function loadApplicants() {
    const applicantsList = document.getElementById('applicantsList');
    applicantsList.innerHTML = ''; // 명단 초기화

    // localStorage에서 신청자 정보 가져오기
    const applicants = JSON.parse(localStorage.getItem('applicants')) || [];

    applicants.forEach(function(applicant) {
        // 모든 신청자 명단을 추가
        addApplicantRow(applicant);
    });
}

function addApplicantRow(applicant) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${applicant.name}</td>
        <td>${applicant.grade}</td>
        <td>${applicant.dates.join(', ')}</td>
        <td>${applicant.location}</td>
    `;
    document.getElementById('applicantsList').appendChild(row);
}

// 날짜 필터링
document.getElementById('filterButton').addEventListener('click', function() {
    const filterDate = document.getElementById('filterDate').value;
    const applicantsList = document.getElementById('applicantsList');
    applicantsList.innerHTML = ''; // 기존 명단 초기화

    // localStorage에서 신청자 정보 가져오기
    const applicants = JSON.parse(localStorage.getItem('applicants')) || [];

    applicants.forEach(function(applicant) {
        // 신청자의 모든 날짜 중에서 선택한 날짜가 있는지 확인
        if (applicant.dates.includes(filterDate)) {
            addApplicantRow(applicant);
        }
    });
});
