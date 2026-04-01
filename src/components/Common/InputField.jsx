const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled,
}) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? "error" : ""}`}
      />
      <span className="error-message">{error ? error : ""}</span>
    </div>
  );
};
export default InputField;
