import { useState } from "react";

export function Contact() {
  return (
    <section
      className="flex flex-col font-good-sans"
      style={{
        padding:
          "clamp(80px,12vh,140px) clamp(20px,5vw,80px) clamp(12px,2vh,28px)",
      }}
    >
      <h1
  className="uppercase flex-shrink-0 mb-1"
  style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.2em" }}
>
  Contact Us
</h1>

<div
  className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-16 md:flex-1 md:min-h-0"
  style={{ fontSize: 13, lineHeight: 1.7 }}
>
        {/* Left column — intro text + contact details, stacked */}
        <div className="flex flex-col gap-5 md:overflow-hidden">
          <p style={{ fontSize: 13 }}>
            For wholesale, press, or general enquiries, write to us. We try to
            reply within two working days.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2
                className="uppercase opacity-50"
                style={{ fontSize: 11, letterSpacing: "0.2em" }}
              >
                Email
              </h2>
              <a href="mailto:Hello@longseason.shop"
                className="underline hover:opacity-70 transition-opacity"
              >
                Hello@longseason.shop
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h2
                className="uppercase opacity-50"
                style={{ fontSize: 11, letterSpacing: "0.2em" }}
              >
                Instagram
              </h2>
              
               <a href="https://www.instagram.com/longseasonofficial/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:opacity-70 transition-opacity"
              >
                @longseasonofficial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}