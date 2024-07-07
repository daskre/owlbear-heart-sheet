import React from 'react';
import '../styles/list-components.css';

const Skills = ({ skills, setSkills }) => {
  const addSkill = () => {
    setSkills([...skills, { text: '' }]);
  };

  const updateSkill = (index, value) => {
    const newSkills = [...skills];
    newSkills[index].text = value;
    setSkills(newSkills);
  };

  const deleteSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  return (
    <section>
      <div className="skills-header">
        <label>Skills</label>
        <button className="icon-button" onClick={addSkill}>+</button>
      </div>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            <input
              className="skills-text"
              type="text"
              value={skill.text}
              onChange={(e) => updateSkill(index, e.target.value)}
            />
            <button className="icon-button" onClick={() => deleteSkill(index)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
