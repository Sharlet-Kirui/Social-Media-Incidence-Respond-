import { useState } from "react";
import { Lock, Eye, EyeOff, Upload, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); 

  const [form, setForm] = useState({ 
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [avatar, setAvatar] = useState(null);

  function handleChange(e) {   
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {           
    if (!form.name || !form.email || !form.password || !form.confirm) {
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: form.name,
        email: form.email,
        memberSince: new Date().toLocaleString(),
        avatar: avatar ? URL.createObjectURL(avatar) : null, // Save avatar preview URL
      })
    );

    navigate("/profile");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm text-center space-y-6">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-3 rounded-full border">
            <Lock />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold">Sign Up for an Account!</h2>

        {/* Form */}
        <div className="flex flex-col gap-5 text-left">

          <input
            name="name"                        
            onChange={handleChange}            
            className="w-full px-3 py-2 border rounded"
            placeholder="Name"
          />

          <input
            name="email"                      
            onChange={handleChange}            
            className="w-full px-3 py-2 border rounded bg-blue-50"
            placeholder="Email"
          />

          <div className="relative">
            <input
              name="password"                  
              onChange={handleChange}          
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded bg-blue-50 pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <input
            name="confirm"                  
            onChange={handleChange}           
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Confirm Password"
          />

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full border w-12 h-12 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User />
              )}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatarInput"
              onChange={(e) => setAvatar(e.target.files[0])}
            />

            <button
              type="button"
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded text-sm"
              onClick={() => document.getElementById("avatarInput").click()}
            >
              <Upload size={16} />
              Upload Avatar
            </button>
          </div>

          {/* Checkboxes */}
          <label className="flex gap-2 text-sm">
             <input type="checkbox" />
              I Accept The Terms & Conditions
          </label>

          <label className="flex gap-2 text-sm">
            <input type="checkbox" />
            I Accept The Terms Of Use
          </label>

          {/* Button */}
          <button
            onClick={handleSubmit}         
            className="w-full bg-gray-700 text-white py-2 rounded font-semibold"
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm">
          Already have an account?{" "}
          <a href="/SignIn" className="font-semibold underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
