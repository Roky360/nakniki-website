import React, { Component } from 'react';
import { sendGet } from '../services/RequestSender';
import CategoryRow from '../components/CategoryRow';

class RegisteredHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    async componentDidMount() {
        try {
            const token = "my_super_secret_key";  // Replace with the actual token
            const userId = "678fb124080c7313721ad5ad";
            // Fetch movies by categories
            const response = await sendGet('/movies', token, { user_id: userId });
            this.setState({ categories: response.data});
        } catch (error) {
            console.error("Error fetching movies by categories:", error);
            this.setState({ error: 'Failed to load categories.'});
        }
    }

    render() {
        const { categories} = this.state;
        return (
            <div className="registered-home-page">
                <h1>Welcome to Nakniki-Netflix</h1>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <CategoryRow
                            key={index}
                            categoryName={category.category} // API response field for category name
                            moviesList={category.movies}    // API response field for movies
                        />
                    ))
                ) : (
                    <p>No categories found.</p>
                )}
            </div>
        );
    }
}

export default RegisteredHomePage;
