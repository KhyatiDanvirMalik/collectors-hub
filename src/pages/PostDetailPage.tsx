import { useParams, Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { fetchPostById } from '../data/api';
import { SafeImage } from '../components/common/SafeImage';
import { CategoryBadge } from '../components/common/CategoryBadge';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { timeAgo } from '../utils/format';
import { useFeedInteractions } from '../context/FeedInteractionsContext';
import styles from './PostDetailPage.module.css';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error, retry } = useAsync(() => fetchPostById(id ?? ''), [id]);
  const { toggleLike, toggleSave, isLiked, isSaved } = useFeedInteractions();

  if (isLoading) return <Loader label="Loading post" />;
  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (!post) {
    return (
      <EmptyState
        title="Post not found"
        description="This post may have been removed or the link is incorrect."
        action={
          <Link to="/feed">
            <Button variant="secondary">Back to Feed</Button>
          </Link>
        }
      />
    );
  }

  const liked = isLiked(post.id);
  const saved = isSaved(post.id);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <div>
      <Link to="/feed" className={styles.backLink}>
        ← Back to Feed
      </Link>

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <SafeImage src={post.imageUrl} alt={post.caption} className={styles.image} />
        </div>

        <div className={styles.info}>
          <div className={styles.userRow}>
            <SafeImage src={post.userAvatar} alt="" className={styles.avatar} />
            <div>
              <p className={styles.userName}>{post.userName}</p>
              <p className={styles.time}>{timeAgo(post.createdAt)}</p>
            </div>
          </div>

          <CategoryBadge category={post.category} />
          <p className={styles.caption}>{post.caption}</p>

          <div className={styles.actions}>
            <Button
              variant={liked ? 'ghost' : 'secondary'}
              onClick={() => toggleLike(post.id)}
            >
              {liked ? '♥' : '♡'} {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
            </Button>
            <Button
              variant={saved ? 'ghost' : 'secondary'}
              onClick={() => toggleSave(post.id)}
            >
              {saved ? 'Saved' : 'Save'}
            </Button>
          </div>

          <div className={styles.comments}>
            <h2 className={styles.commentsTitle}>
              Comments ({post.comments.length})
            </h2>

            {post.comments.length === 0 ? (
              <p className={styles.noComments}>No comments yet.</p>
            ) : (
              <ul className={styles.commentList}>
                {post.comments.map((comment) => (
                  <li key={comment.id} className={styles.comment}>
                    <SafeImage
                      src={comment.userAvatar}
                      alt=""
                      className={styles.commentAvatar}
                    />
                    <div>
                      <p className={styles.commentMeta}>
                        <span className={styles.commentUser}>{comment.userName}</span>
                        <span className={styles.commentTime}>{timeAgo(comment.createdAt)}</span>
                      </p>
                      <p className={styles.commentText}>{comment.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
