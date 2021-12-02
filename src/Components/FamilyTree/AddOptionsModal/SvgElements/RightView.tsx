import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const RightView=(props:any)=> {
    const {height, width, backGroundColor, borderColor} = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120.99 178.61"
      {...props}
      height={height}
      width={width}
    >
      <G id="Layer_2" data-name="Layer 2">
        <Path
          d="M120.49 52.81A124.91 124.91 0 00109.18.71L73.62 21.24a84.28 84.28 0 016.11 31.57A84.64 84.64 0 01.5 137.27v40.82A125.41 125.41 0 00120.49 52.81z"
          id="Layer_1-2"
          data-name="Layer 1"
          fill={backGroundColor ? backGroundColor : 'none'}
          stroke={borderColor ? borderColor : 'none'}
          strokeMiterlimit={10}
        />
      </G>
    </Svg>
  )
}

export default RightView