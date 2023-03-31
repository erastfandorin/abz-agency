import { useState, useRef, useEffect } from "react";
import coveImg from "../../../assets/img/photo-cover.svg";
import { IUserView } from "../../../interfaces/IForm";
import { formatPhoneNumber, getTextWidth, verifyImageURL } from "../../../helpers/utilities";

function User({ photo, name, email, phone, position }: IUserView) {
  const [userImg, setUserImg] = useState("");
  const [elementWidth, setElementWidth] = useState(0);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const verifyImage = async () => {
      const isImgValid = await verifyImageURL(photo);
      setUserImg( isImgValid ?  photo : coveImg);
    };
    verifyImage();
  });


  const phoneHref = `tel:${phone}`;
  const emailHref = `mailto:${email}`;

  useEffect(() => {
    const elemWidth = ref.current ? ref.current.offsetWidth : 0;
    setElementWidth(elemWidth);
  }, []);

  const checkTooltipNeed = (string: string) => {
    const paddingWidth = 40;
    const textWidth = getTextWidth(string);
    const resultWidth = textWidth + paddingWidth;
    if (elementWidth < resultWidth) {
      return true;
    }
    return false;
  };

  const addTooltip = (text: string) => <span className="tooltip-text">{text}</span>;

  return (
    <li className="users__list-item card" ref={ref}>
      <ul className="card__list">
        <li className="card__photo">
          <img src={userImg} alt="User" />
        </li>
        <li className="card__name tooltip">
          <span className="card__text">{name}</span>
          {checkTooltipNeed(name) && addTooltip(name)}
        </li>
        <li className="card__position tooltip">
          <span className="card__text">{position}</span>
          {checkTooltipNeed(position) && addTooltip(position)}
        </li>
        <li className="card__email tooltip">
          <a href={emailHref} className="card__text">
            {email}
          </a>
          {checkTooltipNeed(email) && addTooltip(email)}
        </li>
        <li className="card__number">
          <a href={phoneHref} className="card__text">
            {formatPhoneNumber(phone)}
          </a>
        </li>
      </ul>
    </li>
  );
}

export default User;
