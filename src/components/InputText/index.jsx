import "./styles.css";

export const InputText = ({ searchValue, handleChange }) => {
  return <input className="text-input" onChange={handleChange} value={searchValue} type="search" />;
};
