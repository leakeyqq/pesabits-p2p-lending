'use client';

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SessionLayout from "@/components/@layouts/sessionLayout";

const baseURl = 'https://pesabits-p2p-lending.onrender.com'

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobileNumber: "",
    email: "",
    password: "",
    age: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${baseURl}/api/auth/register`, formData);
      router.push("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      window.location.href = "http://localhost:5000/api/auth/google";
    } catch (error) {
      console.error("Google registration error:", error);
    }
  };

  return (
    <SessionLayout>
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-[#002B5B]">Create an Account</h2>
          <p className="text-gray-500">
            Join us today to start your journey!
          </p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="John Doe"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="johndoe"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mobile Number</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="1234567890"
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="johndoe@example.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="••••••••"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="30"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button 
            className="h-12 w-full mt-6 bg-[#E8FB5A] font-medium text-black hover:bg-[#E8FB5A]/90"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or</span>
            </div>
          </div>
          <Button
            onClick={handleGoogleRegister}
            className="h-12 w-full mt-4 border border-gray-200 bg-white font-medium text-black hover:bg-gray-50"
            variant="outline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Register with Google
          </Button>
        </form>
        <div className="text-center mt-4">
          <Link href="/" className="text-sm font-medium text-[#002B5B] underline">
            Already have an account? Back to Login
          </Link>
        </div>
      </div>
    </SessionLayout>
  );
}
