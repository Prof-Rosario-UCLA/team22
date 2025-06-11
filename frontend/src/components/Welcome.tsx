import React from "react";

const Welcome: React.FC = () => {
  return (
    <div className="text-center mb-6 border-b border-stone-200 pb-6">
      <h2 className="text-3xl font-bold text-stone-800">HobbyQuest</h2>
      <p className="text-stone-600 mt-2">
        It takes 10,000 hours to master a skill or hobby. What will be your next
        passion that you master?
      </p>
      <p className="text-stone-600 mt-2">
        Sign in to start tracking your hobbies and progress.
      </p>
    </div>
  );
};

export default Welcome;
