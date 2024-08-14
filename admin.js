// Mock data: In reality, this data would be fetched from a server/database.
const applicantsData = [
    { name: '홍길동', grade: '1학년', date: '2024-08-10' },
    { name: '김영희', grade: '2학년', date: '2024-08-11' },
    { name: '이철수', grade: '3학년', date: '2024-08-10' },
    { name: '박수진', grade: '2학년', date: '2024-08-12' },
];

document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const selectedDate = document.getElementById('viewDate').value;
    const applicantList = document.getElementById('applicantList');

    // Clear any previous data
    applicantList.innerHTML = '';

    // Filter the applicants by the selected date
    const filteredApplicants = applicantsData.filter(applicant => applicant.date === selectedDate);

    // Display the filtered applicants
    if (filteredApplicants.length > 0) {
        const list = document.createElement('ul');
        filteredApplicants.forEach(applicant => {
            const listItem = document.createElement('li');
            listItem.textContent = `이름: ${applicant.name}, 학년: ${applicant.grade}`;
            list.appendChild(listItem);
        });
        applicantList.appendChild(list);
    } else {
        applicantList.textContent = '선택한 날짜에 신청자가 없습니다.';
    }
});
