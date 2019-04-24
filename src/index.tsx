/**
 * @class ExampleComponent
 */

import * as React from 'react'
import nihongo from 'nihongo';
import styles from './styles.css'
import { Kanji } from './kanji';

export type Props = {
  furigana: string;
  opacity: number;
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

function getSpacing(furigana: string){
  const marginMulti = furigana ? nihongo.parseHiragana(furigana).length: 0;
  const spacing = (marginMulti*5)/2;
  return {
    kanji: `0 ${spacing}px`,
    furigana: `0px` //TODO testing of spacing `-${spacing/marginMulti-1}px`
  }
}

export class Furigana extends React.Component<Props> {
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
    const cutChildren = this.cutChildren();
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
  cutChildren(){
    const kanjiList = nihongo.parseKanjiCompounds(this.props.children);
    let cleanText = this.props.children;
    kanjiList.map((kanji:string) => {
      return cleanText = cleanText.replace(kanji, '#|#');
    })
    return cleanText.split('#|#');
  }
  buildRender(cutChildren: string[], matchedKanji: MatchedKanji){

    return (<>{cutChildren.map((text, i) => {
      const item = matchedKanji[i];
      if(typeof item === 'undefined'){
        return <span key={text+i} >{text}</span>
      }
      const spacing = getSpacing(item.furigana);
      if(text === ""){
          return (
          <Kanji
            opacity={this.props.opacity}
            key={item.kanji+text+i}
            spacing={spacing}
            kanji={item.kanji}
            furigana={item.furigana}
            styles={styles}
          />)
        } else {
          return (<span
            key={item.kanji+text+i}
          >
            <span>{text}</span>
            <Kanji
              opacity={this.props.opacity}
              spacing={spacing}
              kanji={item.kanji}
              furigana={item.furigana}
              styles={styles}
          /></span>);
        }
    })}</>)
  }
  render() {
    return (
      <span className={styles.wrapper}>{this.buildFuri()}</span>
    )
  }
}
