import { useRouter } from "next/router";
import Link from "next/link"
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components"
import Map from "./components/Map"
import RideSelector from "./components/RideSelector";



function Confirm() {
    const router = useRouter();

    const { pickup, dropoff } = router.query;

    console.log(`pickup`, pickup)
    console.log(`dropoff`, dropoff)



    const [pickupCoordinates, setPickupCoordinates] = useState([0, 0])
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0])
    
    const getPickupCoordinates = (pickup) => {
        // 
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + 
            new URLSearchParams({
                access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
                limit: 1
            })
        )
        .then(response => response.json())
        .then(data => {
            setPickupCoordinates(data.features[0].center)
        })
    }

    
    
    const getDropoffCoordinates = (dropoff) => {
        // 
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + 
            new URLSearchParams({
                access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
                limit: 1
            })
        )
        .then(response => response.json())
        .then(data => {
            setDropoffCoordinates(data.features[0].center)
        })
    }
    console.log(`pickupCoordinates`, pickupCoordinates)
    console.log(`dropoffCoordinates`, dropoffCoordinates)

    useEffect(() => {
        getPickupCoordinates(pickup)
        getDropoffCoordinates(dropoff)
    }, [pickup, dropoff])


    return (
        <Wrapper>
            <Map
              pickupCoordinates={pickupCoordinates}
              dropoffCoordinates={dropoffCoordinates} 
            />

            <BackBtnContainer>
                <Link href="/search">
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </Link>
            </BackBtnContainer>

            <RideContainer>
                <RideSelector
                    pickupCoordinates={pickupCoordinates}
                    dropoffCoordinates={dropoffCoordinates} 
               />
                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm UberX
                    </ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
            
        </Wrapper>
    )
}

export default Confirm;

const BackButton = tw.img`
h-10 bg-gray-50 rounded-full shadow-md cursor-pointer object-contain
`

const BackBtnContainer =  tw.div`
  absolute top-5 left-5
`

const Wrapper = tw.div`
  flex flex-col h-screen
`
const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`

const ConfirmButtonContainer = tw.div`
  border-t-2
`;

const ConfirmButton = tw.div`
bg-black text-white m-4 py-4 text-center text-xl
`