import React, { Component } from 'react'
import { Text, View, Slider, Button, TextInput } from 'react-native';
import Sound from 'react-native-sound'
import click1 from './assets/click1.mp3'
import click2 from './assets/click2.mp3'
export default class Met extends Component {

  constructor(props) {
    super(props);
    this.click1=null;
    this.click2=null;
  }

  state = {
    bpm: 100,
    playing: false,
    count: 0,
    beatPerMeasure: 4
  }

  async componentDidMount() {
    Sound.setCategory('Playback');
    this.click1 =  new Sound("click1.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }// loaded successfully
    

    });
    this.click2 = new Sound("click2.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }// loaded successfully
    
      // Play the sound with an onEnd callback
     
    });
  }


    // https://docs.expo.io/versions/v28.0.0/sdk/audio#__next
    // https://github.com/expo/playlist-example/blob/master/App.js
    // https://daveceddia.com/react-practice-projects/

    startStop = () => {
      if (this.state.playing) {
        // Stop the timer
        clearInterval(this.timer);
        this.setState({
          playing: false
        });
      } else {
        // Start a timer with the current BPM
        this.timer = setInterval(
          this.playClick,
          (60 / this.state.bpm) * 1000
        );
        this.setState(
          {
            count: 0,
            playing: true
            // Play a click "immediately" (after setState finishes)
          },
          this.playClick
        );
      }
    };

    playClick = () => {
      const { count, beatsPerMeasure } = this.state;

      // The first beat will have a different sound than the others
      if (count % beatsPerMeasure === 0) {
        this.click1?.play((success) => {
          if (success) {
          } else {
            console.log(' failed due to audio decoding errors');
          }
        });
      } else {
        this.click2?.play((success) => {
          if (success) {
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }

      // Keep track of which beat we're on
      this.setState(state => ({
        count: (state.count + 1) % state.beatsPerMeasure
      }));
    };

    handleBpmChange = bpm => {

      if (this.state.playing) {
        // Stop the old timer and start a new one
        clearInterval(this.timer);
        this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

        // Set the new BPM, and reset the beat counter
        this.setState({
          count: 0,
          bpm
        });
      } else {
        // Otherwise just update the BPM
        this.setState({ bpm });
      }
    };



  render() {
    const { bpm, playing } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.bpmTitle}>{bpm} BPM</Text>
        <TextInput
        
      style={{width:80, height:50, backgroundColor:"white", borderWidth: 1, borderRadius:7,fontSize: 35, paddingLeft:5 }}
        onChangeText={(text)=>{
          this.handleBpmChange(parseInt(text));
        }}
        value={this.state.bpm}
        name={this.props.name? this.props.name: "value"}
      />
        {/* <Slider
          style={styles.slider}
          maximumValue={180}
          minimumValue={60}
          onValueChange={this.handleBpmChange}
          step={1}
          value={bpm}
        /> */}
        <View style={{width:100, height:40, borderRadius:25,   justifyContent:"center", alignItems:"center", marginLeft:5, backgroundColor:"white", marginTop:20}}>
        <Button
        style={styles.button}
        onPress={this.startStop}
        title={ playing ? "Stop" : "Play"}
        accessibilityLabel="Start and Stop The Metronome"
        />
        </View>
      </View>
    )
  }
}

const styles = {
  bpmTitle: {
    fontSize: 35,
    marginBottom: 10,
    marginTop: 20,
    color:"white"
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  slider : {
    height: 3,
    width: 300
  },
  button: {
    fontSize:70,
    color:"white"
  }
}