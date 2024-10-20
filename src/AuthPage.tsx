import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import PhoneInput from "./PhoneInput";
import CodeInput from "./CodeInput";
import { sendOTP, signIn } from "./api.ts";

interface AuthPageProps {
  setToken: (token: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setToken }) => {
  const [step, setStep] = useState<number>(1);
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [alert, setAlert] = useState<string>("");

  const navigate = useNavigate();

  const validatePhone = (phone: string): boolean => {
    if (/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(phone)) {
      return true;
    }

    return false;
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCode(inputValue);
  };

  const handleContinue = () => {
    console.log(phone);
    if (step == 1) {
      if (phone == "") {
        setAlert("Поле является обязательным");
        return;
      }

      sendOTP(phone)
        .then((response) => {
          setStep(2);
          console.log(JSON.stringify(response) + ", going to 2nd part");
        })
        .catch((err) => console.log(err));
    } else if (step == 2) {
      if (code.length != 6) {
        setAlert("Код должен содержать 6 цифр");
        return;
      }

      signIn(phone, code)
        .then((response) => {
          setStep(3);
          console.log(JSON.stringify(response) + ", going to profile page");
          console.log(response.token);
          setToken(response.token);
          navigate("/profile");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h1>Вход</h1>

      <div className="container">
        <div className={`content ${step === 1 ? "slide-in" : "phone-input"}`}>
          <PhoneInput
            phone={phone}
            alertPhone={alert}
            setPhone={setPhone}
            validatePhone={validatePhone}
            onContinue={handleContinue}
          />
        </div>

        <div className={`content ${step === 2 ? "slide-in" : "code-input"}`}>
          <CodeInput
            phone={phone}
            alertCode={alert}
            setPhone={setPhone}
            onChangeCode={handleCodeChange}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
