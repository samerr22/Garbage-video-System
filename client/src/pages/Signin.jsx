import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSilce";

import Backgroud from "../img/background.png";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div className="">
      <img src={Backgroud} className="absolute w-full h-[700px] " alt="" />

      <div className=" mt-20 absolute ">
        <h1 className=" ml-56 text-slate-200 text-4xl font-serif">Create</h1>
        <h1 className=" ml-56 text-slate-200  text-4xl font-serif">
          Your Acount
        </h1>
        <div className="flex gap-2 mt-8 ">
          <h1 className=" ml-56 text-slate-200  text-2xl font-serif">
            Alaredy Register?
          </h1>
          <h1 className="  text-slate-200  text-2xl font-serif">Login</h1>
        </div>
        <hr className="text-slate-200  w-80 ml-56 mt-10" />
        <p className="max-w-[400px] break-words text-slate-200  font-light mt-8  ml-56">
          To create a white line horizontally within the gradient background,
          you can achieve this by adding a linear gradient background with a
          specific width for the white line. Here's how you can do it:
        </p>

        <button className="w-36 h-10 rounded-xl bg-red-600 text-slate-200  ml-56 mt-8">
          Lern more
        </button>
      </div>

      <div className="">
        <div className=" w-[440px] h-[350px]  mt-20 absolute  bg-green-900 ml-[750px] opacity-70 rounded-2xl z-0">
          <h1 className="  text-white text-4xl font-serif ml-44 mt-2">Login</h1>
          <div className="flex justify-center items-center mt-2 ">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5  ">
              <div className="flex-1">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1">Email</h3>

                    <input
                      className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                      type="email"
                      placeholder="name@company.com"
                      id="email"
                      onChange={handlchange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1">
                      Password
                    </h3>
                    <input
                      className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handlchange}
                    />
                  </div>
                  <button
                    className=" bg-blue-700 text-white p-3 rounded-lg w-[300px] h-11 hover:opacity-90"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <sapn className="pl-3">Loading...</sapn>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
                <div className="flex gap-2 text-sm mt-5">
                  <span className="text-white">Have an account?</span>
                  <Link to="/sign-up" className="text-white">
                    Sign In
                  </Link>
                </div>
                {errorMessage && (
                  <p className="mt-5 text-red-600 bg-black w-2 h-7 rounded-lg text-center ">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
