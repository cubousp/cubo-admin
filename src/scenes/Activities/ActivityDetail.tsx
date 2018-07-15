import * as React from 'react'

const ActivityDetail = (props) => (
    <div>
        Detail
        {props.match.params.id}
    </div>
)

export default ActivityDetail