"use client";

import React, { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#111] text-white p-6">
                        <h2 className="text-3xl font-black uppercase mb-4">Something went wrong</h2>
                        <p className="text-white/60 mb-8 text-center max-w-md">
                            We encountered an unexpected error. Try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="border-4 border-black bg-[#FFD60A] px-6 py-3 font-black uppercase text-black shadow-[6px_6px_0px_0px_#FF4D4D] transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            Reload Page
                        </button>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}