import React, { Component } from 'react'

import ExampleComponent from 'furigana-react'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent furigana="わたし:だいす">
          私はクッキーが大好きです。
        </ExampleComponent>
      </div>
    )
  }
}
