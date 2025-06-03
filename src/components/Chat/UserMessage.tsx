import { TMessage } from "@/types";
import formatChatAppTime from "@/utils/formatChatAppTime";
import React from "react";

type UserMessageProps = {
  data: TMessage;
  picture: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ data, picture }) => {
  return (
    <div>
      <div className="flex justify-end gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-end gap-x-4">
            <h2 className="font-medium">You</h2>
            <p className="text-xs text-slate-800">
              {formatChatAppTime(data.createdAt) ?? "00:00 PM"}
            </p>
          </div>
          <div className="bg-blue-400 max-w-xl p-3 text-white rounded-b-md rounded-l-md">
            <p>{data.content}</p>
          </div>
        </div>
        <div>
          <img
            className="w-8 h-8 rounded-full overflow-hidden"
            src={picture}
            alt={`user avatar`}
          />
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
