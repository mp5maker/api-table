import * as React from 'react';

interface TablePropsInterface {}

interface TableStateInterface {}

class Table extends React.Component<TablePropsInterface, TableStateInterface> {
    constructor(props: TablePropsInterface) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                Table
            </React.Fragment>
        )
    }
}

export default Table
export { Table }