import React, { useEffect } from 'react';
import '../styles/list-components.css';

const Fallout = ({ fallout, setFallout }) => {
  const addFallout = () => {
    setFallout([...fallout, { text: '' }]);
  };

  const updateFallout = (index, value) => {
    const newFallout = [...fallout];
    newFallout[index].text = value;
    setFallout(newFallout);
  };

  const deleteFallout = (index) => {
    const newFallout = fallout.filter((_, i) => i !== index);
    setFallout(newFallout);
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('.fallout-text');
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [fallout]);

  return (
    <section>
      <div className="fallout-header">
        <label>Fallout</label>
        <button className="icon-button" onClick={addFallout}>+</button>
      </div>
      <ul>
        {fallout.map((item, index) => (
          <li key={index}>
            <textarea
              className="fallout-text"
              value={item.text}
              onChange={(e) => {
                updateFallout(index, e.target.value);
                adjustTextareaHeight(e.target);
              }}
              rows="2"
            />
            <button className="icon-button" onClick={() => deleteFallout(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Fallout;
