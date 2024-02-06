import React, { useState, useEffect } from 'react';

const Alerts = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="alert alert-primary" role="alert">
          {props.message}
        </div>
      )}
    </div>
  );
}

export default Alerts;