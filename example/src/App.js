import React, { Component } from 'react'

import { Furigana } from 'furigana-react'

export default class App extends Component {
  render () {
    return (
      <div>
        {/* hatsuon maybe better prob name */}
        <Furigana furigana="わたし:だいす">
          私はクッキーが大好きです。
        </Furigana>
        <Furigana furigana="わたし:だいす" opacity={0.4}>
          酵素とは、生体で起こる化学反応に対して触媒として機能する分子である。酵素によって触媒される反応を“酵素的”反応という。
        </Furigana>
      </div>
    )
  }
}
