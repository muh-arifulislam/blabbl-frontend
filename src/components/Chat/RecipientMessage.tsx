import React from "react";

type RecipientMessageProps = {
  name: string;
  avatar: string;
  time: string;
  content: string;
};

const RecipientMessage: React.FC<RecipientMessageProps> = ({
  name,
  avatar,
  time,
  content,
}) => {
  return (
    <div className="flex gap-x-4 items-start">
      <div>
        <img
          className="w-8 h-8 rounded-full overflow-hidden"
          src={avatar}
          alt={`${name}'s avatar`}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-x-4">
          <h2 className="font-medium text-slate-800">{name}</h2>
          <p className="text-xs text-slate-900">{time}</p>
        </div>
        <div className="bg-white p-3 rounded-b-md rounded-r-md shadow max-w-xl">
          {content}
        </div>
      </div>
    </div>
  );
};

export default RecipientMessage;
