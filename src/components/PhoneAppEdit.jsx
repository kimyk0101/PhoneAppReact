import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/PhoneAppEdit.css";

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
    if (name === "memo") {
      // 메모 입력 필드일 때 높이 자동 조정
      const textarea = e.target;
      textarea.style.height = "auto"; // 먼저 높이를 auto로 리셋
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 설정
    }
    setContact((prev) => ({ ...prev, [name]: value })); // 상태 업데이트
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
    <div className="Edit-contact">
      <button
        onClick={() => navigate(`/contact/${id}`)}
        className="Edit_cancel-button"
      >
        취소
      </button>
      <h1>연락처 수정</h1>
      <form className="Edit_form" onSubmit={handleSubmit}>
        <div className="Edit_form-detail">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Edit_form-detail">
          <label htmlFor="phone_number">전화번호:</label>
          <input
            type="text"
            name="phone_number"
            value={contact.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Edit_form-detail">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Edit_form-detail">
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={contact.nickname}
            onChange={handleChange}
          />
        </div>
        <div className="Edit_form-detail">
          <label htmlFor="memo">메모:</label>
          <textarea
            name="memo"
            value={contact.memo}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="Edit_submit-button" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}

export default PhoneAppEdit;
