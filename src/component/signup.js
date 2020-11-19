import React, { Fragment, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import API from "../apiconfi";

function Signup() {
  const [Image, setImage] = useState(null);
  const history = useHistory();
  console.log(API);
  const sendData = (fields) => {
    const formData = new FormData();
    formData.append("Username", fields.User);
    formData.append("Emailid", fields.Email);
    formData.append("Password", fields.Pass);
    formData.append("Image", Image);
    axios
      .post(`${API}/signup`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
        if (data.status == 204) {
          return toast.error("Plese Choose diffrent username");
        }
        toast.success("Successfully login to our site");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please Provide valid information");
      });
  };
  return (
    <Fragment>
      <div className="container px-5 py-24 mx-auto flex">
        <div
          style={{ maxWidth: "60%", padding: "0px auto" }}
          className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
        >
          {" "}
          <Formik
            initialValues={{
              User: "",
              Email: "",
              Pass: "",
            }}
            validationSchema={Yup.object().shape({
              User: Yup.string().required("Username is required"),
              Email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              Pass: Yup.string().required("Password is required"),
            })}
            onSubmit={(fields) => {
              sendData(fields);
            }}
            render={({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
                  Login to our Site
                </h1>
                <br />
                <h3>Username</h3>
                <input
                  type="text"
                  value={values.User}
                  onBlur={handleBlur}
                  name="User"
                  onChange={handleChange}
                  className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                  placeholder="Enter Username"
                />
                {errors.User && touched.User && errors.User}
                <h3>Emailid</h3>
                <input
                  type="email"
                  value={values.Email}
                  onBlur={handleBlur}
                  name="Email"
                  onChange={handleChange}
                  className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                  placeholder="Enter Emailid"
                />
                {errors.Email && touched.Email && errors.Email}

                <h3>Password</h3>
                <input
                  type="Password"
                  value={values.Pass}
                  onBlur={handleBlur}
                  name="Pass"
                  onChange={handleChange}
                  className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                  placeholder="Enter Password"
                />
                {errors.Pass && touched.Pass && errors.Pass}
                <h3>Upload Profile</h3>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                />
                <br />
                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Signup
                </button>
              </form>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
