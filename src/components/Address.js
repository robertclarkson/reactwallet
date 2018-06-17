import React from 'react'
import PropTypes from 'prop-types'

const Address = ({ onClick, text, path, balance }) => (
  <tr
    onClick={onClick}
  >
  <td>{text}</td>
  <td>{path}</td>
  <td>{balance}</td>
  </tr>
)

Address.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Address
