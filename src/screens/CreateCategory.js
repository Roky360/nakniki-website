import {useEffect, useRef, useState} from "react";
import {sendPatch, sendPost} from "../services/RequestSender";
import Alert from "../components/Alert";
import {useUser} from "../services/UserContext";

/**
 * A form for creating/editing a category.
 * @param category Passed in edit mode, if not passed then this will be a creation form.
 * @param onComplete
 * @param closePopup
 * @returns {JSX.Element}
 * @constructor
 */
function CreateCategory({category, onComplete, closePopup}) {
    const {user} = useUser();
    const catExists = (Boolean)(category && category['name'] !== undefined);
    const [loading, setLoading] = useState(false);
    const catNameRef = useRef(null);
    const [promoted, setPromoted] = useState(catExists ? category.promoted : false);
    // for showing alerts
    const [msg, setMsg] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const updateCat = async (name, promoted) => {
        return await sendPatch(`/categories/${category['_id']}`, user.token, {}, {name: name, promoted: promoted})
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setMsg("Category updated!");
                    setShowAlert(true);
                    return true;
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
                return false;
            });
    }

    const createCat = async (name, promoted) => {
        return await sendPost('/categories', user.token, {}, {name: name, promoted: promoted})
            .then((res) => {
                if (res.status === 201) {
                    setSuccess(true);
                    setMsg("Category created!");
                    setShowAlert(true);
                    return true;
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
                return false;
            });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const name = catNameRef.current.value;
        let success;
        if (catExists) {
            success = await updateCat(name, promoted);
        } else {
            success = await createCat(name, promoted);
        }

        console.log(success, onComplete, closePopup)
        if (success) {
            if (onComplete) {
                onComplete();
            }
            if (closePopup) {
                closePopup();
            }
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (catNameRef.current) {
            catNameRef.current.value = catExists ? category.name : "";
        }
    }, []);

    return (
        <div style={{width: '20vw'}}>
            <p className="title-2 center">{(catExists ? "Edit" : "Create") + " category"}</p>

            <form onSubmit={onSubmit}>
                <p className="paragraph">Title:</p>
                <input className="text-input" ref={catNameRef} style={{width: "100%"}}/>

                <span className="m-2"/>

                <div className="mt-3" style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <p className="paragraph">Promoted:</p>
                    <input type="checkbox" className="form-check-input checkbox" checked={promoted}
                           onChange={(e) => setPromoted(e.target.checked)}/>
                </div>

                <span className="m-2"/>

                <div className="center">
                    <button type="submit" className="btn-main" disabled={loading}>
                        {(catExists ? "Update" : "Create")}
                    </button>
                </div>
            </form>

            {showAlert && msg &&
                <Alert message={msg} type={success ? "success" : "error"} onClose={() => setShowAlert(false)}/>
            }
        </div>
    );
}

export default CreateCategory;
