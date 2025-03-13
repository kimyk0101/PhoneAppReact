import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PhoneAppAdd.css"; // 스타일 시트 추가

function PhoneAppAdd() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [memo, setMemo] = useState("");
  const navigate = useNavigate();

  const apiUrl = "http://localhost:8090/api/phoneApp"; // 서버 URL

  // 서버에서 연락처 목록을 받아오는 함수
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("연락처를 받아오지 못했습니다.");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("ERROR", error);
      }
    };

    fetchContacts();
  }, []);

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 (간단한 예시)
    if (!name || !phoneNumber) {
      alert("이름과 전화번호는 필수 입력 사항입니다.");
      return;
    }

    // ID 계산 (기존 연락처 목록에서 가장 큰 ID에 1을 더한 값)
    const newId =
      contacts.length > 0
        ? Math.max(...contacts.map((contact) => contact.id)) + 1
        : 1;

    const newContact = {
      id: newId,
      name,
      phone_number: phoneNumber,
      email,
      nickname,
      memo,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error("연락처를 추가하는 데 실패했습니다.");
      }
      const data = await response.json(); // 데이터 받기

      // 응답 데이터가 없으면 추가 처리하지 않음
      if (!data.id) {
        throw new Error("추가된 연락처를 찾을 수 없습니다.");
      }

      // 연락처 추가 후, 새로 추가된 연락처의 상세 페이지로 이동
      navigate(`/contact/${data.id}`);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="add-contact">
      <h1>연락처 추가</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">전화번호:</label>
          <input
            type="text"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="memo">메모:</label>
          <textarea
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default PhoneAppAdd;
