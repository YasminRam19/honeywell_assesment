import { useState } from "react";
import useInput from "../hooks/use-input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

//*******************************Validation Functions***********************
//Validation functions that will be passed to the use-input hook, these can be outside of the component because these functions not need to rebuilt if the component is rebuilt

//FirstName Input Validation
const isNotEmpty = (value) => value.trim() !== "";
//Email Input Validation
const isEmail = (value) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim()) &&
  value.includes(".com");
const isEmail2 = (value) => value.includes("@") && value.includes(".com");
//Password Input Validation
const isMinLength = (value) => value.length >= 8;
const isCapitalLetter = (value) => /[A-Z]/.test(value);
const isSpecialChar = (value) =>
  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
const isPassword = (value) =>
  value.length >= 8 &&
  /[A-Z]/.test(value) &&
  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

const SignupForm = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: enteredPass,
    isValid: enteredPassIsValid,
    hasError: passInputHasError,
    valueChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetPassInput,
  } = useInput(isPassword);

  const {
    value: enteredConfirmPass,
    isValid: enteredConfirmPassIsValid,
    hasError: confirmPassInputHasError,
    valueChangeHandler: confirmPassChangeHandler,
    inputBlurHandler: confirmPassBlurHandler,
    reset: resetConfirmPassInput,
  } = useInput((value) => value === enteredPass);

  //States to hide or show the Password and Password Confirmation when user clicks on the eye icon.
  const [shownPassword, setShownPassword] = useState(false);
  const [shownConfirmedPassword, setShownConfirmedPassword] = useState(false);

  //Additional Handler functions to hide or show the Password and Password Confirmation when user clicks on the eye icon.
  const togglePassHandler = (e) => {
    setShownPassword(!shownPassword);
  };
  const toggleConfirmedPassHandler = (e) => {
    setShownConfirmedPassword(!shownConfirmedPassword);
  };

  //Format form control according to the variable state, valid or invalid.
  const nameInputClasses = nameInputHasError ? "cta-form invalid" : "cta-form";
  const emailInputClasses = emailInputHasError
    ? "cta-form invalid"
    : "cta-form";
  const passInputClasses = passInputHasError ? "cta-form invalid" : "cta-form";
  const confirmedPassClasses = confirmPassInputHasError
    ? "cta-form invalid"
    : "cta-form";

  //Form validation
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPassIsValid &&
    enteredConfirmPassIsValid
  ) {
    formIsValid = true;
  }

  //Handler for Submit Button "Sign up"
  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(enteredName);
    console.log(enteredEmail);
    console.log(enteredPass);
    console.log(enteredConfirmPass);

    //Reset values
    resetNameInput();
    resetEmailInput();
    resetPassInput();
    resetConfirmPassInput();
    setShownPassword(false);
    setShownConfirmedPassword(false);
  };

  return (
    <div className="container">
      <div className="cta-text-box">
        <h2 className="heading-tertiary heading--cta">
          Welcome, #FutureSharper
        </h2>
        <form className="cta-form" onSubmit={submitHandler}>
          {/*****************************  NAME *****************************/}
          <div className={nameInputClasses}>
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              //Bind the entered value back to the input through the value property
              value={enteredName}
            />
            {nameInputHasError && (
              <p class="error-text">Name must not be empty</p>
            )}
          </div>
          {/*****************************  EMAIL *****************************/}
          <div className={emailInputClasses}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            ></input>
            {emailInputHasError && (
              <p class="error-text">Enter a valid email</p>
            )}
          </div>
          {/*****************************  PASSWORD *****************************/}
          <div className={passInputClasses}>
            <label htmlFor="password">Password</label>
            <div className="input-icons">
              <input
                type={shownPassword ? "text" : "password"}
                id="password"
                onChange={passChangeHandler}
                onBlur={passBlurHandler}
                value={enteredPass}
              ></input>
              {shownPassword && (
                <i>
                  <AiOutlineEye onClick={togglePassHandler} />
                </i>
              )}
              {!shownPassword && (
                <i>
                  <AiOutlineEyeInvisible onClick={togglePassHandler} />
                </i>
              )}
            </div>
            {passInputHasError && (
              <p className="error-text">Enter a valid password</p>
            )}
            {enteredPass.length < 8 && (
              <p className="valid-text-indication">Min length is 8</p>
            )}
            {!/[A-Z]/.test(enteredPass) && (
              <p className="valid-text-indication">
                Contains at least one Capital letter
              </p>
            )}
            {!isSpecialChar(enteredPass) && (
              <p>Contains at least one special charachter</p>
            )}
          </div>
          {/*****************************  CONFIRMATION PASSWORD *****************************/}
          <div class={confirmedPassClasses}>
            <label htmlFor="confirmPass">Confirm Password</label>
            <div className="input-icons">
              <input
                type={shownConfirmedPassword ? "text" : "password"}
                id="confirmPass"
                onChange={confirmPassChangeHandler}
                onBlur={confirmPassBlurHandler}
                value={enteredConfirmPass}
              ></input>
              {shownConfirmedPassword && (
                <i>
                  <AiOutlineEye onClick={toggleConfirmedPassHandler} />
                </i>
              )}
              {!shownConfirmedPassword && (
                <i>
                  <AiOutlineEyeInvisible onClick={toggleConfirmedPassHandler} />
                </i>
              )}
            </div>
            {confirmPassInputHasError && (
              <p class="error-text">Confirmed Password does not match</p>
            )}
          </div>

          {/*****************************  Submit button *****************************/}
          <div className="form-actions">
            <button disabled={!formIsValid}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
