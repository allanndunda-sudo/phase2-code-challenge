import { useState, useEffect } from "react";
import BotsDetails from "./components/BotsDetails";

function App() {
  const [bots, setBots] = useState([]);
  const [showBots, setShowBots] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);
  const [enlist, setEnlist] = useState({});

  // Fetch bots once when the app loads
  useEffect(() => {
    fetch("https://json-server-vercel-a6ea.vercel.app/bots")
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // Toggle bots section
  function handleShowBots() {
    setShowBots((prev) => !prev);
    setSelectedBot(null); // reset details when toggling
  }

  // Handle when a bot is clicked
  function handleBotSelect(bot) {
    setSelectedBot(bot);
  }

  // Handle going back to bots list
  function handleBack() {
    setSelectedBot(null);
  }

  // Toggle enlistment (join/remove)
  function handleToggleEnlist(botId) {
    setEnlist((prev) => ({
      ...prev,
      [botId]: !prev[botId],
    }));
  }

  // Delete bot (frontend + backend)
  function deleteBot(botId) {
    fetch(`https://json-server-vercel-a6ea.vercel.app/bots/${botId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete bot");
        setBots((prevBots) => prevBots.filter((bot) => bot.id !== botId));
        setSelectedBot(null);
      })
      .catch((error) => console.error("Delete error:", error));
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-sky-300 text-center p-4 shadow">
        <h1 className="text-3xl font-bold text-white">🤖 Bots Camp</h1>
      </header>

      {/* Intro Section */}
      <section className="flex flex-col items-center justify-center bg-white rounded shadow w-3/4 mx-auto p-6 mt-10">
        <h2 className="text-4xl font-black mb-4">Welcome to the Bots Army</h2>
        <p className="mb-4 text-center max-w-xl text-gray-700">
          Explore our bots collection. You can enlist them to your army, view their
          stats, or remove them completely from the database.
        </p>

        <button
          onClick={handleShowBots}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {showBots ? "Hide Bots Collection" : "Show Bots Collection"}
        </button>
      </section>

      {/* Bots Display Section */}
      {showBots && (
        <div className="mt-10">
          {!selectedBot ? (
            <BotsDetails bots={bots} onBotSelect={handleBotSelect} />
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded shadow w-2/4 mx-auto p-6 mt-10">
              <img
                src={selectedBot.avatar_url}
                alt={selectedBot.name}
                className="w-40 h-40 rounded-full mb-4 border"
              />
              <h2 className="text-3xl font-bold mb-2">{selectedBot.name}</h2>
              <p className="mb-1 font-semibold text-gray-600">
                Class: {selectedBot.bot_class}
              </p>
              <p className="mb-1 text-gray-700">Health: {selectedBot.health}</p>
              <p className="mb-1 text-gray-700">Damage: {selectedBot.damage}</p>
              <p className="mb-3 text-gray-700">Armor: {selectedBot.armor}</p>
              <p className="italic text-gray-500 mb-4">
                “{selectedBot.catchphrase}”
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Back
                </button>

                <button
                  onClick={() => handleToggleEnlist(selectedBot.id)}
                  className={`${
                    enlist[selectedBot.id]
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white px-4 py-2 rounded`}
                >
                  {enlist[selectedBot.id]
                    ? "Remove from Enlisted"
                    : "Add to Enlisted"}
                </button>

                <button
                  onClick={() => deleteBot(selectedBot.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete Bot
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
