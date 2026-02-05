import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for logout navigation

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, []);

  if (!user) return <p className="p-10">No user data found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      
      <h1 className="text-2xl font-bold mb-6">HI, {user.name.toUpperCase()}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT CARD */}
        <div className="bg-white shadow p-6 rounded text-center space-y-4">
          {/* Avatar Display */}
          <div className="w-24 h-24 rounded-full mx-auto overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          <p><strong>NAME:</strong> {user.name}</p>
          <p><strong>EMAIL:</strong> {user.email}</p>
          <p><strong>MEMBER SINCE:</strong> {user.memberSince}</p>

          <button className="w-full bg-gray-800 text-white py-2 rounded">
            Your Profile Details
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white shadow p-6 rounded space-y-6">

          <div>
            <h2 className="font-bold">PERSONAL INFORMATION</h2>
            <p className="text-sm text-gray-500">Edit your account details below.</p>
          </div>

          <div>
            <h3 className="font-semibold">MY DETAILS</h3>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>Phone Number</p>
            <p>Gender</p>

            <button className="w-full bg-gray-800 text-white py-2 mt-3 rounded">
              EDIT DETAILS
            </button>
          </div>

          <div>
            <h3 className="font-semibold">LOGIN DETAILS</h3>
            <p>Email: {user.email}</p>
            <p>Password: ********</p>

            <button className="w-full bg-gray-800 text-white py-2 mt-3 rounded">
              UPDATE PASSWORD
            </button>
          </div>

          <div>
            <h3 className="font-semibold">LOG OUT FROM ALL DEVICES</h3>
            <button
              className="w-full bg-gray-800 text-white py-2 rounded"
              onClick={() => {
                localStorage.removeItem("user"); // Clear user data
                navigate("/SignIn"); // Redirect to SignIn
              }}
            >
              LOGOUT ACCOUNT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
