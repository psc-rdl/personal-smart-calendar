import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google API Client ID
const API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your Google API Key
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsSignedIn(true);
    });
  };

  const addEventToCalendar = async () => {
    if (!isSignedIn) {
      alert("Please sign in first!");
      return;
    }

    const event = {
      summary: "testtask",
      start: {
        dateTime: new Date().toISOString().split("T")[0] + "T13:00:00",
        timeZone: "America/New_York",
      },
      end: {
        dateTime: new Date().toISOString().split("T")[0] + "T15:00:00",
        timeZone: "America/New_York",
      },
    };

    try {
      await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {!isSignedIn ? (
        <button
          onClick={handleAuthClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Sign in with Google
        </button>
      ) : (
        <button
          onClick={addEventToCalendar}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg text-2xl font-bold hover:bg-gray-400 transition"
        >
          +
        </button>
      )}
    </div>
  );
};

export default App;
