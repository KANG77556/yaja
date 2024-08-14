document.getElementById('addDateButton').addEventListener('click', function() {
    const dateInput = document.getElementById('dateInput');
    const dateValue = dateInput.value;
    const dateList = document.getElementById('dateList');

    if (dateValue) {
        // Create a list item for the date
        const listItem = document.createElement('div');
        listItem.textContent = dateValue;

        // Add a remove button for each date
        const removeButton = document.createElement('button');
        removeButton.textContent = '삭제';
        removeButton.addEventListener('click', function() {
            dateList.removeChild(listItem);
        });

        listItem.appendChild(removeButton);
        dateList.appendChild(listItem);

        // Clear the date input
        dateInput.value = '';
    }
});

document.getElementById('yaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const location = document.getElementById('location').value;

    // Get all selected dates
    const dateElements = document.querySelectorAll('#dateList div');
    const dates = Array.from(dateElements).map(dateElem => dateElem.textContent.replace('삭제', '').trim());

    // Display a message with all the details
    const applicationMessage = document.getElementById('applicationMessage');
    applicationMessage.textContent = `신청이 완료되었습니다. 이름: ${name}, 학년: ${grade}, 날짜: ${dates.join(', ')}, 장소: ${location}`;

    // You can also send the data to the server via an AJAX request
    /*
    fetch('your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, grade, dates, location }),
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
