import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import InputElement from "../elements/InputElement";
import MainNav from "../elements/MainNav";
import Heading from "../elements/Heading";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import AuthItem from "../../models/AuthModel";
import { useRouter } from "next/router";

const AuthForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => {
    fetch(
      "/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.Email,
          password: data.Password,
        }),
      }
    ).then(res => res.json())
      .then(res => {
        
        
        if (res.token) {
          dispatch(authActions.authenticate({user: res.user ,token: res.token}));
          router.push("/");
        } 
      })
      
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg shadow-md px-28 py-20 min-w-[42rem]">
        <Heading heading="Sign In" />
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <InputElement
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            registers={register("Email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />

          <InputElement
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            registers={register("Password", {
              required: true,
            })}
          />

          <button
            type="submit"
            className="flex items-center justify-center h-12 px-6 w-full bg-site-blue-500 mt-4 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          >
            Sign In
          </button>
          <div className="flex mt-10 justify-center">
            <a
              className="text-site-gray-400 hover:text-grey-600 text-lg"
              href="/"
            >
              Back to results
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
