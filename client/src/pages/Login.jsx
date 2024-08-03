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
      response = await login(data.email, data.password, userType);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userType', userType); // Save user type to local storage
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
        <h1 className="text-3xl font-bold mb-6 text-black">
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
        <label htmlFor="userType" className="block text-sm font-medium text-black">
          Login as
        </label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="mt-1 block w-full py-4 px-4 border border-gray-300 bg-white
          rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="w-full">
        <label htmlFor="email" className="block text-sm font-medium text-black">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 block w-full py-4 px-4 border border-gray-300 
          rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-black">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 block w-full py-4 px-4 border border-gray-300
           rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
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
