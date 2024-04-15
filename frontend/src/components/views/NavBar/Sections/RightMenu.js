/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu } from 'antd';
import React from 'react';
import { Cookies } from 'react-cookie';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    const tokenCookie = new Cookies();
    tokenCookie.remove('accessToken');
    user.authentication = undefined;
    props.history.push("/login");
  };

  const isAuth = user.authentication;
  if (isAuth) {
    return (
      <Menu mode={props.mode}>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <a href="/login">Sign in</a>
          </Menu.Item>
          <Menu.Item key="app">
            <a href="/register">Sign up</a>
          </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

