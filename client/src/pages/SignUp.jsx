import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Backgroud from "../img/background.png";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Plese fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <img src={Backgroud} className="absolute w-full h-[700px] " alt="" />

      <div className=" mt-20 absolute ">
        <h1 className=" ml-56 text-slate-200  text-4xl font-serif">Create</h1>
        <h1 className=" ml-56 text-white text-4xl font-serif">Your Acount</h1>
        <div className="flex gap-2 mt-8 ">
          <h1 className=" ml-56 text-white text-2xl font-serif">
            Alaredy Register?
          </h1>
          <h1 className="  text-white text-2xl font-serif">Login</h1>
        </div>
        <hr className="bg-white w-80 ml-56 mt-10" />
        <p className="max-w-[400px] break-words text-white font-light mt-8  ml-56">
          To create a white line horizontally within the gradient background,
          you can achieve this by adding a linear gradient background with a
          specific width for the white line. Here's how you can do it:
        </p>

        <button className="w-36 h-10 rounded-xl bg-red-600 text-white ml-56 mt-8">
          Lern more
        </button>
      </div>

      <div className="">
        <div className=" w-[440px] h-[450px]  mt-20 absolute  bg-green-900 ml-[750px] opacity-70 rounded-2xl z-0">
          <h1 className="  text-white text-4xl font-serif ml-24 mt-2">
            Create Account
          </h1>
          <div className="flex justify-center items-center mt-2 ">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5  ">
              <div className="flex-1">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1 ">
                      UserName
                    </h3>
                    <input
                      className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11 "
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handlchange}
                    />
                  </div>
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
                      "Sign Up"
                    )}
                  </button>
                </form>
                <div className="flex gap-2 text-sm mt-5">
                  <span className="text-white">Have an account?</span>
                  <Link to="/sign-in" className="text-white">
                    Sign In
                  </Link>
                </div>
                {errorMessage && (
                  <p className="mt-5 text-red-600 bg-black w-300 h-7 rounded-lg text-center ">
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
