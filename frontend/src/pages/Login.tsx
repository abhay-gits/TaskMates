
const Login = () => {

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">TaskMates</h1>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
