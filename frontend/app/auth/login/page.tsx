"use client";

import { useState } from "react";
import AuthCard from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://157.180.17.101:5001/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // flexible token extraction (handles different backend formats)
      const token =
        data.token || data.accessToken || data?.data?.token;

      if (!token) {
        setError("Token not returned from server");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);

      // store user safely
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-[#1f3a5f]/5 px-4">
      <div className="w-full max-w-md">
        <AuthCard title="Admin Login">
          <form onSubmit={handleLogin} className="space-y-5">

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="text-sm text-[#1f3a5f] font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@ntuc.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]/30"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-[#1f3a5f] font-medium">
                Password
              </label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]/30"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  <i
                    className={
                      showPassword
                        ? "fa-solid fa-eye-slash"
                        : "fa-solid fa-eye"
                    }
                  />
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              className="w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket" />
                  Login
                </>
              )}
            </Button>

            <p className="text-xs text-center text-gray-500">
              NTUC Events Management System
            </p>

          </form>
        </AuthCard>
      </div>
    </div>
  );
}