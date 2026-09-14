function Navbar({ isLight, toggleTheme }) {
  return (
    <nav
      className={`relative z-50 w-full border-b backdrop-blur-xl transition-all duration-500 ${
        isLight
          ? "border-slate-200 bg-white/85"
          : "border-white/10 bg-slate-950/80"
      }`}
    >
      <div className="flex min-h-16 w-full items-center justify-between px-3 py-2 sm:px-5 md:px-6 lg:px-7">

        {/* Left Side */}
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2 transition-opacity duration-300 hover:opacity-80 sm:gap-3"
        >
          {/* Logo */}
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border overflow-hidden transition-all duration-500 sm:h-10 sm:w-10 ${
              isLight
                ? "border-violet-200 bg-violet-50"
                : "border-violet-400/20 bg-violet-500/10"
            }`}
          >
            <img
              src="/image.png"
              alt="Password Generator Logo"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h2
              className={`truncate text-xs font-black tracking-tight transition-colors duration-500 sm:text-base md:text-lg ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Password Generator
            </h2>

            <p className="mt-[-5] truncate text-[8px] font-medium uppercase tracking-[0.12em] sm:text-[9px] md:text-[10px]">
              <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                By Hassan Ali
              </span>
            </p>
          </div>
        </a>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`relative h-8 w-14 shrink-0 rounded-full p-1 transition-all duration-300 active:scale-95 sm:h-9 sm:w-16 ${
            isLight ? "bg-slate-200" : "bg-slate-800"
          }`}
        >
          {/* Knob */}
          <span
            className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs shadow-sm transition-all duration-300 ease-out sm:h-7 sm:w-7 ${
              isLight
                ? "left-1 translate-x-6 bg-white text-orange-500 sm:translate-x-7"
                : "left-1 translate-x-0 bg-slate-700 text-blue-300"
            }`}
          >
            {isLight ? "☀" : "☾"}
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;