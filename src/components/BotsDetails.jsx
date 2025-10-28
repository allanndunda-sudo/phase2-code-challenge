function BotsDetails({ bots, onBotSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6 px-6">
      {bots.map((bot) => (
        <div
          key={bot.id}
          onClick={() => onBotSelect(bot)}
          className="cursor-pointer bg-white border rounded-xl shadow-md hover:shadow-lg transition p-4 w-64 text-center"
        >
          <img
            src={bot.avatar_url}
            alt={bot.name}
            className="w-32 h-32 rounded-full mx-auto mb-3 border"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-1">{bot.name}</h3>
          <p className="text-sm text-gray-600">{bot.bot_class}</p>
          <div className="text-sm text-gray-700 mt-2">
            <p>❤️ Health: {bot.health}</p>
            <p>⚔️ Damage: {bot.damage}</p>
            <p>🛡 Armor: {bot.armor}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BotsDetails;
