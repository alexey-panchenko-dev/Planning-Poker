import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";

interface ShareRoomButtonProps {
  inviteLink: string | null;
}

export const ShareRoomButton = ({ inviteLink }: ShareRoomButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!inviteLink) return null;

  const tokenMatch = inviteLink.match(/\/invite\/([^/?#]+)/);
  const roomCode = tokenMatch ? tokenMatch[1] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors text-sm font-medium border border-accent/20"
      >
        <Link2 size={16} />
        Поделиться
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-card-bg border border-font-muted/10 p-6 rounded-[24px] shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-font-muted hover:text-font-main transition-colors"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-6 text-font-main">
              Пригласить в комнату
            </h3>

            <div className="space-y-6">
              {roomCode && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-font-muted uppercase tracking-widest ml-1">
                    Код комнаты
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-main-bg border border-white/5 p-3 rounded-xl font-mono text-sm overflow-x-auto whitespace-nowrap scrollbar-hide text-font-main">
                      {roomCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="p-3 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors shrink-0"
                      title="Копировать код"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-font-muted ml-1">
                    Можно ввести на главной странице
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-font-muted uppercase tracking-widest ml-1">
                  Ссылка
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-main-bg border border-white/5 p-3 rounded-xl text-sm overflow-x-auto whitespace-nowrap scrollbar-hide text-font-muted">
                    {inviteLink}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="p-3 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors shrink-0"
                    title="Копировать ссылку"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 py-3 bg-main-bg border border-white/5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Готово
            </button>
          </div>
        </div>
      )}
    </>
  );
};
