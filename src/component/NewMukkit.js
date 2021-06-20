import React from 'react';
import { Row, Col, Input, Button } from 'antd';

const NewMukkit = ({
  newMukkit,
  onChangeNewMukkit,
  onClickAddBtn,
}) => (
  <div className="new-mukkit">
    <Row justify="center">
      <Col span={24}>
        <Input
          className="new-input"
          placeholder="다음에 갈 곳은"
          value={newMukkit.placeName}
          onChange={e => onChangeNewMukkit('placeName', e)}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Input
          className="new-input"
          placeholder="어디인가요"
          value={newMukkit.location}
          onChange={e => onChangeNewMukkit('location', e)}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Button type="primary" size="large" onClick={onClickAddBtn}>Go!!!!!</Button>
      </Col>
    </Row>
  </div>
);

export default NewMukkit;