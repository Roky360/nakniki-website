import {Component} from "react";
import {Container} from "react-bootstrap";

import '../services/RequestSender'
import {sendGet} from "../services/RequestSender";

class AdminManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    async componentDidMount() {
        // load movies

    }

    loadMovies = async () => {
        const res = await sendGet('/movies', '', {'user_id': '677120d6efa94199a55e101a'}).catch((err) => {
            console.log(err)
        })
        console.log(res
        );
    }

    loadCategories = async () => {
        const res = await sendGet('/categories', '', {'user_id': '677120d6efa94199a55e101a'})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
                throw Error("");
            })
            .catch((err) => {
            return "";
        });
    }

    render() {
        return (
            <div>
                <p className="title-1 center">Admin Panel</p>
                <div className="center" >
                    <button className="btn-main" onClick={this.loadMovies}>Create movie</button>
                    <span className="m-4"/>
                    <button className="btn-main">Create category</button>
                </div>

                <div>

                </div>
            </div>
        );
    }
}

export default AdminManagement;
