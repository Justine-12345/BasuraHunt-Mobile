function RandomStringGenerator(strLeng) {
    let length = strLeng
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = ' ';
    const charactersLength = characters.length;
    for(let i = 0; i < length; i++) {
        result +=
        characters.charAt(Math.floor(Math.random() * charactersLength));
    }
     return result
}
export default RandomStringGenerator