import successfullyRegister from "../assets/img/success-image.svg";

function FormSended() {
  return (
    <section className="sign-up" id="sign-up">
       <h2 className="sign-up__heading heading">User successfully registered</h2>
       <img className="sign-up__form-sended-img" src={successfullyRegister} alt="Successfully registered"/>
    </section>
  );
}

export default FormSended;
