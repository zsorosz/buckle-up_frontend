import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PopupProps = {
  text: string;
  closePopup: (arg: boolean) => void;
  isPopupOpen: boolean;
};

export const Popup = ({ text, closePopup, isPopupOpen }: PopupProps) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const closeHandler = () => {
    setShow(false);
    closePopup(false);
  };

  useEffect(() => {
    setShow(isPopupOpen);
  }, [isPopupOpen]);

  return (
    <div className={show ? "popup-visible" : "popup-hidden"}>
      <div className="popup">
        <span className="close" onClick={closeHandler}>
          &times;
        </span>
        <div className="content">{text}</div>
        <div className="popup-ctas">
          <button className="primary-btn" onClick={() => navigate("/login")}>
            Log in
          </button>
          <p>Don't have an account yet?</p>
          <button className="primary-btn" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
