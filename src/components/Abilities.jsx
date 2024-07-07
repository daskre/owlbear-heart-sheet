import React, { useEffect } from 'react';
import '../styles/list-components.css';

const Abilities = ({ abilities, setAbilities }) => {
  const addAbility = () => {
    setAbilities([...abilities, { text: '' }]);
  };

  const updateAbility = (index, value) => {
    const newAbilities = [...abilities];
    newAbilities[index].text = value;
    setAbilities(newAbilities);
  };

  const deleteAbility = (index) => {
    const newAbilities = abilities.filter((_, i) => i !== index);
    setAbilities(newAbilities);
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('.abilities-text');
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [abilities]);

  return (
    <section>
      <div className="abilities-header">
        <label>Abilities</label>
        <button className="icon-button" onClick={addAbility}>+</button>
      </div>
      <ul>
        {abilities.map((ability, index) => (
          <li key={index}>
            <textarea
              className="abilities-text"
              value={ability.text}
              onChange={(e) => {
                updateAbility(index, e.target.value);
                adjustTextareaHeight(e.target);
              }}
              rows="2"
            />
            <button className="icon-button" onClick={() => deleteAbility(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Abilities;
