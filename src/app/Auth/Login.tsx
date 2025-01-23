import { useState, FormEvent } from 'react';

interface LoginProps {
  handleLogin: (email: string, password: string) => void;
}

const Login = ({ handleLogin }: LoginProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="border border-emerald-600 rounded-2xl shadow-xl bg-gray-800 p-10 w-[400px]">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Admin&#39;s Login</h1>

        <form
          className="flex flex-col gap-6"
          onSubmit={submitHandler}
        >
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m8-6H8m8 12H8m10 6h-1a2 2 0 01-2-2v-1a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Enter your email"
              className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0 0c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 0v-6m0 0v2"
                />
              </svg>
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button className="w-full py-3 text-lg font-semibold text-white bg-emerald-600 rounded-lg shadow-md hover:bg-emerald-700 hover:scale-105 transition-transform focus:ring-2 focus:ring-emerald-500">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
