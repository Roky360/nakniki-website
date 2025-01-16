import {useRef} from "react";
import {sendPatch, sendPost} from "../services/RequestSender";

/**
 * A form for creating/editing a category.
 * @param category Passed in edit mode, if not passed then this will be a creation form.
 * @returns {JSX.Element}
 * @constructor
 */
function CreateCategory(category) {
    const catNameRef = useRef(null);
    const promotedRef = useRef(null);

    const updateCat = async (name, promoted) => {
        sendPatch(`/categories/${category['_id']}`, '', {}, {name: name, promoted: promoted})
            .then((res) => {
                if (res.status === 204) {
                    // TODO: handle ok
                    console.log("updated!")
                }
            }).catch((err) => {
            // TODO: handle error
        })
    }

    const createCat = async (name, promoted) => {
        sendPost(`/categories/${category['_id']}`, '', {}, {name: name, promoted: promoted})
            .then((res) => {
                if (res.status === 201) {
                    // TODO: handle ok
                    console.log("created!")
                }
            }).catch((err) => {
            // TODO: handle error
        })
    }

    const onSubmit = async () => {
        const name = catNameRef.current.value;
        const promoted = promotedRef.current.value;
        if (category) {
            await updateCat(name, promoted);
        } else {
            await createCat(name, promoted);
        }
    }

    return (
        <div className="center">
            <p className="title-2">{(category ? "Edit" : "Create") + " category"}</p>

            <p className="subtitle">Title:</p>
            <input className="text-input" ref={catNameRef}/>

            <div className="row">
                <p className="subtitle">Title:</p>
                <input type="checkbox" className="checkbox" checked={category && category['promoted']}
                       ref={promotedRef}/>
            </div>
            <span className="m-2"/>

            <button className="btn-main" onClick={onSubmit}>
                {(category ? "Update" : "Create")}
            </button>
        </div>
    );
}
