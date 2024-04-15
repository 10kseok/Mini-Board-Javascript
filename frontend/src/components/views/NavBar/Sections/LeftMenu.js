import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <Link to="/">Posts</Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/post/write">Writing</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu