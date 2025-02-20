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
    tips?: TipsType[] 
}

export type TipsType = {
    tip?:string,
    delivery_zone?: string
}