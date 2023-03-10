import React, { Fragment } from 'react'
import { Text } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Octicons, Foundation } from "@expo/vector-icons";

const Star = ({ rate }) => {

    const starsCounter = [1, 2, 3, 4, 5]



    return (
        <>
            {starsCounter.map((starsCounter) => {
                if (starsCounter <= rate) {
                    return (
                        <Text key={starsCounter}>
                            <MaterialCommunityIcons
                                name="star"
                                color={'#fed900'}
                                size={20}
                            />
                        </Text>

                    )
                } else {
                    return (
                        <Text key={starsCounter}>
                            <MaterialCommunityIcons
                                name="star"
                                color={'grey'}
                                size={20}
                            />
                        </Text>
                    )
                }
            })
            }

        </>
    )

}

export default Star