type ParamsProps = {
    setIllustDelay: (delay: number) => void;
    setVariant: (variant: number) => void;
}

const Params = ({setIllustDelay, setVariant}: ParamsProps) => {
  return (
    <>
      <label htmlFor="illustSpeed">Speed:</label>
        <select
          name="illustSpeed"
          defaultValue={3600 / 9}
          title="Animation speed"
          onChange={(e) => setIllustDelay(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={3600 / (i + 2)}>{i + 1}</option>
          ))}
        </select>
        <label htmlFor="illustSpeed">Var:</label>
        <select
          name="variant"
          defaultValue={0}
          onChange={(e) => setVariant(parseInt(e.target.value))}
        >
          {Array.from({ length: 18 }, (_, i) => (
            <option key={i} value={i}>{i === 0 ? "rand" : i}</option>
          ))}
        </select>
    </>
  )
};

export default Params;