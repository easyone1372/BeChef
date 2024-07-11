export type InfoMenuIngredientProps = {
  content: string[];
};
const InfoMenuIngredient = ({ content }: InfoMenuIngredientProps) => {
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

export default InfoMenuIngredient;
