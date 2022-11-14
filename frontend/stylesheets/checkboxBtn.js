import styled, { css } from "styled-components";
import { Dimensions } from "react-native";

const {width} = Dimensions.get("window");

const CheckboxBtn = styled.TouchableOpacity`
        margin: 2.5px;
        padding: 5px;
        border-radius: 5px;
        flex-direction: row;
        justify-content: center;
        min-width: ${width/2.5}px;
        background: grey;

        ${(props) => 
            props.isChecked &&
            css`
                background: #1E5128;
            `
        }
        ${(props) => 
            props.disabled &&
            css`
                background: grey;
            `
        }
    `;

export default CheckboxBtn;