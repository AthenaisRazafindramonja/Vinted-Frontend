import tear from "../img/tear.svg";

const Hero = () => {
  return (
    <div className="hero-bg">
      <img className="tear" src={tear} alt="tear" />
      <div className="hero-card">
        <div>
          <span>Prêts à faire du tri dans vos placards ?</span>
          <button>Commencer à vendre</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
