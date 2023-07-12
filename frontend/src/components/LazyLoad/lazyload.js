import React, { useEffect, useRef, useState } from "react";

const LazyLoadComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={targetRef}>{isVisible && children}</div>;
};

export default LazyLoadComponent;
