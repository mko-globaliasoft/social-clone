import React, { useEffect, useState } from "react";
import style from "../styles/home.module.css";
import { connect } from "react-redux";
import { postGet } from "../store/actions/post";
import axios from "axios";
import API from "../apiconfi";
import { toast } from "react-toastify";
import Modelcomponent from "./modelcomponent";

const Home = (props) => {
  const [isLoad, setisLoad] = useState(true);
  const [show, setShow] = useState(false);
  const [clickProfile, setclickProfile] = useState([]);
  const [userPost, setuserPost] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (clickedUser) => {
    setuserPost(
      props.allPost.filter((post) => post.Postedby._id === clickedUser._id)
    );
    setclickProfile(clickedUser);
    setShow(true);
  };

  // const requestsend = () => {
  //     axios.post(`${API}/followrequest`, { ID: profileid }, {
  //         headers: {
  //             Authorization: "Bearer " + localStorage.getItem("jwt"),
  //         },
  //     }).then((res) => {
  //         console.log(res)
  //     }).catch((error) => {
  //         console.log(error)
  //     })
  //     console.log("Hello world")
  // }

  useEffect(() => {
    axios
      .get(`${API}/allpost`)
      .then((res) => {
        props.postGet(res.data.data);
      })
      .catch(() => {
        toast.error("There is some error");
      });

    setisLoad(false);
  }, []);
  const allPost = props.allPost;
  if (isLoad) {
    return (
      <>
        <h1>Loading..</h1>
      </>
    );
  }

  return (
    <div>
      <Modelcomponent
        show={show}
        handleClose={handleClose}
        clickProfile={clickProfile}
        userPost={userPost}
        loginData={props.loginUser}
      />
      {allPost.length > 0 &&
        allPost.map((post) => {
          return (
            <div
              class="max-w-sm rounded overflow-hidden shadow-lg"
              className={style.maindiv}
            >
              <div className={style.profileDiv}>
                <img
                  onClick={() => handleShow(post.Postedby)}
                  className={style.profileimage}
                  src={`${API}/Uploads/profile/${post.Postedby.avtar}`}
                  alt="Sunset in the mountains"
                />
                <h1 className={style.userheading}>{post.Postedby.Username}</h1>
              </div>
              <img
                class={style.image}
                src={`${API}/Uploads/post/${post.Post}`}
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{post.Title}</div>
                <p class="text-gray-700 text-base">{post.Body}</p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Like
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Comment
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Share
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allPost: state.postReducer.post,
    loginUser: state.userReducer.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postGet: (post) => dispatch(postGet(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
