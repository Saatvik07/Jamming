import React from "react";
import "./SearchResults.css";
import { TrackList } from "../TrackList/TrackList.js";
export class SearchResults extends React.Component {
  render() {
    if (this.props.searchRes.length === 0) {
      return (
        <div className='containerRes'>
          <div className='SearchResults'>
            <span className='default'>[No search results]</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className='containerRes'>
          <p className='res'>Search Results</p>
          <div className='SearchResults'>
            <TrackList tracks={this.props.searchRes} onAdd={this.props.onAdd} isRemoval={false} />
          </div>
        </div>
      );
    }
  }
}
