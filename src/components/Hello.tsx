import React, { useEffect, useState } from 'react';

const Hello: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 
      className={`text-6xl font-light tracking-wide text-gray-800
                  transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      hello
    </h1>
  );
};

export default Hello;