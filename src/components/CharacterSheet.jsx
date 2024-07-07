import { useState, useEffect } from 'react';
import Meta from './Meta';
import ActiveBeats from './ActiveBeats';
import Equipment from './Equipment';
import Resources from './Resources';
import Skills from './Skills';
import Domains from './Domains';
import Status from './Status';
import Abilities from './Abilities';
import Fallout from './Fallout';
import Notes from './Notes';
import '../styles/character-sheet.css';

const CharacterSheet = () => {
  const initialCharacter = {
    meta: {
      name: '',
      ancestry: '',
      class: '',
      calling: '',
    },
    activeBeats: [],
    equipment: [],
    resources: [],
    skills: [],
    domains: [],
    status: {
      resistances: {
        Blood: { stress: Array(10).fill(false), protection: Array(5).fill(false) },
        Mind: { stress: Array(10).fill(false), protection: Array(5).fill(false) },
        Echo: { stress: Array(10).fill(false), protection: Array(5).fill(false) },
        Fortune: { stress: Array(10).fill(false), protection: Array(5).fill(false) },
        Supplies: { stress: Array(10).fill(false), protection: Array(5).fill(false) },
      },
    },
    abilities: [],
    fallout: [],
    notes: [],
  };

  const [character, setCharacter] = useState(initialCharacter);
  const [isCharacterLoaded, setIsCharacterLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const savedCharacter = localStorage.getItem('owlbear-heart-character');
    if (savedCharacter) {
      console.log("Found saved character: ", JSON.parse(savedCharacter));
      setCharacter(JSON.parse(savedCharacter));
    }
    setIsCharacterLoaded(true);
  }, []);

  useEffect(() => {
    if (isCharacterLoaded) {
      localStorage.setItem('owlbear-heart-character', JSON.stringify(character));
    }
  }, [character, isCharacterLoaded]);

  const handleLoad = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result);
      setCharacter(data);
    };
    fileReader.readAsText(e.target.files[0]);
    e.target.value = null; // Reset the input value to allow loading the same file again
  };

  const handleSave = () => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();
    const characterWithTimestamp = {
      ...character,
      savedate: formattedDateTime, // Readable date and time
    };
    const dataStr = JSON.stringify(characterWithTimestamp, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    a.download = `owlbear-heart-${character.meta.name || 'character'}-${timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="character-sheet">
      <div className="header">
        <button className="button save" onClick={handleSave}>Save</button>
        <input
          type="file"
          accept=".json"
          onChange={handleLoad}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <button className="button" onClick={() => setShowInfo(!showInfo)}>Info</button>
        <button className="button load" onClick={() => document.getElementById('fileInput').click()}>Load</button>
      </div>
      {showInfo && (
        <div className="info-box">
          <p><strong>Heart Character Sheet</strong></p>
          <p>Every change is saved locally to the browser. Refreshing the browser should keep the data.</p>
          <p>Use "Save" to export the sheet to JSON-Format.</p>
          <p>Use "Load" to import a sheet in JSON-Format. This will immediately overwrite your local save in the browser.</p>
          <p><strong>I recommend saving often and especially before loading from a file.</strong></p>
        </div>
      )}
      <Meta meta={character.meta} setMeta={(newMeta) => setCharacter({ ...character, meta: newMeta })} />
      <ActiveBeats beats={character.activeBeats} setBeats={(newBeats) => setCharacter({ ...character, activeBeats: newBeats })} />
      <Status status={character.status} setStatus={(newStatus) => setCharacter({ ...character, status: newStatus })} />
      <Fallout fallout={character.fallout} setFallout={(newFallout) => setCharacter({ ...character, fallout: newFallout })} />
      <Skills skills={character.skills} setSkills={(newSkills) => setCharacter({ ...character, skills: newSkills })} />
      <Domains domains={character.domains} setDomains={(newDomains) => setCharacter({ ...character, domains: newDomains })} />
      <Abilities abilities={character.abilities} setAbilities={(newAbilities) => setCharacter({ ...character, abilities: newAbilities })} />
      <Equipment equipment={character.equipment} setEquipment={(newEquipment) => setCharacter({ ...character, equipment: newEquipment })} />
      <Resources resources={character.resources} setResources={(newResources) => setCharacter({ ...character, resources: newResources })} />
      <Notes notes={character.notes} setNotes={(newNotes) => setCharacter({ ...character, notes: newNotes })} />
    </div>
  );
};

export default CharacterSheet;
