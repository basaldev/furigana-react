import * as React from 'react'
export type Props = {
  furigana: string;
  spacing: { kanji: string; furigana: string };
  styles: any;
  kanji: string;
}

export class Kanji extends React.Component<Props> {
  render() {
    const { styles, spacing, kanji, furigana } = this.props;
    return (
      <span className={styles.kanjiWrapper} style={{ padding: spacing.kanji }}>
        <sup style={{ left: spacing.furigana }} className={styles.furigana}>{furigana}</sup>
        <span className={styles.kanjiWrapper}>{kanji}</span>
      </span>
    )
  }
}
