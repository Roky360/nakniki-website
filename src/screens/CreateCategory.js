import {useRef, useState} from "react";
import {sendPatch, sendPost} from "../services/RequestSender";
import Alert from "../components/Alert";

/**
 * A form for creating/editing a category.
 * @param category Passed in edit mode, if not passed then this will be a creation form.
 * @returns {JSX.Element}
 * @constructor
 */
function CreateCategory(category) {
    const catExists = (Boolean)(category && category['promoted']);
    const catNameRef = useRef(null);
    const [promoted, setPromoted] = useState(catExists);
    // for showing alerts
    const [msg, setMsg] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const updateCat = async (name, promoted) => {
        sendPatch(`/categories/${category['_id']}`, '', {}, {name: name, promoted: promoted})
            .then((res) => {
                if (res.status === 204) {
                    // TODO: handle closing form
                    setSuccess(true);
                    setMsg("Category updated!");
                    setShowAlert(true);
                } else {
                    setSuccess(false);
                    setMsg(res.data.error);
                    setShowAlert(true);
                }
            }).catch((err) => {
            setSuccess(false);
            const errorMessage = err.response?.data?.errors || 'An unexpected error occurred';
            setMsg(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
            setShowAlert(true);
        })
    }

    const createCat = async (name, promoted) => {
        sendPost('/categories', '', {}, {name: name, promoted: promoted})
            .then((res) => {
                if (res.status === 201) {
                    // TODO: handle closing the popup
                    setSuccess(true);
                    setMsg("Category created!");
                    setShowAlert(true);
                } else {
                    setSuccess(false);
                    setMsg(res.data.error);
                    setShowAlert(true);
                }
            }).catch((err) => {
            setSuccess(false);
            const errorMessage = err.response?.data?.errors || 'An unexpected error occurred';
            setMsg(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
            setShowAlert(true);
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const name = catNameRef.current.value;
        if (catExists) {
            await updateCat(name, promoted);
        } else {
            await createCat(name, promoted);
        }
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '0 auto',
        maxWidth: '40%',
        marginTop: '20px'
    };

    return (
        <div className="center">
            <p className="title-2">{(catExists ? "Edit" : "Create") + " category"}</p>

            <form onSubmit={onSubmit} style={formStyle}>
                <p className="subtitle">Title:</p>
                <input className="text-input" ref={catNameRef} style={{width: "100%"}}/>

                <span className="m-2"/>

                <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <p className="subtitle">Title:</p>
                    <input type="checkbox" className="form-check-input checkbox" checked={promoted}
                           onChange={(e) => setPromoted(e.target.checked)}/>
                </div>

                <span className="m-2"/>

                <button type="submit" className="btn-main" style={{margin: '0 auto'}}>
                    {(catExists ? "Update" : "Create")}
                </button>
            </form>

            {showAlert && msg &&
                <Alert message={msg} type={success ? "success" : "error"} onClose={() => setShowAlert(false)}/>
            }
        </div>
    );
}

export default CreateCategory;
