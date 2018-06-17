import React from 'react'
import PropTypes from 'prop-types'

const Address = ({ onClick, address, path, balance }) => (
  <tr>
	  <td>{address}</td>
	  <td>{path}</td>
	  <td><button onClick={onClick(address)}>bal</button>{balance}</td>
  </tr>
)

Address.propTypes = {
  onClick: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default Address
