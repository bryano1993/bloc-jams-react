import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.5,
      isPlaying: false,
      revealPlay: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.addEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.addEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.min(
      this.state.album.songs.length - 1,
      currentIndex + 1
    );
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  formatTime(time) {
    if (isNaN(time) === true || time === undefined) {
      return "-:--";
    }
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    minutes = minutes.toString();
    if (seconds < 10) {
      seconds = Math.floor(seconds.toString());
      return minutes + ":0" + seconds;
    } else {
      seconds = Math.floor(seconds.toString());
      return minutes + ":" + seconds;
    }
  }

  render() {
    const play = this.state.revealPlay;
    return (
      <section>
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card blue darken-2 z-depth-3">
              <div className="card-content white-text">
                <section className="album">
                  <section id="album-info">
                    <img
                      id="album-cover-art"
                      src={this.state.album.albumCover}
                      alt="album cover"
                    />
                    <div className="album-details">
                      <h1 id="album-title">{this.state.album.title}</h1>
                      <h2 className="artist">{this.state.album.artist}</h2>
                      <div id="release-info">
                        {this.state.album.releaseInfo}
                      </div>
                    </div>
                  </section>
                </section>
              </div>
            </div>
          </div>
        </div>
        <table className="highlight centered">
          <tbody className="album">
            {this.state.album.songs.map((song, index) => (
              <tr className="song" key={index}>
                <td
                  className="song-actions"
                  onMouseOver={() =>
                    this.setState({ currentSong: null, revealPlay: true })
                  }
                >
                  {play ? (
                    <span
                      onClick={() => this.handleSongClick(song)}
                      onMouseEnter={() =>
                        this.setState({ currentSong: null, revealPlay: true })
                      }
                      onMouseLeave={() =>
                        this.setState({ currentSong: null, revealPlay: false })
                      }
                      className={
                        this.state.currentSong === song && this.state.isPlaying
                          ? "ion-pause"
                          : "ion-play"
                      }
                    />
                  ) : (
                    <span
                      onClick={() => this.handleSongClick(song)}
                      onMouseEnter={() =>
                        this.setState({ currentSong: null, play: true })
                      }
                      onMouseLeave={() =>
                        this.setState({ currentSong: null, play: true })
                      }
                    >
                      {index + 1}
                    </span>
                  )}
                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">
                  {this.formatTime(song.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          currentVolume={this.state.currentVolume}
          maxVolume={this.state.maxVolume}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={e => this.handleTimeChange(e)}
          handleVolumeChange={e => this.handleVolumeChange(e)}
          formatTime={time => this.formatTime(time)}
        />
      </section>
    );
  }
}
export default Album;
