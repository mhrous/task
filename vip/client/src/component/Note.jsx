import React from 'react';
import { List } from 'antd';

const Note = ({ notes }) =>
  notes.length ? (
    <List
      header={<h1>ملاحظات</h1>}
      size="small"
      dataSource={notes}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  ) : (
    <h1>لا توجد ايا ملاحظات</h1>
  );
export default Note;
