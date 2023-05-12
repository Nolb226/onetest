import "./header.css";
import "../header/header.css";
import SignInModal from "../modal/signIn";
import SignUpModal from "../modal/signUp";
import { useState } from "react";

function Header() {
   const [openModalSignIn, setOpenSignIn] = useState(false);
   const [openModalSignUp, setOpenSignUp] = useState(false);

   const handleSignIn = () => {
      setOpenSignIn(!openModalSignIn);
   };

   const handleSignUp = () => {
      setOpenSignUp(!openModalSignUp);
   };

   return (
      <div id="header">
         <div className="grid wide flex-center header__wrap position-relative">
            <div className="header__logo" style={{ height: "100px" }}>
               <img src="/image/logo-no-background.png" alt=""></img>
            </div>

            <div className="header__btn flex-center flex-direction-row">
               <button className="btn__sign-in" onClick={() => handleSignIn()}>
                  <span>Đăng nhập</span>
               </button>

               <button className="btn__sign-up" onClick={() => handleSignUp()}>
                  <span>Đăng ký</span>
               </button>
            </div>
         </div>

         {openModalSignIn && (
            <SignInModal
               toggle1={{ handleSignIn }}
               toggle2={{ handleSignUp }}
            />
         )}
         {openModalSignUp && (
            <SignUpModal
               toggle1={{ handleSignIn }}
               toggle2={{ handleSignUp }}
            />
         )}
      </div>
   );
}

export default Header;
