import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/PhoneAppDetail.css";

function PhoneAppDetail() {
  const [contact, setContact] = useState(null);
  const { id } = useParams(); // URL에서 id를 가져옴
  const navigate = useNavigate();
  const apiUrl = `http://localhost:8090/api/phoneApp/${id}`; // 특정 id에 맞는 API URL

  useEffect(() => {
    fetchContactDetail();
  }, [id]);

  const fetchContactDetail = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("연락처를 가져올 수 없습니다.");
      }
      const data = await response.json();
      setContact(data); // 연락처 정보를 상태에 저장
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const deleteUrl = `http://localhost:8090/api/phoneApp/delete/${id}`;
        const response = await fetch(deleteUrl, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("삭제할 수 없습니다.");
        }

        alert("연락처가 삭제되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
      }
    }
  };

  if (!contact) return <div>로딩 중...</div>;

  return (
    <div className="contact-detail">
      {/* 돌아가기 버튼 Todo: 왼쪽 상단에 */}
      <button onClick={() => navigate("/")} className="back-button">
        돌아가기
      </button>
      <button onClick={() => navigate(`/edit/${id}`)} className="edit-button">
        편집
      </button>

      {/* 이름 */}
      <h1>{contact.name}</h1>

      {/* 연락처 정보 */}
      <div className="contact-info">
        <div className="row">
          <span>전화번호:</span> <span>{contact.phone_number}</span>
        </div>
        <div className="row">
          <span>이메일:</span> <span>{contact.email}</span>
        </div>
        <div className="row">
          <span>닉네임:</span> <span>{contact.nickname}</span>
        </div>
        <div className="row">
          <span>메모:</span> <span>{contact.memo}</span>
        </div>
      </div>
      {/* 연락처 삭제 버튼 */}
      <button onClick={handleDelete} className="delete-button">
        연락처 삭제
      </button>
    </div>
  );
}

export default PhoneAppDetail;
