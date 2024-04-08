document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById("noteInput");
    const saveNoteBtn = document.getElementById("saveBtn");
    const notesContainer = document.getElementById("notesContainer");
    
    loadNotes();
    
    saveNoteBtn.addEventListener("click", function () {
        const noteText = noteInput.value.trim();
        if (noteText !== "") {
            saveNoteToLocalStorage(noteText);
            noteInput.value = "";
        }
    });
    
    function saveNoteToLocalStorage(text) {
        const timestamp = new Date().toLocaleString();
        const note = { text: text, timestamp: timestamp };
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    } 

    function loadNotes() {
        notesContainer.innerHTML = "";
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.forEach(function (note, index) {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.innerHTML = `
                <p>${note.text}</p>
                <small>${note.timestamp}</small>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    window.editNote = function (index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const editedNote = prompt("Edit the note:", notes[index].text);
        if (editedNote !== null) {
            notes[index].text = editedNote;
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
        }
    };

    window.deleteNote = function (index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    };
});