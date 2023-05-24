import React from "react";
import classes from "./Input.module.css";

const Input = ({
  type,
  name,
  hide,
  children,
  className,
  getImages,
  value,
  setValue,
  placeholder,
}) => {
  const getValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`${classes.input} ${className}`}>
      <label htmlFor={name}>{children}</label>

      {type === "textarea" ? (
        <textarea
          onChange={getValue}
          name={name}
          id={name}
          style={{ display: hide ? "none" : null }}
        />
      ) : (
        <input
          placeholder={placeholder}
          value={value}
          onChange={type !== "file" ? getValue : null}
          name={name}
          id={name}
          type={type}
          min={0}
          accept="image/*"
          multiple
          onInput={(e) => {
            type === "file" &&
              getImages(Object.values(e.target.files).map((image) => image));
          }}
          style={{ display: hide ? "none" : null }}
        />
      )}
    </div>
  );
};

export default Input;
