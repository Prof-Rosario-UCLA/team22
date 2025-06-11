import React from "react";

const Welcome: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500 mb-4 flex items-center justify-center font-bold text-white text-2xl">
        <img
          src="/logo.svg"
          alt="HobbyQuest Logo"
          className="h-8 w-8"
          aria-lablel="HobbyQuest Logo"
        />
      </div>
      <h2 className="text-3xl font-bold text-stone-900">HobbyQuest</h2>
      <p className="text-stone-600 mt-2 max-w-xs mx-auto">
        Discover your next passion and track your journey to mastery.
      </p>
    </header>
  );
};

export default Welcome;
