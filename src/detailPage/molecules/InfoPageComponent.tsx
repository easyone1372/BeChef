import InfoSubTitle from "../atom/InfoSubTitle";
import InfoDescriptionBox from "./InfoDescriptionBox";
import InfoTitleBox from "./InfoTitleBox";
import InfoTopImage from "./InfoTopImage";

export type InfoPageComponentProps = {
  name: string;
  rating: number;
  imageUrl: string;
  address: string;
  phone: string;
  storeId: number;
  userId: number | null;
};

//이게맞아?
const InfoPageComponent = ({
  name,
  rating,
  imageUrl,
  address,
  phone,
  storeId,
  userId,
}: InfoPageComponentProps) => {
  console.log("InfoPageComponent에서 렌더됨:", {
    name,
    rating,
    imageUrl,
    address,
    phone,
    storeId,
    userId,
  });

  return (
    <div className="max-w-800 w-full my-0 mx-auto">
      <InfoTopImage imgUrl={imageUrl} />
      <div className="max-w-786 w-full my-0 mx-auto rounded-lg">
        <InfoTitleBox
          titleContent={name}
          titleStarNum={rating}
          storeId={storeId}
          userId={userId}
        />
        <InfoDescriptionBox location={address} callNumber={phone} />
      </div>
    </div>
  );
};
export default InfoPageComponent;
