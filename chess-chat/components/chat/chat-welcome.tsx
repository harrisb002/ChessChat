import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2s px-2 mb-2">
      {type === "channel" && (
        <div className="h-[36px] w-[36px] rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-6 w-6 text-blue-500" />
        </div>
      )}
      <p className="text-xl md:text-xl font-bold">
        {/* Only render Welcome when not in direct message  */}
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your epic conversation with ${name}`}
      </p>
    </div>
  );
};
