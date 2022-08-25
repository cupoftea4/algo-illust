
import { SortArray } from '../types';
import styles from './Graph.module.scss';

const Graph = ({array, swaps } : {array: SortArray, swaps: number[]}) => {
  return (
    <div className={styles.illustration}>
      {array.length <= 40 ? array.map((item, index) =>
        <div key={index} 
            className={`${styles.arrayItem} ${swaps[0] === -1 && styles.sorted}`} 
            style={{ width: 100 / array.length + '%', height: 1 * parseInt(item.toString()) + '%' }}>
          <div
            className={`
              ${styles.rectangle} 
              ${swaps.includes(index) && styles.swapping} 
            `}
            style={swaps[0] === -1 ? { transitionDelay: `${index*0.07}s`, backgroundColor: "#33c267"}: {}}
            >
          </div>{item}
        </div>
      ) : null}
    </div>
  )
}

export default Graph;