'use client'

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"
import axios from 'axios';

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SessionLayout from "@/components/@layouts/sessionLayout";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); //

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      
      const token = response.data.token;
      localStorage.setItem("authToken", token); 
      console.log("Logged in successfully:", response.data);
      router.push("/dashboard");

    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionLayout>
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-[#002B5B]">Welcome Back</h2>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                className="h-12 rounded-md bg-gray-50/50 text-gray-700"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-gray-700 peer-disabled:opacity-90"
                >
                  Remember me
                </label>
              </div>
              <Link className="text-sm font-medium text-[#002B5B] underline" href="#">
                Forgot Password
              </Link>
            </div>
            <Button 
              className="h-12 w-full bg-[#E8FB5A] font-medium text-black hover:bg-[#E8FB5A]/90"
              disabled={loading} 
            >
              {loading ? "Logging in..." : "Get started"}
            </Button>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Or</span>
              </div>
            </div>
            <Button
              className="h-12 w-full border border-gray-200 bg-white font-medium text-black hover:bg-gray-50"
              variant="outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    </SessionLayout>
  );
}
