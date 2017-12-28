import React, { Component } from 'react'
import './playerBar.css'

  class PlayerBar extends Component {
    formatSeconds(seconds) {
      if (! seconds) return "-:--"

      let min = Math.floor(seconds/60).toString()
      let sec = Math.floor(seconds%60).toString()

      if (min.length === 2 && min[0] === '0') min = min[1]
      if (sec.length === 1) sec = '0' + sec

      return min + ":" + sec
    }

    render() {
      return (
        <section className="player-bar">
          <section id="buttons">
            <button id="previous" onClick={this.props.handlePrevSongClick}>
              <span className="ion-skip-backward"></span>
            </button>
            <button id="play-pause" onClick={this.props.handleSongClick}>
              <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
            </button>
            <button id="next" onClick={this.props.handleNextSongClick}>
              <span className="ion-skip-forward"></span>
            </button>
          </section>
          <section id="time-control">
            <div className="current-time">
              {this.formatSeconds(this.props.currentTime)}
            </div>
            <input
              type="range"
              className="seek-bar"
              value={(this.props.currentTime / this.props.duration) || 0}
              min='0'
              max='1'
              step='0.01'
              onChange={this.props.handleTimeChange}/>
            <div className="total-time">
              {this.formatSeconds(this.props.duration)}
            </div>
          </section>
          <section id="volume-control">
            <div className="icon ion-volume-low"></div>
            <input
              type="range"
              className="seek-bar"
              value={this.props.volume}
              min='0'
              max='1'
              step='0.01'
              onChange={this.props.handleVolumeChange}/>
            <div className="icon ion-volume-high"></div>
          </section>
        </section>
      )
    }
 }

 export default PlayerBar
