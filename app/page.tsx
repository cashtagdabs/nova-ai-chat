import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <>
      {/* Ambient gradient backdrop */}
      <div className="nova-aurora" aria-hidden="true" />
      <Chat />
    </>
  );
}
