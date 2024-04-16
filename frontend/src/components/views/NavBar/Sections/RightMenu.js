/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu } from 'antd';
import React from 'react';
import { useSelector } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import TokenParser from '../../../util/TokenParser';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    user.authentication = undefined;
    props.history.push("/login");
  };

  const tokenParser = TokenParser.parseToUserId;
  const token = user.authentication?.accessToken ?? "";
  if (token) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item disabled={true} key="userId">
          <Link to="/"><strong>{tokenParser(token)}</strong></Link>
        </Menu.Item>

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

