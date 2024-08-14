document.getElementById('yaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;

    // Display a message or handle the submission
    const applicationMessage = document.getElementById('applicationMessage');
    applicationMessage.textContent = `신청이 완료되었습니다. 이름: ${name}, 학년: ${grade}, 날짜: ${date}, 장소: ${location}`;

    // You can also make an AJAX request here to submit the form data to a server
    // Example: sending data to a server via fetch (replace with your own URL)
    /*
    fetch('your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, grade, date, location }),
    })
    .then(response => response.json())
    .then(data => {
        applicationMessage.textContent = '신청이 완료되었습니다!';
    })
    .catch(error => {
        applicationMessage.textContent = '신청에 실패했습니다. 다시 시도해 주세요.';
        console.error('Error:', error);
    });
    */
});
