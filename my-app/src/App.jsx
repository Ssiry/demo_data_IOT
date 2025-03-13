import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "./firebase"; // Ensure firebase.js exports `app`

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const db = getDatabase(app);

  useEffect(() => {
    const dbRef = ref(db, "test"); // Change "test" to your actual database path

    // Listen for real-time updates
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        console.log("Live Data Updated:", snapshot.val());
      } else {
        setData(null);
        console.log("No data found");
      }
    });

    // Cleanup listener when the component unmounts
    return () => off(dbRef, "value");
  }, [db]);

  return (
    <div className="m-0 w-full h-[90vh] flex flex-col gap-6 items-center justify-center p-4 overflow-hidden">

      <p className="fixed top-0 w-full text-center bg-amber-200 p-4 rounded-lg shadow-md ">
        ⚠️ Attention !! <br />
        Live data is being fetched from the Realtime Database. ✌🏻
      </p>

      <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono drop-shadow-sm">
        Live Realtime Database Data
      </h2>

      <div className="flex items-center gap-6 flex-wrap bg-gradient-to-r from-blue-400 to-red-100 overflow-y-auto bg-white min-w-1/2 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg justify-center max-h-[70vh]">
        {data && typeof data === "object" ? (
          Object.entries(data).map(([key, value]) => (
            <p
              key={key}
              className="w-1/4 drop-shadow-sm md:text-2xl flex flex-col py-2 px-6 bg-gray-100 mt-2 rounded-lg font-mono text-gray-800 dark:text-white min-w-[250px] text-center"
            >
              <strong className="mb-2">{key}</strong> {value}
            </p>
          ))
        ) : (
          <p className="text-lg font-mono text-gray-700">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
