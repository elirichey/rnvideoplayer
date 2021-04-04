import React, {Component} from 'react';

import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video, {FilterType} from 'react-native-video';

const filterTypes = [
  FilterType.NONE,
  FilterType.INVERT,
  FilterType.MONOCHROME,
  FilterType.POSTERIZE,
  FilterType.FALSE,
  FilterType.MAXIMUMCOMPONENT,
  FilterType.MINIMUMCOMPONENT,
  FilterType.CHROME,
  FilterType.FADE,
  FilterType.INSTANT,
  FilterType.MONO,
  FilterType.NOIR,
  FilterType.PROCESS,
  FilterType.TONAL,
  FilterType.TRANSFER,
  FilterType.SEPIA,
];

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      controls: false,
      paused: true,
      skin: 'custom',
      ignoreSilentSwitch: null,
      mixWithOthers: null,
      isBuffering: false,
      filter: FilterType.NONE,
      filterEnabled: true,
    };
  }

  onLoad = data => {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  };

  onProgress = data => {
    this.setState({currentTime: data.currentTime});
  };

  onBuffer = ({isBuffering}) => {
    this.setState({isBuffering});
  };

  getCurrentTimePercentage() {
    let {currentTime, duration} = this.state;
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  setFilter = step => {
    let {filter} = this.state;
    let index = filterTypes.indexOf(filter) + step;

    if (index === filterTypes.length) {
      index = 0;
    } else if (index === -1) {
      index = filterTypes.length - 1;
    }

    this.setState({
      filter: filterTypes[index],
    });
  };

  renderPlayerSkin(skin) {
    let isSelected = this.state.skin == skin;
    let selectControls = skin == 'native' || skin == 'embed';

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            controls: selectControls,
            skin: skin,
          });
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }

  renderRateControl(rate) {
    let isSelected = this.state.rate == rate;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({rate: rate});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    let isSelected = this.state.resizeMode == resizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({resizeMode: resizeMode});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  }

  renderVolumeControl(volume) {
    let isSelected = this.state.volume == volume;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({volume: volume});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }

  renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
    let isSelected = this.state.ignoreSilentSwitch == ignoreSilentSwitch;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ignoreSilentSwitch: ignoreSilentSwitch});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {ignoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    );
  }

  renderMixWithOthersControl(mixWithOthers) {
    let isSelected = this.state.mixWithOthers == mixWithOthers;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({mixWithOthers: mixWithOthers});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {mixWithOthers}
        </Text>
      </TouchableOpacity>
    );
  }

  renderCustomSkin() {
    let {
      filterEnabled,
      rate,
      paused,
      volume,
      muted,
      ignoreSilentSwitch,
      mixWithOthers,
      resizeMode,
      filter,
    } = this.state;

    let flexCompleted = this.getCurrentTimePercentage() * 100;
    let flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => {
            this.setState({paused: !paused});
          }}>
          <Video
            source={require('./assets/video/maggie.mp4')}
            style={styles.fullScreen}
            rate={rate}
            paused={paused}
            volume={volume}
            muted={muted}
            ignoreSilentSwitch={ignoreSilentSwitch}
            mixWithOthers={mixWithOthers}
            resizeMode={resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => {
              Alert.alert('Done!');
            }}
            repeat={true}
            filter={filter}
            filterEnabled={filterEnabled}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this.renderPlayerSkin('custom')}
              {this.renderPlayerSkin('native')}
              {this.renderPlayerSkin('embed')}
            </View>

            {filterEnabled ? (
              <View style={styles.skinControl}>
                <TouchableOpacity
                  onPress={() => {
                    this.setFilter(-1);
                  }}>
                  <Text style={styles.controlOption}>Previous Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setFilter(1);
                  }}>
                  <Text style={styles.controlOption}>Next Filter</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>
          <View style={styles.generalControls}>
            {Platform.OS === 'ios' ? (
              <>
                <View style={styles.ignoreSilentSwitchControl}>
                  {this.renderIgnoreSilentSwitchControl('ignore')}
                  {this.renderIgnoreSilentSwitchControl('obey')}
                </View>
                <View style={styles.mixWithOthersControl}>
                  {this.renderMixWithOthersControl('mix')}
                  {this.renderMixWithOthersControl('duck')}
                </View>
              </>
            ) : null}
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View
                style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
              />
              <View
                style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderNativeSkin() {
    let {
      skin,
      filterEnabled,
      rate,
      paused,
      volume,
      muted,
      ignoreSilentSwitch,
      mixWithOthers,
      resizeMode,
      controls,
      filter,
    } = this.state;

    let videoStyle =
      skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;

    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={require('./assets/video/maggie.mp4')}
            style={videoStyle}
            rate={rate}
            paused={paused}
            volume={volume}
            muted={muted}
            ignoreSilentSwitch={ignoreSilentSwitch}
            mixWithOthers={mixWithOthers}
            resizeMode={resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => {
              Alert.alert('Done!');
            }}
            repeat={true}
            controls={controls}
            filter={filter}
            filterEnabled={filterEnabled}
          />
        </View>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this.renderPlayerSkin('custom')}
              {this.renderPlayerSkin('native')}
              {this.renderPlayerSkin('embed')}
            </View>
            {filterEnabled ? (
              <View style={styles.skinControl}>
                <TouchableOpacity
                  onPress={() => {
                    this.setFilter(-1);
                  }}>
                  <Text style={styles.controlOption}>Previous Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setFilter(1);
                  }}>
                  <Text style={styles.controlOption}>Next Filter</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>
          <View style={styles.generalControls}>
            {Platform.OS === 'ios' ? (
              <>
                <View style={styles.ignoreSilentSwitchControl}>
                  {this.renderIgnoreSilentSwitchControl('ignore')}
                  {this.renderIgnoreSilentSwitchControl('obey')}
                </View>
                <View style={styles.mixWithOthersControl}>
                  {this.renderMixWithOthersControl('mix')}
                  {this.renderMixWithOthersControl('duck')}
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>
    );
  }

  render() {
    let {controls} = this.state;
    return controls ? this.renderNativeSkin() : this.renderCustomSkin();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mixWithOthersControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
});
