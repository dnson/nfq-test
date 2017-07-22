import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'
import SearchBox from 'react-google-maps/lib/places/SearchBox'
import {fillInAddressByGMAction, getGeoCodeAction} from './actions'

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `350px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  backgroundColor: `white`,
}

const mapStyle = {width: '84%', height: 300, paddingLeft: 50, paddingBottom: 15}

const Map = withScriptjs(
  withGoogleMap(props =>
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={global.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        inputPlaceholder='Search a location...'
        inputStyle={INPUT_STYLE}
        inputProps={props.inputProps}
      />
      {props.markers.map(
        (marker, idx) => <Marker position={marker.position} key={idx} />, // eslint-disable-line
      )}
    </GoogleMap>,
  ),
)

class MapWithSearchBox extends React.Component {
  static propTypes = {
    fillInAddressByGM: PropTypes.func.isRequired,
    getGeoCode: PropTypes.func.isRequired,
    streetName: PropTypes.string,
    ward: PropTypes.string,
    district: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }
  static defaultProps = {
    streetName: '',
    ward: '',
    district: '',
    city: '',
    country: '',
  }
  state = {
    bounds: null,
    center: {
      lat: 47.6205588,
      lng: -122.3212725,
    },
    markers: [],
  }
  componentWillMount() {
    const fullAddress = `${this.props.streetName}, ${this.props.ward}, ${this
      .props.district}, ${this.props.city}, ${this.props.country}`
    this.props.getGeoCode({
      fullAddress,
    })
  }
  componentWillReceiveProps(nextprops) {
    const marker = {
      position: {
        ...nextprops.geoCode,
      },
    }
    this.setState({
      center: marker.position,
      markers: [marker],
    })
  }
  handleMapMounted = map => {
    this._map = map
  }

  handleBoundsChanged = () => {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    })
  }

  handleSearchBoxMounted = searchBox => {
    this._searchBox = searchBox
  }

  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces()
    const address = {
      streetName: '',
      ward: '',
      district: '',
      city: '',
      country: '',
    }
    if (!(places[0] && places[0].address_components)) {
      return
    }
    places[0].address_components.forEach(addressComponent => {
      switch (addressComponent.types[0]) {
        case 'street_number':
          address.streetNumber = addressComponent.long_name
          break
        case 'route':
          address.route = addressComponent.long_name
          break
        case 'sublocality_level_1':
          address.ward = addressComponent.long_name
          break
        case 'administrative_area_level_2':
          address.district = addressComponent.long_name
          break
        case 'administrative_area_level_1':
          address.city = addressComponent.long_name
          break
        case 'country':
          address.country = addressComponent.long_name
          break
        default:
          break
      }
    })
    address.streetName = `${address.streetNumber || ''} ${address.route}`
    this.props.fillInAddressByGM(address)
    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }))

    // Set markers; set map center to first search result
    const mapCenter =
      markers.length > 0 ? markers[0].position : this.state.center

    this.setState({
      center: mapCenter,
      markers,
    })
  }

  render() {
    const {streetName, ward, district, city, country} = this.props
    let fullAddress = ''
    if (streetName || ward || district || city || country) {
      fullAddress = `${this.props.streetName}, ${this.props.ward}, ${this.props
        .district}, ${this.props.city}, ${this.props.country}`
    }

    return (
      <Map
        loadingElement={<div style={mapStyle} />}
        googleMapURL='https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDmaBurFqY5N0r826O9t_6XnOl8CK38ATQ'
        containerElement={<div style={mapStyle} />}
        mapElement={<div style={mapStyle} />}
        center={this.state.center}
        onMapMounted={this.handleMapMounted}
        onBoundsChanged={this.handleBoundsChanged}
        onSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
        markers={this.state.markers}
        inputProps={{value: fullAddress}}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillInAddressByGM: payload =>
      dispatch(fillInAddressByGMAction({payload})),
    getGeoCode: payload => dispatch(getGeoCodeAction.initiate({payload})),
  }
}

export default connect(null, mapDispatchToProps)(MapWithSearchBox)
