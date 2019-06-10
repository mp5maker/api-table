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

// @ts-ignore
import { isValidRoute } from "Utilities/Checker/Checker";

interface TablePropsInterface {
    tableHead: Array<string>,
    tableData: Array<any>,
    filter: any,
    selected: any,
    history: any,
    match: any,
    GetSelectedItem: (params: any) => void,
    FilterAction: (params: any) => void
}

interface TableStateInterface {
    selected: any,
    filtering: any,
}

const defaultFilterState = {
    id: "asc",
    name: "asc",
    designation: "asc",
    joining_date: "asc",
    department: "asc",
}

class Table extends React.Component<TablePropsInterface, TableStateInterface> {
    constructor(props: TablePropsInterface) {
        super(props)
        this.state = {
            selected: {},
            filtering: { ...defaultFilterState }
        }
        this.onClickTableRow = this.onClickTableRow.bind(this);
        this.onDblClickOutsideTable = this.onDblClickOutsideTable.bind(this);
        this.onClickSortOrder = this.onClickSortOrder.bind(this);
        this.performFiltering = this.performFiltering.bind(this);
    }

    performFiltering(type: string): void {
        const { filter } = this.props
        const { filtering } = this.state
        const { params } = this.props.match

        this.setState({
            filtering: {
                ...defaultFilterState,
                [type]: filtering[type] == 'asc' ? 'desc' : 'asc'
            }
        })
        this.props.FilterAction({
            ...filter,
            sort: type,
            order: filtering[type] == 'asc' ? 'desc' : 'asc'
        })
        const route = `/${type}/${filtering[type] == 'asc' ? 'desc' : 'asc'}/${isValidRoute({...params, check: 'page' }) ? params.page : 1}/`
        this.props.history.push(route)
    }

    onClickSortOrder({event, tableHeadName}: any) {
        switch(tableHeadName) {
            case ID:
                return this.performFiltering(ID)
            case NAME:
                return this.performFiltering(NAME)
            case DESIGNATION:
                return this.performFiltering(DESIGNATION)
            case JOINING_DATE:
                return this.performFiltering(JOINING_DATE)
            case DEPARTMENT:
                return this.performFiltering(DEPARTMENT)
            default: null
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
        const { sort, order } = this.props.match.params;
        const filtering = {
            id: (sort == ID) ? order : "asc",
            name: (sort == NAME) ? order : "asc",
            designation: (sort == DESIGNATION) ? order : "asc",
            joining_date: (sort == JOINING_DATE) ? order : "asc",
            department: (sort == DEPARTMENT) ? order : "asc",
        }
        if (previouslySelectedItem) {
            this.setState({ selected: JSON.parse(previouslySelectedItem), filtering })
            this.props.GetSelectedItem({ selected: JSON.parse(previouslySelectedItem) })
        }
        if (!previouslySelectedItem) this.setState({ ...this.state, filtering })
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
                                    <th key={index}>
                                        <span onClick={(event) => this.onClickSortOrder({ event, tableHeadName: tableHead[index] })}>
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
                                        </span>
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