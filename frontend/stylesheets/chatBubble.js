import styled, { css } from "styled-components";
import { Dimensions } from "react-native";

const {width} = Dimensions.get('window');

const ChatBubble = styled.View`
    background: darkgreen;
    align-self: flex-end;
    padding: 10px;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 5px;
    max-width: ${width/1.5}px;

    ${(props) => 
        props.sender &&
        css`
            align-self: flex-start;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 15px;
            background: grey;
        `
    }
    ${(props) => 
        props.admin &&
        css`
            align-self: flex-end;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 5px;
            background: white;
            margin-bottom: 15px;
        `
    }

    ${(props) =>
        props.time &&
        css`
            background: transparent;
            align-self: flex-end;
            padding: 0px;
            margin-top: 0px;
            margin-bottom: 5px;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 0px;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            max-width: ${width/1.5}px;
        `
    }

    ${(props) =>
        props.timeSender &&
        css`
            background: transparent;
            align-self: flex-start;
            padding: 0px;
            margin-top: 0px;
            margin-bottom: 5px;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 0px;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            max-width: ${width/1.5}px;
        `
    }
`

export default ChatBubble;