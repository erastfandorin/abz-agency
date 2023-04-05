import React, { useState } from "react";
import { validateEmail, validateName, validatePhone } from "../../helpers/validateRegEx";
import { getResolutionFileImg } from "../../helpers/utilities";
import { initialValues, validateFields } from "./initialValues";
import { IFormFields, IFormErrors } from "../../interfaces/IForm";

function withFormValidate<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function Wrapper(props: any) {
    const [formFields, setFormFields] = useState<IFormFields>(initialValues);
    const [formErrors, setErrors] = useState<IFormErrors>(validateFields);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { name, value } = e.currentTarget;

      if (name === "phone") {
        value = autocompletePhoneNumber(value);
      }

      if (name === "photo" && e.currentTarget.files) {
        setFormFields({ ...formFields, [name]: e.currentTarget.files[0] });
      } else {
        setFormFields({ ...formFields, [name]: value.trim() });
      }

      setErrors({ ...formErrors, [name]: "" });
    };

    const autocompletePhoneNumber = (phone: string): string => {
      let newPhone = phone;
      if (!newPhone.startsWith("+") && newPhone.length > 0) newPhone = "+" + newPhone;
      if (!newPhone.startsWith("+3") && newPhone.length > 1) newPhone = "+3" + newPhone.slice(1);
      if (!newPhone.startsWith("+38") && newPhone.length > 2) newPhone = "+38" + newPhone.slice(2);
      return newPhone;
    };

    const validateForm = async (): Promise<boolean> => {
      for (const item of Object.keys(formErrors)) {
        const isValid = await validateField(item, formFields[item]);
        if (!isValid) {
          return false;
        }
      }
      return true;
    };

    const handleBlur = async (e: React.FormEvent<HTMLInputElement>) => {
      const { value, name } = e.currentTarget;
      validateField(name, value);
    };

    const validateField = async (name: string, value: string | File): Promise<boolean> => {
      if (!isNotEmptyValue(name, value)) {
        return false;
      }

      if (typeof value !== "string") {
        return await validatePhotoField(name, value);
      } else {
        return validateTextField(name, value);
      }
    };

    const validatePhotoField = async (name: string, value: File) => {
      // photo type
      if (!["image/jpeg", "image/jpg"].includes(value.type)) {
        setErrors({
          ...formErrors,
          [name]: "photo should be jpg/jpeg image formats",
        });
        return false;
      }
      // photo size
      const fiveMB = 5 * 1024 * 1024;
      if (!(fiveMB >= value.size)) {
        setErrors({
          ...formErrors,
          [name]: "photo size must not exceed 5MB",
        });
        return false;
      }
      // photo resolution
      const resolution = await getResolutionFileImg(value);
      const minResolution = 70;
      if (resolution.width < minResolution || resolution.height < minResolution) {
        setErrors({
          ...formErrors,
          [name]: "photo resolution at least 70x70px",
        });
        return false;
      }
      return true;
    };
    const validateTextField = (name: string, value: string) => {
      switch (name) {
        case "name":
          if (!validateName(value)) {
            setErrors({
              ...formErrors,
              [name]: "user name, should be 2-60 characters",
            });
            return false;
          }
          return true;
        case "email":
          if (!validateEmail(value)) {
            setErrors({ ...formErrors, [name]: "enter a valid email" });
            return false;
          }
          return true;
        case "phone":
          if (!validatePhone(value)) {
            setErrors({
              ...formErrors,
              [name]: "number should be 12 numbers",
            });
            return false;
          }
          return true;
        default:
          return true;
      }
    };

    const isNotEmptyValue = (name: string, value: string | File) => {
      if (!value) {
        setErrors({ ...formErrors, [name]: "field must not be empty" });
        return false;
      }
      return true;
    };

    return (
      <WrappedComponent
        {...props}
        formFields={formFields}
        formErrors={formErrors}
        setFormFields={setFormFields}
        validateForm={validateForm}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    );
  };
}

export default withFormValidate;
