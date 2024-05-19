import React, { useEffect, useState } from "react";
function ScrollUp() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowButton(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className={`top-to-btm ${showButton ? "visible" : ""}`}
      onClick={handleScroll}
    >
      <i className="fa-solid fa-arrow-up icon-position icon-style"></i>
    </div>
  );
}

export default ScrollUp;
