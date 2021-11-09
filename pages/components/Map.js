import React, { useEffect } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 
    'pk.eyJ1IjoiZW11b2h3byIsImEiOiJja3ZuMG82cGIxMG45MnhvNTQ3eDI0OWt2In0.Ky1aojkgMMEQvZoyDHrO7g';


const Map = (props) => {
  console.log(props)

    useEffect(() => {
      const map = new mapboxgl.Map({
        container: "map",
        // style: 'mapbox://styles/drakosi/ckvcwq3rdw431o3i2ho8tph',
          style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99.29011, 39.39172],
        zoom: 3
      });

      // addToMap(map);
      
      if (props.pickupCoordinates) {
        addToMap(map, props.pickupCoordinates)
      }

      if (props.dropoffCoordinates) {
        addToMap(map, props.dropoffCoordinates)
      }

      if ( props.pickupCoordinates && props.dropoffCoordinates) {
        map.fitBounds([
          props.pickupCoordinates,
          props.dropoffCoordinates
        ],{
          padding: 60
        })
      }

    },[props.pickupCoordinates, props.dropoffCoordinates]);

    const addToMap = (map, coordinates) => {
      const marker1 = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
    }

    
    return <Wrapper id="map"></Wrapper>
}

export default Map


const Wrapper = tw.div`
  flex-1
`;