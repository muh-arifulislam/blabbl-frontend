import React from "react";

type UserMessageProps = {
  name: string;
  avatar: string;
  time: string;
  content: string;
};

const UserMessage: React.FC<UserMessageProps> = ({
  name,
  avatar,
  time,
  content,
}) => {
  return (
    <div className="flex justify-end gap-4">
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-x-4">
          <h2 className="font-medium">{name}</h2>
          <p className="text-xs text-slate-800">{time}</p>
        </div>
        <div className="bg-blue-400 max-w-xl p-3 text-white rounded-b-md rounded-l-md">
          <p>{content}</p>
        </div>
      </div>
      <div>
        <img
          className="w-8 h-8 rounded-full overflow-hidden"
          src={avatar}
          alt={`${name}'s avatar`}
        />
      </div>
    </div>
  );
};

export default UserMessage;
