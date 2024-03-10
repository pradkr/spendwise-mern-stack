import React, { useState, useEffect } from 'react';
import FallbackUI from '../components/FallbackUI';

export function ErrorBoundary({ error, children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      // Log the error or send it to an error tracking service
      console.error('Error occurred within the ErrorBoundary');
    }
  }, [hasError]);

  if (hasError) {
    setHasError(error)
    return <FallbackUI />;
  }

  return children;
}

// export default ErrorBoundary;