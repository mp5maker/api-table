import * as React from 'react';

// @ts-ignore
import { Capitalize } from "Utilities/Capitalize";

interface TablePropsInterface {
    tableHead: Array<string>,
    tableData: Array<any>,
}

interface TableStateInterface {}

class Table extends React.Component<TablePropsInterface, TableStateInterface> {
    constructor(props: TablePropsInterface) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { tableHead, tableData } = this.props
        const tableHeadReadableName = tableHead.map((tableHead) => Capitalize(tableHead));
        console.log(tableData)
        return (
            <React.Fragment>
                <table className="table hover">
                    <thead>
                        <tr>
                            {
                                tableHead.map((perTableHead, index) => (
                                    <th key={index}>
                                        { tableHeadReadableName[index] }
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((perRow, perRowKey) => {
                                return (
                                    <tr key={perRowKey}>
                                        {
                                            Object.keys(perRow).map((perColumn, perColumnKey) => (
                                                <td key={perColumnKey}>
                                                    { perRow[perColumn] }
                                                </td>
                                            ))
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default Table
export { Table }