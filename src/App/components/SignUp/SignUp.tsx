import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import FormSended from "../FormSended";
import FieldList from "./FieldList/FieldList";
import withFormValidate from "../HOC/withFormValidate";
import abzTestApi from "../../services/abzApi";
import { IFormFields, IFormErrors, IPosition } from "../../interfaces/IForm";

interface ISignUp {
  isUserSignUp: boolean;
  setIsFormSended: (status: boolean) => boolean;
  formFields: IFormFields;
  formErrors: IFormErrors;
  setFormFields: (fields: IFormFields) => void;
  validateForm: () => boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FormEvent<HTMLInputElement>) => void;
}

function SignUp({ setIsFormSended, isUserSignUp, formFields, formErrors, setFormFields, validateForm, handleChange, handleBlur }: ISignUp) {
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const positions = await abzTestApi.getPositions();
      if (positions) {
        setPositions([...positions]);

        // active first radio btn
        const firstRadioBtn = String(positions[0].id);
        setFormFields({ ...formFields, position: firstRadioBtn });
      }
    })();
  }, []);
  useEffect(() => checkFormFill(), [formFields]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const isFormValid = validateForm();
    if (isFormValid) {
      const isUserPostSuccessful = await abzTestApi.postUser(formFields);
      setIsFormSended(isUserPostSuccessful);
    }
    setIsLoading(false);
  };

  const checkFormFill = ():void => {
    const formFill = Object.values(formFields).findIndex((value) => value === "");
    const formValid = Object.values(formErrors).findIndex((error) => !(error === ""));

    if (formFill === -1 && formValid === -1) {
      setIsFormFilled(true);
      return;
    }
    setIsFormFilled(false);
  };

  return (
    <section className="sign-up" id="sign-up">
      {!isUserSignUp ? (
        <>
          <h2 className="sign-up__heading heading">Working with POST request</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <form action="#" className="sign-up__form" onSubmit={handleSubmit}>
              <FieldList positions={positions} formFields={formFields} formErrors={formErrors} handleChange={handleChange} handleBlur={handleBlur} />
              <button type="submit" className={isFormFilled ? "sign-up__form-btn btn" : "sign-up__form-btn btn btn--disable"}>
                Sign up
              </button>
            </form>
          )}
        </>
      ) : (
        <FormSended />
      )}
    </section>
  );
}

export default withFormValidate(SignUp);
