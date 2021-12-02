import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {isEditingType} from '../../../../App';
import ChildComp from '../AddDetailsComp/ChildComp';
import ParentComp from '../AddDetailsComp/ParentComp';
import SpouseComp from '../AddDetailsComp/SpouseComp';
import styles from './styles';
import LeftView from './SvgElements/LeftView';
import RightView from './SvgElements/RightView';
import TopView from './SvgElements/TopView';

type Props = {
  visibleObject: isEditingType;
  updateVisibility: (val: isEditingType) => void;
  isParentActive: boolean;
  isSpouseActive: boolean;
  isChildActive: boolean;
  _onChangeText: (val: string, type: string | undefined) => void;
  onSubmitParentData: () => void;
  onSubmitSpouseData: () => void;
  onSubmitChildData: () => void;
  setIsChildMale: (val: boolean) => void;
  isSubmitted: boolean;
  profilePic?: string;
};

const AddOptionsModal: React.FC<Props> = props => {
  const {
    visibleObject,
    updateVisibility,
    isParentActive,
    isChildActive,
    isSpouseActive,
    _onChangeText,
    onSubmitParentData,
    onSubmitSpouseData,
    onSubmitChildData,
    setIsChildMale,
    isSubmitted,
    profilePic,
  } = props;
  return (
    <Modal
      transparent={true}
      visible={visibleObject.modalVisible}
      onRequestClose={() => {
        updateVisibility({modalVisible: false});
      }}>
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          updateVisibility({modalVisible: false});
        }}>
        {(() => {
          switch (visibleObject.type) {
            case 'parent':
              return (
                <ParentComp
                  _onChangeText={_onChangeText}
                  onSubmit={onSubmitParentData}
                  onBackPress={() =>
                    updateVisibility({...visibleObject, type: undefined})
                  }
                  isBackVisible={visibleObject.type !== undefined}
                />
              );
            case 'spouse':
              return (
                <SpouseComp
                  _onChangeText={_onChangeText}
                  onSubmit={onSubmitSpouseData}
                  onBackPress={() =>
                    updateVisibility({...visibleObject, type: undefined})
                  }
                  isBackVisible={visibleObject.type !== undefined}
                />
              );
            case 'child':
              return (
                <ChildComp
                  _onChangeText={_onChangeText}
                  onSubmit={onSubmitChildData}
                  setIsChildMale={setIsChildMale}
                  onBackPress={() => {
                    console.log('visible: ', visibleObject);
                    updateVisibility({...visibleObject, type: undefined});
                  }}
                  isBackVisible={visibleObject.type !== undefined}
                />
              );
            default:
              return (
                <View>
                  <View>
                    <Text
                      style={[
                        styles.topText,
                        {color: isParentActive ? '#fff' : 'gray'},
                      ]}>
                      Add Parent
                    </Text>
                    <TouchableOpacity
                      style={styles.topView}
                      activeOpacity={isParentActive ? 0.2 : 1}
                      onPress={
                        isParentActive
                          ? () =>
                              updateVisibility({
                                ...visibleObject,
                                type: 'parent',
                              })
                          : () => {}
                      }>
                      <TopView
                        height={80}
                        width={185}
                        backGroundColor={isParentActive ? 'white' : 'gray'}
                        borderColor={'orange'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.centerParentView}>
                    <Text
                      style={[
                        styles.leftText,
                        {color: isSpouseActive ? '#fff' : 'gray'},
                      ]}>
                      Add {'\n'}Spouse
                    </Text>
                    <TouchableOpacity
                      activeOpacity={isSpouseActive ? 0.2 : 1}
                      onPress={
                        isSpouseActive
                          ? () =>
                              updateVisibility({
                                ...visibleObject,
                                type: 'spouse',
                              })
                          : () => {}
                      }>
                      <LeftView
                        height={150}
                        width={110}
                        backGroundColor={isSpouseActive ? 'white' : 'gray'}
                        borderColor={'orange'}
                      />
                    </TouchableOpacity>
                    <View style={styles.centerView}>
                      {/* Required to avoid modal from getting closed when clicking on picture */}
                      <TouchableOpacity activeOpacity={1}>
                        {profilePic !== undefined && (
                          <Image
                            source={{
                              uri: profilePic,
                            }}
                            style={styles.imgStyle}
                            resizeMode="cover"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={[
                        styles.rightText,
                        {color: isChildActive ? '#fff' : 'gray'},
                      ]}>
                      Add {'\n'} Child
                    </Text>
                    <TouchableOpacity
                      activeOpacity={isChildActive ? 0.2 : 1}
                      onPress={
                        isChildActive
                          ? () =>
                              updateVisibility({
                                ...visibleObject,
                                type: 'child',
                              })
                          : () => {}
                      }>
                      <RightView
                        height={150}
                        width={110}
                        backGroundColor={isChildActive ? 'white' : 'gray'}
                        borderColor={'orange'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
          }
        })()}
        {isSubmitted && (
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.centerInView}
          />
        )}
      </Pressable>
    </Modal>
  );
};

export default AddOptionsModal;
