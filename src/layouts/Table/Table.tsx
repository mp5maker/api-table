import * as React from 'react';

import { connect } from "react-redux";

// @ts-ignore
import { FilterAction } from 'Actions/FilterAction';

// @ts-ignore
import { GetSelectedItem } from 'Actions/SelectedAction';

// @ts-ignore
import { DateTimeConversion } from "Utilities/DateTimeConversion/DateTimeConversion"

// @ts-ignore
import { Capitalize } from "Utilities/Capitalize/Capitalize";

// @ts-ignore
import { ID, NAME, DESIGNATION, JOINING_DATE, DEPARTMENT } from 'Constants/Constants';

interface TablePropsInterface {
    tableHead: Array<string>,
    tableData: Array<any>,
    filter: any,
    selected: any,
    GetSelectedItem: (params: any) => void,
    FilterAction: (params: any) => void
}

interface TableStateInterface {
    selected: any,
    filtering: any,
}

class Table extends React.Component<TablePropsInterface, TableStateInterface> {
    constructor(props: TablePropsInterface) {
        super(props)
        this.state = {
            selected: {},
            filtering: {
                id: "asc",
                name: "asc",
                designation: "asc",
                joining_date: "asc",
                department: "asc",
            }
        }
        this.onClickTableRow = this.onClickTableRow.bind(this);
        this.onDblClickOutsideTable = this.onDblClickOutsideTable.bind(this);
        this.onClickSortOrder = this.onClickSortOrder.bind(this);
    }

    onClickSortOrder({event, tableHeadName}: any) {
        const { filter } = this.props
        const { id, name, designation, joining_date, department } = this.state.filtering

        switch(tableHeadName) {
            case ID:
                if (id == 'asc') this.setState({ filtering: { ...this.state.filtering, id: 'desc'} })
                if (id == 'desc') this.setState({ filtering: { ...this.state.filtering, id: 'asc' } })
                return this.props.FilterAction({...filter, sort: ID, order: id == 'asc' ? 'desc' : 'asc' })
            case NAME:
                if (name == 'asc') this.setState({ filtering: { ...this.state.filtering, name: 'desc' }  })
                if (name == 'desc') this.setState({ filtering: { ...this.state.filtering, name: 'asc' }  })
                return this.props.FilterAction({...filter, sort: NAME, order: name == 'asc' ? 'desc' : 'asc' })
            case DESIGNATION:
                if (designation == 'asc') this.setState({ filtering: { ...this.state.filtering, designation: 'desc' } })
                if (designation == 'desc') this.setState({ filtering: { ...this.state.filtering, designation: 'asc' } })
                return this.props.FilterAction({ ...filter, sort: NAME, order: designation == 'asc' ? 'desc' : 'asc' })
            case JOINING_DATE:
                if (joining_date == 'asc') this.setState({ filtering: { ...this.state.filtering, joining_date: 'desc' } })
                if (joining_date == 'desc') this.setState({ filtering: { ...this.state.filtering, joining_date: 'asc' } })
                return this.props.FilterAction({ ...filter, sort: NAME, order: joining_date == 'asc' ? 'desc' : 'asc' })
            case DEPARTMENT:
                if (department == 'asc') this.setState({ filtering: { ...this.state.filtering, department: 'desc' } })
                if (department == 'desc') this.setState({ filtering: { ...this.state.filtering, department: 'asc' } })
                return this.props.FilterAction({ ...filter, sort: NAME, order: department == 'asc' ? 'desc' : 'asc' })
        }
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
        const { selected, filtering } = this.state;
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
                                    <th key={index} onClick={(event) => this.onClickSortOrder({ event, tableHeadName: tableHead[index] })}>
                                        { tableHeadReadableName[index] } &nbsp;
                                        {
                                            filtering[tableHead[index]] == 'asc' ?
                                            <small>
                                                <i className="fas fa-arrow-up"></i>
                                            </small> :
                                            <small>
                                                <i className="fas fa-arrow-down"></i>
                                            </small>
                                        }
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

const mapStateToProps = ({ selected, filter }: any) => {
    return {
        selected: selected,
        filter: filter
    }
}

const mapDispatchToProps = { GetSelectedItem, FilterAction }

export default connect(mapStateToProps, mapDispatchToProps)(Table)
export { Table }