---
title: Bloc-Jams-React
summary: A Web-based, SPA song player written in React
tech: React, Node.js, JavaScript, HTML/CSS, Ion Icons, Netlify, GitHub
---
[1]: https://bloc-jams-react.netlify.com/
[Heroku][1]

# Summary

  A music player written with React

# Explanation

  Streams, via HTML5 Audio, songs that are located on the site. The home page shows the navigation at the upper-center, Home and Library. The navigation appears on every page. The text on the home page has some CSS effects. Click on Library to go to the album library.

   There are two albums in the Library (navigation is in the upper-center). Click on an Album to see the songs.

   To choose a song, click on the song name or click on the next/previous buttons under the list of songs. A song must be playing for these buttons to work.

   To pause a song, click on the song's pause button, or the pause button at the bottom.

   You may track to a different place in the song by using the long seek bar.

   Adjust volume using the seek bar at the bottom right.

  Songs, Albums, and Artists may be searched for at the top-right of any page. Tap on one of the results in the dynamic list to visit the album.

  Add to a playlist, or create a new one, by selecting a song in the Album view. Playlists are viewed in the Playlist tab. This tab allows you to play a playlist, delete a playlist, and delete a song from a playlist.

  The application is generally broken down by
  - Landing: home page with navigation and marketing info
  + Library: this is where albums are kept.
  + Album: head into the Collection tab and choose from 12 albums.
  + PlayerBar: song controls: play, pause, seek, next, previous

# Problem

  This project was the third iteration of this application, the first was much simpler and done in jQuery and the second is a much more complex version written in Angular. This is the first application written in React.

# Solution
  This project shows the practical application of several technologies:
  - React: the entire application is written for React
  - Node.js
  - JavaScript
  - HTML/CSS
  - Ion Icons
  - Netlify
  - GitHub

# Results

  It'd be nice if this version did the same things as the more complex BlocJams-Angular.

# Conclusion
  ToDos
  - Make like BlocJams-Angular
  - Stream from other source
  - Database of songs
