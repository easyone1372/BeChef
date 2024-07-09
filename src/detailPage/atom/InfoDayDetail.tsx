export type InfoDayDetailProps = {
  dayInfo: string;
  dayOpenTime: string;
  dayCloseTime: string;
  isClosed: boolean;
};

const InfoDayDetail = ({
  dayInfo,
  dayOpenTime,
  dayCloseTime,
  isClosed,
}: InfoDayDetailProps) => {
  return (
    <div className="flex max-w-768 w-full my-0 mx-auto gap-1 text-sm font-normal justify-between">
      <div>{dayInfo}</div>
      {isClosed ? (
        <span>휴무</span>
      ) : (
        <div>
          {dayOpenTime}-{dayCloseTime}
        </div>
      )}
    </div>
  );
};
export default InfoDayDetail;
