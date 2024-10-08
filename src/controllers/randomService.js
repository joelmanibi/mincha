randomCodeGenerator = () => {
    var length = 2;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   
    return result;
  }
  
  randomCodeNumber = () => {
    var length = 2;
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   
    return result;
  }
  
  const MyConfig = {
    randomCodeGenerator: randomCodeGenerator,
    randomCodeNumber : randomCodeNumber
  };
  
  module.exports = MyConfig;