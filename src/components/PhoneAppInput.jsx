import { useState } from "react";

function PhoneAppForm({ addContact }) {
  const [inputName, setInputName] = useState("");
  const [inputPhone_number, setInputPhone_number] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  return (
    <div className="container">
      <h1>전화번호부</h1>
      <input
        className="input-box"
        type="text"
        placeholder="name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="phone_number"
        value={inputPhone_number}
        onChange={(e) => setInputPhone_number(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <button
        className="input-button"
        onClick={() => {
          if (
            inputName.trim() !== "" &&
            inputPhone_number.trim() !== "" &&
            inputEmail.trim() !== ""
          ) {
            //  추가
            addContact(inputName, inputPhone_number, inputEmail);
            setInputName("");
            setInputPhone_number("");
            setInputEmail("");
          }
        }}
      >
        전화번호 추가
      </button>
    </div>
  );
}

export default PhoneAppForm;
