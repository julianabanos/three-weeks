// seventh-script.js
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('seventhQuestionForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        showCustomAlert('Correct! Your surprise is loading...');
        // wait 5 seconds before redirecting to the next page
        setTimeout(function() {
            window.location.href = 'notes.html'; // Redirect to the notes page
        }, 5000);
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
