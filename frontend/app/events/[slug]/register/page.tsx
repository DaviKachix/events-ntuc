"use client";

import { useState } from "react";

export default function Register({
  params,
}: {
  params: { slug: string };
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const submit = async () => {
    alert("Registered for " + params.slug);
  };

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-xl font-bold text-dark mb-4">
        Event Registration
      </h1>

      <input
        className="border p-2 w-full rounded mb-3"
        placeholder="Full Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="border p-2 w-full rounded mb-3"
        placeholder="Phone"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        className="border p-2 w-full rounded mb-3"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <button
        onClick={submit}
        className="w-full bg-primary text-white py-2 rounded-lg"
      >
        Submit Registration
      </button>
    </div>
  );
}