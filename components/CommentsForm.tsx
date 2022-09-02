import React, { useState, useEffect } from 'react'
import { submitComment } from '../services/Index';

const CommentsForm = ({ slug }: any) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({name: '', email: '', comment: '', storeData: false});
    // const commentEl = useRef();
    // const nameEl = useRef();
    // const emailEl = useRef();
    // const storeDataEl = useRef();

    useEffect(() => {
        // nameEl.current.value = window.localStorage.getItem('name');
        // emailEl.current.value = window.localStorage.getItem('email');
        setLocalStorage(localStorage);
        const initialFormData: any = {
            name: window.localStorage.getItem('name'),
            email: window.localStorage.getItem('email'),
            comment: window.localStorage.getItem('comment'),
            storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
        }
        setFormData(initialFormData);
    }, []);

    const onInputChange = (e: any) => {
        const { target } = e;
        if (target.type === 'checkbox') {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.checked,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };

    const handleCommentSubmission = () => {
        setError(false);
        // const { value: comment } = commentEl.current;
        // const { value: name } = nameEl.current;
        // const { value: email } = emailEl.current;
        // const { checked: storeData } = storeDataEl.current;
        const { name, email, comment, storeData } = formData;

        if(!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = { 
            name, 
            email, 
            comment, 
            slug, 
        };

        if(storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
        }

        submitComment(commentObj)
            .then((res) => {
                if (res.createComment) {
                    if (!storeData) {
                        formData.name = "";
                        formData.email = "";
                    }
                    formData.comment = "";
                    setFormData((prevState) => ({
                        ...prevState,
                        ...formData,
                    }));
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
                }
            });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea 
                    value={formData.comment} 
                    onChange={onInputChange}
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comment"
                    name="comment"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input 
                    type="text"
                    value={formData.name}
                    onChange={onInputChange}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name"
                    name="name"
                />
                <input 
                    type="email"
                    value={formData.email}
                    onChange={onInputChange}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input 
                        value="true"
                        checked={formData.storeData}
                        onChange={onInputChange}
                        type="checkbox"
                        id="storeData"
                        name="storeData"/>
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save my name and email for the next time I comment</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500"> All fields are required.</p>}
            <div className="mt-8">
                <button 
                    type="button" 
                    onClick={handleCommentSubmission}
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-cyan-500 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Post Comment
                </button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
            </div>
        </div>
    );
};

export default CommentsForm