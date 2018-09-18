import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

//assigning (this)to a variable to access in the get current location function

var _this;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: []
    };
    _this = this;
  }

  componentDidMount() {
    //getting user current location
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          //setting current location in state
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  onRegionChange(region) {
    _this.setState({ region: region });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          region={this.state.region}
          //more function for eg. onregionchange(), 
        >
        {/* Showing marker for user current location */}
          <Marker
            coordinate={this.state.region}
            title={"Current Postion"}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
