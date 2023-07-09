"use client";

import Script from "next/script";

const LayoutScripts = () => {
  return (
    <>
      <Script
        src="/assets/js/core/popper.min.js"
        strategy="lazyOnload"
      ></Script>
      <Script
        src="/assets/js/plugins/perfect-scrollbar.min.js"
        strategy="lazyOnload"
      ></Script>
      <Script
        src="/assets/js/core/bootstrap.min.js"
        strategy="lazyOnload"
      ></Script>
      
    </>
  );
};

export default LayoutScripts;
