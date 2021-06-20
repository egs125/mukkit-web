import React, { useEffect, useState } from 'react';
import { dbService } from 'fBase';
import Header from './Header';
import NewMukkit from './NewMukkit';
import MukkitItem from './MukkitItem';
import { Layout, List } from 'antd';

const MukkitContainer = () => {

  const [mukkitList, setMukkitList] = useState([]);
  const [newMukkit, setNewMukkit] = useState({ placeName: "", location: "" });
  const [modifyingMukkit, setModifyingMukkit] = useState({ placeName: "", location: "" });

  // 새 먹킷 리스트 추가 입력란 변경 이벤트 핸들러
  const onChangeNewMukkit = (field, e) => {
    setNewMukkit({ ...newMukkit, [field]: e.target.value });
  };

  // 새 먹킷 리스트 추가 이벤트 핸들러
  const onClickAddBtn = async () => {
    if ( newMukkit.placeName === '' ) {
      window.alert('적어도 식당 이름은 넣어주셔야쥬');
    } else {
      await dbService.collection('mukkit').add({
          sn: mukkitList.length + 1,
          ...newMukkit,
      });
      setNewMukkit({ placeName: "", location: "" });
    }
  };

  // 기존 먹킷 리스트 방문 여부 등록 이벤트 핸들러
  const onClickFaceIcon = mukkit => {
    const currentValue = mukkit.isVisited;

    if (currentValue !== undefined && currentValue !== null) {
      dbService.doc(`mukkit/${mukkit.id}`).update({
        isVisited: !currentValue
      }); 
    } else {
      dbService.doc(`mukkit/${mukkit.id}`).update({
        isVisited: true,
      }); 
    }
  };

  // 기존 먹킷 리스트 장소명or위치 변경 이벤트 핸들러
  const onChangeMukkit = (field, e) => {
    setModifyingMukkit({ ...modifyingMukkit, [field]: e.target.value });
  };

  // 기존 먹킷 리스트 수정 이벤트 핸들러
  const onClickEditBtn = index => {
    const tempArray = [...mukkitList];
    const target = tempArray[index];

    target["onEdit"] = true;

    setModifyingMukkit({ placeName: target.placeName, location: target.location });
    setMukkitList(tempArray);
  };

  // 기존 먹킷 리스트 삭제 이벤트 핸들러
  const onClickDeleteBtn = (id) => {
    if ( window.confirm('정말 지우시나요?')) {
      dbService.doc(`mukkit/${id}`).delete();
    }
  };

  // 기존 먹킷 리스트 장소명or위치 수정 종료 이벤트 핸들러
  const onClickDoneBtn = async index => {
    const tempArray = [...mukkitList];
    const target = tempArray[index];

    target["onEdit"] = false;
    setMukkitList(tempArray);

    dbService.doc(`mukkit/${target.id}`).update({ placeName: modifyingMukkit.placeName, location: modifyingMukkit.location });
  };

  // 기존 먹킷 리스트 수정 취소 이벤트 핸들러
  const onClickCancelBtn = index => {
    const tempArray = [...mukkitList];
    tempArray[index]["onEdit"] = false;

    setMukkitList(tempArray);
  };

  useEffect(() => {
    dbService.collection('mukkit').orderBy('sn', 'desc').onSnapshot(snapShot => {
      const list = snapShot.docs.map(row => ({ id: row.id, onEdit: false, ...row.data() }));
      setMukkitList(list);
    });
  }, []);

  return (
    <div className="container">
      <Header />
      <Layout.Content>
        <NewMukkit
          newMukkit={newMukkit}
          onChangeNewMukkit={onChangeNewMukkit}
          onClickAddBtn={onClickAddBtn}
        />
        <div>
          <List
            size="large"
            // bordered
            dataSource={mukkitList}
            renderItem={(item, index) =>
              <List.Item>
                <MukkitItem
                  key={item.sn}
                  index={index}
                  mukkit={item}
                  modifyingMukkit={modifyingMukkit}
                  onChangeMukkit={onChangeMukkit}
                  onClickFaceIcon={onClickFaceIcon}
                  onClickEditBtn={onClickEditBtn}
                  onClickDeleteBtn={onClickDeleteBtn}
                  onClickDoneBtn={onClickDoneBtn}
                  onClickCancelBtn={onClickCancelBtn}
                />
              </List.Item>
            }
          />
        </div>
      </Layout.Content>
    </div>
  )
};

export default MukkitContainer;