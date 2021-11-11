import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
  TextStyle,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Image,
} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import styles from './styles';

export type dataObjectType = {
  id: number;
  _comment: string;
  name: string;
  spouse: string;
  spouseProfile: string;
  dob: string;
  dod: null | string;
  profile: string;
  children: Array<dataObjectType>;
};

export type Props = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  data: Array<dataObjectType>;
  nodeStyle?: StyleProp<ViewStyle>;
  nodeTitleStyle?: StyleProp<TextStyle>;
  pathColor?: string;
  siblingGap?: number;
  imageStyle?: StyleProp<ImageStyle>;
  nodeTitleColor?: string;
  familyGap?: number;
  strokeWidth?: number;
  titleColor?: string;
};

const defaultProps: Partial<Props> = {
  title: 'My Family Tree',
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  titleColor: 'black',
  nodeStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeTitleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pathColor: '#00ffd8',
  siblingGap: 50,
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'cover',
  },
  nodeTitleColor: '#00ff00',
  familyGap: 30,
  strokeWidth: 5,
};

const FamilyTreeComp: React.FC<Props> = props => {
  const [state, setState] = useState({
    showStatus: {},
  });
  const flatListRef = useRef(null);
  const {title, titleStyle, titleColor} = props;

  const updateState = updatedState => {
    setState({...state, ...updatedState});
  };

  const hasChildren = (member: dataObjectType) => {
    return member.children && member.children.length;
  };

  const renderTree = (data: Array<dataObjectType>, level: number) => {
    return (
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal={true}
        contentContainerStyle={{padding: 50}}
        keyExtractor={(item, index) => `${item.name} + ${item.spouse}`}
        listKey={(item, index) => `${item.name} + ${item.spouse}`}
        initialScrollIndex={0}
        renderItem={({item, index}) => {
          const {name, spouse, dob, dod, profile, id, spouseProfile} = item;
          const info = {name, spouse, dob, dod, profile, spouseProfile};
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: props.siblingGap / 2,
                paddingRight: props.siblingGap / 2,
              }}
              onLayout={({nativeEvent}) => {
                if (level === 1) {
                  const {height, width} = Dimensions.get('window');
                  let dim = {
                    height: nativeEvent.layout.height,
                    width: nativeEvent.layout.width,
                  };
                  if (nativeEvent.layout.height > height) {
                    dim.height = height;
                  }
                  if (nativeEvent.layout.width > width) {
                    dim.width = width;
                  }
                  updateState({treeDimensions: dim});
                }
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={props.nodeStyle}>
                  <Image
                    source={{uri: info.profile}}
                    style={{...props.imageStyle, alignItems: 'center'}}
                  />
                  <Text
                    style={{
                      ...props.nodeTitleStyle,
                      color: props.nodeTitleColor,
                    }}>
                    {info.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {hasChildren(item) &&
                  item.children.map((child, index) => {
                    const {name, spouse, dob, dod, profile} = child;
                    const info = {name, spouse, dob, dod, profile};
                    return (
                      <View
                        key={child.name + child.spouse}
                        style={[
                          {
                            flexDirection: 'row',
                          },
                          level === 1 && {marginLeft: 5},
                        ]}>
                        <View>
                          <Svg height="50" width="100%">
                            <Line
                              x1="50%"
                              y1="0"
                              x2="50%"
                              y2="100%"
                              stroke={props.pathColor}
                              strokeWidth={props.strokeWidth}
                            />
                            {/* Right side horizontal line */}
                            {hasChildren(item) &&
                              item.children.length != 1 &&
                              item.children.length - 1 !== index && (
                                <Line
                                  x1="100%"
                                  y1={props.strokeWidth / 2}
                                  x2="50%"
                                  y2={props.strokeWidth / 2}
                                  stroke={props.pathColor}
                                  strokeWidth={props.strokeWidth}
                                />
                              )}
                            {/* Left side horizontal line */}
                            {hasChildren(item) &&
                              item.children.length != 1 &&
                              index !== 0 && (
                                <Line
                                  x1="50%"
                                  y1={props.strokeWidth / 2}
                                  x2="0%"
                                  y2={props.strokeWidth / 2}
                                  stroke={props.pathColor}
                                  strokeWidth={props.strokeWidth}
                                />
                              )}
                          </Svg>
                          {renderTree([child], level + 1)}
                        </View>
                        <View
                          style={{
                            height: props.strokeWidth,
                            backgroundColor:
                              hasChildren(item) &&
                              item.children.length - 1 !== index
                                ? props.pathColor
                                : 'transparent',
                            width:
                              hasChildren(child) &&
                              child.children.length - 1 !== index
                                ? level * props.familyGap
                                : 0,
                          }}
                        />
                      </View>
                    );
                  })}
              </View>
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{...titleStyle, color: titleColor}}>{title}</Text>
      {renderTree(props.data, 1)}
      {/* )} */}
    </View>
  );
};

FamilyTreeComp.defaultProps = defaultProps;

export default FamilyTreeComp;
