// script.js
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        var userAnswer = document.getElementById('answer').value;
        var correctAnswer = "Your Correct Answer Here"; // Replace with the correct answer

        if(userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
            window.location.href = 'second-question.html'; // Redirect to the second question page
        } else {
            alert('Oops, that doesn\'t seem right. Try again!');
        }
    });
});
