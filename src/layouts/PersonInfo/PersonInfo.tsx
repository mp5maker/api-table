import * as React from 'react';

import * as Moment from 'moment';

const PersonInfo = ({ selected }: any) => (
    <div className="selected">
        <span>
            Selected Item: &nbsp;
        </span>
        <span>
            { selected.selected.name } &nbsp;
        </span>
        <span>
            { selected.selected.designation } &nbsp;
        </span>
        <span>
            { Moment(selected.selected.joining_date.substring(0, 10)).format('MMMM Do YYYY') } &nbsp;
        </span>
        <span>
            { selected.selected.department }
        </span>
    </div>
)

export default PersonInfo
export { PersonInfo }