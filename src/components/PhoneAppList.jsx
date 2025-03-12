import { useState } from "react";

function PhoneAppList({ contacts, updateContact, deleteContact }) {
  const [editModes, setEditModes] = useState({});
  const [editValues, setEditValues] = useState({});
  return (
    <div className="container">
      <table>
        {/* 테이블 태그 사용 */}
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                {editModes[contact.id] ? ( // 수정 모드인 경우
                  <input
                    type="text"
                    value={editValues[contact.id]?.name || contact.name} // 수정 값 state 사용
                    onChange={(e) => {
                      setEditValues({
                        ...editValues, //  기존 editValues 객체의 모든 내용을 새로운 객체로 복사
                        [contact.id]: {
                          //  연락처 객체의 고유 ID 값으로, 이 키를 사용하여 editValues 객체에서 해당 연락처의 수정 값을 관리
                          ...editValues[contact.id], //  기존 editValues 객체에서 contact.id에 해당하는 객체의 모든 내용을 새로운 객체로 복사
                          name: e.target.value, //  현재 input 상자의 값
                        },
                      });
                    }}
                  />
                ) : (
                  // 일반 모드인 경우
                  <span>{contact.name}</span>
                )}
              </td>
              <td>
                {editModes[contact.id] ? (
                  <input
                    type="text"
                    value={editValues[contact.id]?.phone_number || contact.phone_number}
                    onChange={(e) => {
                      setEditValues({
                        ...editValues,
                        [contact.id]: {
                          ...editValues[contact.id],
                          hp: e.target.value,
                        },
                      });
                    }}
                  />
                ) : (
                  <span>{contact.phone_number}</span>
                )}
              </td>
              <td>
                {editModes[contact.id] ? (
                  <input
                    type="text"
                    value={editValues[contact.id]?.email || contact.email}
                    onChange={(e) => {
                      setEditValues({
                        ...editValues,
                        [contact.id]: {
                          ...editValues[contact.id],
                          tel: e.target.value,
                        },
                      });
                    }}
                  />
                ) : (
                  <span>{contact.email}</span>
                )}
              </td>
              <td>
                <button
                  className="update-button"
                  onClick={() => {
                    setEditModes({ ...editModes, [contact.id]: true }); // 수정 모드 활성화
                    setEditValues({
                      ...editValues,
                      [contact.id]: { ...contact }, // contact.id에 해당하는 객체를 contact 객체로 통째로 업데이트
                    });
                  }}
                >
                  수정
                </button>
                <button
                  className="update-button"
                  onClick={() => {
                    updateContact(contact.id, editValues[contact.id]); //  editValues 객체에서 contact.id에 해당하는 값 - name, hp, tel
                    setEditModes({ ...editModes, [contact.id]: false }); //  수정 모드 비활성화
                  }}
                >
                  저장
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteContact(contact.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PhoneAppList;
