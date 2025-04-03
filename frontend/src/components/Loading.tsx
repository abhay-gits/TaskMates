const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;