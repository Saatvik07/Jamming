import React from "react";
import "./Track.css";
import Card from "react-bootstrap/Card";
export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  renderAction() {
    if (this.props.isRemoval)
      return (
        <button className='Track-action' onClick={this.removeTrack}>
          -
        </button>
      );
    return (
      <button className='Track-action' onClick={this.addTrack}>
        +
      </button>
    );
  }
  render() {
    return (
      <Card style={{ width: "100%", backgroundColor: "black" }}>
        <Card.Img variant='top' src={this.props.track.image} />
        <Card.Body>
          <Card.Title>
            <div className='Track-name'>{this.props.track.name}</div>
          </Card.Title>
          <Card.Text>
            <div className='Track-container'>
              <div className='Track-info'>
                <div>
                  <span className='span'>Artist | </span> {this.props.track.artist}
                </div>
                <div>
                  <span className='span'>Album | </span>
                  {this.props.track.album}
                </div>
              </div>
              <div className='Track-button'>{this.renderAction()}</div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
