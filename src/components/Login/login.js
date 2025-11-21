import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
const LOGO_URL =
  "https://res.cloudinary.com/dyjrpauvp/image/upload/v1763434183/my-profile/logo-gita_n5aq7y.jpg";

export default function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ account, password, remember });
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
            <form>
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
                    <div className="flex items-center rounded-xl border bg-white px-4 h-14 border-red-500  ">
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
                        placeholder="Tài khoản"
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
                        type="password"
                        className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="ml-2 text-slate-300 hover:text-slate-500"
                      ></button>
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
                      className="mt-4 h-11 rounded-full bg-pink-500 px-6 text-sm font-semibold uppercase tracking-wide text-white shadow-md hover:bg-pink-600 active:bg-pink-700 transition"
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
