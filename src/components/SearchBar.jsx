import React, { useState } from 'react';
import '../styles/SearchBar.css';
import Button from './Button';
import { useLocation, useNavigate } from 'react-router-dom';


const SearchBar = ({setBooks, setFilter}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterField, setFilterField] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSelectChange = (event) =>{
        setFilterField(event.target.value);
    }

    const handleSearch = async () => {
        if(!searchTerm.trim()){
            alert("Please enter a search term");
            return;
        }
        if(!filterField.trim() || ""){
            alert("Select a filter");
            return;
        }
        if(location.pathname ==='/dashboard'){
            navigate('/Books');
        }
        setBooks(searchTerm);
        setFilter(filterField);
    };

    return (
        <>
            <section className="search-bar-section">
                    <select className="dropdown" value={filterField} onChange={handleSelectChange}>
                        <option value = "">Select an Option</option>
                        <option value="isbn">ISBN</option>
                        <option value="title">TITLE</option>
                        <option value="authors">AUTHOR(S)</option>
                        <option value="classification">CLASsIFICATION</option>
                        <option disabled value="editorial">EDITORIAL</option>
                    </select>
                    <input
                        type="text"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                <center>                
                    <Button variant={"filledBtn"} label={"Search"} action={handleSearch}></Button>
                </center>
            </section>
        </>
    );
};
export default SearchBar;
