import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "../css/PhoneAppEdit.css";

function PhoneAppEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = `http://localhost:8090/api/phoneApp/${id}`;
  const updateUrl = `http://localhost:8090/api/phoneApp/modify/${id}`;

  const [contact, setContact] = useState({
    name: "",
    phone_number: "",
    email: "",
    nickname: "",
    memo: "",
  });

  useEffect(() => {
    fetchContactDetail();
  }, []);

  const fetchContactDetail = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("연락처를 불러올 수 없습니다.");
      }
      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        const errorData = await response.json(); // 에러 응답을 JSON으로 확인
        console.error("서버 응답 오류:", errorData);
        throw new Error("수정할 수 없습니다.");
      }

      alert("연락처가 수정되었습니다.");
      navigate(`/contact/${id}`);
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
    }
  };

  return (
    <div className="edit-contact">
      <h2>연락처 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>이름:</label>
        <input type="text" name="name" value={contact.name} onChange={handleChange} required />

        <label>전화번호:</label>
        <input type="text" name="phone_number" value={contact.phone_number} onChange={handleChange} required />

        <label>이메일:</label>
        <input type="email" name="email" value={contact.email} onChange={handleChange} required/>

        <label>닉네임:</label>
        <input type="text" name="nickname" value={contact.nickname} onChange={handleChange} />

        <label>메모:</label>
        <textarea name="memo" value={contact.memo} onChange={handleChange}></textarea>

        <button type="submit">저장</button>
        <button type="button" onClick={() => navigate(`/contact/${id}`)}>취소</button>
      </form>
    </div>
  );
}

export default PhoneAppEdit;
