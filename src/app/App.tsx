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
import { Table } from 'Layouts/Table/Table';

import "./App.scss"

interface AppPropsInterface {
    GetPostAction: (params: any) => void,
    posts: any
}

interface AppStateInterface {
    posts: Array<any>,
    pageSize: number,
    currentPage: number
}

class App extends React.Component<AppPropsInterface, AppStateInterface> {
    constructor(props: AppPropsInterface) {
        super(props)
        this.state = {
            posts: [],
            pageSize: 20,
            currentPage: 1,
        }
    }

    componentDidMount() {
        const { pageSize, currentPage } = this.state
        const params = { _page: currentPage, _limit: pageSize }
        this.props.GetPostAction(params)
    }

    render() {
        const { loading } = this.props.posts
        const tableHead = this.props.posts ? this.props.posts.data ? this.props.posts.data.data ? Object.keys(this.props.posts.data.data[0]) : [] : [] : [];
        const tableData = this.props.posts ? this.props.posts.data ? this.props.posts.data.data ? this.props.posts.data.data : [] : [] : [];
        console.log(this.props.posts)

        if (loading) return <Loading />
        return (
            <React.Fragment>
                <Navbar />
                <div className="container-fluid">
                    <div className="row my-4">
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

const mapStateToProps = ({ posts }: any) => {
    return {
        posts: posts
    }
}

const mapDispatchToProps = { GetPostAction }

export default connect(mapStateToProps, mapDispatchToProps)(App)
export { App }