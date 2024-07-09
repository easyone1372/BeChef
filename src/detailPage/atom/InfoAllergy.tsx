type InfoAllergyProps = {
  content: string[];
};
const InfoAllergy = ({ content }: InfoAllergyProps) => {
  return (
    <div>
      {content.map((ingredient, index) => (
        // <span key={index}>{ingredient}</span>
        <span key={index}>
          {ingredient}
          {index < content.length - 1 && ", "}
        </span>
      ))}
    </div>
  );
};

export default InfoAllergy;
