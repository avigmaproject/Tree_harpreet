import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const TopView = (props: any) => {
  const {height, width, backGroundColor, borderColor} = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 219.49 85.11"
      {...props}
      height={height}
      width={width}>
      <G id="Layer_2" data-name="Layer 2">
        <Path
          d="M109.78 41.25a84.58 84.58 0 0173.71 43.07l35.32-20.39A125.43 125.43 0 00.68 64L36 84.43a84.58 84.58 0 0173.78-43.18z"
          id="Layer_1-2"
          data-name="Layer 1"
          fill={backGroundColor ? backGroundColor : 'none'}
          stroke={borderColor ? borderColor : 'none'}
          strokeMiterlimit={10}
        />
      </G>
    </Svg>
  );
};

export default TopView;
