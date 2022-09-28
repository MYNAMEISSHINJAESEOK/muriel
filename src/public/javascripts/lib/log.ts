class Log {

    public muriel : boolean;
    public type : string;
    public department : string | undefined;
    public name : string;
    public id : number;
    public loggedDate : LoggedDate;
    public boat : string | undefined;
    public crews : Array< Crew | DiveCrew >;
    public acts : Array <Activity>;
    public isBeingEdited : boolean;
    public hasStartedYet : boolean;
    public firstLogLinuxTime : number | undefined;
    public hasTravelledYet : boolean;
    public version : string;
    public bin : binDiver | any

    constructor(name : string, department : string) { 


        this.muriel = true;
        this.type = "shinjaeseok";
        this.department = department;
        this.name = name;
        this.id = new Date().getTime();
        this.loggedDate = new LoggedDate( this.id ); 
        this.boat = undefined;
        this.crews = [];
        this.acts = [];
        this.isBeingEdited = false;
        this.hasStartedYet = false;
        this.firstLogLinuxTime = undefined;
        this.hasTravelledYet = false;
        this.version = '0.01';

        switch(department) {
            case 'diver' :
                this.bin = new binDiver();
            break
        }
        
    }
}

class binDiver {

    public act : Array<Activity>;
    public diveSheets : Array<DiveSheet>;
    public crews : Array<DiveCrew>;

    constructor() {
        this.act = [];
        this.diveSheets = [];
        this.crews = [];
    }
}

class Crew {

    public timeOnBoard : Time | null;
    public timeOffBoard : Time | null;
    public id : number;
    public name : string;
    public isLeft : boolean;
    public isBeingEdited : boolean;
    public isStartMember : boolean;

    constructor(n : string) {

        this.timeOnBoard = null;
        this.timeOffBoard = null;

        this.id = new Date().getTime();
        this.name = n;
        this.isLeft = false;
        this.isBeingEdited = false;
        this.isStartMember = true;

    }

}

class DiveCrew extends Crew{

    public dive : DiverDetail;

    constructor (n: string) {

        super(n);
        this.dive = new DiverDetail();
        
    }
    
}

class DiverDetail {

    public preDive : boolean | PDD;

    public diveSheet : {

        diver : Array<DiveSheet>,
        supervisor : Array<DiveSheet>

    }

    constructor () {

        this.preDive = false;

        this.diveSheet = {

            diver : [],
            supervisor : [],

        }

    }
}

class PDD {

    public rf : string ;
    public drugAlcohol : boolean ;
    public decongestant : boolean ;
    public fitToDive : boolean ;
    public hydrated : boolean ;
    public anyRemarkable : string ;
    public doneBySupervisor : string;

    constructor (rf : string, da :boolean, dc :boolean, fd :boolean, hd :boolean, ar :string, sup:string) {

        this.rf = rf;
        this.drugAlcohol = da;
        this.decongestant = dc;
        this.fitToDive = fd;
        this.hydrated = hd;
        this.anyRemarkable = ar;
        this.doneBySupervisor = sup
        
    }

}

class Activity {

    public id : number;
    public location : string | undefined;
    public isBoatLog : boolean;
    public isWork : boolean;
    public activityDetail : BoatLog | DiverWorkSheet | undefined;
    public isFirstLog : boolean;
    public control : {isBeingEdited : boolean,
                      isEditable : boolean,
                      isTimeBeingEdited : boolean,
                    };
    public team : Array<Crew | DiveCrew>;
    public start : Start;
    public end : End;
    public confirm : Confirm;

    constructor() {

        this.id = new Date().getTime();
        this.location = undefined;
        this.isBoatLog = false;
        this.isWork = false;
        this.activityDetail = undefined;
        this.isFirstLog = false;
        this.control = {isBeingEdited : false,
                        isEditable : true,
                        isTimeBeingEdited : false};
        this.team = [];
        this.start = new Start();
        this.end = new End();
        this.confirm = new Confirm();

    }

}

class BoatLog {

    public isFuelled : boolean;
    public isPreStart : boolean;
    public isTravel : boolean;
    public isMaintenance : boolean;
    
    public fuelTaken : FuelTaken | undefined;
    public preStart : PreStart | undefined;
    public travelTo : Travel | undefined;
    public maintenance : Maintenance | undefined;

    public comment : string | null;

    constructor() {

        this.isFuelled = false;
        this.isPreStart = false;
        this.isTravel = false;
        this.isMaintenance = false;

        this.fuelTaken = undefined;
        this.preStart = undefined;
        this.travelTo = undefined;
        this.maintenance = undefined;

        this.comment = null;

    }

}

class PreStart {

    constructor () {

    }

}

class Travel {

    constructor () {

    }

}

class FuelTaken {

    constructor () {

    }

}

class Maintenance {

    constructor () {

    }

}

class WorkSheet {

    public taskDetail : string | null;
    public confirm : Confirm;

    constructor () {

        this.taskDetail =  null;
        this.confirm = new Confirm();

    }

}

class DiverWorkSheet extends WorkSheet {

    public type : string;
    public diverInitial : string | undefined;
    public supervisorInitial : string | undefined;
    public mort : MortSheet | boolean;
    public dive : Array<DiveSheet> | boolean;
    public depth : number | undefined;

    constructor() {

        super();
        this.type = "Diver Work Sheet";
        this.diverInitial = undefined;
        this.supervisorInitial = undefined;
        this.mort = false;
        this.dive = false;
        this.depth = undefined;

    }

}

