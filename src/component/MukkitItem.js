import React from 'react';
import { Row, Col, Button, Input } from 'antd';
import {
  FrownOutlined,
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const MukkitItem = ({
  index,
  mukkit,
  modifyingMukkit,
  onChangeMukkit,
  onClickFaceIcon,
  onClickEditBtn,
  onClickDeleteBtn,
  onClickDoneBtn,
  onClickCancelBtn,
}) => (
  <div className="mukkit-item">
    <Row justify="space-around" align="middle">
      <Col span={1}>
        <Button
          shape="circle"
          type={mukkit.isVisited ? 'primary' : 'default'}
          icon={mukkit.isVisited ? (<SmileOutlined />) : (<FrownOutlined />)}
          onClick={() => onClickFaceIcon(mukkit)}
        />
      </Col>
      <Col span={15}>
        <Row>
          <Col span={15}>
            <Input
              className="mukkit-item-input"
              disabled={!mukkit.onEdit}
              value={mukkit.onEdit ? modifyingMukkit.placeName : mukkit.placeName}
              onChange={e => onChangeMukkit('placeName', e)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <Input
              className="mukkit-item-input"
              disabled={!mukkit.onEdit}
              value={mukkit.onEdit ? modifyingMukkit.location : mukkit.location}
              onChange={e => onChangeMukkit('location', e)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={2}>
        <div className="btn-group">
          {mukkit.onEdit ? (
            <>
              <Button shape="circle" icon={<CheckOutlined />} onClick={() => onClickDoneBtn(index)} />
              <Button shape="circle" icon={<CloseOutlined />} onClick={() => onClickCancelBtn(index)} />
            </>
          ) : (
            <>
              <Button shape="circle" icon={<EditOutlined />} onClick={() => onClickEditBtn(index)} />
              <Button shape="circle" icon={<DeleteOutlined />} onClick={() => onClickDeleteBtn(mukkit.id)} />
            </>
          )}
          
        </div>
      </Col>
    </Row>
  </div>
);

export default MukkitItem;