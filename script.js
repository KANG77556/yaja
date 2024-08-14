document.getElementById('yaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const location = document.getElementById('location').value;

    // 선택된 날짜들을 배열로 가져오기
    const datesSelect = document.getElementById('dates');
    const selectedDates = Array.from(datesSelect.selectedOptions).map(option => option.value);

    // 신청자 정보를 localStorage에 저장
    const applicants = JSON.parse(localStorage.getItem('applicants')) || [];
    applicants.push({ name, grade, dates: selectedDates, location });
    localStorage.setItem('applicants', JSON.stringify(applicants));

    // 신청 완료 메시지 표시
    const applicationMessage = document.getElementById('applicationMessage');
    applicationMessage.textContent = `신청이 완료되었습니다. 이름: ${name}, 학년: ${grade}, 날짜: ${selectedDates.join(', ')}, 장소: ${location}`;

    // 폼 초기화
    document.getElementById('yaForm').reset();
});
