import { Prompt } from "@/components/prompt";

export default function page() {
  return (
    <div className="relative h-screen p-8 pb-32 pl-72">
      <div>asd</div>
      <div className="fixed right-0 bottom-8 left-72 flex justify-center">
        <div className="w-full max-w-3xl px-6">
          <Prompt />
        </div>
      </div>
    </div>
  );
}
