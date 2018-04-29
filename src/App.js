import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import "./style/Landing.css";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav className="blue">
            <div className="nav-wrapper">
              <div className="container">
                <a className="brand-logo center">
                  <i className="font-size:50px material-icons">public</i>
                  <i className="font-size:50px material-icons">music_note</i>
                  <i className="font-size:50px material-icons">public</i>
                </a>
                <ul id="nav-mobile" className="right hide-on-small-and-down">
                  <li>
                    <Link to="/">Landing</Link>
                  </li>
                  <li>
                    <Link to="/library">Library</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <span className="fontSize DottedBox_content">Bloc </span>
          <span className="fontSize blue-text">Jams</span>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
