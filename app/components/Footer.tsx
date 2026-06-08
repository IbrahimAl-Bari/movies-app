import { Film, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2 border-4 border-white bg-[#FFD60A] px-4 py-2 shadow-[4px_4px_0px_0px_#FF4D4D]">
              <Film className="h-6 w-6" />
              <span className="font-black uppercase tracking-tight" style={{ fontWeight: 900 }}>CINEMATIX</span>
            </div>
            <p className="font-bold text-white" style={{ fontWeight: 700 }}>
              Your premium destination for discovering and streaming the world's best films.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-black uppercase tracking-tight text-[#FFD60A]" style={{ fontWeight: 900, fontSize: '1.25rem' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  Browse Movies
                </a>
              </li>
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  TV Series
                </a>
              </li>
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  Trending
                </a>
              </li>
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  My List
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-black uppercase tracking-tight text-[#FFD60A]" style={{ fontWeight: 900, fontSize: '1.25rem' }}>
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-bold text-white transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 700 }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-black uppercase tracking-tight text-[#FFD60A]" style={{ fontWeight: 900, fontSize: '1.25rem' }}>
              Newsletter
            </h3>
            <p className="mb-4 font-bold text-white" style={{ fontWeight: 700 }}>
              Get weekly recommendations
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

        <div className="mt-12 border-t-4 border-white pt-8 text-center">
          <p className="font-bold text-white" style={{ fontWeight: 700 }}>
            © 2026 CINEMATIX. All rights reserved. Made with for movie lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
