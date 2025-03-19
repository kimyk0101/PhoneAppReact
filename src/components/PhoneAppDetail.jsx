import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/PhoneAppDetail.css";

function PhoneAppDetail() {
  const [contact, setContact] = useState(null);
  const { id } = useParams(); // URL에서 id를 가져옴
  const navigate = useNavigate();
  const apiUrl = `http://${import.meta.env.VITE_API_HOST}/api/phoneApp/${id}`; // 특정 id에 맞는 API URL

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
        const deleteUrl = `http://${
          import.meta.env.VITE_API_HOST
        }/api/phoneApp/delete/${id}`;
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
    <div className="Detail_contact-detail">
      {/* 돌아가기 버튼 Todo: 왼쪽 상단에 */}
      <button onClick={() => navigate("/")} className="Detail_back-button">
        🡸
      </button>
      <button
        onClick={() => navigate(`/edit/${id}`)}
        className="Detail_edit-button"
      >
        편집
      </button>

      {/* 프로필 사진 */}
      <div className="Detail_profile">
        {contact.photoUrl ? (
          <img
            src={contact.photoUrl}
            alt="프로필 사진"
            className="Detail_photo"
          />
        ) : (
          <img
            src="/default-profile.png"
            alt="기본 프로필 사진"
            className="Detail_photo"
          />
        )}
      </div>

      {/* 이름 */}
      <h1>{contact.name}</h1>

      {/* 연락처 정보 */}
      <div className="contact-info">
        <div className="Detail_row">
          <span>전화번호:</span>{" "}
          <span className="Detail_span">{contact.phone_number}</span>
        </div>
        <div className="Detail_row">
          <span>이메일:</span>{" "}
          <span className="Detail_span">{contact.email}</span>
        </div>
        <div className="Detail_row">
          <span>닉네임:</span>{" "}
          <span className="Detail_span">{contact.nickname}</span>
        </div>
        <div className="Detail_row">
          <span>메모:</span> <span className="Detail_span">{contact.memo}</span>
        </div>
        {/* 연락처 삭제 버튼 */}
        <button onClick={handleDelete} className="Detail_delete-button">
          연락처 삭제
        </button>
      </div>
    </div>
  );
}

export default PhoneAppDetail;
