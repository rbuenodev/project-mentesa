import { Container } from "./style";

interface ICardInfoProps {
  description: string;
  value: string;
}

const CardInfo: React.FC<ICardInfoProps> = ({ description, value }) => {
  return (
    <Container>
      <h4>{description}</h4>
      <h1>{value}</h1>
    </Container>
  );
};

export default CardInfo;
