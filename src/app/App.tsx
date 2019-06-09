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
import Table from 'Layouts/Table/Table';

import "./App.scss";

interface AppPropsInterface {
    GetPostAction: (params: any) => void,
    posts: any,
    selected: any,
    history: any,
    match: any
}

interface AppStateInterface {
    posts: Array<any>,
    pageSize: number,
    currentPage: number,
}

class App extends React.Component<AppPropsInterface, AppStateInterface> {
    constructor(props: AppPropsInterface) {
        super(props)
        this.state = {
            posts: [],
            pageSize: 20,
            currentPage: 1,
        }
        this.onClickPagination = this.onClickPagination.bind(this)
    }

    onClickPagination({event, page}: any) {
        const { pageSize } = this.state;
        const params = { _page: page, _limit: pageSize };
        this.props.GetPostAction(params);
        this.setState({ currentPage: page });
        this.props.history.push(`/${page}`);
    }

    componentDidMount() {
        const { pageSize, currentPage } = this.state
        const { page } = this.props.match.params
        const params = { _page: page ? page : currentPage, _limit: pageSize }
        this.props.GetPostAction(params)
    }

    render() {
        const { posts, selected } = this.props
        const { loading } = posts
        const tableHead = this.props.posts ? this.props.posts.data ? this.props.posts.data.data ? Object.keys(this.props.posts.data.data[0]) : [] : [] : [];
        const tableData = this.props.posts ? this.props.posts.data ? this.props.posts.data.data ? this.props.posts.data.data : [] : [] : [];
        const hasSelectedItem = Object.keys(selected.selected).length > 0 ? true : false;
        const { data } = posts
        const hasData = Object.keys(data).length > 0 ? true : false;
        const { previous, next, previous_page_number, next_page_number, current, total, count } = data

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
                                    <ul className="pagination">
                                        {
                                            previous && hasData ?
                                            <li className="page-item" onClick={(event) => this.onClickPagination({ event, page: previous_page_number })}>
                                                <a className="page-link">
                                                    Previous
                                                </a>
                                            </li> :
                                            <li className="page-item disabled">
                                                <a className="page-link">
                                                    Previous
                                                </a>
                                            </li>
                                        }
                                        {
                                            [current, current+1, current+2].map((perPage, index) => (
                                                <li className={`page-item ${index == 0 ? "active" : "" }`}
                                                    key={index}
                                                    onClick={(event) => this.onClickPagination({ event, page: perPage })}>
                                                    <a className="page-link">
                                                        { perPage }
                                                    </a>
                                                </li>
                                            ))
                                        }
                                        {
                                            next && hasData ?
                                            <li className="page-item" onClick={(event) => this.onClickPagination({ event, page: next_page_number })}>
                                                <a className="page-link">
                                                    Next
                                                </a>
                                            </li> : <React.Fragment></React.Fragment>
                                        }
                                        <li className="page-item">
                                            <a className="page-link">
                                                { count } / { total }
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
                                    tableData.length > 0 ? <Table tableHead={tableHead} tableData={tableData} /> : <Loading />
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

const mapStateToProps = ({ posts, selected }: any) => {
    return {
        posts: posts,
        selected: selected
    }
}

const mapDispatchToProps = { GetPostAction }

export default connect(mapStateToProps, mapDispatchToProps)(App)
export { App }