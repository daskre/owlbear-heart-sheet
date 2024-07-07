import React, { useEffect } from 'react';
import '../styles/list-components.css';

const Resources = ({ resources, setResources }) => {
  const addResource = () => {
    setResources([...resources, { text: '' }]);
  };

  const updateResource = (index, value) => {
    const newResources = [...resources];
    newResources[index].text = value;
    setResources(newResources);
  };

  const deleteResource = (index) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('.resources-text');
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [resources]);

  return (
    <section>
      <div className="resources-header">
        <label>Resources</label>
        <button className="icon-button" onClick={addResource}>+</button>
      </div>
      <ul>
        {resources.map((item, index) => (
          <li key={index}>
            <textarea
              className="resources-text"
              value={item.text}
              onChange={(e) => {
                updateResource(index, e.target.value);
                adjustTextareaHeight(e.target);
              }}
              rows="1"
            />
            <button className="icon-button" onClick={() => deleteResource(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Resources;
