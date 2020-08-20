import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { PlayList } from "../PlayList/PlayList.js";
import { Spotify } from "../../util/Spotify";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistname = this.updatePlaylistname.bind(this);
  }
  addTrack(track) {
    let Present = 0;
    this.state.playlistTracks.forEach((track_pl) => {
      if (track.id === track_pl.id) {
        Present = 1;
      }
    });
    if (!Present) {
      const arr = this.state.playlistTracks;
      arr.push(track);
      this.setState({ playlistTracks: arr });
    }
  }
  removeTrack(track) {
    let arr = this.state.playlistTracks.filter((track_pl) => {
      return track_pl.id !== track.id;
    });
    this.setState({ playlistTracks: arr });
  }
  updatePlaylistname(name) {
    this.setState({ playlistName: name });
  }
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map((track) => {
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: "New Playlist", playlistTracks: [] });
    });
  }
  search(searchTerm) {
    Spotify.search(searchTerm).then((s) => {
      this.setState({ searchResults: s });
    });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-container'>
            <div className='App-searchRes'>
              <SearchResults searchRes={this.state.searchResults} onAdd={this.addTrack} />
            </div>
            <div className='App-playlist'>
              <PlayList
                name={this.state.playlistName}
                tracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistname}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </div>
        <footer>
          Creator: <span>Saatvik Bhatnagar</span>
        </footer>
      </div>
    );
  }
}

export default App;
