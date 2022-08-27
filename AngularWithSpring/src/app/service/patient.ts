export interface Patient {
    id:number|undefined;
	name:string;
	age:number;
	visitedDoctor:string|number;
	dataOfVist:Date;
	prescription:string;
}
