import styles from './Graph.module.scss';

const Graph = ({array} : {array: number[]}) => {
  return (
    <div className={styles.illustration}>
      {array.length <= 40 ? array.map((item, index) =>
        <div key={index} className={styles.arrayItem} style={{ width: 100 / array.length + '%', height: 1 * item + '%' }}>
          <div
            className={styles.rectangle}>
          </div>{item}
        </div>
      ) : null}
    </div>
  )
}

export default Graph;