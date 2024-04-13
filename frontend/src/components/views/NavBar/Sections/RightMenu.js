/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Cookies, useCookies } from 'react-cookie';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    const tokenCookie = new Cookies();
    tokenCookie.remove('accessToken');
    props.history.push("/login");
  };

  const cookies = new Cookies();
  const isAuth = cookies.get('accessToken');

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

  // if (user.userData && !user.userData.isAuth) {
  //   return (
  //     <Menu mode={props.mode}>
  //       <Menu.Item key="mail">
  //         <a href="/login">Signin</a>
  //       </Menu.Item>
  //       <Menu.Item key="app">
  //         <a href="/register">Signup</a>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // } else {
  //   return (
  //     <Menu mode={props.mode}>
  //       <Menu.Item key="logout">
  //         <a onClick={logoutHandler}>Logout</a>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // }
}

export default withRouter(RightMenu);

