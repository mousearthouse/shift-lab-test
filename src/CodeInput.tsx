import React, { useState, useEffect } from "react";
import "./App.css";
import PhoneMaskInput from "./PhoneMaskInput";
import { sendOTP } from "./api";

const CodeInput: React.FC<{
  phone: string;
  setPhone: (value: string) => void;
  alertCode: string;
  onChangeCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}> = ({ phone, alertCode, setPhone, onChangeCode, onContinue }) => {
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  });

  const handleResend = () => {
    sendOTP(phone);
    setTimeLeft(30);
    setCanResend(false);
  };

  return (
    <div className="content">
      <h3>Введите проверочный код для входа в личный кабинет</h3>

      <PhoneMaskInput phone={phone} setPhone={setPhone} />

      <input
        type="number"
        maxLength={6}
        onChange={onChangeCode}
        placeholder="Проверочный код"
      />
      <p className="text-field">{alertCode}</p>
      <button className="shift_btn" onClick={onContinue}>
        Продолжить
      </button>

      {canResend ? (
        <button onClick={handleResend}>Отправить еще раз</button>
      ) : (
        <p>Отправить еще раз через {timeLeft} секунд</p>
      )}
    </div>
  );
};

export default CodeInput;
