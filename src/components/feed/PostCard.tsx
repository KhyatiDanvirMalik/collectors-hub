import { Link } from 'react-router-dom';
import type { Post } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { CategoryBadge } from '../common/CategoryBadge';
import { timeAgo } from '../../utils/format';
import { useFeedInteractions } from '../../context/FeedInteractionsContext';
import styles from './PostCard.module.css';

export function PostCard({ post }: { post: Post }) {
  const { toggleLike, toggleSave, isLiked, isSaved } = useFeedInteractions();
  const liked = isLiked(post.id);
  const saved = isSaved(post.id);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <article className={styles.card}>
      <Link to={`/feed/${post.id}`} className={styles.imageLink}>
        <SafeImage src={post.imageUrl} alt={post.caption} className={styles.image} />
      </Link>

      <div className={styles.body}>
        <div className={styles.userRow}>
          <SafeImage src={post.userAvatar} alt="" className={styles.avatar} />
          <span className={styles.userName}>{post.userName}</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span className={styles.time}>{timeAgo(post.createdAt)}</span>
        </div>

        <CategoryBadge category={post.category} />

        <Link to={`/feed/${post.id}`}>
          <p className={styles.caption}>{post.caption}</p>
        </Link>

        <div className={styles.actionsRow}>
          <button
            type="button"
            className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
            onClick={() => toggleLike(post.id)}
            aria-pressed={liked}
          >
            <HeartIcon filled={liked} />
            {likeCount}
          </button>

          <Link to={`/feed/${post.id}`} className={styles.actionBtn}>
            <CommentIcon />
            {post.comments.length}
          </Link>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.saveBtn} ${saved ? styles.saved : ''}`}
            onClick={() => toggleSave(post.id)}
            aria-pressed={saved}
          >
            <BookmarkIcon filled={saved} />
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.7-9.8-9.3C.7 7.9 2.4 4.5 5.8 4a4.9 4.9 0 0 1 6.2 2.3A4.9 4.9 0 0 1 18.2 4c3.4.5 5.1 3.9 3.6 7.2C19.5 15.8 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.5-4A8.5 8.5 0 1 1 21 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path
        d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
