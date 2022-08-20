import React from 'react'

const Graph = ({array, styles} : {array: number[], styles: any}) => {
  return (
    <>
    {array.length <= 40 ? array.map((item, index) =>
        <div key={index} className={styles.arrayItem} style={{ width: 100 / array.length + '%', height: 1 * item + '%' }}>
          <div
            className={styles.rectangle}>
          </div>{item}
        </div>
      ) : null}
    </>
  )
}

export default Graph;