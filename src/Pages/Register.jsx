import { useEffect, useState } from "react";
import { registerApi } from "../Services/Apis/authApi";
// import { registerApi, useRegisterMutation } from "../Services/Apis/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUniqueID } from "../Services/Common/Uuid/UniqueId";
import { postUserData } from "../Services/Apis/FireStoreApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { LuHeartHandshake } from "react-icons/lu";
import { BsArrowRightCircle } from "react-icons/bs";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const contactData = { name, email, password, password_confirmation };

  const nav = useNavigate();

  // const [register] = useRegisterMutation()

  // const handleRegister = async (e) => {
  //   try {
  //     e.preventDefault()
  //     const {data} = await register(contactData)
  //     if(data.success) nav('/login')
  //     toast.success('Account created successfully.')
  //   } catch (error) {
  //     toast.error("Can't create account. Please check your input.")
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, res => {
  //     if(res?.accessToken)

  //       nav("/")})
  // }, [])

  const register = async (e) => {
    try {
      e.preventDefault();
      let res = await registerApi(email, password);
      const obj = {
        name: name,
        email: email,
        userId: getUniqueID(),
      };
      postUserData(obj);

      nav("/home");
      localStorage.setItem("userEmail", res.user.email);
      toast.success("Account Created successfully");
    } catch (err) {
      toast.error("Can't create account.Try again.");
      return err;
    }
  };

  return (
      <div className=" bg-background flex justify-center items-center h-screen">
        <form
          onSubmit={register}
          className=" w-[700px] flex flex-col gap-10 shadow-xl p-7 rounded"
        >
          <div className="flex justify-evenly">
            <div className="flex flex-col justify-center items-center bg-button rounded">
              <h1 className=" w-48 text-center text-lg text-button-text">
                Welcome to{" "}
                <span className="text-xl text-background">FRIENDS</span>
              </h1>
              <img
                className=" w-80 "
                src="img\juicy-hands-holding-gadgets-with-social-media.gif"
                alt=""
              />
              <div className="flex items-center text-sm text-button-text">
                <p className=" mr-2">Become one of us</p>
                <LuHeartHandshake />
              </div>
            </div>

            <div className="flex flex-col gap-5 p-7">
              <h2 className=" text-headline font-medium text-2xl">
                Create an Account
              </h2>
              <div>
                <h4 className=" text-para text-sm font-semibold">Name</h4>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full py-2 px-3 focus:outline-none bg-transparent bottom-2 border placeholder-placeholder rounded border-button text-para"
                />
              </div>
              <div>
                <h4 className="text-para text-sm font-semibold">Email</h4>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter your email"
                  className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2 placeholder-placeholder rounded border-button text-para"
                />
              </div>
              <div>
                <h4 className="text-para text-sm font-semibold">Password</h4>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2 placeholder-placeholder rounded border-button text-para"
                />
              </div>
              <div>
                <h4 className=" text-para text-sm font-semibold">
                  Confirm Password
                </h4>
                <input
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2 placeholder-placeholder rounded border-button text-para"
                />
              </div>
              <div className="flex gap-3 items-center">
                <p className=" text-sm select-none text-para">
                  Already have an account?
                </p>
                <Link to={"/login"}>
                  <p className="cursor-pointer select-none text-placeholder underline text-sm">
                    Login
                  </p>
                </Link>
              </div>
              <button
                type="submit"
                className=" h-10 flex items-center justify-center rounded bg-cyan-600 text-white transition hover:bg-cyan-400 hover:text-cyan-950 px-4 py-1"
              >
                <span className="  mr-3">Sign up</span> <BsArrowRightCircle />
              </button>
            </div>
          </div>
        </form>
      </div>
    
    // <div className="bg-transparent w-full h-screen grid place-items-center">
    //   <form onSubmit={register} action="" className=" w-[20rem] mx-auto">
    //     <div className="">
    //       <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
    //     </div>
    //     <div className="my-5">
    //       <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
    //     </div>
    //     <div className="">
    //       <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
    //     </div>
    //     <div className="mt-5">
    //       <input  value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} type="password" placeholder="Confirm Password" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
    //     </div>
    //     <div className="">
    //       <button  className="bg-button px-3 py-2 text-button-text rounded-md mt-5">Register</button>
    //     </div>
    //     <div className="mt-4">
    //       <p>Already have an account. <span onClick={() => nav('/login')} className="text-blue-500 cursor-pointer">sign in</span> </p>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Register;
