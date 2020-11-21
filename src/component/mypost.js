import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { toast } from "react-toastify";


import style from "../styles/post.module.css";
import API from "../apiconfi";
import { myPostGet } from '../store/actions/mypost'
import SkeletonArticle from "../skeletons/SkeletonArticle";


function Mypost(props) {
    // const [Mypost, setMypost] = useState([]);
    const [Postavail, setPostavail] = useState(false);
    const history = useHistory();
    console.log(props)
    // ******** Getting Post *****
    useEffect(() => {
        axios
            .get(`${API}/mypost`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
            .then((data) => {
                props.myPostGet(data.data)
                setPostavail(true);
            })
            .catch((err) => {
                console.log(err);
                toast.warn("You are not loggedin");
            });
        setPostavail(true);
    }, []);

    // // ***** Delete Post ***
    // const deletePost = (id) => {
    //     axios
    //         .delete(`${API}/deletepost/${id}`, {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("jwt"),
    //             },
    //         })
    //         .then(() => {
    //             toast.success("Post delete Successfully");
    //         })
    //         .catch((err) => {
    //             toast.error("Some error occured")
    //         });
    // };

    // // **** Update Post *****
    // const UpdatePost = (Title, Body, Id) => {
    //     history.push({ pathname: "/addpost", state: { Title, Body, Id } });
    // };

    // if (!Postavail) {
    //     return <h1 style={{ color: "red", fontSize: "40px" }}>Loading...</h1>;
    // }

    if (props.mypost.length === 0) {
        return (
            <>
                {[1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme="light" />)}
            </>
        )
    }

    return (
        <>
            <div className="container" className={style.hdiv} style={{ padding: "0px auto" }}>
                {props.mypost.map((mypost) => <>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg" className={style.maindiv}>
                        <img class={style.image} src={`${API}/Uploads/post/${mypost.Post}`} />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{mypost.Title}</div>
                            <p class="text-gray-700 text-base">
                                {mypost.Body}
                            </p>
                        </div>
                    </div>
                </>)}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        mypost: state.myPostReducer.mypost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        myPostGet: (mypost) => dispatch(myPostGet(mypost))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypost);