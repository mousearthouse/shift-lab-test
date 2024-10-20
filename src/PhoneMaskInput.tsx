import { useRef, useEffect } from "react";
import IMask from "imask";

const PhoneMaskInput = ({
  phone,
  setPhone,
}: {
  phone: string;
  setPhone: (value: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const maskOptions = {
        mask: "+{7}(000)000-00-00",
        lazy: false,
      };

      const mask = IMask(inputRef.current, maskOptions);

      if (phone != "") {
        mask.value = phone;
      }

      mask.on("accept", () => {
        setPhone(mask.value);
      });

      return () => {
        mask;
      };
    }
  }, [phone, setPhone]);

  return (
    <div>
      <input id="phone" ref={inputRef} type="text" />
    </div>
  );
};

export default PhoneMaskInput;
