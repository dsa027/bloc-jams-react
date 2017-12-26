import React from 'react'
import albumData from './../data/albums'
import { table } from './album.css'

class Album extends React.Component {
  constructor (props) {
    super (props)

    const thisAlbum = albumData.find (album => {
      return this.props.match.params.slug === album.slug
    })

    this.state = {
      album: thisAlbum
    }
  }

  render () {
    return (
      <section className='album'>
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt='album cover'/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
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
                <tr key={index}>
                  <td>
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
      </section>
    )
  }
}

export default Album
