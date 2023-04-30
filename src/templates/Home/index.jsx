import "./styles.css";
import { Component } from "react";

import { Button } from "../../components/Button/";
import { loadPosts } from "../../utils/load-posts";
import { InputText } from "../../components/InputText";
import { CardList } from "../../components/CardList";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const photosAndPhotos = await loadPosts();
    this.setState({
      posts: photosAndPhotos.slice(page, postsPerPage),
      allPosts: photosAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}

          <InputText searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        <div className="cards-container">
          <CardList filteredPosts={filteredPosts} />

          {!!!searchValue && <Button text="Load more cards" onClick={this.loadMorePosts} disabled={noMorePosts} />}
        </div>
      </section>
    );
  }
}
