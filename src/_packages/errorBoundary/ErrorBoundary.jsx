import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { WebsiteHeaderContainer } from '../../components/WebsiteHeader';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return  <div className="page-container">
                <div className="wrap-inner-content">
                  <WebsiteHeaderContainer
                    is_error = {true}
                  />
                  <center>
                      <h2>Something went wrong.</h2>
                      <h2> <a href="/">Back to home</a></h2>
                  </center>
                </div>
              </div>
    }
    return this.props.children;
  }
}