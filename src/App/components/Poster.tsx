import { Link } from 'react-scroll';

function Poster() {
  return (
    <section className="poster">
      <div className="poster__wrapper">
        <h1 className="poster__heading heading">
          Test assignment for front-end developer
        </h1>
        <p className="poster__text">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they&apos;ll be building web interfaces with accessibility
          in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </p>
        <Link
          className="btn"
          to="sign-up"
          smooth
          offset={-140}
          duration={500}
        >
          Sign up
        </Link>
      </div>
    </section>
  );
}

export default Poster;
