"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://157.180.17.101:5001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // redirect to login after success
      router.push("/auth/login");

    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">

        <AuthCard title="Create Account">

          <form onSubmit={handleRegister} className="space-y-4">

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-2 rounded border border-red-200">
                {error}
              </div>
            )}

            {/* NAME */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              required
            />

            {/* EMAIL */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full p-2 border rounded"
              required
            />

            {/* PASSWORD */}
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              className="w-full p-2 border rounded"
              required
            />

            {/* ROLE */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>

            {/* BUTTON */}
            <Button disabled={loading} className="w-full">
              {loading ? "Creating..." : "Register"}
            </Button>

          </form>

        </AuthCard>
      </div>
    </div>
  );
}