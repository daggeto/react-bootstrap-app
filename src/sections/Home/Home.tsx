import React, {useCallback} from 'react';
import axios from "axios";
export function Home() {
  const sendRequest = useCallback(async () => {
    const result = await axios.post('/api', {
      params: {
        one: "one"
      }
    });

    console.log(result);
  }, []);

  return (
    <div className='App'>
      <button onClick={sendRequest}> Send Requests </button>
    </div>
  );
}
