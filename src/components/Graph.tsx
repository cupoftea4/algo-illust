import { HighlightedElements, SortArray } from '../types';
import styles from './Graph.module.scss';

const Graph = ({ array, swaps } : {array: SortArray, swaps: HighlightedElements}) => {
  const activeColor = "#33c267";
  return (
    <div className={styles.illustration}>
      {array.length <= 40 && !Array.isArray(array[0]) ? 
      array.map((item, index) =>
        <div key={index} 
            className={`${styles.arrayItem} ${swaps?.sorted && styles.sorted}`} 
            style={{ width: 100 / array.length + '%', height: ((typeof item === 'number') ? Math.abs(item) : 80).toString() + '%' }}>
          <div
            className={`
              ${styles.rectangle} 
              ${swaps?.green && swaps.green.includes(index) && styles.green} 
              ${swaps?.orange && swaps.orange.includes(index) && styles.orange}
            `}
            style={swaps?.sorted ? { transitionDelay: `${index*0.07}s`, backgroundColor: activeColor}: {}}
            >
          </div>{item}
        </div>
      ) : null}
    </div>
  )
}

export default Graph;