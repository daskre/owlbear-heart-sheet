import '../styles.css';

const Meta = ({ meta, setMeta }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeta({
      ...meta,
      [name]: value
    });
  };

  return (
    <section className="meta-container">
      <label>Name</label>
      <input type="text" name="name" value={meta.name} onChange={handleChange} />
      <label>Ancestry</label>
      <input type="text" name="ancestry" value={meta.ancestry} onChange={handleChange} />
      <label>Class</label>
      <input type="text" name="class" value={meta.class} onChange={handleChange} />
      <label>Calling</label>
      <input type="text" name="calling" value={meta.calling} onChange={handleChange} />
    </section>
  );
};
export default Meta;
