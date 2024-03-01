export const ImageCard = ({
  image: {
    likes,
    description,
    urls: { small },
    user: { last_name },
  },
}) => {
  return (
    <div>
      <img src={small} alt={description} />

      <div>
        <p>Likes: {likes}</p>
        <p>Author: {last_name}</p>
      </div>
    </div>
  );
};
