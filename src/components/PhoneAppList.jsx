import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PhoneAppList.css";

function PhoneAppList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const apiUrl = "http://localhost:8090/api/phoneApp";

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
        fetchContacts();  //  전체 목록 가져오기
        return;
      } else if (!isNaN(value)) {
        //  숫자 입력 시
        response = await fetch(`http://localhost:8090/api/search_phone_number/${value}`);
      } else {
        //  문자 입력 시
        response = await fetch(`http://localhost:8090/api/search_name/${value}`);
      }

      if(!response.ok) {
        throw new Error("검색 연락처를 받아오지 못했습니다.");
      }

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="container">
      {/* 오른쪽 상단 연락처 추가 버튼 
      Todo: css 수정, add 페이지 구현 */}
      <button className="add-button" onClick={() => navigate("/add")}>
        +
      </button>
      {/* 검색창 
      Todo: 아이콘 넣기 */}
      <input
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* 연락처 리스트 */}
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => navigate(`/contact/${contact.id}`)}
            className="contact-item"
          >
            {searchTerm.trim() === "" || isNaN(searchTerm)
          ? `${contact.name}` // 이름 검색 시 이름만
          : `${contact.name} - ${contact.phone_number}` // 전화번호 검색 시 이름+전화번호 
          // Todo: 스프링에서 코드 구현 필요, css 수정(이름 아래쪽에 전화번호 글자 작게)
        }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhoneAppList;

