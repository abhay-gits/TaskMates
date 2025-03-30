const Login = () => {

  const handleGoogleLogin = () => {
    window.location.href = "https://taskmates-8wmg.onrender.com/auth/google";

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-8">
        {/* Logo and Title Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">TaskMates</h1>
          <p className="text-gray-600">Collaborate and manage tasks efficiently</p>
        </div>

        {/* Login Button Section */}
        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm hover:shadow cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Additional Information */}
          <div className="text-center text-sm text-gray-600">
            <p>By signing in, you agree to our</p>
            <div className="space-x-1">
              <a href="#" className="text-blue-500 hover:text-blue-600">Terms of Service</a>
              <span>&</span>
              <a href="#" className="text-blue-500 hover:text-blue-600">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 text-center text-sm text-gray-500">
          <p>Need help? <a href="#" className="text-blue-500 hover:text-blue-600">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
