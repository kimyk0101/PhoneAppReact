import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PhoneAppList.css";

function PhoneAppList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const apiUrl = `http://${import.meta.env.VITE_API_HOST}/api/phoneApp`;

  useEffect(() => {
    fetchContacts();
  }, []);

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

  // 이름 또는 전화번호로 검색
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    try {
      let response;
      if (value.trim() === "") {
        //  검색어가 없으면
        fetchContacts(); //  전체 목록 가져오기
        return;
      } else if (!isNaN(value)) {
        //  숫자 입력 시
        response = await fetch(
          `http://${
            import.meta.env.VITE_API_HOST
          }/api/phoneApp/search_phone_number/${value}`
        );
      } else {
        //  문자 입력 시
        response = await fetch(
          `http://${
            import.meta.env.VITE_API_HOST
          }/api/phoneApp/search_name/${value}`
        );
      }

      if (!response.ok) {
        throw new Error("검색 연락처를 받아오지 못했습니다.");
      }

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="List_container">
      {/* 오른쪽 상단 연락처 추가 버튼 */}
      <button className="List_add-button" onClick={() => navigate("/add")}>
        +
      </button>
      {/* 검색창 */}
      <input
        type="text"
        placeholder="🔍 검색"
        value={searchTerm}
        onChange={handleSearch}
        className="List_search-input"
      />

      {/* 연락처 리스트 */}
      <ul className="List_contact-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => navigate(`/contact/${contact.id}`)}
            className="List_contact-item"
          >
            {searchTerm.trim() === "" || isNaN(searchTerm) ? (
              `${contact.name}` // 이름 검색 시 이름만
            ) : (
              <>
                <div>{contact.name}</div>
                <div className="contact-phone-number">
                  {contact.phone_number}
                </div>{" "}
                {/* 전화번호를 다른 div로 묶기 */}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhoneAppList;
