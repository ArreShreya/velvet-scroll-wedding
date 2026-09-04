import { useLang } from "@/i18n/LanguageContext";
import { LANGS } from "@/i18n/translations";

export function LanguageToggle() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.languageLabel}
      className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-rose/60 bg-paper-tint p-0.5 shadow-[0_6px_18px_-12px_rgba(90,50,40,0.6)] backdrop-blur-sm"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.label}
          className={`press rounded-full px-2.5 py-1 font-body text-[0.6rem] md:text-[0.65rem] ${
            lang === l.code
              ? "bg-rose text-text-heading"
              : "text-text-secondary hover:text-text-heading"
          }`}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
