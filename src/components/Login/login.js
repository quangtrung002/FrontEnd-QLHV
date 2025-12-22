import React, { useState } from "react";
import { useAuth } from "context/AuthContext";

const LOGO_URL =
  "https://res.cloudinary.com/dyjrpauvp/image/upload/v1763434183/my-profile/logo-gita_n5aq7y.jpg";

export default function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (account === "admin" && password === "123456") {
      login({
        id: 1,
        username: account,
        name: "Quản trị viên",
        role: "admin",
      });
    } else {
      alert("Đăng nhập thất bại! Vui lòng thử: admin / 123456");
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <div className="w-full max-w-md bg-white px-8 py-7">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={LOGO_URL}
                    alt="GITA logo"
                    className="mb-5 h-20 w-auto object-contain"
                  />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4"
                >
                  <div className="flex items-center rounded-xl border bg-white px-4 h-14 border-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-300 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 8.236L12 13L4 8.236V6L12 10.764L20 6V8.236Z" />
                    </svg>
                    <input
                      type="text"
                      className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                      placeholder="Tài khoản (admin)"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-sm px-4 h-14">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-300 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 9V7C17 4.243 14.757 2 12 2C9.243 2 7 4.243 7 7V9H5V20H19V9H17ZM9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V9H9V7ZM17 18H7V11H17V18Z" />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                      placeholder="Mật khẩu (123456)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="ml-2 text-slate-300 hover:text-slate-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <label className="mt-1 flex items-center text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 rounded border-slate-300"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Ghi nhớ đăng nhập
                  </label>

                  <button
                    type="submit"
                    className="mt-4 h-11 rounded-full !bg-[#ec4899] px-6 text-sm font-semibold uppercase tracking-wide text-white shadow-md hover:bg-pink-600 active:bg-pink-700 transition"
                  >
                    Đăng nhập
                  </button>
                </form>
                <p className="mt-4 text-center text-[11px] text-slate-500">
                  Chưa có tài khoản?{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Đăng ký ngay
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
