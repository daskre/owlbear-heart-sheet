import React, { useEffect } from 'react';
import '../styles/list-components.css';

const Notes = ({ notes, setNotes }) => {
  const addNote = () => {
    setNotes([...notes, { text: '' }]);
  };

  const updateNote = (index, value) => {
    const newNotes = [...notes];
    newNotes[index].text = value;
    setNotes(newNotes);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('.notes-text');
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [notes]);

  return (
    <section>
      <div className="notes-header">
        <label>Notes</label>
        <button className="icon-button" onClick={addNote}>+</button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <textarea
              className="notes-text"
              value={note.text}
              onChange={(e) => {
                updateNote(index, e.target.value);
                adjustTextareaHeight(e.target);
              }}
              rows="2"
            />
            <button className="icon-button" onClick={() => deleteNote(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Notes;
