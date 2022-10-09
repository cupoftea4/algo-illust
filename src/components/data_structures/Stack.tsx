import { useEffect } from 'react';
import { DSArray } from '../../utils/types/ds.types';
import styles from './Stack.module.scss';

const Stack = ({arrayState}: {arrayState: [DSArray, (array: DSArray) => void]}) => {
  const [stack, setStack] = arrayState;

  useEffect(() => {
    setStack([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteElement = (index: number) => {
    const newStack = [...stack];
    newStack.splice(index, 1);
    setStack(newStack);
  }

  return (
    <div className={styles.stack}>
      {stack.map((value, index) => (
        <div data-value={value} key={index} 
          onClick={index === stack.length - 1 ? () => deleteElement(index) : () => {}}
        ></div>
      ))}
    </div>
  )
}

export default Stack;