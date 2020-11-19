import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { withRouter, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { myPostGet } from "../store/actions/mypost";
import { userGet } from "../store/actions/user";
import style from "../styles/myprofile.module.css";
import Notification from "./notification";
import API from "../apiconfi";
import { toast } from "react-toastify";

const Myprofile = (props) => {
  const history = useHistory();
  const [Username, setUsername] = useState();
  const [Emailid, setEmailid] = useState();
  const [Postavail, setPostavail] = useState(false);
  const [updatedAvtar, setupdatedAvtar] = useState("");
  const [Page, setPage] = useState("mypost");
  const [Followers, setFollowers] = useState(0);

  // To change Profile image

  console.log("UserSatte", props);
  const inputEl = useRef(null);

  const triggerInput = () => {
    inputEl.current.click();
  };


  // To set page
  const setmyPost = () => {
    setPage("mypost");
  };

  const setnotification = () => {
    setPage("notification");
  };

  // ***** To get Post *****
  useEffect(() => {
    axios
      .get(`${API}/mypost`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((data) => {
        setPostavail(true);
        props.myPostGet(data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.warn("You are not loggedin");
      });
    setPostavail(true);

    const userData = props.user.userData;
    if(userData.Followers){
      setFollowers(userData.Followers.filter((user) => user.accept).length);
    }
    setUsername(userData.Username);
    setEmailid(userData.Emailid);
    setupdatedAvtar(userData.avtar);
  }, [props.user]);

  // ***** Update Data *****
  const UpdateData = () => {
    axios
      .post(
        `${API}/updateuser`,
        {
          Username,
          Emailid,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        toast.success("Update successfully");
        setUsername(res.data.userData.Username)
        setEmailid(res.data.userData.Emailid)
        props.userGet(res.data.userData);
        console.log("Updates state", res.data.userData.Username);
        history.push("/myprofile");
      })
      .catch((err) => {
        toast.error("There is some error");
      });
  };

  // ***** Update Profile Image *****

  const updateProfile = (e) => {
    const formData = new FormData();
    formData.append("updateAvtar", e.target.files[0]);
    axios
      .post(`${API}/updateavtar`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setupdatedAvtar(res.data.avtar);
        toast.success("Image upload successfully");
      })
      .catch(() => {
        toast.error("There is some error");
      });
  };

  const Mypost = props.mypost;

  return (
    <div>
      <div className={style.hdiv}>
        <div className={style.uDiv}>
          <React.Fragment>
            <div className={style.mainDiv}>
              <div className={style.imageDiv}>
                <img
                  className={style.image}
                  src={`${API}/Uploads/profile/${updatedAvtar}`}
                  alt="mypic"
                />
                <input
                  className="custom-file-input image-avatar-input"
                  ref={inputEl}
                  onChange={updateProfile}
                  type="file"
                ></input>
                <img
                  className={style.cameraPic}
                  onClick={triggerInput}
                  src={require("../assets/images/camera@2x.png")}
                  alt=""
                />
                <div className={style.friendDiv}>
                  <div>
                    <h6>Followers</h6>
                    <h6>{Followers}</h6>
                  </div>
                  <div>
                    <h6>Posts</h6>
                    <h6>{props.mypost.length}</h6>
                  </div>
                </div>
              </div>
              <div className={style.contentDiv}>
                <div>
                  <input
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 "
                  />
                  <input
                    type="email"
                    value={Emailid}
                    onChange={(e) => setEmailid(e.target.value)}
                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                    style={{ marginTop: "5px" }}
                  />
                  <button
                    onClick={UpdateData}
                    style={{ width: "297px", marginTop: "5px" }}
                    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Update
                  </button>
                </div>
                <br />
              </div>
            </div>
          </React.Fragment>
        </div>
        <br />
        <br />
        <br />
        <hr color="gray" />
        <div className={style.buttonDiv}>
          <Button
            className={style.button}
            onClick={() => setmyPost()}
            variant="outline-primary"
          >
            My post
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            className={style.button}
            onClick={() => setnotification()}
            variant="outline-success"
          >
            Notification
          </Button>
        </div>
        {Page === "mypost" ? (
          <div className={style.bDiv}>
            {Mypost.map((mypost) => (
              <>
                <img
                  src={`${API}/Uploads/post/${mypost.Post}`}
                  alt="mypic"
                  style={{
                    borderRadius: "5%",
                    width: "190px",
                    height: "200px",
                    marginLeft: "18px",
                    boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175)",
                  }}
                />
              </>
            ))}
          </div>
        ) : (
            <Notification />
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mypost: state.myPostReducer.mypost,
    allPost: state.postReducer.post,
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    myPostGet: (mypost) => dispatch(myPostGet(mypost)),
    userGet: (user) => dispatch(userGet(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);
