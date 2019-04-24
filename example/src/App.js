import React, { Component } from 'react'

import { Furigana } from 'furigana-react'

export default class App extends Component {
  render () {
    return (
      <div>
        <Furigana furigana="わたし:だいす">
          私はクッキーが大好きです。
        </Furigana>
      </div>
    )
  }
}
