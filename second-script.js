// second-script.js
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('secondQuestionForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        var userAnswer = document.getElementById('secondAnswer').value;
        var correctAnswer = "Your Second Correct Answer Here"; // Replace with the correct answer

        if(userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
            alert('Correct! Your surprise is ready!'); // Replace with actual surprise or redirect
            // You can redirect to another page or reveal a surprise here
        } else {
            alert('Oops, that doesn\'t seem right. Try again!');
        }
    });
});
