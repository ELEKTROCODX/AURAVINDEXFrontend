import React, { useContext, useEffect, useState } from "react";
import "../styles/FloatingForm.css";
import Button from "./Button";
import { AuthContext } from "../contexts/AuthContext";
import SearchBar from "./SearchBar";
import useFetch from "../hooks/useFetch";

const FloatingListForm = ({ isVisible, onClose, bookId, user }) => {
    if (!isVisible) return null; 

    const {token} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription]  = useState("");
    const {fetchData} = useFetch();

    
    const handleNewList=()=>{
        console.log("BOOK: ",bookId);
        const list = {
            title: title,
            description: description,
            owner: user,
            books: [bookId]
        }
        console.log("data: ",list)
        fetchData('/book_list',{
            method: 'POST',
            data: list,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("List created")


    }


    return (
        <div className="floating-form-overlay">
            <div className="floating-form-container">
                <Button label={"x"} className="filledBtn" action={onClose} variant={"iconBtn"}>
                </Button>
                <h2>Create a New List</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="listName">List Name:</label>
                        <input
                            type="text"
                            id="listName"
                            name="listName"
                            placeholder="Enter list name"
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                        <label htmlFor="description"> Description: </label>
                        <input type="text" id="description" name = "description" placeholder="some description" value={description} onChange={e=> setDescription(e.target.value)}></input>
                    </div>
                    <Button label="create" variant="hollowBtn" action={handleNewList}></Button>
                </form>
            </div>
        </div>
    );
};

export default FloatingListForm;
