import "./styles.css";
import { Component } from "react";
import { PostCard } from "../../components/PostCard/";
import { Button } from "../../components/Button/";
import { loadPosts } from "../../utils/load-posts";

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
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <input onChange={this.handleChange} value={searchValue} type="search" />
        {filteredPosts.length > 0 ? (
          <div className="posts">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p>Não existem posts</p>
        )}

        {!!!searchValue && <Button text="Load more cards" onClick={this.loadMorePosts} disabled={noMorePosts} />}
      </section>
    );
  }
}
