import React, { useEffect } from 'react';
import '../styles/list-components.css';

const Equipment = ({ equipment, setEquipment }) => {
  const addEquipment = () => {
    setEquipment([...equipment, { text: '' }]);
  };

  const updateEquipment = (index, value) => {
    const newEquipment = [...equipment];
    newEquipment[index].text = value;
    setEquipment(newEquipment);
  };

  const deleteEquipment = (index) => {
    const newEquipment = equipment.filter((_, i) => i !== index);
    setEquipment(newEquipment);
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('.equipment-text');
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [equipment]);

  return (
    <section>
      <div className="equipment-header">
        <label>Equipment</label>
        <button className="icon-button" onClick={addEquipment}>+</button>
      </div>
      <ul>
        {equipment.map((item, index) => (
          <li key={index}>
            <textarea
              className="equipment-text"
              value={item.text}
              onChange={(e) => {
                updateEquipment(index, e.target.value);
                adjustTextareaHeight(e.target);
              }}
              rows="1"
            />
            <button className="icon-button" onClick={() => deleteEquipment(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Equipment;
