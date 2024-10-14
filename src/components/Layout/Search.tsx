import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
    const [keyword, setKeyword] = useState<string>("");
    const navigate = useNavigate();

    const searchHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/eats/stores/search/${keyword}`);
        } else {
            navigate("/");
        }
    }

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Search Your Favorite Restaurant..."
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Search;
