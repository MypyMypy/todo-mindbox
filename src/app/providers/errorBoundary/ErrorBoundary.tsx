import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
  error: {
    hasError: boolean;
    type: string | null;
    errorMessage: string | null;
  };
}

export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      error: {
        hasError: false,
        type: null,
        errorMessage: null,
      },
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      error: {
        hasError: true,
        type: error.name,
        errorMessage: error.message,
      },
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("[ErrorBoundary]", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.error.hasError) {
      return (
        <div>
          <p>Code: Red - Found ERROR</p>
          <button
            onClick={() =>
              this.setState({
                error: { type: null, errorMessage: null, hasError: false },
              })
            }
          >
            Reset Error
          </button>
          <p>
            <b>{this.state.error.type}:</b> {this.state.error.errorMessage}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
