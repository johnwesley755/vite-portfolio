// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches errors in its child component tree (e.g., failed model loading in the Canvas).
 * This prevents the model loading error (the Promise rejection) from repeatedly crashing 
 * the component tree and spamming the console.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  /**
   * Updates state so the next render shows the fallback UI.
   */
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * You can log the error details to an error reporting service here.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error details to the browser console for debugging
    console.error("--- UNRECOVERABLE THREE.JS ERROR CAUGHT ---");
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.error("------------------------------------------");
  }

  public render() {
    if (this.state.hasError) {
      // Fallback UI to display instead of the broken 3D model
      const MODEL_PATH = "/models/my-portfolio-model.glb";
      return (
        <div className="flex justify-center items-center h-full text-red-400 bg-black/50 p-8">
          <p className="text-center text-lg font-semibold border border-red-500/50 p-4 rounded-lg bg-red-900/10 backdrop-blur-sm">
            ❌ **3D Model Failed to Load.** <br />
            Please verify the path and file integrity: 
            <code className="block mt-1 text-sm font-mono text-yellow-300">{MODEL_PATH}</code>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;