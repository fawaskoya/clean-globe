"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function ReCaptchaProvider({ 
  children, 
  reCaptchaKey 
}: { 
  children: React.ReactNode;
  reCaptchaKey: string;
}) {
  if (!reCaptchaKey) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

