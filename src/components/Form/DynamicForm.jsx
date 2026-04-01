import { useState } from "react";
import InputField from "../Common/InputField";

const DynamicForm = ({
  formModel,
  onSubmit,
  buttonText,
  disabled,
  customButtonClass,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (name, value, rules) => {
    if (rules?.required && !value) return "Trường này là bắt buộc";
    if (rules?.pattern && !rules.pattern.test(value)) return rules.message;
    if (rules?.minLength && value.length < rules.minLength)
      return `Tối thiểu ${rules.minLength} ký tự`;
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate real-time
    const fieldRule = formModel.find((f) => f.name === name)?.rules;
    const errorMsg = validate(name, value, fieldRule);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    formModel.forEach((field) => {
      const errorMsg = validate(field.name, formData[field.name], field.rules);
      if (errorMsg) newErrors[field.name] = errorMsg;
    });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      {formModel.map((field) => (
        <InputField
          key={field.name}
          {...field}
          value={formData[field.name] || ""}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      <button
        type="submit"
        disabled={disabled}
        className={customButtonClass}
        style={{
          backgroundColor: "#e0dbcf",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {buttonText}
      </button>
    </form>
  );
};
export default DynamicForm;
