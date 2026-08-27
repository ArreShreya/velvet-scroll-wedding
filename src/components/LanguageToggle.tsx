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
          className={`rounded-full px-2.5 py-1 font-sans text-[0.6rem] tracking-[0.16em] transition-colors duration-200 md:text-[0.65rem] ${
            lang === l.code
              ? "bg-rose text-rose-deep"
              : "text-ink/65 hover:text-rose-deep"
          }`}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
