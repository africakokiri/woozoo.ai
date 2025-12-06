import { Button } from "@/ui/button";

import { ThreadPrimitive } from "@assistant-ui/react";
import { type FC } from "react";

export const ThreadWelcome: FC = () => {
  return (
    <div
      className="aui-thread-welcome-root mx-auto my-auto flex w-full max-w-(--thread-max-width) grow
flex-col"
    >
      <div className="aui-thread-welcome-center flex w-full grow flex-col items-center justify-center">
        <div className="aui-thread-welcome-message flex size-full flex-col justify-center px-8">
          <div
            className="aui-thread-welcome-message-inner fade-in slide-in-from-bottom-2 animate-in
text-2xl font-semibold duration-300 ease-out"
          >
            Hello there!
          </div>
          <div
            className="aui-thread-welcome-message-inner fade-in slide-in-from-bottom-2 animate-in
text-muted-foreground/65 text-2xl delay-100 duration-300 ease-out"
          >
            How can I help you today?
          </div>
        </div>
      </div>
      <ThreadSuggestions />
    </div>
  );
};

const ThreadSuggestions: FC = () => {
  return (
    <div className="aui-thread-welcome-suggestions grid w-full gap-2 pb-4 @md:grid-cols-2">
      {[
        {
          title: "What's the weather",
          label: "in San Francisco?",
          action: "What's the weather in San Francisco?"
        },
        {
          title: "Explain React hooks",
          label: "like useState and useEffect",
          action: "Explain React hooks like useState and useEffect"
        }
      ].map((suggestedAction, index) => (
        <div
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className="aui-thread-welcome-suggestion-display fade-in slide-in-from-bottom-4 animate-in
fill-mode-both duration-300 ease-out nth-[n+3]:hidden @md:nth-[n+3]:block"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ThreadPrimitive.Suggestion
            prompt={suggestedAction.action}
            send
            asChild
          >
            <Button
              variant="ghost"
              className="aui-thread-welcome-suggestion dark:hover:bg-accent/60 h-auto w-full flex-1
flex-wrap items-start justify-start gap-1 rounded-3xl border px-5 py-4 text-left text-sm shadow-lg
@md:flex-col dark:shadow-neutral-800"
              aria-label={suggestedAction.action}
            >
              <span className="aui-thread-welcome-suggestion-text-1 font-medium">
                {suggestedAction.title}
              </span>
              <span className="aui-thread-welcome-suggestion-text-2 text-muted-foreground">
                {suggestedAction.label}
              </span>
            </Button>
          </ThreadPrimitive.Suggestion>
        </div>
      ))}
    </div>
  );
};
