import React, { useState } from "react";
import Input from "./Input/Input";
import { IFormFields, IFormErrors, IPosition } from "../../../interfaces/IForm";

interface IFieldList {
  positions: IPosition[];
  formFields: IFormFields;
  formErrors: IFormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FormEvent<HTMLInputElement>) => void;
}

function FieldList({ positions, formFields, formErrors, handleChange, handleBlur }: IFieldList) {
  const [fileLabel, setFileLabel] = useState("Upload your photo");

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    if (e.currentTarget.files) {
      const newLabel = e.currentTarget.files[0]?.name || "Upload your photo";
      setFileLabel(newLabel);
    }
  };

  return (
    <ul className="sign-up__form-field-list">
      <Input
        id="name"
        name="name"
        value={formFields.name}
        error={formErrors.name}
        label="Your name"
        classNameInput="sign-up__input input"
        classNameLabel="label"
        placeholder=" "
        handleChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        id="email"
        name="email"
        value={formFields.email}
        error={formErrors.email}
        label="Email"
        classNameInput="sign-up__input input"
        classNameLabel="label"
        placeholder=" "
        handleChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        id="phone"
        name="phone"
        value={formFields.phone}
        error={formErrors.phone}
        label="Phone"
        classNameInput="sign-up__input input"
        classNameLabel="label"
        placeholder=" "
        helpText="+38 (XXX) XXX - XX - XX"
        handleChange={handleChange}
        onBlur={handleBlur}
      />
      <li className="sign-up__form-field sign-up__select-position select-position">
        <fieldset>
          <legend className="select-position__heading">Select your position</legend>
          <ul className="select-position__radio-btn-list">
            {positions.map((position) => {
              const correctIdName = `p_${position.name.replace(/\s/g, "_")}`;
              return (
                <Input
                  key={position.id}
                  id={correctIdName}
                  type="radio"
                  name="position"
                  value={String(position.id)}
                  label={position.name}
                  checked={Number(formFields.position) === position.id}
                  handleChange={handleChange}
                />
              );
            })}
          </ul>
        </fieldset>
      </li>
      <Input
        id="photo"
        type="file"
        name="photo"
        error={formErrors.photo}
        label={fileLabel}
        classNameInput="sign-up__input sign-up__input-file input"
        classNameLabel="sign-up__input-file-name"
        accept=".jpg, .jpeg"
        handleChange={handleChangeFile}
        onBlur={handleBlur}
      />
    </ul>
  );
}

export default FieldList;
