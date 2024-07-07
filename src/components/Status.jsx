import React, { useState } from 'react';
import '../styles/status.css';

const resistances = [
  'Blood', 'Mind', 'Echo', 'Fortune', 'Supplies'
];

const Status = ({status, setStatus}) => {
 

  const handleCheckboxChange = (type, resistance, index) => {
    setStatus(
      {...status,
      resistances: {
        ...status.resistances,
        [resistance]: {
          ...status.resistances[resistance],
          [type]: status.resistances[resistance][type].map((item, i) => i === index ? !item : item)
        }
      }}
    );
  };

  const totalStress = Object.values(status.resistances).reduce((total, { stress }) => total + stress.filter(Boolean).length, 0);

  return (
    <div>
      <div className="status-header">
        <label>Stress & Protection</label>
        <label>Total Stress: {totalStress}</label>
      </div>
      <div className="status-container">
        {resistances.map(resistance => (
          <React.Fragment key={resistance}>
            <div className="resistance-label">{resistance}</div>
            {status.resistances[resistance].stress.map((checked, index) => (
              <React.Fragment key={`stress-${resistance}-${index}`}>
                <input
                  type="checkbox"
                  className="stress-checkbox"
                  id={`stress-${resistance}-${index}`}
                  checked={checked}
                  onChange={() => handleCheckboxChange('stress', resistance, index)}
                />
                <label className="stress-label" htmlFor={`stress-${resistance}-${index}`}></label>
              </React.Fragment>
            ))}
            {status.resistances[resistance].protection.map((checked, index) => (
              <React.Fragment key={`protection-${resistance}-${index}`}>
                <input
                  type="checkbox"
                  className="protection-checkbox"
                  id={`protection-${resistance}-${index}`}
                  checked={checked}
                  onChange={() => handleCheckboxChange('protection', resistance, index)}
                />
                <label className="protection-label" htmlFor={`protection-${resistance}-${index}`}></label>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Status;
