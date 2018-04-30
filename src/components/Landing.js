import React from "react";
// Uncaught SyntaxError: Unexpected token < is the only error thats left. I spoke to a technical coach and he said I can probably get by with it. I nor he was able to resolve this error.
const Landing = () => (
  <section>
    <div className="col s2" />
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue darken-2 z-depth-3">
          <div className="card-content white-text">
            <h1>Turn the music up!</h1>
            <div className="card-image">
              <img
                src="https://res.cloudinary.com/bryano1993/image/upload/v1524205868/corey-blaz-5003-unsplash_mupacd.jpg"
                alt="Headphones"
              />
              <h2>Choose your music</h2>
              <p>
                The world is full of music; why should you have to listen to
                music that someone else chose?
              </p>

              <h2>Unlimited, streaming, ad-free</h2>
              <p>No arbitrary limits. No distractions.</p>

              <h2>Mobile enabled</h2>
              <p>
                Listen to your music on the go. This streaming service is
                available on all mobile platforms..
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
