import {Component} from "react";

import '../services/RequestSender'
import {sendGet, sendPost} from "../services/RequestSender";
import axios from "axios";

class AdminManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            video: null,

        }
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

    onFileChange = (e) => {
        this.setState({video: e.target.files[0]});
    }

    handleUpload = async (e) => {
        e.preventDefault();
        if (!this.state.video) {
            alert('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('video', this.state.video);

        try {
            const response = await sendPost('/uploads', '', {
                'user_id': '677120d6efa94199a55e101a',
                // 'Content-Type': 'multipart/form-data'
            }, formData);
            alert(response.data.message);
        } catch (err) {
            alert('Error uploading video: ' + err.message);
        }
    }

    render() {
        return (
            <div>
                <p className="title-1 center">Admin Panel</p>
                <div className="center">
                    <button className="btn-main" onClick={this.loadMovies}>Create movie</button>
                    <span className="m-4"/>
                    <button className="btn-main">Create category</button>
                </div>

                <div>
                    <form onSubmit={this.handleUpload}>
                        <input type="file" accept="video/*" onChange={this.onFileChange}/>
                        <button type="submit">Upload Video</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AdminManagement;
