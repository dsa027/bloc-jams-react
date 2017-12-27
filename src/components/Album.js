import React from 'react'
import PlayerBar from './PlayerBar'
import albumData from './../data/albums'
import { table } from './album.css'

class Album extends React.Component {
  constructor(props) {
    super(props)

    // find the album as contained in :slug
    const album = albumData.find (album => {
      return this.props.match.params.slug === album.slug
    })

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      currentTime: 0,
      duration: 0
    }

    // audioElement is the music player controller
    this.audioElement = document.createElement('audio')
    this.audioElement.src = album.songs[0].audioSrc
    this.volume = 0.8
  }

  play() {
    this.audioElement.play()
    this.setState({ isPlaying: true })
  }

  pause() {
    this.audioElement.pause()
    this.setState({ isPlaying: false })
  }

  // set new song via state
  setSong(song) {
    // tell our controller there's a new song
    this.audioElement.src = song.audioSrc
    // keep it in state
    this.setState({
      currentSong: song,
      isPlaying: false,
    })
  }

  // same song as what's currently playing?
  isSameSong(song) {
    if (!song) return false;

    return (this.state.currentSong === song)
  }

  // clicked on a song number/title/time, needs to play or pause
  handleSongClick(song) {
    if (this.isSameSong(song) && this.state.isPlaying) {
      this.pause();
    }
    else {
      if (! this.isSameSong(song)) {
        this.setSong(song)
      }
      this.play();
    }
  }

  // get the index of the currently playing song in the album.
  // used to tell previous or next song
  findCurrentSongIdx() {
    return this.state.album.songs.findIndex(song =>
      song === this.state.currentSong
    )
  }

  // executed on either prev or next click
  handlePrevNext({isPrev=false}) {
    // if not playing anthing, just return
    if (! this.state.isPlaying) return

    // index of song in album +/- 1 for next/prev
    let idx = this.findCurrentSongIdx() + (isPrev ? -1 : 1)

    // not a circular scroll. stop at top and bottom
    if (isPrev && idx < 0) return
    if (! isPrev && idx >= this.state.album.songs.length) return

    // new song
    const song = this.state.album.songs[idx]

    this.setSong(song)
    this.play()
  }

  handlePrevSongClick() {
    this.handlePrevNext({isPrev:true})
  }

  handleNextSongClick() {
    this.handlePrevNext({isPrev:false})
  }

  // this is done in order to show the correct play/pause ionicon
  // as done in css
  playPauseClass(song) {
    if (this.isSameSong(song)) {
      return (this.state.isPlaying ? ' playing' : ' paused')
    }

    return '';
  }

  // add event listeners for the song's currentTime and duration
  componentDidMount() {
    // need to save thise so that we can remove them when finished (avoid mem leak)
    this.audioListeners = {
      timeUpdate: (e) => this.setState({currentTime: this.audioElement.currentTime}),
      durationChange: (e) => this.setState({duration: this.audioElement.duration}),
      ended: (e) => this.setState({currentTime: 0, isPlaying: false})
    }
    this.audioElement.addEventListener('timeupdate', this.audioListeners.timeUpdate)
    this.audioElement.addEventListener('durationchange', this.audioListeners.durationChange)
    this.audioElement.addEventListener('ended', this.audioListeners.ended)
  }

  // remove event listeners to avoid memory leak
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.audioListeners.timeUpdate)
    this.audioElement.removeEventListener('durationchange', this.audioListeners.durationChange)
  }

  // when the song's time seekbar is changed, this gets called
  handleTimeChange(e) {
    // determine how many seconds the range's handle is at
    let newTime = e.target.value * this.audioElement.duration
    // change song's current time
    this.audioElement.currentTime = newTime
    // change state's current time for udpating range
    this.setState({currentTime: newTime})
  }

  // when the user changes the volume, in the player bar,
  //make sure audio gets changed
  handleVolumeChange(e) {
    let newVol = e.target.value
    this.audioElement.volume = newVol
    this.volume = newVol
  }

  render() {
    return (
      <section className='album'>
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt='album cover'/>
          <div className="album-details">
            <p>
              <span id="album-title">
                {this.state.album.title}
              </span>
              <span id='small'> by </span>
              <span id='artist'>
                {this.state.album.artist}
              </span>
            </p>
            <p id='release-info'>
              {this.state.album.releaseInfo}
            </p>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map ((song, index) => {
              return (
                <tr
                  className={'song' + this.playPauseClass(song)}
                  key={index} onClick={() => this.handleSongClick(song)}>
                  <td className='song-actions'>
                    <button>
                      <span className="song-number">{index + 1}</span>
                      <span className="ion-pause"></span>
                      <span className="ion-play"></span>
                    </button>
                  </td>
                  <td className='song-title'>{song.title}</td>
                  <td className='song-duration'>
                    {Math.floor(song.duration/60)}:{Math.floor(song.duration%60)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handleNextSongClick={() => this.handleNextSongClick()}
          handlePrevSongClick={() => this.handlePrevSongClick()}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          volume = {this.volume}
        />
      </section>
    )
  }
}

export default Album
