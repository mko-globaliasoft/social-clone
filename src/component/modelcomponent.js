import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import API from "../apiconfi";
import { toast } from "react-toastify";
import style from "../styles/modelcomponent.module.css";

function Modelcomponent({
  show,
  handleClose,
  clickProfile,
  userPost,
  loginData,
}) {
  console.log("clickProfile", userPost);
  const requestsend = () => {
    axios
      .post(
        `${API}/followrequest`,
        { postuserID: clickProfile._id, loginID: loginData._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        handleClose();
        if (res.data.message === "Request send successfully") {
          console.log("green");
          return toast.success(res.data.message);
        }
        if (res.data.message === "You are not sending request to you") {
          console.log("sdf");
          return toast.error(res.data.message);
        }
        if (res.data.message === "You already send request") {
          return toast.warn(res.data.message);
        }
      })
      .catch((error) => {
        toast.error("You are not sending to you request");
        handleClose();
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile of User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1>{clickProfile.Username}</h1>
            <h1>{clickProfile.Emailid}</h1>
          </div>
          <div className={style.bDiv}>
            <React.Fragment>
              {userPost.map((mypost) => (
                <>
                  <div
                    class="max-w-sm rounded overflow-hidden shadow-lg"
                    className={style.maindiv}
                  >
                    <img
                      src={`${API}/Uploads/post/${mypost.Post}`}
                      alt="mypic"
                      style={{
                        borderRadius: "5%",
                        width: "85px",
                        height: "85px",
                        marginTop: "2px",
                        marginLeft: "18px",
                        boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175)",
                      }}
                    />
                    <div class="px-6 py-4">
                      <div class="font-bold  mb-2">{mypost.Title}</div>
                      <p class="text-gray-700 ">{mypost.Body}</p>
                    </div>
                  </div>
                </>
              ))}
            </React.Fragment>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={requestsend}>
            Follow
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modelcomponent;
