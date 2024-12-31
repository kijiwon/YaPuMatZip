export const useElapsedTimeToText = (date:Date) => {
    const seconds = 1;
    const minute = seconds*60;
    const hour = minute*60;
    const day = hour*24;

    const now = new Date();
    const elapsedTime = Math.trunc((now.getTime()-date.getTime())/1000);

    let elapsedText = '';
    if(elapsedTime <seconds){
        elapsedText = '방금 전';
    } else if(elapsedTime < minute){
        elapsedText = elapsedTime + '초 전';
    } else if(elapsedTime < hour){
        elapsedText = Math.trunc(elapsedTime/minute) + '분 전';
    } else if(elapsedTime < day){
        elapsedText = Math.trunc(elapsedTime / hour) + '시간 전';
    }else {
        elapsedText = new Date(date).toLocaleDateString();
    }

    return elapsedText;
}