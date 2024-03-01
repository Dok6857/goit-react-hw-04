import { ImageCard } from '../ImageCard/ImageCard';

export const ImageGallery = ({ receivedImages }) => {
    console.log(receivedImages);

  return (
    <ul>
      {receivedImages.map(receivedImage => (
        <li key={receivedImage.id}>
          <ImageCard image={receivedImage} />
        </li>
      ))}
    </ul>
  );
};
