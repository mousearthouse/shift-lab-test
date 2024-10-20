import React from "react";
import "./App.css";
import PhoneMaskInput from "./PhoneMaskInput";

const PhoneInput: React.FC<{
  phone: string;
  setPhone: (value: string) => void;
  alertPhone: string;
  validatePhone: (value: string) => boolean;
  onContinue: () => void;
}> = ({ phone, alertPhone, setPhone, validatePhone, onContinue }) => {
  return (
    <div className="content">
      <h3>Введите номер телефона для входа в личный кабинет</h3>

      <div className="container">
        <PhoneMaskInput phone={phone} setPhone={setPhone} />
        <p className="text-field">{alertPhone}</p>
      </div>
      <button
        className="shift_btn"
        onClick={onContinue}
        disabled={!validatePhone(phone)}
      >
        Продолжить
      </button>
    </div>
  );
};

export default PhoneInput;
