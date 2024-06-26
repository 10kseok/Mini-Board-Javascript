import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import PostWritingPage from './views/BoardPage/PostWritingPage.js';
import PostDetailPage from './views/BoardPage/PostDetailPage.js';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/post/write" component={Auth(PostWritingPage)} />
          <Route exact path="/post/update" component={Auth(PostWritingPage)} />
          <Route exact path="/posts/:postId" component={PostDetailPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
