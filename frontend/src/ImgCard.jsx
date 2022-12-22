import { Col, Card } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai"

const ImgCard = ({ img, selected, setSelected, setShowImg }) => {

  let isSelected = selected === img._id;

  return (
    <Col>
      <Card key={img._id} onClick={() => {setSelected(img._id); setShowImg(true)}}>
        <Card.Img variant="top" src={img.src} style={{ height: "14rem" }} />
        <Card.Body>
          <Card.Title>{img.title}</Card.Title>
          <Card.Text>
            {img.desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ImgCard;