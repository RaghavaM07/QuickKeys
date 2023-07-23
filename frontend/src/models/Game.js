export class Game {
    constructor(textToType,duration,typedText,gameType) {
        this.textToType = textToType;
        this.duration = duration;
        this.gameType = gameType;
    }
    static getAccuracy(typedlength,inCorrects){
        if(typedlength===0) return 0;
        return (((typedlength-inCorrects)/typedlength).toFixed(2))*100;
    }
    static getSpeed(typedlength,inCorrects,currentTime){
        // const lettersPerMin = (typedlength+inCorrects)/currentTime;
        // return (lettersPerMin/7)*60;
        function calculateTypingSpeed(stringLength, incorrectCharacters, timeTakenInMinutes) {
            const totalCharactersTyped = stringLength;
            const totalIncorrectCharacters = incorrectCharacters;
            const wordsTyped = (totalCharactersTyped + totalIncorrectCharacters) / 5;
            const typingSpeedWPM = wordsTyped / timeTakenInMinutes;
            return typingSpeedWPM.toFixed(2);
          }
          return calculateTypingSpeed(typedlength,inCorrects,currentTime/60)
    }
}

export const Difficulty = Object.freeze({
        'EASY' : {
            duration : 90
        },
        'MEDIUM' : {
            duration : 180
        },
        'HARD' : {
            duration : 240
        }
  })