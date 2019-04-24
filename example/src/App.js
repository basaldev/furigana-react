import React, { Component } from 'react'

import { Furigana } from 'furigana-react'

export default class App extends Component {
  render () {
    return (
      <div>
        {/* hatsuon maybe better prob name */}
        <Furigana furigana="わたし:だいす:わたし:だいす:わたし:だいす:わたし:だいす">
          私はクッキーが大好きです。私はクッキーが大好きです。私はクッキーが大好きです。
        </Furigana>
      </div>
    )
  }
}
