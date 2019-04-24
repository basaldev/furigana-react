/**
 * @class ExampleComponent
 */

import * as React from 'react'
import nihongo from 'nihongo';
import styles from './styles.css'

export type Props = {
  furigana: string;
  children: any;
}
export type defaultState = {
  foundKanji: Array<any>,
  furigana: string;
  renderedString: any
}
export type MatchedKanji = Array<{
  kanji: string,
  furigana: string
}>

export type ParsedKanji = {
  foundKanji: any, furigana: string[]
}

export default class Furigana extends React.Component<Props> {
  state: defaultState;
  props: Props;
  constructor(props:Props){
    super(props);
    this.state = {
      furigana: '',
      foundKanji: [],
      renderedString: null
    }
  }
  isText(text: string){
    return typeof text === 'string';
  }
  buildFuri(){
    const parsed = this.parseChild();
    const matched = this.matchKanji(parsed);
    const cutChildren = this.cutChildren(matched);
    const renderString = this.buildRender(cutChildren, matched);
    return renderString;
  }
  parseChild() {
    const { children } = this.props;
    if(this.isText(children)){
      return {
        foundKanji: nihongo.parseKanjiCompounds(children),
        furigana: this.props.furigana.split(':')
      }
    } else {
      console.error('only text for now');
      return {
        foundKanji: [],
        furigana: []
      };
    }
  }
  matchKanji(parsed: ParsedKanji){
    const { foundKanji, furigana } = parsed;
    return foundKanji.map((kanji:string, i:number) => {
      //TODO add kanji length here
      return { kanji, furigana: furigana[i] }
    })
  }
  cutChildren(matchedKanji: MatchedKanji){
    const text = this.props.children;
    return matchedKanji.map((item) => {
      const beforeChar = text.split(item.kanji)[0];
      const length = nihongo.parseKanji(item.kanji).length;
      return beforeChar.substr(length);
    })
  }
  buildRender(cutChildren: string[], matchedKanji: MatchedKanji){
    return (<>{matchedKanji.map((item, i) => {
      debugger
      return (<><span className="kanji">
        <sup>{item.furigana}</sup>
        <span>{item.kanji}</span>
      </span><span>{cutChildren[i]}</span></>)
    })}</>)
  }
  componentWillMount(){

  }
  render() {
    return (
      <span className={styles.test}>
        {this.buildFuri()}
      </span>
    )
  }
}
