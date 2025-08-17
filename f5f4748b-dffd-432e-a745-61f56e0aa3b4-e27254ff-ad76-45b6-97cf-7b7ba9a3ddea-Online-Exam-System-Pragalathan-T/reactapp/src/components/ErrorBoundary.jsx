import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      const message = this.state.error && (this.state.error.message || String(this.state.error));
      const stack = this.state.error && this.state.error.stack;
      return (
        <div style={{ padding: 24 }}>
          <h1>Something went wrong</h1>
          <p style={{ color: '#b91c1c' }}>{message}</p>
          {stack && (
            <pre style={{ whiteSpace: 'pre-wrap', color: '#7f1d1d', background: '#fee2e2', padding: 12, borderRadius: 8, marginTop: 8 }}>
              {stack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}