import React from 'react';
import '../styles/list-components.css';

const Domains = ({ domains, setDomains }) => {
  const addDomain = () => {
    setDomains([...domains, { text: '' }]);
  };

  const updateDomain = (index, value) => {
    const newDomains = [...domains];
    newDomains[index].text = value;
    setDomains(newDomains);
  };

  const deleteDomain = (index) => {
    const newDomains = domains.filter((_, i) => i !== index);
    setDomains(newDomains);
  };

  return (
    <section>
      <div className="domains-header">
        <label>Domains</label>
        <button className="icon-button" onClick={addDomain}>+</button>
      </div>
      <ul>
        {domains.map((domain, index) => (
          <li key={index}>
            <input
              className="domains-text"
              type="text"
              value={domain.text}
              onChange={(e) => updateDomain(index, e.target.value)}
            />
            <button className="icon-button" onClick={() => deleteDomain(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Domains;
