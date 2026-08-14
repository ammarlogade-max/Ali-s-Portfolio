import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";
import { useLoading } from "../context/LoadingProvider";

function useTypingEffect(text: string, delay: number, speed: number, enabled: boolean) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!enabled) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed, enabled]);
  return displayed;
}

const Landing = ({ children }: PropsWithChildren) => {
  const { isLoading } = useLoading();
  const name = useTypingEffect("MOHD ALI ANSARI", 1500, 120, !isLoading);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-circle1"></div>
        <div className="landing-circle2"></div>
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1 className="landing-typed-name" aria-label="MOHD ALI ANSARI">
              {name}<span className="typing-cursor">|</span>
            </h1>
          </div>
          <div className="landing-avatar-slot">
            {children}
          </div>
          <div className="landing-info">
            <h3>Aspiring</h3>
            <h2 className="landing-info-h2" aria-label="AI/ML Engineer, Data Analyst">
              <div className="landing-h2-1">AI/ML</div>
              <div className="landing-h2-2">Data</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">Analyst</div>
            </h2>
            <button
              className="landing-chat-cta"
              type="button"
              data-cursor="disable"
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="landing-chat-dot" />
              <span>Scroll to explore!</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
