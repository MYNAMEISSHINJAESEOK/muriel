"use strict";
class Log {
    muriel;
    type;
    department;
    name;
    id;
    loggedDate;
    boat;
    crews;
    acts;
    isBeingEdited;
    hasStartedYet;
    firstLogLinuxTime;
    hasTravelledYet;
    version;
    bin;
    constructor(name, department) {
        this.muriel = true;
        this.type = "shinjaeseok";
        this.department = department;
        this.name = name;
        this.id = new Date().getTime();
        this.loggedDate = new LoggedDate(this.id);
        this.boat = undefined;
        this.crews = [];
        this.acts = [];
        this.isBeingEdited = false;
        this.hasStartedYet = false;
        this.firstLogLinuxTime = undefined;
        this.hasTravelledYet = false;
        this.version = '0.01';
        switch (department) {
            case 'diver':
                this.bin = new binDiver();
                break;
        }
    }
}
class binDiver {
    act;
    diveSheets;
    crews;
    constructor() {
        this.act = [];
        this.diveSheets = [];
        this.crews = [];
    }
}
class Crew {
    timeOnBoard;
    timeOffBoard;
    id;
    name;
    isLeft;
    isBeingEdited;
    isStartMember;
    constructor(n) {
        this.timeOnBoard = null;
        this.timeOffBoard = null;
        this.id = new Date().getTime();
        this.name = n;
        this.isLeft = false;
        this.isBeingEdited = false;
        this.isStartMember = true;
    }
}
class DiveCrew extends Crew {
    dive;
    constructor(n) {
        super(n);
        this.dive = new DiverDetail();
    }
}
class DiverDetail {
    preDive;
    diveSheet;
    constructor() {
        this.preDive = false;
        this.diveSheet = {
            diver: [],
            supervisor: [],
        };
    }
}
class PDD {
    rf;
    drugAlcohol;
    decongestant;
    fitToDive;
    hydrated;
    anyRemarkable;
    doneBySupervisor;
    constructor(rf, da, dc, fd, hd, ar, sup) {
        this.rf = rf;
        this.drugAlcohol = da;
        this.decongestant = dc;
        this.fitToDive = fd;
        this.hydrated = hd;
        this.anyRemarkable = ar;
        this.doneBySupervisor = sup;
    }
}
class Activity {
    id;
    location;
    isBoatLog;
    isWork;
    activityDetail;
    isFirstLog;
    control;
    team;
    start;
    end;
    confirm;
    constructor() {
        this.id = new Date().getTime();
        this.location = undefined;
        this.isBoatLog = false;
        this.isWork = false;
        this.activityDetail = undefined;
        this.isFirstLog = false;
        this.control = { isBeingEdited: false,
            isEditable: true,
            isTimeBeingEdited: false };
        this.team = [];
        this.start = new Start();
        this.end = new End();
        this.confirm = new Confirm();
    }
}
class BoatLog {
    isFuelled;
    isPreStart;
    isTravel;
    isMaintenance;
    fuelTaken;
    preStart;
    travelTo;
    maintenance;
    comment;
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
    constructor() {
    }
}
class Travel {
    constructor() {
    }
}
class FuelTaken {
    constructor() {
    }
}
class Maintenance {
    constructor() {
    }
}
class WorkSheet {
    taskDetail;
    confirm;
    constructor() {
        this.taskDetail = null;
        this.confirm = new Confirm();
    }
}
class DiverWorkSheet extends WorkSheet {
    type;
    diverInitial;
    supervisorInitial;
    mort;
    dive;
    depth;
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
const mortSortArray = ['total', "good", "old", 'dj', 'pinhead', 'runt', 'bent', 'predator_seal', 'predator_bird', 'munched', 'mature_male', 'mature_female', 'handling', 'loss_scale', 'loss_fin_tail', 'lesion', 'blood_pop_eye', 'gill_inverted', 'other_please_specify', 'reason_for_other'];
class MortSheet {
    total;
    good;
    old;
    dj;
    pinhead;
    runt;
    bent;
    predator_seal;
    predator_bird;
    munched;
    mature_male;
    mature_female;
    handling;
    loss_scale;
    loss_fin_tail;
    lesion;
    blood_pop_eye;
    gill_inverted;
    other_please_specify;
    reason_for_other;
    confirm;
    constructor() {
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
            this.loss_fin_tail = 0,
            this.lesion = 0,
            this.blood_pop_eye = 0,
            this.gill_inverted = 0,
            this.other_please_specify = 0,
            this.reason_for_other = undefined,
            this.confirm = new Confirm();
    }
}
class DiveSheet {
    diver;
    standByDiver;
    supervisor;
    rf;
    rg;
    rgAdjusted;
    diverId;
    standByDiverId;
    supervisorId;
    si;
    plannedDepth;
    ndl;
    actualDepth;
    mainAirBefore;
    mainAirUsed;
    mainAirAfter;
    secondaryAirBefore;
    secondaryAirUsed;
    secondaryAirAfter;
    isSafetyStop;
    isDiverOK;
    leftSurface;
    leftBottom;
    arrSurface;
    actualBottomTime;
    effectiveBottomTime;
    totalTime;
    anyRemarkable;
    diveSheetId;
    confirm;
    constructor() {
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
    time;
    methodName;
    constructor() {
        this.methodName = undefined;
        this.time = undefined;
    }
}
class Start extends TimeControl {
    constructor() {
        super();
        this.methodName = "start";
    }
}
class End extends Start {
    constructor() {
        super();
        this.methodName = "end";
    }
}
class Confirm extends TimeControl {
    bool;
    constructor() {
        super();
        this.bool = false;
        this.methodName = "confirm";
    }
}
class LoggedDate {
    date;
    month;
    year;
    constructor(linuxTime) {
        const dateToday = new Date(linuxTime);
        this.date = dateToday.getDate();
        this.month = dateToday.getMonth() + 1;
        this.year = dateToday.getFullYear();
    }
}
class Time {
    hrs;
    min;
    sec;
    ms;
    constructor(hrs, min, sec, ms) {
        this.hrs = hrs;
        this.min = min;
        this.sec = sec;
        this.ms = ms;
    }
}
const padStart = (targetLength, padString, str) => {
    return str.length >= targetLength ? str : new Array(targetLength - str.length + 1).join(padString) + str;
};
const fetchTable = async (type) => {
    let target;
    await fetch(`./${type}.JSON`)
        .then((file) => file.json())
        .then((json) => {
        target = json;
        return target;
    })
        .catch(error => console.error("뭔가 잘못됨: ", error));
};
