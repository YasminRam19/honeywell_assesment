import { useState } from "react";
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched; //The input is invalid but also the user has already made changes on it

  //onChange Handlers
  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  //Blur handlers
  const inputBlurHandler = (e) => {
    //If the input loses focus, it definitely was touched
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
