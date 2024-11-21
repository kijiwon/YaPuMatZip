export type StadiumType = {
    id:string,
    name: string,
    teams: string[];
    team_short: string[],
    team_short_color: string[],
    coordinates:{
        lat: number,
        lng:number
    }
}