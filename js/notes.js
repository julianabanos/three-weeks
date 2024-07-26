let noteId = 0;

// Create a new sticky note and save it to Firestore
function createStickyNote() {
    const container = document.getElementById("container");
    const note = document.createElement("div");
    note.className = "note";
    note.id = "note_" + noteId;
    note.innerHTML = `
        <div class="header">
            <span class="delete" onclick="deleteStickyNote('${note.id}')">Delete</span>
        </div>
        <div class="content" spellcheck="false" contenteditable="true" oninput="updateNoteContent('${note.id}')">Add here!</div>
        <input type="color" class="color-picker" onchange="changeNoteColor('${note.id}', this.value)" value="#F4F4F4">
    `;
    note.style.top = "100px";
    note.style.left = "100px";
    note.style.backgroundColor = "#F4F4F4";

    const newNote = {
        id: note.id,
        content: "Add here!",
        top: note.style.top,
        left: note.style.left,
        color: "#F4F4F4"
    };

    saveNoteToFirestore(newNote);
    noteId++;
    note.addEventListener("mousedown", startDrag);
    container.appendChild(note);
}

// Update the content of a note
function updateNoteContent(noteId) {
    const note = document.getElementById(noteId);
    const content = note.querySelector(".content").innerText;
    updateNoteInFirestore(noteId, { content: content });
}

// Start dragging a note
function startDrag(event) {
    const note = event.target.closest(".note");
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const noteX = note.offsetLeft;
    const noteY = note.offsetTop;
    const offsetX = mouseX - noteX;
    const offsetY = mouseY - noteY;

    document.addEventListener("mousemove", dragNote);
    document.addEventListener("mouseup", stopDrag);

    function dragNote(event) {
        if (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'textarea') {
            return; // Prevent dragging if the target is an input element
        }
        event.preventDefault(); // Prevent text selection
        const newNoteX = event.clientX - offsetX;
        const newNoteY = event.clientY - offsetY;
        note.style.left = newNoteX + "px";
        note.style.top = newNoteY + "px";
        updateNoteInFirestore(note.id, { left: note.style.left, top: note.style.top });
    }

    function stopDrag() {
        document.removeEventListener("mousemove", dragNote);
        document.removeEventListener("mouseup", stopDrag);
    }
}

// Delete a note from Firestore
function deleteStickyNote(noteId) {
    const note = document.getElementById(noteId);
    note.remove();
    deleteNoteFromFirestore(noteId);
}

// Change the color of a note
function changeNoteColor(noteId, color) {
    const note = document.getElementById(noteId);
    note.style.backgroundColor = color;
    updateNoteInFirestore(noteId, { color: color });
}

// Save a new note to Firestore
function saveNoteToFirestore(note) {
    db.collection("notes").doc(note.id).set(note)
        .then(() => {
            console.log("Note successfully written!");
        })
        .catch((error) => {
            console.error("Error writing note: ", error);
        });
}

// Update a note in Firestore
function updateNoteInFirestore(noteId, update) {
    db.collection("notes").doc(noteId).update(update)
        .then(() => {
            console.log("Note successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating note: ", error);
        });
}

// Delete a note from Firestore
function deleteNoteFromFirestore(noteId) {
    db.collection("notes").doc(noteId).delete()
        .then(() => {
            console.log("Note successfully deleted!");
        })
        .catch((error) => {
            console.error("Error deleting note: ", error);
        });
}

// Load notes from Firestore and display them
function loadNotesFromFirestore() {
    db.collection("notes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const note = doc.data();
            const container = document.getElementById("container");
            const newNote = document.createElement("div");
            newNote.className = "note";
            newNote.id = note.id;
            newNote.innerHTML = `
                <div class="header">
                    <span class="delete" onclick="deleteStickyNote('${note.id}')">Delete</span>
                </div>
                <div class="content" spellcheck="false" contenteditable="true" oninput="updateNoteContent('${note.id}')">${note.content}</div>
                <input type="color" class="color-picker" onchange="changeNoteColor('${note.id}', this.value)" value="${note.color}">
            `;
            newNote.style.top = note.top;
            newNote.style.left = note.left;
            newNote.style.backgroundColor = "#999900";
            newNote.addEventListener("mousedown", startDrag);
            container.appendChild(newNote);
        });
    });
}

window.addEventListener("DOMContentLoaded", loadNotesFromFirestore);


