import Link from "next/link"
import Image from "next/image"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SessionLayout from "@/components/@layouts/sessionLayout";

export default function Home() {
  return (
    <SessionLayout>
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-[#002B5B]">Welcome Back</h2>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              className="h-12 rounded-md border-gray-200 bg-gray-50/50"
              placeholder="email@example.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              className="h-12 rounded-md border-gray-200 bg-gray-50/50"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Link className="text-sm font-medium text-[#002B5B] underline" href="#">
              Forgot Password
            </Link>
          </div>
          <Button className="h-12 w-full bg-[#E8FB5A] font-medium text-black hover:bg-[#E8FB5A]/90">
            Get started
          </Button>
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
            <Image
              src="/placeholder.svg?height=24&width=24"
              alt="Google"
              className="mr-2 h-6 w-6"
              height={24}
              width={24}
            />
            Sign in with Google
          </Button>
        </div>
      </div>
    </SessionLayout>
  );
}
