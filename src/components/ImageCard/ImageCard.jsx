import css from './ImageCard.module.css'

export const ImageCard = ({
  image: {
    likes,
    description,
    urls: { small },
    user: { name },
  },
}) => {
  return (
    <div>
      <img src={small} alt={description} width={200} height={250}/>

      <div className={css.imgInfo}>
        <p>Likes: {likes}</p>
        <p>Author: {name}</p>
      </div>
    </div>
  );
};
