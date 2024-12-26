export interface IComment{
    id:number;
    username:string;
    avatarimg:string;
    date:string;
    status:boolean;
    description:string;
    child:IComment[]
}