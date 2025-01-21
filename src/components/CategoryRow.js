import React from 'react';
import MovieCard from "./MovieCard";

class CategoryRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryName: this.props.categoryName,
            moviesList: this.props.moviesList || [],
            showActions: this.props.showActions ?? false,
            onDeleteMovie: this.props.onDeleteMovie,
        }
    }

    render() {
        const { categoryName, moviesList } = this.props;

        if (moviesList.length === 0) {
            return null;
        }

        return (
            <div className="categoryRow">
                <p className={"subtitle"}>{categoryName}</p>
                <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    {moviesList.map((movie, index) => (
                        <MovieCard
                            key={index}
                            movie={movie}
                            showFunc={this.state.showActions}
                            onDelete={this.state.onDeleteMovie}
                        />
                    ))}
                </div>
            </div>
        );
    }

}

export default CategoryRow;