import React, {useState, useEffect, useRef, RefObject} from 'react';
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
  ActivityIndicator,
  ScrollView,
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
import {makeid} from '../../Utils/helperFunctions';
import FemaleComp from './GenderComp/FemaleComp';
import MaleComp from './GenderComp/MaleComp';
import styles from './styles';
const jp = require('jsonpath');

const {width} = Dimensions.get('screen');

interface LooseObject {
  [key: string]: any;
}

export type dataObjectType = {
  id: number;
  name: string;
  isMale: boolean;
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
  isChildMale?: boolean;
  updateEditedText: (val: editedTextType | undefined) => void;
  isSubmitted: boolean;
  updateIsSubmitted: (val: boolean) => void;
  scrollViewRef: RefObject<ScrollView>;
  updateProfilePic: (val: string) => void;
};

type State = {
  treeData: Array<dataObjectType>;
  showStatus: LooseObject;
  isRefresh: boolean;
  treeDimensions: {width: number; height?: number};
  targetId: number | undefined;
};

const FamilyTreeComp: React.FC<Props> = props => {
  const [state, setState] = useState<State>({
    treeData: props.data,
    showStatus: {},
    isRefresh: false,
    treeDimensions: {width: width},
    targetId: undefined,
  });
  const [maxId, setMaxId] = useState<number | null>(null);
  let flatListRef: FlatList<dataObjectType>;
  let connectingNodeRef = useRef<Array<TouchableOpacity>>([]);

  const {showStatus, isRefresh, treeData, targetId, treeDimensions} = state;
  const {
    title = 'My Family Tree',
    titleStyle = {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    titleColor = 'black',
    loaderColor = '#0095ff',
    isEditing,
    setIsEditing,
    editedText,
    updateEditedText,
    isSubmitted,
    updateIsSubmitted,
    pathColor = '#00ffd8',
    siblingGap = 50,
    imageStyle = {
      width: 90,
      height: 90,
      borderRadius: 90 / 2,
      resizeMode: 'cover',
    },
    nodeTitleColor = '#00ff00',
    familyGap = 30,
    strokeWidth = 5,
    nodeStyle = {
      width: 100,
      height: 100,
      marginBottom: 6,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nodeTitleStyle = {
      fontSize: 14,
      fontWeight: 'bold',
    },
    scrollViewRef,
    isChildMale,
    updateProfilePic,
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
  }, []);

  useEffect(() => {
    let isActive = true;
    console.log('running length', maxId);
    function runMeasure() {
      if (maxId !== null) {
        console.log('LENGTH: ', connectingNodeRef.current.length);
        if (connectingNodeRef.current.length === maxId! + 1) {
          if (isActive) {
            console.log('running measure');
            isActive = false;
            setElementDim();
          }
        }
      }
    }
    runMeasure();
    return () => {
      isActive = false;
    };
  }, [connectingNodeRef.current.length]);

  useEffect(() => {
    console.log('state updated: ', state);
  }, [state]);

  const setElementDim = () => {
    let temp: LooseObject = {};
    connectingNodeRef.current.forEach((eleRef, i) => {
      if (eleRef) {
        measurePromise(eleRef).then(res => {
          temp['' + i] = res;
          if (i === maxId!) {
            console.log('targetid ye hai: ', targetId);
            if (targetId !== undefined) {
              console.log('TARGET LOCATION: ', temp['' + targetId], targetId);
              if (temp['' + targetId]) {
                if (flatListRef) {
                  flatListRef.scrollToOffset({
                    offset: temp['' + targetId].x - 150,
                    animated: true,
                  });
                }
                if (scrollViewRef) {
                  scrollViewRef.current?.scrollTo({
                    x: 0,
                    y: temp['' + targetId].y,
                    animated: false,
                  });
                }
              }
            }
          }
        });
      }
    });
  };

  const measurePromise = (
    eleRef: TouchableOpacity,
  ): Promise<{x: number; y: number}> => {
    return new Promise((resolve, reject) => {
      eleRef.measure((x, y, width, height, pageX, pageY) => {
        resolve({x: pageX, y: pageY});
      });
    });
  };

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
    connectingNodeRef.current = [];
    const updatedState = {
      isRefresh: true,
      targetId: i,
    };
    if (!isShowStatusExist(i)) {
      temp['' + i] = false;
    } else {
      temp['' + i] = !temp['' + i];
    }
    console.log('TEMP STATUS HAI: ', temp);
    updateState({showStatus: temp, ...updatedState});
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
        setMaxId(null);
        connectingNodeRef.current = [];
        let tempIncrement: number = 0;
        switch (isEditing.type) {
          case 'parent':
            if (isActive) {
              updateParentData(editedText as editedTextParents);
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
              tempIncrement = updateSpouseOrChildData(
                editedText as editedTextSpouse,
                targetId!,
                'child',
              );
            }
            break;
        }
        updateEditedText(undefined);
        if (isEditing.type !== 'parent') {
          updateState({isRefresh: true, targetId: targetId! + tempIncrement});
        }
      }
    }
    submitData();
    return () => {
      isActive = false;
    };
  }, [isSubmitted]);

  const addData = (
    id: number,
    selectedLevel: number,
    hasSpouse: boolean,
    profilePicUri: string,
  ) => {
    setIsEditing({modalVisible: true, selectedLevel, hasSpouse});
    updateProfilePic(profilePicUri);
    updateState({targetId: id});
  };

  const updateParentData = (newData: editedTextParents) => {
    let updatedData: dataObjectType = {
      id: maxId! + 1,
      name: newData.fatherText.name,
      isMale: true,
      spouse: newData.motherText.name,
      spouseProfile: profileUrl,
      order: 1,
      profile: profileUrl,
      children: [treeData[0]],
    };
    setIsEditing({modalVisible: false, type: undefined});
    updateIsSubmitted(false);
    updateState({treeData: [updatedData], isRefresh: true});
  };

  const updateSpouseOrChildData = (
    newValue: editedTextSpouse | editedTextChild,
    targetId: number,
    type: 'spouse' | 'child',
  ): number => {
    let tempInc: number = 0;
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
      }
    } else if (type === 'child') {
      let temp = newValue as editedTextChild;
      let childData: Partial<dataObjectType> = {
        name: temp.childText.name,
        isMale: isChildMale,
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
            : [{...childData, id: maxId! + 1, order: 1}],
        }),
      );
      console.log('target value: ', targetId);
      let prevTemp: number;
      jp.query(treeData, '$..id').every((val: number) => {
        if (val === maxId! + 1 || val === -1) {
          return false;
        } else {
          prevTemp = val;
          return true;
        }
      });

      console.log('new target id hai: ', targetId + 1);
      console.log('new value: ', jp.query(treeData, '$..id'));
      console.log('replacable value: ', prevTemp!);
      jp.apply(treeData, '$..id', (val: number) => {
        if (val === maxId! + 1 || val === -1) {
          return prevTemp;
        } else if (val >= prevTemp) {
          return val + 1;
        } else {
          return val;
        }
      });
      if (targetId >= prevTemp!) {
        tempInc = 1;
      }
      console.log('replaced value: ', jp.query(treeData, '$..id'));
    }
    setIsEditing({modalVisible: false, type: undefined});
    updateIsSubmitted(false);
    return tempInc;
  };

  const renderTree = (data: Array<dataObjectType>, level: number) => {
    return (
      <FlatList
        ref={ref => {
          if (ref !== null) {
            flatListRef = ref;
          }
        }}
        data={data}
        horizontal={true}
        // style={{borderWidth: 5}}
        contentContainerStyle={{
          padding: 50,
          backgroundColor: '#DAE6E4',
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.name} + ${item.spouse}`}
        listKey={makeid(4)}
        initialScrollIndex={0}
        renderItem={({item, index}) => {
          const {name, spouse, profile, id, spouseProfile, isMale} = item;
          const info = {name, spouse, profile, spouseProfile};
          console.log('NAME: ', name, 'ID: ', id);
          return (
            <View
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: siblingGap / 4,
                },
                level > 1 && spouse !== null && {marginLeft: 200},
              ]}
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
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    marginBottom: 35,
                  }}>
                  {level > 1 && (
                    <Svg height="10" width="100%">
                      <Line
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                        stroke={pathColor}
                        strokeWidth={strokeWidth}
                      />
                    </Svg>
                  )}
                  <TouchableOpacity
                    ref={ref => {
                      if (ref !== null) connectingNodeRef.current[id] = ref;
                    }}
                    style={[nodeStyle]}
                    onPress={() =>
                      addData(item.id, level, spouse !== null, profile)
                    }>
                    {!isMale ? (
                      <FemaleComp
                        imageStyle={imageStyle}
                        name={info.name}
                        profile={info.profile}
                        nodeTitleColor={nodeTitleColor}
                        nodeTitleStyle={nodeTitleStyle}
                        totalWords={totalWords(info.name)}
                      />
                    ) : (
                      <MaleComp
                        imageStyle={imageStyle}
                        name={info.name}
                        profile={info.profile}
                        nodeTitleColor={nodeTitleColor}
                        nodeTitleStyle={nodeTitleStyle}
                        totalWords={totalWords(info.name)}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                {info.spouse && (
                  <View style={[styles.spouseInfoContainer]}>
                    <View style={[styles.spouseConnectingPathContainer]}>
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                          },
                          !hasChildren(item) && {marginBottom: 90},
                          !(isShowStatusExist(id)
                            ? showStatus['' + id]
                            : true) && {marginBottom: 85},
                        ]}>
                        <Svg
                          height="12"
                          width={hasChildren(item) ? '53%' : '80%'}>
                          <Line
                            x1="0%"
                            y1="50%"
                            x2="100%"
                            y2="50%"
                            stroke={pathColor}
                            strokeWidth={strokeWidth}
                          />
                        </Svg>
                        {hasChildren(item) && (
                          <TouchableOpacity
                            onPress={e => toggleShowHide(id, e, level)}>
                            <View
                              style={[
                                styles.nodesLinkContainer,
                                {backgroundColor: '#30AD4A'},
                              ]}
                            />
                          </TouchableOpacity>
                        )}
                        <Svg height="12" width="50%">
                          <Line
                            x1="0%"
                            y1="50%"
                            x2="100%"
                            y2="50%"
                            stroke={pathColor}
                            strokeWidth={strokeWidth}
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
                              y2="90%"
                              stroke={pathColor}
                              strokeWidth={strokeWidth}
                            />
                          </Svg>
                        )}
                    </View>
                    <View
                      style={[
                        nodeStyle,
                        {alignSelf: 'center', marginBottom: 80},
                      ]}>
                      {isMale ? (
                        <FemaleComp
                          imageStyle={imageStyle}
                          name={info.spouse}
                          profile={info.profile}
                          nodeTitleColor={nodeTitleColor}
                          nodeTitleStyle={nodeTitleStyle}
                          totalWords={totalWords(info.spouse)}
                        />
                      ) : (
                        <MaleComp
                          imageStyle={imageStyle}
                          name={info.spouse}
                          profile={info.profile}
                          nodeTitleColor={nodeTitleColor}
                          nodeTitleStyle={nodeTitleStyle}
                          totalWords={totalWords(info.spouse)}
                        />
                      )}
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
                          <Svg height="30" width="100%">
                            <Line
                              x1="50%"
                              y1="0"
                              x2="50%"
                              y2="100%"
                              stroke={pathColor}
                              strokeWidth={strokeWidth}
                            />
                            {/* Right side horizontal line */}
                            {hasChildren(item) &&
                              item.children.length != 1 &&
                              item.children.length - 1 !== index && (
                                <Line
                                  x1="100%"
                                  y1={strokeWidth / 2}
                                  x2="50%"
                                  y2={strokeWidth / 2}
                                  stroke={pathColor}
                                  strokeWidth={strokeWidth}
                                />
                              )}
                            {/* Left side horizontal line */}
                            {hasChildren(item) &&
                              item.children.length != 1 &&
                              index !== 0 && (
                                <Line
                                  x1="50%"
                                  y1={strokeWidth / 2}
                                  x2="0%"
                                  y2={strokeWidth / 2}
                                  stroke={pathColor}
                                  strokeWidth={strokeWidth}
                                />
                              )}
                          </Svg>
                          {renderTree([child], level + 1)}
                        </View>
                        <View
                          style={{
                            height: strokeWidth,
                            backgroundColor:
                              hasChildren(item) &&
                              item.children.length - 1 !== index
                                ? pathColor
                                : 'transparent',
                            width:
                              hasChildren(child) &&
                              child.children.length - 1 !== index
                                ? level * familyGap
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
      <Text style={[titleStyle, {color: titleColor}]}>{title}</Text>
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

export default FamilyTreeComp;
