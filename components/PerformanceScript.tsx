import Script from "next/script";
import { ReactNode } from "react";

interface PerformanceScriptProps {
  children: ReactNode;
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload";
  src?: string;
  id: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Performance-optimized Script component
 * Automatically chooses the best loading strategy based on script type
 */
export default function PerformanceScript({
  children,
  strategy = "lazyOnload",
  src,
  id,
  onLoad,
  onError,
}: PerformanceScriptProps) {
  // Determine optimal strategy based on script source
  const getOptimalStrategy = () => {
    if (!src) return strategy;

    // Critical scripts that need to run early
    if (src.includes("analytics") || src.includes("gtag")) {
      return "afterInteractive";
    }

    // Non-critical scripts can be lazy loaded
    return "lazyOnload";
  };

  const optimalStrategy = getOptimalStrategy();

  if (src) {
    return (
      <Script src={src} id={id} strategy={optimalStrategy} onLoad={onLoad} onError={onError} />
    );
  }

  return (
    <Script id={id} strategy={optimalStrategy} onLoad={onLoad} onError={onError}>
      {children}
    </Script>
  );
}
