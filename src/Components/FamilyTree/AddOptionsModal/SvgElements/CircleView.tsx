import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function CircleView(props:any) {
    const {height, width, backGroundColor, borderColor} = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 152.79 152.79"
      {...props}
      height={height}
      width={width}
    >
      <G id="Layer_2" data-name="Layer 2">
        <Circle
          cx={76.4}
          cy={76.4}
          r={75.9}
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

export default CircleView
