import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [length, setLength] = useState(8);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [passwordKey, setPasswordKey] = useState(0);

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const generatePassword = (showMessage = false) => {
    let chars = "";

    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    if (!chars) {
      setPassword("");
      return;
    }

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
    setPasswordKey((prev) => prev + 1);

    if (showMessage) {
      setShowSuccess(false);

      setTimeout(() => {
        setShowSuccess(true);
      }, 80);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2700);
    }
  };

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  useEffect(() => {
    setPageLoaded(true);
    generatePassword();
  }, []);

  const selectedOptions = [
    useUpper,
    useLower,
    useNumbers,
    useSymbols,
  ].filter(Boolean).length;

  const getStrength = () => {
    if (selectedOptions === 1) {
      return {
        text: "Weak",
        width: "w-1/4",
        bg: "bg-red-500",
        textColor: "text-red-400",
      };
    }

    if (selectedOptions === 2) {
      return {
        text: "Average",
        width: "w-2/4",
        bg: "bg-orange-400",
        textColor: "text-orange-300",
      };
    }

    if (selectedOptions === 3) {
      return {
        text: "Medium",
        width: "w-3/4",
        bg: "bg-yellow-400",
        textColor: "text-yellow-300",
      };
    }

    if (selectedOptions === 4) {
      return {
        text: "Strong",
        width: "w-full",
        bg: "bg-green-500",
        textColor: "text-green-400",
      };
    }

    return {
      text: "Weak",
      width: "w-0",
      bg: "bg-red-500",
      textColor: "text-red-400",
    };
  };

  const strength = getStrength();

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
        }

        button,
        input,
        label {
          -webkit-tap-highlight-color: transparent;
        }

        /* =========================
           PAGE ANIMATIONS
        ========================= */

        @keyframes pageEnter {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes headerEnter {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardEnter {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sectionEnter {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================
           PASSWORD ANIMATION
        ========================= */

        @keyframes passwordChange {
          0% {
            opacity: 0;
            transform: translateY(4px);
            filter: blur(4px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* =========================
           SUCCESS ANIMATION
        ========================= */

        @keyframes successMessage {
          0% {
            opacity: 0;
            transform: translateY(7px) scale(0.96);
          }

          12% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          78% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-4px) scale(0.98);
          }
        }

        /* =========================
           BACKGROUND ANIMATION
        ========================= */

        @keyframes glowOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(18px, -15px, 0) scale(1.06);
          }
        }

        @keyframes glowTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-18px, 15px, 0) scale(1.07);
          }
        }

        @keyframes glowThree {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        /* =========================
           ANIMATION CLASSES
        ========================= */

        .page-animation {
          animation: pageEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .header-animation {
          animation: headerEnter 0.75s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .card-animation {
          animation: cardEnter 0.8s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .section-animation {
          animation: sectionEnter 0.65s 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .password-animation {
          animation: passwordChange 0.35s ease-out both;
        }

        .success-animation {
          animation: successMessage 2.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .glow-one {
          animation: glowOne 8s ease-in-out infinite;
          will-change: transform;
        }

        .glow-two {
          animation: glowTwo 10s ease-in-out infinite;
          will-change: transform;
        }

        .glow-three {
          animation: glowThree 9s ease-in-out infinite;
          will-change: transform;
        }

        /* =========================
           SMOOTH CARDS
        ========================= */

        .main-card {
          transition:
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 450ms ease,
            border-color 400ms ease,
            background-color 500ms ease;
          will-change: transform;
        }

        .main-card:hover {
          transform: translateY(-3px) scale(1.005);
        }

        .output-card {
          transition:
            transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 400ms ease,
            background-color 400ms ease,
            box-shadow 400ms ease;
          will-change: transform;
        }

        .output-card:hover {
          transform: translateY(-2px) scale(1.01);
        }

        .strength-card {
          transition:
            transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 400ms ease,
            background-color 450ms ease;
          will-change: transform;
        }

        .strength-card:hover {
          transform: translateY(-2px) scale(1.01);
        }

        .length-card {
          transition:
            transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 400ms ease,
            background-color 450ms ease;
          will-change: transform;
        }

        .length-card:hover {
          transform: translateY(-2px) scale(1.01);
        }

        /* =========================
           OPTION CARDS
        ========================= */

        .option-card {
          transition:
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 450ms ease,
            border-color 400ms ease,
            background-color 400ms ease;
          will-change: transform;
        }

        .option-card:hover {
          transform: scale(1.025);
        }

        .option-card:active {
          transform: scale(0.99);
        }

        /* =========================
           GENERATE BUTTON
        ========================= */

        .generate-button {
          transition:
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 350ms ease,
            background-position 500ms ease;
          background-size: 200% 100%;
          background-position: 0% 50%;
        }

        .generate-button:hover {
          transform: translateY(-2px);
          background-position: 100% 50%;
        }

        .generate-button:active {
          transform: translateY(0) scale(0.985);
        }

        /* =========================
           COPY BUTTON
        ========================= */

        .copy-button {
          transition:
            transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 250ms ease,
            box-shadow 250ms ease;
        }

        

        .copy-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        /* =========================
           THEME TOGGLE
        ========================= */

        .theme-button {
          transition:
            transform 250ms ease,
            background-color 350ms ease,
            box-shadow 300ms ease;
        }

        .theme-button:hover {
          transform: scale(1.04);
        }

        .theme-button:active {
          transform: scale(0.94);
        }

        /* =========================
           RANGE SLIDER
        ========================= */

        input[type="range"] {
          transition: opacity 250ms ease;
        }

        input[type="range"]:hover {
          opacity: 0.9;
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 640px) {
          .main-card {
            border-radius: 1.5rem;
          }

          .output-card {
            border-radius: 1.25rem;
          }

          .generate-button {
            min-height: 54px;
          }

          .option-card:hover,
          .length-card:hover,
          .strength-card:hover,
          .output-card:hover,
          .main-card:hover {
            transform: none;
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div
        id="top"
        className={`min-h-screen transition-colors duration-500 ${
          isLight
            ? "light-mode bg-slate-100 text-slate-900"
            : "bg-slate-950 text-white"
        }`}
      >
        <Navbar
          isLight={isLight}
          toggleTheme={() => setIsLight(!isLight)}
        />

        <main
          id="generator"
          className={`relative min-h-screen overflow-hidden px-4 py-8 transition-colors duration-500 sm:px-6 sm:py-12 ${
            isLight
              ? "bg-slate-100 text-slate-900"
              : "bg-slate-950 text-white"
          }`}
        >
          <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
            <div
              className={`glow-one absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-all duration-700 sm:h-96 sm:w-96 ${
                isLight
                  ? "bg-violet-400/10"
                  : "bg-violet-600/20"
              }`}
            />

            <div
              className={`glow-two absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl transition-all duration-700 sm:h-[28rem] sm:w-[28rem] ${
                isLight
                  ? "bg-blue-400/10"
                  : "bg-blue-600/20"
              }`}
            />

            <div
              className={`glow-three absolute left-1/2 top-1/2 h-72 w-72 rounded-full blur-3xl transition-all duration-700 ${
                isLight
                  ? "bg-cyan-400/5"
                  : "bg-cyan-500/5"
              }`}
            />
          </div>

          <div
            className={`relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center ${
              pageLoaded ? "page-animation" : "opacity-0"
            }`}
          >
            <section className="w-full">

              <div className="header-animation mb-7 text-center sm:mb-9">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400 sm:text-sm">
                  Secure & Simple
                </p>

                <h1
                  className={`text-3xl font-black tracking-tight transition-colors duration-500 sm:text-5xl ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  Password Generator By{" "}

                  <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                    Hassan Ali
                  </span>
                </h1>

                <p
                  className={`mx-auto mt-3 max-w-lg text-sm leading-6 transition-colors duration-500 sm:text-base ${
                    isLight
                      ? "text-slate-600"
                      : "text-slate-400"
                  }`}
                >
                  Create strong and secure passwords with complete control
                  over length and characters.
                </p>
              </div>

              <div
                className={`card-animation main-card rounded-3xl border p-4 shadow-2xl backdrop-blur-2xl sm:p-6 md:p-8 ${
                  isLight
                    ? "border-slate-200 bg-white/70 shadow-slate-300/40 hover:border-violet-200"
                    : "border-white/10 bg-white/[0.06] shadow-black/20 hover:border-white/15"
                }`}
              >
                <div
                  className={`output-card group relative rounded-2xl border p-3 sm:p-4 ${
                    isLight
                      ? "border-slate-200 bg-white/80 hover:border-violet-200 focus-within:border-violet-400/50 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-violet-100/30"
                      : "border-white/10 bg-black/20 hover:border-white/15 focus-within:border-violet-400/40 focus-within:bg-black/30 focus-within:shadow-lg focus-within:shadow-violet-950/20"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isLight
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      Generated Password
                    </span>

                    {password && (
                      <span className="text-xs font-medium text-slate-500">
                        {password.length} characters
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      key={passwordKey}
                      type="text"
                      value={password}
                      readOnly
                      placeholder="Your password will appear here..."
                      className={`password-animation min-w-0 flex-1 bg-transparent px-1 py-3 text-sm font-semibold tracking-wider outline-none transition-colors duration-500 sm:text-base ${
                        isLight
                          ? "text-slate-900 placeholder:text-slate-400"
                          : "text-white placeholder:text-slate-600"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={copyPassword}
                      disabled={!password}
                      className={`copy-button shrink-0 rounded-xl px-4 py-3 text-xs font-bold sm:px-5 sm:text-sm ${
                        copied
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                          : "bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-400 hover:shadow-violet-500/30"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {password && (
                  <div
                    className={`strength-card section-animation mt-5 rounded-2xl border p-4 ${
                      isLight
                        ? "border-slate-200 bg-white/60"
                        : "border-white/5 bg-white/[0.03]"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold ${
                          isLight
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        Password Strength
                      </span>

                      <span
                        className={`text-xs font-bold transition-all duration-500 ${strength.textColor}`}
                      >
                        {strength.text}
                      </span>
                    </div>

                    <div
                      className={`h-1.5 overflow-hidden rounded-full ${
                        isLight
                          ? "bg-slate-200"
                          : "bg-slate-800"
                      }`}
                    >
                      <div
                        className={`h-full ${strength.width} ${strength.bg} rounded-full transition-all duration-700 ease-out`}
                      />
                    </div>
                  </div>
                )}

                <div
                  className={`length-card mt-7 rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "border-slate-200 bg-white/60 hover:border-violet-200"
                      : "border-white/5 bg-white/[0.03] hover:border-white/10"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <label
                      htmlFor="length"
                      className={`text-sm font-bold sm:text-base ${
                        isLight
                          ? "text-slate-900"
                          : "text-white"
                      }`}
                    >
                      Password Length
                    </label>

                    <span className="flex h-9 min-w-12 items-center justify-center rounded-lg border border-violet-400/10 bg-violet-500/15 px-3 text-sm font-black text-violet-500 transition-all duration-300">
                      {length}
                    </span>
                  </div>

                  <input
                    id="length"
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) =>
                      setLength(Number(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-300 accent-violet-500"
                  />

                  <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="mt-5">
                  <h2
                    className={`mb-3 text-sm font-bold sm:text-base ${
                      isLight
                        ? "text-slate-900"
                        : "text-white"
                    }`}
                  >
                    Character Options
                  </h2>

                  <div className="grid gap-3 sm:grid-cols-2">

                    <label
                      className={`option-card group flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
                        useUpper
                          ? isLight
                            ? "border-violet-300 bg-violet-50 shadow-lg shadow-violet-200/30"
                            : "border-violet-400/30 bg-violet-500/10 shadow-lg shadow-violet-950/10"
                          : isLight
                            ? "border-slate-200 bg-white/60 hover:border-violet-200 hover:bg-white"
                            : "border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            isLight
                              ? "text-slate-900"
                              : "text-white"
                          }`}
                        >
                          Uppercase
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          A - Z
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={useUpper}
                        onChange={(e) =>
                          setUseUpper(e.target.checked)
                        }
                        className="h-5 w-5 cursor-pointer accent-violet-500"
                      />
                    </label>

                    <label
                      className={`option-card group flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
                        useLower
                          ? isLight
                            ? "border-violet-300 bg-violet-50 shadow-lg shadow-violet-200/30"
                            : "border-violet-400/30 bg-violet-500/10 shadow-lg shadow-violet-950/10"
                          : isLight
                            ? "border-slate-200 bg-white/60 hover:border-violet-200 hover:bg-white"
                            : "border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            isLight
                              ? "text-slate-900"
                              : "text-white"
                          }`}
                        >
                          Lowercase
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          a - z
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={useLower}
                        onChange={(e) =>
                          setUseLower(e.target.checked)
                        }
                        className="h-5 w-5 cursor-pointer accent-violet-500"
                      />
                    </label>

                    <label
                      className={`option-card group flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
                        useNumbers
                          ? isLight
                            ? "border-violet-300 bg-violet-50 shadow-lg shadow-violet-200/30"
                            : "border-violet-400/30 bg-violet-500/10 shadow-lg shadow-violet-950/10"
                          : isLight
                            ? "border-slate-200 bg-white/60 hover:border-violet-200 hover:bg-white"
                            : "border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            isLight
                              ? "text-slate-900"
                              : "text-white"
                          }`}
                        >
                          Numbers
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          0 - 9
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={useNumbers}
                        onChange={(e) =>
                          setUseNumbers(e.target.checked)
                        }
                        className="h-5 w-5 cursor-pointer accent-violet-500"
                      />
                    </label>

                    <label
                      className={`option-card group flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
                        useSymbols
                          ? isLight
                            ? "border-violet-300 bg-violet-50 shadow-lg shadow-violet-200/30"
                            : "border-violet-400/30 bg-violet-500/10 shadow-lg shadow-violet-950/10"
                          : isLight
                            ? "border-slate-200 bg-white/60 hover:border-violet-200 hover:bg-white"
                            : "border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            isLight
                              ? "text-slate-900"
                              : "text-white"
                          }`}
                        >
                          Symbols
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          ! @ # $ % ...
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={useSymbols}
                        onChange={(e) =>
                          setUseSymbols(e.target.checked)
                        }
                        className="h-5 w-5 cursor-pointer accent-violet-500"
                      />
                    </label>

                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => generatePassword(true)}
                  className="generate-button mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-black text-white shadow-xl shadow-violet-900/20 hover:shadow-2xl hover:shadow-violet-900/30 sm:text-base"
                >
                  <span className="relative z-10">
                    Generate New Password
                  </span>
                </button>

                <div className="flex min-h-14 items-center justify-center">
                  {showSuccess && (
                    <div
                      className={`success-animation mt-2 w-full rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
                        isLight
                          ? "border-green-200 bg-green-50 text-green-600 shadow-sm shadow-green-100"
                          : "border-green-500/20 bg-green-500/10 text-green-400 shadow-sm shadow-green-950/20"
                      }`}
                    >
                      Your Password Generated Successfully!
                    </div>
                  )}
                </div>

                <p
                  className={`mt-1 text-center text-[11px] leading-5 transition-colors duration-500 sm:text-xs ${
                    isLight
                      ? "text-slate-500"
                      : "text-slate-500"
                  }`}
                >
                  Your password is generated directly in your browser.
                  Nothing is sent to a server.
                </p>
              </div>
            </section>
          </div>
        </main>

        <Footer isLight={isLight} />
      </div>
    </>
  );
}

export default App;