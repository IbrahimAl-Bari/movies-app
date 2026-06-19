"use client";

import { Film, Mail } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setStatus("error");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: existing, error: checkError } = await supabase
        .from("subscribers")
        .select("id, created_at")
        .eq("email", email)
        .gte("created_at", oneHourAgo)
        .limit(1);

    if (checkError) {
      setStatus("error");
      return;
    }

    if (existing && existing.length > 0) {
      setStatus("error");
      return;
    }

    const { error } = await supabase
        .from("subscribers")
        .insert([{ email }]);

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
      <footer className="bg-black p-6">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 md:grid-cols-2">

            <div>
              <div className="mb-6 justify-center flex items-center gap-2 border-4 border-white bg-[#FFD60A] px-4 py-2 shadow-[4px_4px_0px_0px_#FF4D4D]">
                <Film className="h-6 w-6 text-black" />
                <span className="font-black text-black uppercase tracking-normal" style={{ fontWeight: 900 }}>
                CINEMATIX
              </span>
              </div>

              <p className="font-bold text-white" style={{ fontWeight: 700 }}>
                Your premium destination for discovering and streaming the world's best films.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-black uppercase tracking-tight text-[#FFD60A]" style={{ fontWeight: 900, fontSize: "1.25rem" }}>
                Say Hi To Me !
              </h3>

              <p className="mb-4 font-bold capitalize text-white" style={{ fontWeight: 700 }}>
                put your email and i will make sure to say hi to you
              </p>

              <div className="mb-2 flex gap-2">
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border-4 border-white bg-transparent px-4 py-2 font-bold text-white placeholder-gray-400 outline-none focus:border-[#FFD60A]"
                    style={{ fontWeight: 700 }}
                />

                <button
                    onClick={handleSubmit}
                    className="border-4 border-white bg-[#FF4D4D] p-2 transition-all hover:bg-[#FFD60A]"
                >
                  <Mail className="h-6 w-6" />
                </button>
              </div>

              {status === "success" && (
                  <p className="text-green-400 font-bold">Email sent successfully !</p>
              )}

              {status === "error" && (
                  <p className="text-red-400 font-bold">Please enter a valid email or try again after 1 hour.</p>
              )}

              {status === "loading" && (
                  <p className="text-white/60 font-bold">Sending...</p>
              )}
            </div>

          </div>

          <div className="text-center">
            <p className="font-bold text-white" style={{ fontWeight: 700 }}>
              © 2026 CINEMATIX. All rights reserved. Made for movie lovers.
            </p>
          </div>

        </div>
      </footer>
  );
}