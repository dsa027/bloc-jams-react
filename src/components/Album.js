import React from 'react'
import PlayerBar from './PlayerBar'
import albumData from './../data/albums'
import { table } from './album.css'

class Album extends React.Component {
  constructor(props) {
    super(props)

    const album = albumData.find (album => {
      return this.props.match.params.slug === album.slug
    })

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
    }

    this.audioElement = document.createElement('audio')
    this.audioElement.src = album.songs[0].audioSrc
  }

  play() {
    this.audioElement.play()
    this.setState({ isPlaying: true })
  }

  pause() {
    this.audioElement.pause()
    this.setState({ isPlaying: false })
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc
    this.setState({
      currentSong: song,
      isPlaying: false,
    })
  }

  isSameSong(song) {
    if (!song) return false;

    return (this.state.currentSong === song)
  }

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

  findCurrentSongIdx() {
    return this.state.album.songs.findIndex(song =>
      song === this.state.currentSong
    )
  }

  handleNextPrevClick(isPrev) {
    if (! this.state.isPlaying) return

    let idx = this.findCurrentSongIdx() + (isPrev ? -1 : 1)

    if (isPrev && idx < 0) return
    if (! isPrev && idx >= this.state.album.songs.length) return

    const song = this.state.album.songs[idx]

    this.setSong(song)
    this.play()
  }

  handlePrevSongClick() {
    this.handleNextPrevClick(true)
  }

  handleNextSongClick() {
    this.handleNextPrevClick(false)
  }

  playPauseClass(song) {
    if (this.isSameSong(song)) {
      return (this.state.isPlaying ? ' playing' : ' paused')
    }

    return '';
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
        />
      </section>
    )
  }
}

export default Album
