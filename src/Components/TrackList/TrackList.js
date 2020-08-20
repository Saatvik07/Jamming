import React from "react";
import "./TrackList.css";
import Carousel from "react-bootstrap/Carousel";
import { Track } from "../Track/Track";
export class TrackList extends React.Component {
  render() {
    return (
      <div className='TrackList'>
        <Carousel>
          {this.props.tracks.map((track) => {
            return (
              <Carousel.Item>
                <Track
                  track={track}
                  key={track.id}
                  onAdd={this.props.onAdd}
                  onRemove={this.props.onRemove}
                  isRemoval={this.props.isRemoval}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    );
  }
}
