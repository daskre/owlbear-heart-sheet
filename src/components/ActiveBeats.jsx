import React, { useEffect } from 'react';
import '../styles/list-components.css';

const ActiveBeats = ({ beats, setBeats }) => {
  const addBeat = () => {
    setBeats([...beats, { text: '', completed: false }]);
  };

  const updateBeat = (index, value) => {
    const newBeats = [...beats];
    newBeats[index].text = value;
    setBeats(newBeats);
  };

  const toggleBeat = (index) => {
    const newBeats = [...beats];
    newBeats[index].completed = !newBeats[index].completed;
    setBeats(newBeats);
  };

  const deleteBeat = (index) => {
    const newBeats = beats.filter((_, i) => i !== index);
    setBeats(newBeats);
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('.beat-text');
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [beats]);

  return (
    <section>
      <div className="active-beats-header">
        <label>Active Beats</label>
        <button className="icon-button" onClick={addBeat}>+</button>
      </div>
      <ul>
        {beats.map((beat, index) => (
          <li key={index}>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id={`beat-checkbox-${index}`}
                checked={beat.completed}
                onChange={() => toggleBeat(index)}
              />
              <label htmlFor={`beat-checkbox-${index}`}></label>
              <textarea
                className={`beat-text ${beat.completed ? 'completed' : ''}`}
                value={beat.text}
                onChange={(e) => {
                  updateBeat(index, e.target.value);
                  adjustTextareaHeight(e.target);
                }}
                rows="2"
              />
            </div>
            <button className="icon-button" onClick={() => deleteBeat(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ActiveBeats;
