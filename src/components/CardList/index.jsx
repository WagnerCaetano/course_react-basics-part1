import "./styles.css";
import { PostCard } from "./PostCard";

export const CardList = ({ filteredPosts }) => {
  return (
    <div className="postsWrapper">
      {filteredPosts.length > 0 ? (
        <div className="posts">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>Não existem posts</p>
      )}
    </div>
  );
};
