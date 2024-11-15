interface Props {
  textcolor: string;
  text: string;
  sub_textcolor?: string;
  sub_text?: string;
}

export default function TeamButton({
  textcolor,
  text,
  sub_text,
  sub_textcolor,
}: Props) {
  return (
    <button className=" bg-white  text-[24px] rounded-lg  p-1 w-[120px] ">
      <span className={`${textcolor}`}>{text.toUpperCase()}</span>
      {sub_text && (
        <>
          <span className="text-black">/</span>
          <span className={`${sub_textcolor}`}>{sub_text.toUpperCase()}</span>
        </>
      )}
    </button>
  );
}
