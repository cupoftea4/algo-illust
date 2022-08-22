import { useEffect } from 'react';
import styles from './Graph.module.scss';

const Graph = ({array, swaps } : {array: number[], swaps: number[]}) => {
  return (
    <div className={styles.illustration}>
      {array.length <= 40 ? array.map((item, index) =>
        <div key={index} 
            className={`${styles.arrayItem} ${swaps[0] === -1 && styles.sorted}`} 
            style={{ width: 100 / array.length + '%', height: 1 * item + '%' }}>
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