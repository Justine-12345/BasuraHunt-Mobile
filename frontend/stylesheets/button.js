import styled, { css } from "styled-components";
import { Dimensions } from "react-native";

const {width} = Dimensions.get("window");

const BhButton = styled.TouchableOpacity`
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        flex-direction: row;
        justify-content: center;
        width: 100px;
        background: #1E5128;

        ${(props) => 
            props.disabled &&
            css`
                background: grey;
            `
        }
        ${(props) => 
            props.right &&
            css`
                align-self: flex-end
            `
        }
        ${(props) => 
            props.left &&
            css`
                align-self: flex-start
            `
        }
        ${(props) => 
            props.center &&
            css`
                align-self: center
            `
        }
        ${(props) => 
            props.medium &&
            css`
                width: 150px
            `
        }
        ${(props) => 
            props.large &&
            css`
                width: 200px
            `
        }
        ${(props) => 
            props.fullwidth &&
            css`
                width: 100%
            `
        }
        ${(props) => 
            props.fullwidthBorder &&
            css`
                width: 100%
            `
        }
        ${(props) => 
            props.gray &&
            css`
                background: gray
            `
        }
    `;

export default BhButton;