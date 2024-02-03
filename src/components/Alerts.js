import React from 'react'

const Alerts = (props) => {
  return (
    <div class="alert alert-primary" role="alert">
        {props.message}
    </div>
  )
}

export default Alerts;
