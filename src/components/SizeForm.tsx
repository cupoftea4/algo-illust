import { FormEventHandler } from 'react';
import './Form.module.scss';

const SizeForm = ({onLengthSubmit}: {onLengthSubmit:  FormEventHandler<HTMLFormElement>}) => {
  // TODO: make function to extract number from input
  return (
    <form onSubmit={onLengthSubmit}>
      <span>
        <label htmlFor="arrayLength">Array Length:</label>
        <input
          name="arrayLength"
          placeholder="length"
          type={"number"}
          defaultValue="10"
          min={2}
        />
      </span>
      <input type="submit" value="Run" title="Start" />
    </form>
  )
}

export default SizeForm;