'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaSpinner } from 'react-icons/fa6';
import { handleErrorToast, handleSuccessToast } from '@/lib/toast -message';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
  const router = useRouter();
  const [isLoding, setIsLoding] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const setInputes = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoding(true);
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const { message, success, user, token } = await res.json();
      if (success) {
        handleSuccessToast(message);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        window.dispatchEvent(new Event('userChanged'));
        setIsLoding(false);
        router.push('/');
      } else {
        handleErrorToast(message);
        setIsLoding(false);
      }
    } catch {
      handleErrorToast('Login failed. Please try again.');
      setIsLoding(false);
    }
  };

  return (
    <div className="flex mt-10 items-center justify-center min-h-[90vh] px-4 ">
      <div className="w-full max-w-md bg-white p-10 sm:p-12 rounded-3xl shadow-xl border">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Please login to your account
        </p>
        <form onSubmit={handleLoginUser} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={setInputes}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <Input
              name="password"
              value={loginInfo.password}
              onChange={setInputes}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-900 py-3 text-base transition">
            {isLoding ? <FaSpinner className=" animate-spin" /> : 'Login'}
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
