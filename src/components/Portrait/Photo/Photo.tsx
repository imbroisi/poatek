import { useContext, useEffect, useRef, useState } from 'react';
import { Image } from './Photo.styles';
import { EmployeesContext } from 'contexts/employeesContext';
import { PHOTO_WIDTH, PHOTO_HEIGHT } from '../ResultMask/ResultMask.styles';

interface Props {
  index: number;
  onClick: (value: boolean) => void;
}

interface ImageTypes {
  url: string | undefined;
  active: boolean;
}

export default function Photo({
  index,
  onClick,
}: Props) {
  const { employeersChosen, disabled } = useContext(EmployeesContext);
  const [imgsSrc, setImagesSrc] = useState<ImageTypes[]>([
    { url: undefined, active: false },
    { url: undefined, active: false }
  ]);

  const employee = employeersChosen[index];

  useEffect(() => {
    if (!employee) {
      return;
    }
    const newImgsSrc = structuredClone(imgsSrc);

    const src = employee.headshot.url;

    if (newImgsSrc[0]?.url === src || newImgsSrc[1]?.url === src) {
      return;
    }

    if (newImgsSrc[0].active) {
      newImgsSrc[1].url = src;
      newImgsSrc[1].active = true;
      newImgsSrc[0].active = false;
    } else {
      newImgsSrc[0].url = src;
      newImgsSrc[0].active = true;
      newImgsSrc[1].active = false;
    }

    setImagesSrc(newImgsSrc);
  }, [employee])

  const handleOnClick = () => {
    onClick(!!employee.curretEmployee);
  }

  return (
    <>
      <Image
        src={imgsSrc[0].url}
        width={PHOTO_WIDTH}
        height={PHOTO_HEIGHT}
        onClick={handleOnClick}
        disabled={disabled}
        active={imgsSrc[0].active}
      />
      <Image
        src={imgsSrc[1].url}
        width={PHOTO_WIDTH}
        height={PHOTO_HEIGHT}
        onClick={handleOnClick}
        disabled={disabled}
        active={imgsSrc[1].active}
      />
    </>
  );
}
