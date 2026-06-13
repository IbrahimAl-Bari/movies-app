import { Film, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black p-6">
      <div className="mx-auto max-w-7xl">


        <div className="grid gap-12 md:grid-cols-2">


          <div>
            <div className="mb-6 justify-center flex items-center gap-2 border-4 border-white bg-[#FFD60A] px-4 py-2 shadow-[4px_4px_0px_0px_#FF4D4D]">
              <Film className="h-6 w-6 text-black" />
              <span className="font-black text-black uppercase tracking-normal" style={{ fontWeight: 900 }}>CINEMATIX</span>
            </div>
            <p className="font-bold text-white" style={{ fontWeight: 700 }}>
              Your premium destination for discovering and streaming the world's best films.
            </p>
          </div>



          <div className={""}>
            <h3 className="mb-4 font-black uppercase tracking-tight text-[#FFD60A]" style={{ fontWeight: 900, fontSize: '1.25rem' }}>
             Say Hi To Me !
            </h3>
            <p className="mb-4 font-bold capitalize text-white" style={{ fontWeight: 700 }}>
              on my email ibrahim2010963@gmail.com or put your email and i will say hi to you
            </p>
            <div className="mb-6 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border-4 border-white bg-transparent px-4 py-2 font-bold text-white placeholder-gray-400 outline-none focus:border-[#FFD60A]"
                style={{ fontWeight: 700 }}
              />
              <button className="border-4 border-white bg-[#FF4D4D] p-2 transition-all hover:bg-[#FFD60A]">
                <Mail className="h-6 w-6" />
              </button>
            </div>
          </div>


        </div>



        <div className="text-center">
          <p className="font-bold text-white" style={{ fontWeight: 700 }}>
            © 2026 CINEMATIX. All rights reserved. Made with for movie lovers.
          </p>
        </div>


      </div>
    </footer>
  );
}
