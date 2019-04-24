/**
 * @class ExampleComponent
 */

import * as React from 'react'
import nihongo from 'nihongo';
import styles from './styles.css'
import { Kanji } from './kanji';

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

function getSpacing(furigana: string){
  const marginMulti = nihongo.parseHiragana(furigana).length;
  const spacing = (marginMulti*5)/2;
  return {
    kanji: `0 ${spacing}px`,
    furigana: `-${spacing/marginMulti}px`
  }
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
    const cut = matchedKanji.map((item) => {
      const beforeChar = text.split(item.kanji)[0];
      const length = nihongo.parseKanji(item.kanji).length;
      return beforeChar.substr(length);
    })
    const lastKanji = matchedKanji[matchedKanji.length - 1].kanji;
    cut.push(this.props.children.split(lastKanji)[1]);
    return cut;
    //concat remaining string
  }
  buildRender(cutChildren: string[], matchedKanji: MatchedKanji){

    return (<>{cutChildren.map((text, i) => {
      const item = matchedKanji[i];
      if(typeof item === 'undefined'){
        return <span>{text}</span>
      }
      const spacing = getSpacing(item.furigana);
      if(text === ""){
          return (
          <Kanji
            spacing={spacing}
            kanji={item.kanji}
            furigana={item.furigana}
            styles={styles}
          />)
        } else {
          return (<>
            <span>{text}</span>
            <Kanji
              spacing={spacing}
              kanji={item.kanji}
              furigana={item.furigana}
              styles={styles}
          /></>);
        }
    })}</>)
  }
  componentWillMount(){

  }
  render() {
    return (
      <span className={styles.wrapper}>
        {this.buildFuri()}<br></br>
        {this.props.children}
      </span>
    )
  }
}
