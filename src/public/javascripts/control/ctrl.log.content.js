"use strict";
const ctrl = {
    savedLogList: {
        edit: (log, id) => {
            log.isBeingEdited = true;
        },
        del: (log, id) => {
        }
    },
    log: {
        start: (log, location) => {
            log.hasTravelledYet = true;
            console.log(log.hasTravelledYet);
            ctrl.acts.firstAct(log, location);
            saveLog(log);
        },
        getLoggedDate: (log) => `${log.loggedDate.date}-${log.loggedDate.month}-${log.loggedDate.year}`
    },
    boat: {
        chooseBoat: (log, name) => {
            log.hasStartedYet = true;
            log.boat = name;
            saveLog(log);
        }
    },
    crews: {
        addCrew: (log, name) => {
            if (log.department !== 'diver') {
                const newCrew = new Crew(name);
                newCrew.timeOnBoard = general.getTimeNow();
                log.crews.push(newCrew);
            }
            else {
                const newCrew = new DiveCrew(name);
                newCrew.timeOnBoard = general.getTimeNow();
                log.crews.push(newCrew);
            }
            saveLog(log);
        },
        delCrew: (log, id) => {
            log.crews = log.crews.filter(crew => crew.id !== id);
            saveLog(log);
        },
        getTimeOn: (log, id) => {
            const idArray = log.crews.map(crew => crew.id);
            const index = idArray.indexOf(id);
            const crew = log.crews[index];
            if (crew === undefined)
                throw new Error("crew is undefined, getTimeOn");
            if (crew.timeOnBoard === null) {
                return 'TBD';
            }
            else {
                const hrs = crew.timeOnBoard.hrs;
                const min = crew.timeOnBoard.min;
                const sec = crew.timeOnBoard.sec;
                return `${hrs}:${min}:${sec}`;
            }
        },
        getTimeOff: (log, id) => {
            const idArray = log.crews.map(crew => crew.id);
            const index = idArray.indexOf(id);
            const crew = log.crews[index];
            if (crew === undefined)
                throw new Error("crew is undefined, getTimeOn");
            if (crew.timeOffBoard === null) {
                return 'TBD';
            }
            else {
                const hrs = crew.timeOffBoard.hrs;
                const min = crew.timeOffBoard.min;
                const sec = crew.timeOffBoard.sec;
                return `${hrs}:${min}:${sec}`;
            }
        },
        edit: (log, id) => {
            const idArray = log.crews.map(crew => crew.id);
            const index = idArray.indexOf(id);
            const crew = log.crews[index];
            if (crew === undefined)
                throw new Error("crew is undefined, getTimeOn");
            crew.isBeingEdited = true;
            saveLog(log);
        },
        update: (log, id, obj) => {
            const idArray = log.crews.map(crew => crew.id);
            const index = idArray.indexOf(id);
            const crew = log.crews[index];
            if (crew === undefined)
                throw new Error("crew is undefined, getTimeOff");
            crew.isBeingEdited = false;
            saveLog(log);
        },
        bin: (log, id) => {
            const idArray = log.crews.map(crew => crew.id);
            const index = idArray.indexOf(id);
            const crew = log.crews[index];
            if (crew === undefined)
                throw new Error("crew is undefined, bin");
            log.bin.crews.push(crew);
            log.crews.splice(index, 1);
            saveLog(log);
        },
        dive: {
            pdd: {
                start: (log, crewID) => {
                    const idArray = log.crews.map(crew => crew.id);
                    const index = idArray.indexOf(crewID);
                    const crew = log.crews[index];
                    if (crew === undefined)
                        throw new Error("crew is undefined, pdd start");
                    if (crew.dive.preDive !== false)
                        throw new Error("preDive is not false with pdd not having started");
                    crew.dive.preDive = true;
                    saveLog(log);
                },
                confirm: (log, crewID, pdd) => {
                    const idArray = log.crews.map(crew => crew.id);
                    const index = idArray.indexOf(crewID);
                    const crew = log.crews[index];
                    if (crew === undefined)
                        throw new Error("crew is undefined, pdd start");
                    crew.dive.preDive = pdd;
                    saveLog(log);
                }
            }
        }
    },
    acts: {
        control: {
            validIndexCheck: (log, id) => {
                const index = ctrl.acts.getIndex(log, id);
                const targetAct = log.acts[index];
                if (targetAct === undefined) {
                    throw new Error("cannot find the activity that is corresponding to the id");
                }
            }
        },
        newAct: {
            before: (log, id) => {
                const newAct = new Activity();
                newAct.location = 'TBD';
                const index = ctrl.acts.getIndex(log, id);
                if (index - 1 < 0) {
                    alert('Cannot create a new activity before the first log');
                    throw new Error('index value negative- ctrl.acts.newAct');
                }
                log.acts.splice(index, 0, newAct);
                saveLog(log);
            },
            after: (log, id) => {
                const newAct = new Activity();
                const index = ctrl.acts.getIndex(log, id);
                log.acts.splice(index + 1, 0, newAct);
                saveLog(log);
            }
        },
        edit: {
            editTime: (log, id) => {
                const index = ctrl.acts.getIndex(log, id);
                const target = log.acts[index];
                if (target !== undefined) {
                    target.control.isTimeBeingEdited = true;
                    saveLog(log);
                }
                else {
                    console.error("target is undefined", `index : ${index}, target act : ${target}`);
                }
            },
            updateTime: (log, id, startTime, endTime) => {
                const index = ctrl.acts.getIndex(log, id);
                const target = log.acts[index];
                if (target !== undefined) {
                    target.control.isTimeBeingEdited = false;
                    const bool1 = general.timeValidCheck(startTime);
                    const bool2 = general.timeValidCheck(endTime);
                    if (bool1 && bool2) {
                        const timeStartObject = general.getTimeObject(startTime);
                        target.start.time = timeStartObject;
                        const timeEndObject = general.getTimeObject(endTime);
                        target.end.time = timeEndObject;
                        saveLog(log);
                    }
                    else {
                        saveLog(log);
                    }
                }
                else {
                    throw new Error();
                }
            },
            edit: (log, id) => {
                const index = ctrl.acts.getIndex(log, id);
                const target = log.acts[index];
                if (target !== undefined) {
                    target.control.isBeingEdited = true;
                    saveLog(log);
                }
            },
            update: (log, id, object) => {
                const index = ctrl.acts.getIndex(log, id);
                const target = log.acts[index];
                if (target !== undefined) {
                    target.control.isBeingEdited = false;
                    saveLog(log);
                }
            }
        },
        diverworksheet: {
            mort: {
                check: (log, id) => {
                    const index = ctrl.acts.getIndex(log, id);
                    const targetAct = log.acts[index];
                    if (targetAct === undefined) {
                        throw new Error("cannot find the activity that is corresponding to the id");
                    }
                    const workSheet = targetAct.activityDetail;
                    if (workSheet instanceof BoatLog || workSheet === undefined) {
                        throw new Error("this target Activity is not the Act that has got the correct type for this method");
                    }
                    workSheet.mort = new MortSheet();
                    saveLog(log);
                },
                uncheck: (log, id) => {
                    const index = ctrl.acts.getIndex(log, id);
                    const targetAct = log.acts[index];
                    if (targetAct === undefined) {
                        throw new Error("cannot find the activity that is corresponding to the id");
                    }
                    const workSheet = targetAct.activityDetail;
                    if (workSheet instanceof BoatLog || workSheet === undefined) {
                        throw new Error("this target Activity is not the Act that has got the correct type for this method");
                    }
                    workSheet.mort = false;
                    ;
                    saveLog(log);
                }
            },
            dive: {
                check: (log, id) => {
                    const index = ctrl.acts.getIndex(log, id);
                    const targetAct = log.acts[index];
                    if (targetAct === undefined) {
                        throw new Error("cannot find the activity that is corresponding to the id");
                    }
                    const workSheet = targetAct.activityDetail;
                    if (workSheet instanceof BoatLog || workSheet === undefined) {
                        throw new Error("this target Activity is not the Act that has got the correct type for this method");
                    }
                    workSheet.dive = true;
                    saveLog(log);
                },
                uncheck: (log, id) => {
                    const index = ctrl.acts.getIndex(log, id);
                    const targetAct = log.acts[index];
                    if (targetAct === undefined) {
                        throw new Error("cannot find the activity that is corresponding to the id");
                    }
                    const workSheet = targetAct.activityDetail;
                    if (workSheet instanceof BoatLog || workSheet === undefined) {
                        throw new Error("this target Activity is not the Act that has got the correct type for this method");
                    }
                    workSheet.dive = false;
                    saveLog(log);
                },
                create: (log, id) => {
                    const index = ctrl.acts.getIndex(log, id);
                    const targetAct = log.acts[index];
                    if (targetAct === undefined) {
                        throw new Error("cannot find the activity that is corresponding to the id");
                    }
                    const workSheet = targetAct.activityDetail;
                    if (workSheet instanceof BoatLog || workSheet === undefined) {
                        throw new Error("this target Activity is not the Act that has got the correct type for this method");
                    }
                    if (workSheet.dive === false) {
                        throw new Error("dive is false ctrl.acts.dive.create");
                    }
                    else if (workSheet.dive === true) {
                        workSheet.dive = new Array();
                        const newDiveSheet = new DiveSheet();
                        workSheet.dive.push(newDiveSheet);
                        saveLog(log);
                    }
                    else {
                        const newDiveSheet = new DiveSheet();
                        workSheet.dive.push(newDiveSheet);
                        saveLog(log);
                    }
                },
                deleteDiveSheet(log, actId, diveId) {
                    const index = ctrl.acts.getIndex(log, actId);
                    const targetAct = log.acts[index];
                    if (targetAct === undefined)
                        throw new Error("targetAct is undefined");
                    const targetWorkSheet = targetAct.activityDetail;
                    if (targetWorkSheet === undefined)
                        throw new Error("worksheet is undefined");
                    if (targetWorkSheet instanceof BoatLog)
                        throw new Error("this act is boatlog");
                    const targetDiveSheet = targetWorkSheet.dive;
                    if (typeof targetDiveSheet === 'boolean')
                        throw new Error("there's no divesheet for this act");
                    const arrayDiveSheets = targetDiveSheet;
                    targetWorkSheet.dive = arrayDiveSheets.filter(divesheet => divesheet.diveSheetId !== diveId);
                }
            }
        },
        delAct: (log, id) => {
            log.acts = log.acts.filter(act => act.id !== id);
            saveLog(log);
        },
        firstAct: (log, location) => {
            if (log.boat === undefined) {
                log.boat = 'Something Else';
            }
            const firstAct = new Activity();
            firstAct.isFirstLog = true;
            firstAct.isBoatLog = true;
            firstAct.control.isEditable = false;
            firstAct.team = log.crews;
            firstAct.location = location;
            log.acts.push(firstAct);
            ctrl.acts.start(log, firstAct.id);
            ctrl.acts.isBoatLog(log, firstAct.id);
            const timeObject = firstAct.start.time;
            if (timeObject === undefined) {
                return console.error('firstAct time is undefined, ctrl.acts.firstAct');
            }
            const comment = `${log.boat.toUpperCase()} log has started at ${location}, ${timeObject.hrs}:${timeObject.min}:${timeObject.sec}.${timeObject.ms}`;
            ctrl.acts.boatLogComment(log, firstAct.id, comment);
            log.firstLogLinuxTime = firstAct.id;
            saveLog(log);
        },
        chooseType: (log, id, type) => {
            const index = ctrl.acts.getIndex(log, id);
            const target = log.acts[index];
            if (target === undefined) {
                throw new Error('target act is undefined - ctrl.acts.chooseType');
            }
            else {
                switch (type) {
                    case 'Work Sheet':
                        target.isWork = true;
                        switch (log.department) {
                            case 'diver':
                                target.activityDetail = new DiverWorkSheet();
                                break;
                            default:
                                throw new Error(`LOG DEPARTMENT : ${log.department}`);
                        }
                        break;
                    case 'Boat Log':
                        target.isBoatLog = true;
                        target.activityDetail = new BoatLog();
                        break;
                    default:
                        break;
                }
            }
            saveLog(log);
        },
        start: (log, id) => {
            const index = ctrl.acts.getIndex(log, id);
            const target = log.acts[index];
            if (target === undefined) {
                console.error('target act is undefined - ctrl.acts.start');
            }
            else {
                const t = new Date();
                target.start = new Start();
                target.start.time = new Time(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
            }
            saveLog(log);
        },
        isBoatLog: (log, id) => {
            const index = ctrl.acts.getIndex(log, id);
            const target = log.acts[index];
            if (target === undefined) {
                console.error('target act is undefined - ctrl.acts.isBoatLog');
            }
            else {
                target.activityDetail = new BoatLog();
            }
            saveLog(log);
        },
        boatLogComment: (log, id, comment) => {
            const index = ctrl.acts.getIndex(log, id);
            const target = log.acts[index];
            if (target === undefined) {
                console.error('target act is undefined - ctrl.acts.boatLogComment');
            }
            else {
                const targetBoatLog = target.activityDetail;
                if (targetBoatLog === undefined) {
                    console.error('target activityDetail is undefined');
                }
                else if (targetBoatLog instanceof DiverWorkSheet) {
                    console.error('target activityDetail is worksheet');
                }
                else {
                    targetBoatLog.comment = comment;
                }
            }
            saveLog(log);
        },
        deduplicate: (log) => {
            let total = 0;
            log.acts.forEach(act => {
                if (log.acts.map(a => a.id).indexOf(act.id) !== log.acts.indexOf(act)) {
                    act.id = act.id + 1;
                    total += 1;
                    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                }
                total += 1;
            });
            if (total > 0)
                saveLog(log);
        },
        getIndex: (log, id) => {
            ctrl.acts.deduplicate(log);
            const index = log.acts.map(act => act.id).indexOf(id);
            return index;
        },
        getStartTime: (log, id) => {
            const index = ctrl.acts.getIndex(log, id);
            const time = log.acts[index]?.start.time;
            if (time === undefined) {
                return 'TBD';
            }
            return `${time.hrs}:${time.min}:${time.sec}`;
        },
        getEndTime: (log, id) => {
            const index = ctrl.acts.getIndex(log, id);
            const time = log.acts[index]?.end.time;
            if (time === undefined) {
                return 'TBD';
            }
            return `${time.hrs}:${time.min}:${time.sec}`;
        }
    }
};
const general = {
    timeValidCheck: (timeInputValue) => {
        const array = timeInputValue.split(':');
        if (array.length === 3) {
            return true;
        }
        else {
            return false;
        }
    },
    getTimeObject: (timeInputValue) => {
        const array = timeInputValue.split(':');
        const hrs = array[0];
        const mins = array[1];
        const secs = array[2];
        if (hrs !== undefined && mins !== undefined && secs !== undefined) {
            return new Time(parseInt(hrs), parseInt(mins), parseInt(secs), 0);
        }
        else {
            throw new Error(`hrs, mins, secs wrong ${hrs} ${mins} ${secs}`);
        }
    },
    getTimeNow: () => {
        const d = new Date();
        return new Time(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
    }
};