const mortSortArray = ['total', "good", "old", 'dj', 'pinhead', 'runt', 'bent', 'predator_seal', 'predator_bird', 'munched', 'mature_male', 'mature_female', 'handling', 'loss_scale', 'loss_fin_tail', 'lesion', 'blood_pop_eye', 'gill_inverted', 'other_please_specify', 'reason_for_other']

class MortSheet {

    public total : number;
    public good : number;
    public old : number;
    public dj : number;
    public pinhead : number;
    public runt : number;
    public bent : number;
    public predator_seal : number;
    public predator_bird : number;
    public munched : number;
    public mature_male : number;
    public mature_female : number;
    public handling : number;
    public loss_scale : number;
    public loss_fin_tail : number;
    public lesion : number;
    public blood_pop_eye : number;
    public gill_inverted : number;
    public other_please_specify : number;
    public reason_for_other : string | undefined;
    public confirm : Confirm;

    constructor () {
        
        this.total = 0,
        this.good = 0,
        this.old = 0,
        this.dj = 0,
        this.pinhead = 0,
        this.runt = 0,
        this.bent = 0,
        this.predator_seal = 0,
        this.predator_bird = 0,
        this.munched = 0,
        this.mature_male = 0,
        this.mature_female = 0,
        this.handling = 0,
        this.loss_scale = 0,
        this.loss_fin_tail =0,
        this.lesion = 0,
        this.blood_pop_eye = 0,
        this.gill_inverted = 0,
        this.other_please_specify = 0,
        this.reason_for_other = undefined,
        this.confirm = new Confirm();

    }

}

class DiveSheet {
    
    public diver : string | undefined;
    public standByDiver : string | undefined;
    public supervisor : string | undefined;
    public rf : string | undefined;
    public rg : string | undefined;
    public rgAdjusted : string | undefined;

    public diverId : number | undefined;
    public standByDiverId : number | undefined;
    public supervisorId : number | undefined;

    public si : number | undefined;
    public plannedDepth : number | undefined;
    public ndl : number | undefined;
    public actualDepth : number | undefined;

    public mainAirBefore : number | undefined;
    public mainAirUsed : number | undefined;
    public mainAirAfter : number | undefined;

    public secondaryAirBefore : number | undefined;
    public secondaryAirUsed : number | undefined;
    public secondaryAirAfter : number | undefined;

    public isSafetyStop : boolean | undefined;
    public isDiverOK : boolean | undefined;

    public leftSurface : Time | undefined;
    public leftBottom : Time | undefined;
    public arrSurface : Time | undefined;
    public actualBottomTime : Time | undefined;
    public effectiveBottomTime : Time | undefined;
    public totalTime : Time| undefined;

    public anyRemarkable : string | null;

    public diveSheetId : number;
    public confirm : Confirm;
    
    constructor () {

        this.diver = undefined;
        this.diverId = undefined;
        this.standByDiver = undefined;
        this.standByDiverId = undefined;
        this.supervisor = undefined;
        this.supervisorId = undefined;
        this.si = undefined;
        this.rf = undefined;
        this.plannedDepth = undefined;
        this.ndl = undefined;
        this.leftSurface = undefined;
        this.leftBottom = undefined;
        this.arrSurface = undefined;
        this.actualBottomTime = undefined;
        this.effectiveBottomTime = undefined;
        this.actualDepth = undefined;
        this.rg = undefined;
        this.rgAdjusted = undefined;
        this.totalTime = undefined;
        this.mainAirBefore = undefined;
        this.mainAirUsed = undefined;
        this.mainAirAfter = undefined;
        this.secondaryAirBefore = undefined;
        this.secondaryAirUsed = undefined;
        this.secondaryAirAfter = undefined;
        this.isSafetyStop = undefined;
        this.isDiverOK = undefined;
        this.anyRemarkable = null;
        this.diveSheetId = new Date().getTime();
        this.confirm = new Confirm();
        
    }

}

class TimeControl {

    public time : Time | undefined;
    public methodName : string | undefined;


    constructor () {

        this.methodName = undefined;
        this.time = undefined;

    }

}

class Start extends TimeControl{

    constructor () {

        super();
        this.methodName = "start"

    }
 
}

class End extends Start{

    constructor () {

        super();
        this.methodName = "end"

    }

}

class Confirm extends TimeControl{

    public bool : boolean;

    constructor () {

        super();
        this.bool = false;
        this.methodName = "confirm"

    }

}

class LoggedDate {

    public date : number;
    public month : number;
    public year : number;

    constructor (linuxTime : number){
        
        const dateToday : Date = new Date(linuxTime);

        this.date = dateToday.getDate();
        this.month = dateToday.getMonth() +1;
        this.year = dateToday.getFullYear();

    }
}

class Time {
    
    public hrs : number;
    public min : number;
    public sec : number;
    public ms : number;

    constructor (hrs : number , min : number, sec :number, ms :number) {

        this.hrs = hrs ; 
        this.min = min ;
        this.sec = sec ;
        this.ms = ms
        
    }
    
}

const padStart = (targetLength: number, padString: string, str: string): string => {

    return str.length >= targetLength ? str : new Array(targetLength - str.length + 1).join(padString) + str;

};

const fetchTable = async (type : string) : Promise<void|Object>=> {
    
    let target : Object

    await fetch(`./${type}.JSON`)
        .then ( (file : Response) => 
        file.json()
        )
        .then (
            ( json : Object )=>
            {
                target = json
                return target
            }
        )
        .catch ( error =>
            console.error("뭔가 잘못됨: ", error)
        )

}