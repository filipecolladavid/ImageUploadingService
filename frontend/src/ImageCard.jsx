import { Col, Card } from "react-bootstrap"

const ImageCard = ({ image, handleSelect }) => {
  return (
    <Col>
      <Card onClick={() => handleSelect(image._id)}>
        <Card.Img variant="top" src={image.src} />
        <Card.Body>
          <Card.Title>{image.title}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ImageCard;