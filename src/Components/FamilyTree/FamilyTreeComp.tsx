import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextStyle,
  StyleProp,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {editedTextType} from '.';
import {
  editedTextChild,
  editedTextParents,
  editedTextSpouse,
  isEditingType,
} from '../../../App';
import {profileUrl} from '../../constants/constants';
import styles from './styles';
const jp = require('jsonpath');

const {width} = Dimensions.get('screen');

interface LooseObject {
  [key: string]: any;
}

export type dataObjectType = {
  id: number;
  _comment: string;
  name: string;
  spouse: string | null;
  spouseProfile: string;
  profile: string;
  order: number;
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
  loaderColor?: string;
  isEditing: isEditingType;
  setIsEditing: (val: isEditingType) => void;
  editedText: Partial<editedTextType> | undefined;
  updateEditedText: (val: editedTextType) => void;
  isSubmitted: boolean;
  updateIsSubmitted: (val: boolean) => void;
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
  loaderColor: '#0095ff',
};

type State = {
  treeData: Array<dataObjectType>;
  showStatus: LooseObject;
  isRefresh: boolean;
  clickedPos: {x: number; y: number} | undefined;
  clickedLevel: number | undefined;
  treeDimensions: {width: number; height?: number};
  targetId: number | undefined;
};

const FamilyTreeComp: React.FC<Props> = props => {
  const [state, setState] = useState<State>({
    treeData: props.data,
    showStatus: {},
    isRefresh: false,
    clickedPos: undefined,
    clickedLevel: undefined,
    treeDimensions: {width: width},
    targetId: undefined,
  });
  const [maxId, setMaxId] = useState<number | null>(null);
  const flatListRef = useRef(null);

  const {showStatus, isRefresh, treeData, targetId, treeDimensions} = state;
  const {
    title,
    titleStyle,
    titleColor,
    loaderColor,
    isEditing,
    setIsEditing,
    editedText,
    isSubmitted,
    updateIsSubmitted,
  } = props;

  const updateState = (updatedState: Partial<State>) => {
    setState({...state, ...updatedState});
  };

  const hasChildren = (member: dataObjectType) => {
    return member.children && member.children.length;
  };

  useEffect(() => {
    const maxId = Math.max(...jp.query(treeData, '$..id'));
    setMaxId(maxId);
    console.log('MAX ID: ', maxId);
  }, []);

  const isShowStatusExist = (i: number) => {
    const stringId = '' + i;
    if (showStatus[stringId] !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const toggleShowHide = (
    i: number,
    event: GestureResponderEvent,
    level: number,
  ) => {
    const temp = {...showStatus};
    const updatedState = {
      clickedPos: {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      },
      isRefresh: true,
      clickedLevel: level,
    };
    if (!isShowStatusExist(i)) {
      temp['' + i] = false;
      updateState({showStatus: temp, ...updatedState});
    } else {
      temp['' + i] = !temp['' + i];
      updateState({showStatus: temp, ...updatedState});
    }
  };

  useEffect(() => {
    if (isRefresh) {
      const maxId = Math.max(...jp.query(treeData, '$..id'));
      setMaxId(maxId);
      updateState({isRefresh: false});
    }
  }, [isRefresh]);

  const totalWords = (str: string) => {
    return str.split(' ').length;
  };

  useEffect(() => {
    let isActive = true;
    function submitData() {
      if (isSubmitted) {
        console.log('changed ', editedText, isEditing.type, targetId);
        switch (isEditing.type) {
          case 'parent':
            if (isActive) {
              updateParentData(treeData[0], editedText as editedTextParents);
            }
            break;
          case 'spouse':
            if (isActive) {
              updateSpouseOrChildData(
                editedText as editedTextSpouse,
                targetId!,
                'spouse',
              );
            }
            break;
          case 'child':
            if (isActive) {
              updateSpouseOrChildData(
                editedText as editedTextSpouse,
                targetId!,
                'child',
              );
            }
            break;
        }
        updateState({isRefresh: true});
      }
    }
    submitData();
    return () => {
      isActive = false;
    };
  }, [isSubmitted]);

  const addParent = (id: number, selectedLevel: number, hasSpouse: boolean) => {
    setIsEditing({modalVisible: true, selectedLevel, hasSpouse});
    updateState({targetId: id});
  };

  let updatedData: dataObjectType | undefined = undefined;
  const updateParentData = (
    data: dataObjectType,
    newData: editedTextParents,
  ) => {
    updatedData = {
      id: data.id + 1,
      _comment: `${newData.fatherText.name} and Family`,
      name: newData.fatherText.name,
      spouse: newData.motherText.name,
      spouseProfile: profileUrl,
      order: 1,
      profile: profileUrl,
      children: [props.data[0]],
    };
    setIsEditing({modalVisible: false, type: undefined});
    updateIsSubmitted(false);
    updateState({treeData: [updatedData]});
  };

  const updateSpouseOrChildData = (
    newValue: editedTextSpouse | editedTextChild,
    targetId: number,
    type: 'spouse' | 'child',
  ) => {
    if (type === 'spouse') {
      if ('spouseText' in newValue) {
        jp.apply(
          treeData,
          `$..children[?(@.id ===${targetId})]`,
          (value: dataObjectType) => ({
            ...value,
            spouse: newValue.spouseText.name,
            spouseProfile: newValue.spouseText.profile,
          }),
        );
        console.log(
          'new value: ',
          jp.query(treeData, '$..children[?(@.id === 1)]'),
        );
      }
    } else if (type === 'child') {
      let temp = newValue as editedTextChild;
      let childData: Partial<dataObjectType> = {
        _comment: `${temp.childText.name} and family`,
        name: temp.childText.name,
        spouse: temp.spouseText?.name ?? null,
        profile: temp.childText.profile,
        spouseProfile: temp.spouseText?.profile ?? profileUrl,
      };
      jp.apply(
        treeData,
        `$..children[?(@.id ===${targetId})]`,
        (value: dataObjectType) => ({
          ...value,
          children: value.children
            ? [
                ...value.children,
                {
                  ...childData,
                  id: -1,
                  order: value.children[value.children.length - 1].order + 1,
                },
              ]
            : [{...childData, id: value.id - 1, order: 1}],
        }),
      );
      let prevId: number | undefined = undefined;
      jp.apply(treeData, '$..id', (val: number) => {
        // console.log('id: ', val);
        if (prevId === undefined) {
          prevId = 1;
          return 1;
        } else {
          prevId += 1;
          return prevId;
        }
      });
      console.log('CHANGED DATA: ', JSON.stringify(treeData));
      // console.log('new value: ', jp.query(treeData, '$..id'));
    }
    setIsEditing({modalVisible: false, type: undefined});
    updateIsSubmitted(false);
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
          const {name, spouse, profile, id, spouseProfile} = item;
          const info = {name, spouse, profile, spouseProfile};
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
                <TouchableOpacity
                  style={props.nodeStyle}
                  onPress={() => addParent(item.id, level, spouse !== null)}>
                  <ImageBackground
                    source={{uri: info.profile}}
                    style={{...props.imageStyle, alignItems: 'center'}}
                    borderRadius={50}>
                    <Text
                      style={{
                        ...styles.nodeTitleStyle,
                        bottom: -6 * totalWords(info.name),
                        ...props.nodeTitleStyle,
                        color: props.nodeTitleColor,
                      }}>
                      {info.name}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                {info.spouse && (
                  <View
                    style={[
                      styles.spouseInfoContainer,
                      level > 1 && {alignItems: 'center'},
                      (isShowStatusExist(id) ? !showStatus['' + id] : false)
                        ? level > 1
                          ? {alignItems: 'flex-start'}
                          : {alignItems: 'center'}
                        : {},
                      !hasChildren(item) && {alignItems: 'flex-start'},
                    ]}>
                    <View style={styles.spouseConnectingPathContainer}>
                      {level > 1 && (
                        <Svg height="90%" width="20">
                          <Line
                            x1="50%"
                            y1={
                              !hasChildren(item) && info.spouse !== null
                                ? '2%'
                                : '10%'
                            }
                            x2="50%"
                            y2="100%"
                            stroke={props.pathColor}
                            strokeWidth={props.strokeWidth}
                          />
                        </Svg>
                      )}

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Svg
                          height="12"
                          width={hasChildren(item) ? '53%' : '80%'}
                          style={{justifyContent: 'space-between'}}>
                          <Line
                            x1="0%"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke={props.pathColor}
                            strokeWidth={props.strokeWidth * 2}
                          />
                          <Line
                            x1="0%"
                            y1="100%"
                            x2="100%"
                            y2="100%"
                            stroke={props.pathColor}
                            strokeWidth={props.strokeWidth * 2}
                          />
                        </Svg>
                        {hasChildren(item) && (
                          <TouchableOpacity
                            onPress={e => toggleShowHide(id, e, level)}>
                            <View
                              style={[
                                styles.nodesLinkContainer,
                                {backgroundColor: props.pathColor},
                              ]}
                            />
                          </TouchableOpacity>
                        )}

                        <Svg height="12" width="50%">
                          <Line
                            x1="0%"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke={props.pathColor}
                            strokeWidth={props.strokeWidth * 2}
                          />
                          <Line
                            x1="0%"
                            y1="100%"
                            x2="100%"
                            y2="100%"
                            stroke={props.pathColor}
                            strokeWidth={props.strokeWidth * 2}
                          />
                        </Svg>
                      </View>
                      {(isShowStatusExist(id) ? showStatus['' + id] : true) &&
                        hasChildren(item) && (
                          <Svg height="100%" width="20">
                            <Line
                              x1="50%"
                              y1="0%"
                              x2="50%"
                              y2="95%"
                              stroke={props.pathColor}
                              strokeWidth={props.strokeWidth}
                            />
                          </Svg>
                        )}
                    </View>
                    <View
                      style={{
                        ...props.nodeStyle,
                        alignSelf: 'center',
                      }}>
                      <ImageBackground
                        source={{uri: info.spouseProfile}}
                        style={{
                          ...props.imageStyle,
                          alignItems: 'center',
                        }}
                        borderRadius={50}>
                        <Text
                          style={{
                            ...styles.nodeTitleStyle,
                            bottom: -6 * totalWords(info.name),
                            ...props.nodeTitleStyle,
                            color: props.nodeTitleColor,
                          }}>
                          {info.spouse}
                        </Text>
                      </ImageBackground>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {(isShowStatusExist(id) ? showStatus['' + id] : true) &&
                  hasChildren(item) &&
                  item.children.map((child, index) => {
                    const {name, spouse, profile} = child;
                    const info = {name, spouse, profile};
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
      {isRefresh ? (
        <View
          style={{
            height: treeDimensions.height,
            width: treeDimensions.width,
            ...styles.centeredView,
          }}>
          <ActivityIndicator
            animating={true}
            color={loaderColor}
            size="large"
          />
        </View>
      ) : (
        renderTree(treeData, 1)
      )}
    </View>
  );
};

FamilyTreeComp.defaultProps = defaultProps;

export default FamilyTreeComp;
