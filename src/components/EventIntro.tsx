import masqueradeImage from "../assets/masquerade.png";
import baraatImage from "../assets/Baraat.png";
import handLeftImage from "../assets/mehandi_left.png";
import handRightImage from "../assets/mehandi right.png";
import ringImage from "../assets/ring.png";
import ferasImage from "../assets/Feras.png";
import garlandsImage from "../assets/Garlands.png";

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
          <img className="event-intro-hand event-intro-hand-left" src={handLeftImage} alt="" />
          <img className="event-intro-hand event-intro-hand-right" src={handRightImage} alt="" />
        </div>
      );
    case "engagement-sangeet":
      return <img className="event-intro-ring" src={ringImage} alt="" aria-hidden="true" />;
    case "masquerade":
      return (
        <img className="event-intro-art event-intro-mask" src={masqueradeImage} alt="" aria-hidden="true" />
      );
    case "haldi":
      return <Petals />;
    case "baarat":
      return (
        <img className="event-intro-art event-intro-dhol" src={baraatImage} alt="" aria-hidden="true" />
      );
    case "varmala":
      return <img className="event-intro-art event-intro-garlands" src={garlandsImage} alt="" aria-hidden="true" />;
    case "fera":
      return <img className="event-intro-art event-intro-feras" src={ferasImage} alt="" aria-hidden="true" />;
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