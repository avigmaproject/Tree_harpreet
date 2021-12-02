import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const LeftView = (props: any) => {
  const {height, width, backGroundColor, borderColor} = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120.74 178.49"
      {...props}
      height={height}
      width={width}>
      <G id="Layer_2" data-name="Layer 2">
        <Path
          d="M41.25 52.7a84.36 84.36 0 016.07-31.46L11.76.71A125.44 125.44 0 00120.24 178v-40.87A84.63 84.63 0 0141.25 52.7z"
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

export default LeftView;
