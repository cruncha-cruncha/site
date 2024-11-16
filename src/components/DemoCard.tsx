import { forwardRef, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.ts";

const fullConfig = resolveConfig(tailwindConfig);

export type RefElement = HTMLDivElement;

export type Props = {
  className?: string;
  link: string;
  explanation: React.ReactNode;
  content: React.ReactNode;
};

export const DemoCard = forwardRef<RefElement, Props>(
  ({ className = "", explanation, content, link }, ref) => {
    const [isBigScreen, setIsBigScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        const md = fullConfig.theme.screens.md.split("px")[0];
        setIsBigScreen(window.innerWidth >= parseInt(md, 10));
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [setIsBigScreen]);

    return (
      <div className={`demo-card mt-8 text-slate-50 ${className}`}>
        <div className="demo-card-border" />
        <div className="demo-card-border-shadow" />
        <div className="demo-card-clip relative">
          {isBigScreen ? (
            <div className="relative flex md:[width:150%]">
              <div className="relative left-0 w-2/3">
                <ContentPanel ref={ref} link={link} content={content} />
              </div>
              <div className="relative -left-1/3 w-1/3">
                <ExplanationPanel explanation={explanation} />
              </div>
            </div>
          ) : (
            <div className="relative">
              <ExplanationPanel explanation={explanation} />
              <ContentPanel ref={ref} link={link} content={content} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

type ContentPanelProps = {
  content: React.ReactNode;
  link: string;
};

const ContentPanel = forwardRef<RefElement, ContentPanelProps>(
  ({ content, link }, ref) => {
    return (
      <div
        ref={ref}
        className="content-panel h-full w-full overflow-y-auto"
        onClick={() => {
          window.open(link, "_blank")?.focus();
        }}
      >
        {content}
      </div>
    );
  },
);

type ExplanationPanelProps = {
  explanation: React.ReactNode;
};

const ExplanationPanel = ({ explanation }: ExplanationPanelProps) => {
  const explanationRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable axis="x" nodeRef={explanationRef} position={{ x: 0, y: 0 }}>
      <div
        className={
          "explanation-panel relative h-full w-full border border-sky-400/10 bg-sky-800/20 p-4 backdrop-blur-sm md:-right-px md:border-y-0"
        }
        ref={explanationRef}
      >
        {explanation}
      </div>
    </Draggable>
  );
};
