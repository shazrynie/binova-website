import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const STARTER_PROMPTS = [
  'How much does BINOVA save per 10,000 homes?',
  'What safety features prevent fires and child injury?',
  'Which modules are needed for 1,000 homes?',
  'Explain the 5-year innovation upgrades.',
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'model',
  text: 'Welcome to BINOVA. I can answer questions about our 6+1 underground system, RM pricing, township ROI, safety interlocks, and 5-year retrofit upgrades whenever our team is offline.',
};

export default function CustomerAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('./api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextHistory
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          'Live AI responses require the full-stack Node server. You can still browse specs, run the ROI estimator, or submit a proposal in the Procurement Bag.'
        );
      }

      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        throw new Error(data.error || 'Unable to get a response right now. Please try again.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply!,
        },
      ]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Network error while reaching the assistant.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendQuestion(input);
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    setErrorMsg('');
    setInput('');
  };

  return (
    <>
      {/* Compact Floating Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open BINOVA Customer Assistant"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-[#F2F5F3] bg-[#131A18] hover:bg-[#15803D] rounded-xl shadow-2xl border border-[#2D3E37] transition-colors duration-150 cursor-pointer whitespace-nowrap"
        >
          <MessageSquare className="w-4 h-4 shrink-0 text-[#86EFAC]" aria-hidden="true" />
          <span>Customer Assistant</span>
        </button>
      )}

      {/* Docked Assistant Panel */}
      {isOpen && (
        <section
          aria-label="BINOVA 24/7 Customer Assistant"
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[400px] z-50 bg-[#0D1311] border border-[#24302C] rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[82vh]"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#131A18] text-[#F2F5F3] flex items-center justify-between gap-3 border-b border-[#24302C]">
            <div>
              <h2 className="font-display text-sm font-bold text-[#F2F5F3] leading-tight">
                BINOVA Customer Assistant
              </h2>
              <p className="text-xs text-[#9FB0A8]">24/7 Product, Pricing &amp; ROI Support</p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleReset}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="w-8 h-8 rounded-lg bg-[#18211E] hover:bg-[#24302C] border border-[#24302C] text-[#F2F5F3] flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="w-8 h-8 rounded-lg bg-[#18211E] hover:bg-[#24302C] border border-[#24302C] text-[#F2F5F3] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#090D0C] min-h-[260px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#15803D] text-white'
                      : 'bg-[#131A18] text-[#F2F5F3] border border-[#24302C]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-2">
                <div className="text-xs font-medium text-[#9FB0A8]">Common customer questions:</div>
                <div className="flex flex-col gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendQuestion(prompt)}
                      className="text-left text-xs font-medium text-[#F2F5F3] bg-[#131A18] hover:bg-[#18211E] border border-[#24302C] rounded-lg px-3 py-2 transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#131A18] border border-[#24302C] rounded-xl px-3.5 py-2.5 text-xs text-[#9FB0A8]">
                  Checking BINOVA specifications...
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="p-3 text-xs text-red-200 bg-red-950/60 border border-red-800 rounded-lg"
              >
                {errorMsg}
              </div>
            )}

            <div ref={scrollEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#131A18] border-t border-[#24302C] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, chutes, ROI, or upgrades..."
              aria-label="Ask BINOVA Customer Assistant"
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-sm bg-[#18211E] border border-[#24302C] rounded-lg text-[#F2F5F3] placeholder:text-[#9FB0A8] focus:outline-none focus:border-[#4ADE80] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send question"
              className="w-10 h-10 rounded-lg bg-[#15803D] hover:bg-[#16A34A] disabled:bg-[#24302C] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
