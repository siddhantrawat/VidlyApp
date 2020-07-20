import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import { paginate } from "../util/paginate";
import Filter from "../common/filter";
import getGenres from "../sevices/genreservice";
import { filter } from "../util/filter";
import MovieTable from "../moviestable";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchbox";
import { getMovies, deleteMovie } from "./../sevices/moviesSer";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "Select all",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    const genres = [
      { _id: "", name: "Select all" },
      ...(await getGenres()).data
    ];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id != movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("this movie has already been deleted");
      else if (ex.response && ex.response.status === 403)
        toast.error("Access Denied!! Only admins can delete a movie");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    let mov = [...this.state.movies];
    const index = mov.indexOf(movie);
    mov[index] = { ...mov[index] };
    mov[index].liked = !mov[index].liked;
    this.setState({ movies: mov });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelectGenre = genre => {
    this.setState({ selectedGenre: genre.name });
    this.setState({ currentPage: 1, searchQuery: "" });
  };
  0;

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: "Select all",
      currentPage: 1
    });
  };
  getPageData = () => {
    const {
      selectedGenre,
      pageSize,
      movies: allMovies,
      currentPage,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredMovies = allMovies;

    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (selectedGenre !== "Select all") {
      filteredMovies = filter(allMovies, selectedGenre);
    }
    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, pageSize, currentPage);
    return { totalCount: filteredMovies.length, data: movies };
  };
  render() {
    const {
      selectedGenre,
      genres,
      pageSize,
      movies: allMovies,
      currentPage,
      sortColumn,
      searchQuery
    } = this.state;

    const { length: count } = allMovies;
    const { user } = this.props;
    if (count === 0) return <p>Currently, No movies in the database</p>;

    const { totalCount, data: movies } = this.getPageData();
    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <Filter
              selectedItem={selectedGenre}
              items={genres}
              onItemSelect={this.handleSelectGenre}
            />
          </div>

          <div className="col">
            {user && (
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}
            <p>Showing {totalCount} movies in database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            <MovieTable
              user={this.props.user}
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              pageSize={pageSize}
              onPageClick={this.handlePageChange}
              totalItems={totalCount}
              currentPage={currentPage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
