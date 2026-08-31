type EventIntroProps = {
  eventId: string;
  active: boolean;
};

const Petals = () => (
  <div className="event-intro-petals" aria-hidden="true">
    {Array.from({ length: 8 }).map((_, index) => (
      <span key={index} style={{ ["--petal-index" as string]: index }} />
    ))}
  </div>
);

function IntroGraphic({ eventId }: { eventId: string }) {
  switch (eventId) {
    case "mehandi":
      return (
        <div className="event-intro-hands" aria-hidden="true">
          <svg className="event-intro-hand event-intro-hand-left" viewBox="0 0 80 110">
            <path d="M48 104c-7-17-14-29-22-40-6-8-10-18-8-22 2-4 6-2 10 4l8 10-13-27c-2-5 4-8 7-3l12 23-9-29c-1-5 6-7 8-2l9 28-4-28c0-5 7-5 8 0l5 29 2-19c1-5 8-4 8 1l-1 31c0 16-5 29-10 44z" />
            <circle cx="47" cy="59" r="5" />
            <path d="M47 50v18M38 59h18" />
          </svg>
          <svg className="event-intro-hand event-intro-hand-right" viewBox="0 0 80 110">
            <path d="M48 104c-7-17-14-29-22-40-6-8-10-18-8-22 2-4 6-2 10 4l8 10-13-27c-2-5 4-8 7-3l12 23-9-29c-1-5 6-7 8-2l9 28-4-28c0-5 7-5 8 0l5 29 2-19c1-5 8-4 8 1l-1 31c0 16-5 29-10 44z" />
            <circle cx="47" cy="59" r="5" />
            <path d="M47 50v18M38 59h18" />
          </svg>
        </div>
      );
    case "engagement-sangeet":
      return (
        <svg className="event-intro-ring" viewBox="0 0 240 240" aria-hidden="true">
          <circle cx="120" cy="132" r="70" />
          <path d="M81 73l39-48 39 48-39 23zM99 50h42M120 25v71" />
          <circle cx="120" cy="132" r="57" opacity=".35" />
        </svg>
      );
    case "masquerade":
      return (
        <svg className="event-intro-mask" viewBox="0 0 280 150" aria-hidden="true">
          <path d="M18 42c52-23 192-23 244 0-4 65-40 92-78 80-20-6-35-24-44-43-9 19-24 37-44 43-38 12-74-15-78-80z" />
          <path d="M53 54c21-10 48-7 64 7-20 20-47 22-64-7zM227 54c-21-10-48-7-64 7 20 20 47 22 64-7zM140 11v41" />
          <path d="M33 35l-12-18 25 8 11-19 8 22M247 35l12-18-25 8-11-19-8 22" />
        </svg>
      );
    case "haldi":
      return <Petals />;
    case "baarat":
      return (
        <svg className="event-intro-dhol" viewBox="0 0 260 180" aria-hidden="true">
          <path d="M57 39c38-17 108-17 146 0v102c-38 17-108 17-146 0z" />
          <ellipse cx="57" cy="90" rx="27" ry="51" />
          <ellipse cx="203" cy="90" rx="27" ry="51" />
          <path d="M82 38l42 106M124 36l42 108M166 38l-42 106M82 142l84-104M25 29l44 53M235 29l-44 53" />
        </svg>
      );
    case "varmala":
      return (
        <svg className="event-intro-garland" viewBox="0 0 300 190" aria-hidden="true">
          <path d="M35 20c3 81 42 137 115 150 73-13 112-69 115-150" />
          {[[45,55],[61,88],[85,120],[116,148],[150,165],[184,148],[215,120],[239,88],[255,55]].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}><circle r="13" /><circle r="5" /></g>
          ))}
        </svg>
      );
    case "fera":
      return (
        <div className="event-intro-diya" aria-hidden="true">
          <svg viewBox="0 0 180 210">
            <path className="event-intro-flame" d="M90 97c-27-3-38-22-31-43 5-15 20-24 19-45 21 11 28 29 25 43 8-5 12-12 13-21 20 16 25 37 13 52-9 11-21 15-39 14z" />
            <path d="M31 110c14 5 104 5 118 0-5 49-31 75-59 75s-54-26-59-75zM20 185h140" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export function EventIntro({ eventId, active }: EventIntroProps) {
  return (
    <div className={`event-intro event-intro-${eventId} ${active ? "is-active" : ""}`}>
      <IntroGraphic eventId={eventId} />
    </div>
  );
}