import * as React from 'react'
export type Props = {
  furigana: string;
  spacing: { kanji: string; furigana: string };
  styles: any;
  kanji: string;
  opacity: number;
}

export class Kanji extends React.Component<Props> {
  render() {
    const { styles, spacing, kanji, furigana, opacity } = this.props;
    const componentClass = `kanji-soshi ${styles.kanjiWrapper}`;
    const furiganaClassNames = `furigana-tag ${styles.furigana}`;
    const kanjiClassNames = `kanji-tag ${styles.kanji}`;
    return (
      <span className={componentClass} style={{ padding: spacing.kanji }}>
        <sup style={{ left: spacing.furigana, opacity: opacity }} className={furiganaClassNames}>{furigana}</sup>
        <span className={kanjiClassNames}>{kanji}</span>
      </span>
    )
  }
}
