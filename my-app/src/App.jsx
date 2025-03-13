import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "./firebase"; // Ensure firebase.js exports `app`

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const db = getDatabase(app);

  // Function to fetch data from Realtime Database
  const fetchRealtimeData = async (path) => {
    const dbRef = ref(db, path);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        console.log("Fetched Data:", snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchRealtimeData("test").then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <div className="m-0 w-full  overflow-x-hidden  h-[90vh] flex flex-col gap-6 items-center justify-center p-4">
      <p className="sm:absolute md:absolute top-0 w-full text-center bg-amber-200 p-4 rounded-lg">Attention !! <br />
        the data is being fetched from the Realtime Database.
        it may take a few seconds. ✌🏻
      </p>
      <h2 className="text-2xl h-[5vh] sm:text-3xl md:text-5xl font-mono drop-shadow-sm">Realtime Database Data</h2>

      <div className=" flex items-center gap-6 flex-wrap  bg-gradient-to-r from-blue-400 to-red-100 overflow-y-scroll bg-white min-w-1/2 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg   justify-center">
        {/* <div className=""> */}
        {data ? (
          Object.entries(data).map(([key, value]) => (
            <p key={key} className="w-1/4 drop-shadow-sm md:text-2xl flex flex-col py-2 px-6 bg-gray-100 mt-2 rounded-lg font-mono text-gray-800 dark:text-white min-w-[250px] " >
              <strong
                className="mb-2 "
              >{key}</strong>{" "} {value}
            </p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
