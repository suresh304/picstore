import React, { useContext, useReducer, useState } from "react";
import picstorelogo from "../images/galleryicon.webp";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { authContext } from "../context/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slices/authSlice";

const Login = () => {
  const navigate = useNavigate()
  const [registered, setRegistered] = useState(true);
  const user_rdx = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const signUpHandler = (e) => {
    e.preventDefault();
    const email = e.target[1].value;
    const password = e.target[2].value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        
        dispatch(addUser(JSON.stringify(userCredential.user)))


        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        dispatch(addUser(JSON.stringify(userCredential.user)))


        localStorage.setItem("user",userCredential.user.email)


        navigate("/home")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="w-1/3 min-w-96 mx-auto my-48  rounded-lg bg-slate-500">
      <h1 className="text-white text-3xl text-center p-4">Login</h1>
      <form
        className="flex flex-col justify-center"
        onSubmit={registered ? loginHandler : signUpHandler}
      >
        <img
          src={picstorelogo}
          alt="hello"
          className="w-[100px] h-[100px] mx-auto"
        />
        {!registered && (
          <input
            type="text"
            placeholder="name"
            className="w-2/4 p-2 m-2 mx-auto rounded-sm"
          />
        )}
        <input
          type="text"
          placeholder="mail"
          className="w-2/4 p-2 m-2 mx-auto rounded-sm"
        />
        <input
          type="password"
          placeholder="password"
          className="w-2/4 p-2 m-2 mx-auto rounded-sm hover:border-b"
        />
        <button
          type="submit"
          className="w-2/4 p-2 m-3 mx-auto rounded-sm bg-yellow-400 hover:bg-yellow-200"
        >
          {registered ? "Login" : "Signup"}
        </button>
        <p className="mx-auto text-white">
          {!registered ? "already have an account" : "Register your account"}
          <span onClick={() => setRegistered(!registered)}>
            {!registered ? " Login" : " Signup"}
          </span>
        </p>
      </form>
    </div>
  )
};

export default Login;
