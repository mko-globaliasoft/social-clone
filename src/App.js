import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from './commoncomponent/header'
import Homepage from './component/homepage'
import Signup from './component/signup'
import { connect } from 'react-redux'
import Login from './component/login'
import Addpost from './component/addpost'
import Mypost from './component/mypost'
import myprofile from './component/myprofile'

function App(props) {
  const history = useHistory()
  useEffect(() => {
    if (props.user.isLogin) {
      history.push('/')
    } else {
      history.push('/login')
    }
  }, [props.user.isLogin])
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Switch>
        {props.user.isLogin ? <>
          <Route path="/" exact component={Homepage} />
          <Route path="/addpost" component={Addpost} />
          <Route path="/mypost" component={Mypost} />
          <Route path="/myprofile" component={myprofile} /> </> : <> <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} /></>}
        <Route path="*" />
      </Switch>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, null)(App);