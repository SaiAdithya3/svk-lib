import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import logoImg from "../assets/logo.jpg";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/getToken";
import { validateAdminToken } from "../services/authServices";

const Login = () => {
  const [userType, setUserType] = useState("student");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const token = getToken();
  useEffect(() => {
    if (token) {
      const checkAuth = async () => {
        try {
          const response = await validateAdminToken(token);
          navigate("/dashboard");
          console.log('Response:', response);
        } catch (error) {
          console.error("Authentication check failed:", error);
          navigate("/");
        }
      };
      checkAuth();
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    try {
      let response;
      response = await login(
        userType === "student" ? data.regNo : data.email,
        userType === "admin" ? data.password : data.dob,
        userType
      );
      localStorage.setItem('token', response.token);
      localStorage.setItem('userType', userType); 
      toast.success(`Logged in as ${userType}`);
      console.log(response);
      navigate(userType === "admin" ? "/dashboard" : "/student-dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-around">
      <ImageSection imageUrl={logoImg} />
      <div className="w-1/2 flex flex-col justify-center p-8">
        <h1 className="text-2xl font-bold mb-6 text-black">
          Welcome to SK Library Management System
        </h1>
        <LoginForm
          userType={userType}
          setUserType={setUserType}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

const ImageSection = ({ imageUrl }) => {
  return (
    <div className="w-1/3 h-1/3">
      <img src={imageUrl} alt="Library" className="w-full h-full object-cover" />
    </div>
  );
};

const LoginForm = ({
  userType,
  setUserType,
  register,
  handleSubmit,
  errors,
  onSubmit
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[70%]">
     <div className="w-full">
        <label htmlFor="userType" className="block text-lg font-semibold text-black">
          Login as
        </label>
        <div className="relative mt-1">
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-black sm:text-sm appearance-none"
          >
            <option className='p-2' value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full">
        <label htmlFor={userType === "student" ? "regNo" : "email"} className="block text-lg font-semibold text-black">
          {userType === "student" ? "Registration Number" : "Email"}
        </label>
        <input
          id={userType === "student" ? "regNo" : "email"}
          type={userType === "student" ? "text" : "email"}
          placeholder={userType === "student" ? "Enter your registration number" : "Enter your email"}
          {...register(userType === "student" ? "regNo" : "email", { required: `${userType === "student" ? "Registration Number" : "Email"} is required` })}
          className="mt-1 block w-full py-3 px-4 border border-gray-300 
          rounded-md text-2xl shadow-sm popp focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
        {errors[userType === "student" ? "regNo" : "email"] && (
          <span className="text-red-500 text-sm">{errors[userType === "student" ? "regNo" : "email"].message}</span>
        )}
      </div>
      <div>
        <label htmlFor={userType === "admin" ? "password" : "dob"} className="block text-lg font-semibold text-black">
          {userType === "admin" ? "Password" : "Date of Birth"}
        </label>
        <input
          id={userType === "admin" ? "password" : "dob"}
          type={userType === "admin" ? "password" : "date"}
          placeholder={userType === "admin" ? "Enter your password" : "Enter your date of birth"}
          {...register(userType === "admin" ? "password" : "dob", { required: `${userType === "admin" ? "Password" : "Date of Birth"} is required` })}
          className="mt-1 block w-full py-3 px-4 border border-gray-300
           rounded-md shadow-sm popp text-xl focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
        {errors[userType === "admin" ? "password" : "dob"] && (
          <span className="text-red-500 text-sm">{errors[userType === "admin" ? "password" : "dob"].message}</span>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full py-4 px-4 bg-black text-white font-semibold rounded-md
          shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
