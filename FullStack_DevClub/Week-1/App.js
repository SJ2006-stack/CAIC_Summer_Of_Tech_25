import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>How u doin!!</h1>
      <p>uhh, I actually forgot to commit the changes of week 1 and week 2, and  then, after the msg, I started doing week3</p>
    </div>
  );
}

export default App;

