import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import API from "../apiconfi";
import { Button } from "react-bootstrap";
import { userGet } from "../store/actions/user";
import { toast } from "react-toastify";
import style from "../styles/notification.module.css";
import { useState } from "react";

const Notification = (props) => {
  const [requestUser, setrequestUser] = useState([]);
  // const [allUser, setallUser] = useState([]);
  // const [sameUser, setsameUser] = useState([]);

  useEffect(() => {
    const notacceptuser = props.userData.Followers.filter(
      (request) => request.accept === 0
    );

    axios
      .get(`${API}/getrequest`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setrequestUser(res.data.request);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const acceptHandle = (id) => {
    console.log(",............", id);
    axios
      .post(
        `${API}/acceptrequest`,
        {
          ID: id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((data) => {
        toast.success("Request accepted");
      })
      .catch(() => {
        toast.err("There is some error");
      });
  };
  // const ID = [];
  // const allID = notacceptuser.filter((obj) => ID.push(obj.request_by));
  // console.log("...........", ID);

  // axios.get(`${API}/alluser`, {
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem('jwt')
  //   }
  // }).then((res) => {
  //   res.data.userData.map((user) => {
  //     return user._id = '', user.Password = '', user.tokens = [], user.lastlogin = ''
  //   })
  //   setallUser(res.data.userData)
  // }).catch((err) => {
  //   console.log(err)
  // })

  // console.log(
  //   "././././",
  //   allUser.filter((user) => {
  //     return [requestUser.filter((request) => request.request_by === user._id)];
  //   })
  // );

  console.log("All UserRequest", requestUser);
  // console.log("All User", allUser);
  return (
    <>
      <div className={style.mainDiv}>
        {console.log(requestUser)}
        {requestUser.map((user) => (
          <>
            <div className={style.subDiv}>
              <img
                className={style.image}
                src={`${API}/Uploads/profile/${user.request_by.avtar}`}
                alt="mypic"
              />
              <div style={{ marginLeft: "10px" }}>
                <h1 className={style.name1}>{user.request_by.Username}</h1>
                <h1>
                  Followers =
                  {
                    user.request_by.Followers.filter(
                      (users) => users.accept === 1
                    ).length
                  }
                </h1>
              </div>
              {console.log(",,,,,,,,,,,,,", user.request_by)}
              <div className={style.buttonDiv}>
                <Button
                  onClick={() => acceptHandle(user.request_by._id)}
                  className={style.button}
                  variant="outline-success"
                >
                  Accept
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button className={style.button} variant="outline-danger">
                  Reject
                </Button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.userData,
    allpost: state.postReducer.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userGet: (user) => dispatch(userGet(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
