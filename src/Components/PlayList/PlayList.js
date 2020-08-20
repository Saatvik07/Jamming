import React from "react";
import "./PlayList.css";
import { TrackList } from "../TrackList/TrackList";
export class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }
  render() {
    return (
      <div className='Playlist'>
        <div className='input-container'>
          <input value={this.props.name} onChange={this.handleNameChange} />
        </div>
        <div className='playlist-container'>
          <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} isRemoval={true} />
        </div>
        <div className='button-container'>
          <button className='Playlist-save' onClick={this.props.onSave}>
            SAVE TO SPOTIFY
          </button>
        </div>
      </div>
    );
  }
}
