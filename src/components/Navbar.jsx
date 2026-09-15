function Navbar({ isLight, toggleTheme }) {
  return (
    <nav
      className={`navbar-animation sticky top-0 z-50 w-full border-b transition-all duration-700 ${
        isLight
          ? "border-slate-200 bg-white"
          : "border-white/10 bg-slate-950"
      }`}
    >
      <div className="navbar-content flex min-h-16 w-full items-center justify-between px-3 py-2 sm:px-5 md:px-6 lg:px-7">
        <a
          href="#top"
          className="navbar-brand group flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <div
            className={`logo-box flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border sm:h-10 sm:w-10 ${
              isLight
                ? "border-violet-200 bg-violet-50 shadow-sm shadow-violet-100"
                : "border-violet-400/20 bg-violet-500/10 shadow-sm shadow-violet-950/20"
            }`}
          >
            <img
              src="/image.png"
              alt="Password Generator Logo"
              className="logo-image h-full w-full object-contain"
            />
          </div>

          <div className="nav-title min-w-0">
            <h2
              className={`truncate text-xs font-black tracking-tight transition-colors duration-700 sm:text-base md:text-lg ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Password Generator
            </h2>

            <p className="mt-0.5 truncate text-[8px] font-medium uppercase tracking-[0.12em] sm:text-[9px] md:text-[10px]">
              <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                By Hassan Ali
              </span>
            </p>
          </div>
        </a>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`theme-button relative h-8 w-14 shrink-0 rounded-full p-1 sm:h-9 sm:w-16 ${
            isLight ? "bg-slate-200" : "bg-slate-800"
          }`}
        >
          <span
            className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs shadow-md transition-all duration-500 ease-out sm:h-7 sm:w-7 ${
              isLight
                ? "translate-x-6 bg-white text-orange-500 sm:translate-x-7"
                : "translate-x-0 bg-slate-700 text-blue-300"
            }`}
          >
            {isLight ? "☀" : "☾"}
          </span>
        </button>
      </div>

      <style>{`
        @keyframes navbarReveal {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logoReveal {
          from {
            opacity: 0;
            transform: scale(0.9);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateY(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes themeReveal {
          from {
            opacity: 0;
            transform: scale(0.9);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .navbar-animation {
          animation: navbarReveal 0.75s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .navbar-content {
          animation: titleReveal 0.65s 0.08s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .logo-box {
          animation: logoReveal 0.65s 0.12s
            cubic-bezier(0.22, 1, 0.36, 1) both;
          transition:
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 450ms ease,
            border-color 450ms ease,
            background-color 500ms ease;
        }

        .logo-image {
          transition:
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 400ms ease;
        }

        .navbar-brand {
          transition:
            opacity 350ms ease,
            transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .navbar-brand:hover {
          opacity: 0.98;
        }

        .navbar-brand:hover .logo-box {
          transform: translateY(-1px) scale(1.015);
          box-shadow: 0 7px 20px rgba(139, 92, 246, 0.09);
        }

        .navbar-brand:hover .logo-image {
          transform: scale(1.035);
        }

        .nav-title {
          animation: titleReveal 0.65s 0.16s
            cubic-bezier(0.22, 1, 0.36, 1) both;
          transition:
            transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
            color 600ms ease;
        }

        .navbar-brand:hover .nav-title {
          transform: translateX(1px);
        }

        .theme-button {
          animation: themeReveal 0.65s 0.22s
            cubic-bezier(0.22, 1, 0.36, 1) both;
          transition:
            background-color 650ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 450ms ease,
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
        }

        .theme-button:hover {
          box-shadow: 0 5px 18px rgba(139, 92, 246, 0.08);
        }

        .theme-button:active {
          transform: scale(0.97);
        }

        .theme-icon {
          transition:
            transform 650ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 650ms cubic-bezier(0.22, 1, 0.36, 1),
            color 650ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 500ms ease;
          will-change: transform;
        }

        .theme-button:hover .theme-icon {
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 640px) {
          .navbar-brand:hover .logo-box {
            transform: none;
            box-shadow: none;
          }

          .navbar-brand:hover .logo-image {
            transform: none;
          }

          .navbar-brand:hover .nav-title {
            transform: none;
          }

          .theme-button:hover {
            box-shadow: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-animation,
          .navbar-content,
          .logo-box,
          .nav-title,
          .theme-button {
            animation: none;
          }

          .navbar-content,
          .navbar-brand,
          .logo-box,
          .logo-image,
          .nav-title,
          .theme-button,
          .theme-icon {
            transition: none;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;