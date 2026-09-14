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

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const generatePassword = () => {
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
      const randomIndex = Math.floor(
        Math.random() * chars.length
      );

      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
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
        className={`min-h-screen overflow-hidden px-4 py-8 transition-colors duration-500 sm:px-6 sm:py-12 ${
          isLight
            ? "bg-slate-100 text-slate-900"
            : "bg-slate-950 text-white"
        }`}
      >
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">

          <div
            className={`absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-all duration-700 sm:h-96 sm:w-96 ${
              isLight
                ? "bg-violet-400/10"
                : "bg-violet-600/20"
            }`}
          />

          <div
            className={`absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl transition-all duration-700 sm:h-[28rem] sm:w-[28rem] ${
              isLight
                ? "bg-blue-400/10"
                : "bg-blue-600/20"
            }`}
          />

          <div
            className={`absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-700 ${
              isLight
                ? "bg-cyan-400/5"
                : "bg-cyan-500/5"
            }`}
          />

        </div>

        {/* Main Container */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">

          <section className="w-full">

            {/* Header */}
            <div className="mb-7 text-center sm:mb-9">

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400 sm:text-sm">
                Secure & Simple
              </p>

              <h1
                className={`text-3xl font-black tracking-tight transition-colors duration-500 sm:text-5xl ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                Password Generator By

                <span className="ml-2 bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
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

            {/* Card */}
            <div
              className={`rounded-3xl border p-4 shadow-2xl backdrop-blur-2xl transition-all duration-500 sm:p-6 md:p-8 ${
                isLight
                  ? "border-slate-200 bg-white/70 shadow-slate-300/40 hover:border-violet-200"
                  : "border-white/10 bg-white/[0.06] shadow-black/20 hover:border-white/15"
              }`}
            >

              {/* Password Output */}
              <div
                className={`group relative rounded-2xl border p-3 transition-all duration-300 sm:p-4 ${
                  isLight
                    ? "border-slate-200 bg-white/80 hover:border-violet-200 focus-within:border-violet-400/50 focus-within:bg-white"
                    : "border-white/10 bg-black/20 hover:border-white/15 focus-within:border-violet-400/40 focus-within:bg-black/30"
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
                    <span
                      className={`text-xs font-medium ${
                        isLight
                          ? "text-slate-500"
                          : "text-slate-500"
                      }`}
                    >
                      {password.length} characters
                    </span>
                  )}

                </div>

                <div className="flex items-center gap-2">

                  <input
                    type="text"
                    value={password}
                    readOnly
                    placeholder="Your password will appear here..."
                    className={`min-w-0 flex-1 bg-transparent px-1 py-3 text-sm font-semibold tracking-wider outline-none transition-colors duration-500 sm:text-base ${
                      isLight
                        ? "text-slate-900 placeholder:text-slate-400"
                        : "text-white placeholder:text-slate-600"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={copyPassword}
                    disabled={!password}
                    className={`shrink-0 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-300 sm:px-5 sm:text-sm ${
                      copied
                        ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                        : "bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-violet-500/30 active:translate-y-0"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>

                </div>

              </div>

              {/* Strength */}
              {password && (
                <div
                  className={`mt-5 rounded-2xl border p-4 transition-all duration-300 ${
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

              {/* Length */}
              <div
                className={`mt-7 rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
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

                  <span className="flex h-9 min-w-12 items-center justify-center rounded-lg border border-violet-400/10 bg-violet-500/15 px-3 text-sm font-black text-violet-500">
                    {length}
                  </span>

                </div>

                <input
                  id="length"
                  type="range"
                  min="4"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-300 accent-violet-500"
                />

                <div
                  className={`mt-2 flex justify-between text-[11px] ${
                    isLight
                      ? "text-slate-500"
                      : "text-slate-500"
                  }`}
                >
                  <span>4</span>
                  <span>50</span>
                </div>

              </div>

              {/* Options */}
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

                  {/* Uppercase */}
                  <label
                    className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
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

                      <p
                        className={`mt-1 text-xs ${
                          isLight
                            ? "text-slate-500"
                            : "text-slate-500"
                        }`}
                      >
                        A - Z
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={useUpper}
                      onChange={(e) => setUseUpper(e.target.checked)}
                      className="h-5 w-5 cursor-pointer accent-violet-500"
                    />

                  </label>

                  {/* Lowercase */}
                  <label
                    className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
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

                      <p
                        className={`mt-1 text-xs ${
                          isLight
                            ? "text-slate-500"
                            : "text-slate-500"
                        }`}
                      >
                        a - z
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={useLower}
                      onChange={(e) => setUseLower(e.target.checked)}
                      className="h-5 w-5 cursor-pointer accent-violet-500"
                    />

                  </label>

                  {/* Numbers */}
                  <label
                    className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
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

                      <p
                        className={`mt-1 text-xs ${
                          isLight
                            ? "text-slate-500"
                            : "text-slate-500"
                        }`}
                      >
                        0 - 9
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={useNumbers}
                      onChange={(e) => setUseNumbers(e.target.checked)}
                      className="h-5 w-5 cursor-pointer accent-violet-500"
                    />

                  </label>

                  {/* Symbols */}
                  <label
                    className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
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

                      <p
                        className={`mt-1 text-xs ${
                          isLight
                            ? "text-slate-500"
                            : "text-slate-500"
                        }`}
                      >
                        ! @ # $ % ...
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={useSymbols}
                      onChange={(e) => setUseSymbols(e.target.checked)}
                      className="h-5 w-5 cursor-pointer accent-violet-500"
                    />

                  </label>

                </div>

              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={generatePassword}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-black text-white shadow-xl shadow-violet-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-2xl hover:shadow-violet-900/30 active:translate-y-0 sm:text-base"
              >
                Generate New Password
              </button>

              {/* Info */}
              <p
                className={`mt-4 text-center text-[11px] leading-5 sm:text-xs ${
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
  );
}

export default App;