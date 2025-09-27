import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginAsAdmin } from "../api/AdminApis.js";

const AdminSignin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Add your navigate function as needed
  // Example: import { useNavigate } from "react-router-dom";
  // const navigate = useNavigate();

  const validate = () => {
    console.log(form);
    
    let tempErrors = {};
    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      tempErrors.email = "Email is invalid";
    }
    if (!form.password) {
      tempErrors.password = "Password is required";
    } else if (form.password.length < 7) {
      tempErrors.password = "Password must be at least 7 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true); // show loader
      try {
        const response = await loginAsAdmin({
          email: form.email,
          password: form.password,
        });
        console.log(response);
        
        if (response.status === 200 && response.data) {
          const user = response.data;
          localStorage.setItem("admin", JSON.stringify(user));
          localStorage.setItem("role", "admin");
          setSuccess(true);
          window.location.href = '/dashboard'
        } else {
          alert('Invalid credentials');
        }
      } catch (err) {
        alert(
          err?.response?.data?.message || err.message || "Login failed"
        );
      } finally {
        setLoading(false); // hide loader
      }
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 rounded-2xl shadow-xl shadow-black">
      <form
        className=" backdrop-blur-2xl bg-white/10 rounded-xl shadow-xl shadow-black w-full max-w-md px-8 py-10"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-emerald-400">
          Admin Sign In - ParrotConsult
        </h2>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-100" htmlFor="email">
            Email
          </label>
          <input
            className={`w-full px-4 py-2 rounded border text-white ${
              errors.email
                ? "border-red-500"
                : "border-slate-300 focus:border-emerald-600"
            } focus:outline-none`}
            type="email"
            name="email"
            placeholder="Enter your admin email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-6 relative">
          <label className="block mb-1 font-semibold text-gray-100" htmlFor="password">
            Password
          </label>
          <input
            className={`w-full px-4 py-2 rounded border text-white ${
              errors.password
                ? "border-red-500"
                : "border-slate-300 focus:border-emerald-600"
            } focus:outline-none`}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            minLength={7}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute top-9 right-4 text-xl text-gray-200"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            disabled={loading}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-md bg-emerald-900 text-white font-bold hover:bg-emerald-700 transition duration-150 flex justify-center items-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminSignin;
