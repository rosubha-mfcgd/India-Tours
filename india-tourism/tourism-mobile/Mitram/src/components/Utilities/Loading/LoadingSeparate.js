import loadingSep from "../../../assets/images/loading-separate.gif"

const loadingSeparate = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <img src={loadingSep} alt='loading' />
    </div>
  )
}

export default loadingSeparate
