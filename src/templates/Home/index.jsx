import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { Button } from "../../components/Button/";
import { loadPostsService } from "../../utils/load-posts";
import { InputText } from "../../components/InputText";
import { CardList } from "../../components/CardList";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue ? posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const photosAndPhotos = await loadPostsService();
    setPosts(photosAndPhotos.slice(page, postsPerPage));
    setAllPosts(photosAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <InputText searchValue={searchValue} handleChange={handleChange} />
      </div>
      <div className="cards-container">
        <CardList filteredPosts={filteredPosts} />

        {!!!searchValue && <Button text="Load more cards" onClick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
};
