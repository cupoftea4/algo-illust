import { FormEventHandler } from 'react'

const SizeForm = ({onLengthSubmit}: {onLengthSubmit:  FormEventHandler<HTMLFormElement>}) => {
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
      <input type="submit" value="Run" title="Start sorting" />
    </form>
  )
}

export default SizeForm