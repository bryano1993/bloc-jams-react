import React, { Component } from "react";
import { Link } from "react-router-dom";
import albumData from "./../data/albums";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section>
        {this.state.albums.map((album, index) => (
          <Link to={`/album/${album.slug}`} key={index}>
            <div className="row">
              <div className="col s6 offset-s3">
                <div className="card blue darken-2 z-depth-3">
                  <div className="card-content white-text">
                    <img src={album.albumCover} alt={album.title} />
                    <div>{album.title}</div>
                    <div>{album.artist}</div>
                    <div>{album.songs.length} songs</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    );
  }
}

export default Library;
