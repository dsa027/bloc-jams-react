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
        <h4>{'Song List'}</h4>
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
                  <td>{index+1}</td>
                  <td>{song.title}</td>
                  <td>{song.duration}</td>
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
