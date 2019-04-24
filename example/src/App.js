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
        <Furigana
          id="example2"
          furigana="こうそ:せいたい:お:かがくはんのう:たい:しょくばい:きのう:ぶんし:こうそ:しょくばい:はんのう:こうそてきはんのう"
          opacity={0.4}
          spacingUnit={5}
          >
          酵素とは、生体で起こる化学反応に対して触媒として機能する分子である。酵素によって触媒される反応を酵素的反応という。
        </Furigana>
      </div>
    )
  }
}
