import React from 'react';
import MovieCard from "./MovieCard";

class CategoryRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryName: this.props.categoryName,
            moviesList: this.props.moviesList || [],
            actionsList: this.props.actionsList || [],
        }
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        const { categoryName, moviesList, actionsList } = this.props;

        if (moviesList === null) {
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
                            deleteFunc={actionsList[index].delete}
                            editFunc={actionsList[index].edit}
                        />
                    ))}
                </div>
            </div>
        );
    }

}

export default CategoryRow;