type InfoMenuImageProps = {
  content: string;
};

const InfoMenuImage = ({ content }: InfoMenuImageProps) => {
  return (
    <div className="w-px100 h-px100">
      <img className="size-full object-cover" src={`${content}`}></img>
    </div>
  );
};

export default InfoMenuImage;
