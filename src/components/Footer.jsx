function Footer({ isLight }) {
  return (
    <footer
      className={`w-full border-t transition-all duration-500 ${
        isLight
          ? "border-slate-200 bg-white"
          : "border-white/10 bg-slate-950"
      }`}
    >
      <div className="flex min-h-16 w-full items-center justify-center px-4 py-5 sm:px-6">
        <p
          className={`text-center text-[11px] leading-5 transition-colors duration-500 sm:text-xs md:text-sm ${
            isLight
              ? "text-slate-500"
              : "text-slate-500"
          }`}
        >
          © 2026{" "}
          <span
            className={`font-semibold transition-colors duration-500 ${
              isLight
                ? "text-slate-700"
                : "text-slate-400"
            }`}
          >
            Hassan Ali
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;