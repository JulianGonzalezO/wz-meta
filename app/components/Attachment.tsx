import './Attachment.css'

const Attachment = ({ attachment, slot }) => {
  const {
    name
  } = attachment || {}
  return (
    <div
      key={slot}
      style={{ gridArea: slot }}
      className="attachment"
      data-empty={!name}
    >
      <h5>{slot}</h5>
      {/* <svg viewBox={`0 0 ${slot === 'aftermarketParts' ? 500 : 260} 18`}>
        <text x="0" y="15">{build[slot]?.name?.toUpperCase()}</text>
      </svg> */}
      <span>{name?.toUpperCase()}</span>
    </div>
  )
}

export default Attachment