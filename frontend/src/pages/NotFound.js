import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound" data-testid="notfound-page">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you are looking for doesn’t exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
