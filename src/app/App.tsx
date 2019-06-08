import * as React from "react";

import { connect } from 'react-redux';

// @ts-ignore
import { GetPostAction } from 'Actions/PostAction';

// @ts-ignore
import { Footer } from 'Layouts/Footer/Footer';

// @ts-ignore
import { Navbar } from 'Layouts/Navbar/Navbar';

// @ts-ignore
import { Table } from 'Layouts/Table/Table';

import "./App.scss"

interface AppPropsInterface {
    GetPostAction: (params: any) => void,
    posts: any
}

interface AppStateInterface {
    posts: Array<any>
}

class App extends React.Component<AppPropsInterface, AppStateInterface> {
    constructor(props: AppPropsInterface) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        // this.props.GetPostAction({})
    }

    render() {
        console.log(this.props.posts)
        return (
            <React.Fragment>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <Table />
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