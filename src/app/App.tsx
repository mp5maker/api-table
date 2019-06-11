import * as React from "react";

import { connect } from 'react-redux';

// @ts-ignore
import { GetPostAction } from 'Actions/PostAction';

// @ts-ignore
import { Footer } from 'Layouts/Footer/Footer';

// @ts-ignore
import { Navbar } from 'Layouts/Navbar/Navbar';

// @ts-ignore
import { Loading } from 'Layouts/Loading/Loading';

// @ts-ignore
import { PersonInfo } from 'Layouts/PersonInfo/PersonInfo';

// @ts-ignore
import { isValidRoute } from "Utilities/Checker/Checker";

// @ts-ignore
import { ID } from "Constants/Constants";

// @ts-ignore
import Table from 'Layouts/Table/Table';

import "./App.scss";

interface AppPropsInterface {
    GetPostAction: (params: any) => void,
    FilterAction: (params: any) => void,
    filter: any,
    posts: any,
    selected: any,
    history: any,
    match: any,
}

interface AppStateInterface {
    posts: Array<any>,
    currentPage: number,
    showAll: boolean
}

class App extends React.Component<AppPropsInterface, AppStateInterface> {
    constructor(props: AppPropsInterface) {
        super(props)
        this.state = {
            posts: [],
            currentPage: 1,
            showAll: false
        }
        this.onClickPagination = this.onClickPagination.bind(this)
        this.onClickShowAll = this.onClickShowAll.bind(this)
    }

    onClickShowAll() {
        const { showAll } = this.state;
        if (!showAll) {
            this.props.GetPostAction({});
            this.props.history.push("/all/1/asc");
        }
        if (showAll) {
            const params = {
                _page: 1,
                _limit: 20,
                _sort: ID,
                _order: "asc"
            }
            this.props.GetPostAction(params);
        }
        this.setState({ showAll: !this.state.showAll })
    }

    onClickPagination({event, page}: any) {
        const { sort, order, pageSize } = this.props.filter
        const params = { _page: page, _limit: pageSize, _sort: sort, _order: order };
        this.props.GetPostAction(params);
        this.setState({ currentPage: page });
        this.props.history.push(`/${sort}/${order}/${page}/`);
    }

    componentDidMount() {
        const { currentPage } = this.state
        const { match } = this.props
        const { sort, order, pageSize } = this.props.filter
        const isAll = (match.path == "/all/:sort?/:order?");

        if (isAll) {
            this.props.history.push("/all/id/asc");
            this.props.GetPostAction({_sort: "id", _all: true, _order: "asc"});
            this.setState({ showAll: !this.state.showAll });
        }

        if (!isAll) {
            const params = {
                _page: isValidRoute({...match.params, check: 'page'}) ? match.params.page : currentPage,
                _limit: pageSize,
                _sort: isValidRoute({...match.params, check: 'sort'}) ? match.params.sort : sort,
                _order: isValidRoute({...match.params, check: 'order'}) ? match.params.order : order
            }
            this.props.GetPostAction(params)
        }
    }

    componentDidUpdate(prevProps: any) {
        const { path } = this.props.match;
        const isAll = (path == "/all/:sort?/:order?");

        if (prevProps.filter !== this.props.filter) {
            const { sort, order, pageSize } = this.props.filter
            const { page } = this.props.match.params

            if(isAll) {
                const params = {
                    _sort: sort,
                    _order: order,
                    _all: true
                }
                this.setState({ currentPage: page })
                this.props.GetPostAction(params)
            }

            if (!isAll) {
                const params = {
                    _page: page,
                    _limit: pageSize,
                    _sort: sort,
                    _order: order
                }
                this.setState({ currentPage: page })
                this.props.GetPostAction(params)
            }
        }
    }

    render() {
        const { posts, selected } = this.props
        const { pageSize } = this.props.filter
        const { loading, data } = posts
        const { showAll } = this.state

        const tableHead = this.props.posts ? this.props.posts.data ? this.props.posts.data.data ? Object.keys(this.props.posts.data.data[0]) : [] : [] : [];
        const tableData = this.props.posts ? this.props.posts.data ? this.props.posts.data.data ? this.props.posts.data.data : [] : [] : [];

        const hasSelectedItem = Object.keys(selected.selected).length > 0 ? true : false;
        const hasData = data ? Object.keys(data).length > 0 ? true : false: false;

        const { previous, next, previous_page_number, next_page_number, current, total, count } = data
        const maxPageNumber = Math.floor(total/pageSize)
        const pageNumberArray = current ? [current, current + 1, current + 2] : [1, 2, 3];


        if (loading) return <Loading />
        return (
            <React.Fragment>
                <Navbar />
                <div className="container-fluid">
                    <div className="row common-header-container">
                        <div className="col">
                            <div className="common-header">
                                <div className="selected-item">
                                    {
                                        hasSelectedItem ?
                                        <PersonInfo selected={selected}/>
                                        : <div>You did not select any item</div>
                                    }
                                </div>
                                <div className="pagination-container">
                                    <ul className={`pagination`}>
                                        {
                                            previous && hasData ?
                                            <li
                                                className={`page-item  ${showAll ? 'd-none' : ''}`}
                                                onClick={(event) => this.onClickPagination({ event, page: previous_page_number ? previous_page_number : 0 })}>
                                                <a className="page-link">
                                                    Previous
                                                </a>
                                            </li> :
                                            <li className={`page-item disabled ${showAll ? 'd-none' : ''}`}>
                                                <a className="page-link">
                                                    Previous
                                                </a>
                                            </li>
                                        }
                                        {
                                            pageNumberArray.map((perPage, index) => {
                                                {
                                                    return perPage > maxPageNumber ? <React.Fragment key={index}></React.Fragment>
                                                    :
                                                    <li
                                                        className={`page-item ${index == 0 ? "active" : ""} ${showAll ? 'd-none' : ''}`}
                                                        key={index}
                                                        onClick={(event) => this.onClickPagination({ event, page: perPage ? perPage : 0 })}>
                                                        <a className="page-link">
                                                            { perPage }
                                                        </a>
                                                    </li>
                                                }

                                            })
                                        }
                                        {
                                            next && hasData ?
                                            <li
                                                className={`page-item ${showAll ? 'd-none' : ''}`}
                                                onClick={(event) => this.onClickPagination({ event, page: next_page_number ? next_page_number : 0 })}>
                                                <a className="page-link">
                                                    Next
                                                </a>
                                            </li> : <React.Fragment></React.Fragment>
                                        }
                                        <li className="page-item" onClick={this.onClickShowAll}>
                                            <a className="page-link">
                                                {showAll ? 'Pagination' : 'Scrolling' }
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link">
                                                { count ? count > total ? total : count : 0 } / { total ? total : 0 }
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="table-container">
                                {
                                    tableData.length > 0 ? <Table tableHead={tableHead} tableData={tableData} {...this.props} /> : <Loading />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ posts, selected, filter }: any) => {
    return {
        posts: posts,
        selected: selected,
        filter: filter
    }
}

const mapDispatchToProps = { GetPostAction }

export default connect(mapStateToProps, mapDispatchToProps)(App)
export { App }