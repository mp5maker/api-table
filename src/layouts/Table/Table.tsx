import * as React from 'react';

import { connect } from "react-redux";

// @ts-ignore
import { GetSelectedItem } from 'Actions/SelectedAction';

// @ts-ignore
import { DateTimeConversion } from "Utilities/DateTimeConversion/DateTimeConversion"

// @ts-ignore
import { Capitalize } from "Utilities/Capitalize/Capitalize";

interface TablePropsInterface {
    tableHead: Array<string>,
    tableData: Array<any>,
    GetSelectedItem: (params: any) => void
}

interface TableStateInterface {
    selected: any
}

class Table extends React.Component<TablePropsInterface, TableStateInterface> {
    constructor(props: TablePropsInterface) {
        super(props)
        this.state = {
            selected: {}
        }
        this.onClickTableRow = this.onClickTableRow.bind(this);
        this.onDblClickOutsideTable = this.onDblClickOutsideTable.bind(this);
    }

    onClickTableRow({event, selected}: any): void {
        this.props.GetSelectedItem({selected})
        localStorage.setItem('selected', JSON.stringify(selected))
        this.setState({ selected })
    }

    onDblClickOutsideTable(event: any) {
        if (event.target.closest('.navbar')) {
            this.props.GetSelectedItem({ selected: "" })
            localStorage.setItem('selected', JSON.stringify({}))
            this.setState({ selected: {}})
        }
    }

    componentDidMount() {
        const previouslySelectedItem = localStorage.getItem('selected')
        if (previouslySelectedItem) {
            this.setState({ selected: JSON.parse(previouslySelectedItem) })
            this.props.GetSelectedItem({ selected: JSON.parse(previouslySelectedItem) })
        }
        window.addEventListener('dblclick', this.onDblClickOutsideTable)
    }

    componentWillUnmount() {
        window.removeEventListener('dblclick', this.onDblClickOutsideTable)
    }

    render() {
        const { selected } = this.state;
        const { tableHead, tableData } = this.props;
        const tableHeadReadableName = tableHead.map((tableHead) => Capitalize(tableHead));
        const hasSelectedItem = Object.keys(selected).length > 0 ? true : false;
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
                            tableData.map((perRow) => {
                                return (
                                    <tr
                                        onClick={(event) => this.onClickTableRow({event, selected: perRow})}
                                        key={perRow.id}
                                        className={`table-data-${perRow.id} ${selected.id == perRow.id && hasSelectedItem ? 'active' : ''}`}>
                                        {
                                            Object.keys(perRow).map((perColumn, perColumnKey) => (
                                                <td key={perColumnKey} className={`${perColumn}`}>
                                                    { DateTimeConversion(perRow[perColumn]) }
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

const mapStateToProps = ({ selected }: any) => {
    return {
        selected: selected
    }
}

const mapDispatchToProps = { GetSelectedItem }

export default connect(mapStateToProps, mapDispatchToProps)(Table)
export { Table }