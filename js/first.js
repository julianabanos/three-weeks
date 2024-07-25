// script.js
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        var userAnswer = document.getElementById('answer').value;
        var correctAnswer = "three weeks"; // Replace with the correct answer

        if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
            window.location.href = 'second.html'; // Redirect to the second question page
        } else {
            showCustomAlert('Oops, you don\'t seem to be my amazing girlfriend. Try again!');
        }
    });
});

function showCustomAlert(message) {
    var modal = document.getElementById("customAlert");
    var alertMessage = document.getElementById("alertMessage");
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    alertMessage.textContent = message;
    modal.style.display = "block";

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
