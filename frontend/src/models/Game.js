export class Game {
    constructor(textToType,duration,typedText,gameType) {
        this.textToType = textToType;
        this.duration = duration;
        this.gameType = gameType;
    }
    static getAccuracy(typedlength,inCorrects){
        if(typedlength===0) return 0;
        return typedlength/(typedlength+inCorrects);
    }
    static getSpeed(typedlength,inCorrects,currentTime){
        const lettersPerMin = (typedlength+inCorrects)/currentTime;
        return lettersPerMin/5;
    }
}

export const Difficulty = Object.freeze({
        'EASY' : {
            duration : 10
        },
        'MEDIUM' : {
            duration : 180
        },
        'HARD' : {
            duration : 240
        }
  })