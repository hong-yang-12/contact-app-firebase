import { useEffect, useState } from "react";
// import { useLoginMutation } from "../Services/Apis/authApi"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Services/slice/userSlice";
import { toast } from "react-toastify";
import { loginApi } from "../Services/Apis/authApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { BsArrowLeftCircle } from "react-icons/bs";
import { LuHeartHandshake } from "react-icons/lu";
import { FaRegSmileBeam } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const contactData = { email, password };

  // const [login] = useLoginMutation()
  const nav = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) nav("/");
    });
  }, []);

  // const handleLogin =async (e) => {
  //   try {
  //     e.preventDefault()
  //     const {data}= await login(contactData)
  //     console.log(data)
  //     dispatch(addUser(data))
  //     if(data.success) nav('/')
  //     toast.success("Sign in successfully")
  //   } catch (error) {
  //     toast.error("Cannot sign in to your account. Please try again.")

  //     console.log(error)
  //   }
  // }

  const login = async (e) => {
    try {
      e.preventDefault();
      let res = await loginApi(email, password);
      toast.success("Signed In to your account!");
      localStorage.setItem("userEmail", res.user.email);
      nav("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={login} className="flex items-center shadow-lg p-9">
        <div className="flex flex-col my-5 p-7">
          <h2 className=" text-headline font-medium text-2xl">Log In</h2>

          <div className="my-5">
            <h4 className="text-para">Email</h4>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
              className="w-full py-2 px-3 focus:outline-none bg-transparent rounded bottom-2 placeholder-placeholder border border-button text-button-text"
            />
          </div>

          <div className="my-5">
            <h4 className="text-para">Password</h4>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full py-2 px-3 focus:outline-none bg-transparent rounded bottom-2 placeholder-placeholder border border-button text-button-text"
            />
          </div>

          <div className="flex justify-end my-5 items-center">
            <p className="cursor-pointer select-none text-placeholder text-xs underline">
              Recover your password?
            </p>
          </div>

          <button className=" w-full flex items-center justify-center bg-button px-3 py-2 text-button-text rounded">
            {<BsArrowLeftCircle className=" me-2" />} <span>Sign in</span>
          </button>

          <div className="flex justify-between my-5 items-center">
            <p className=" text-sm select-none text-para">Not a member?</p>
            <Link to={"/register"}>
              <p className="cursor-pointer select-none text-placeholder underline text-sm">
                Register Now
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-evenly items-center bg-button p-7 rounded">
          <div>
            <h1 className=" flex items-center justify-center w-56 text-center text-2xl text-button-text">
              <span className=" mr-2 font-bold">Hello Again !!! </span>{" "}
              <FaRegSmileBeam />
            </h1>
            <div className="flex items-center text-sm text-button-text">
              <p className=" mr-2">Welcome back, you've been missed</p>
              <LuHeartHandshake />
            </div>
          </div>

          <img className=" w-80 " src="img\florid-remote-workflow.gif" alt="" />
        </div>
      </form>
    </div>
    // <div className="bg-background w-full h-screen">
    // </div>
  );
};

export default Login;
