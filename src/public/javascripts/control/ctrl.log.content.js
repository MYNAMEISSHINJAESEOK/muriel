"use strict";
const ctrl = {
    savedLogListLocal: {
        create: (title, dep) => {
            if (typeof title !== 'string' || typeof dep !== 'string') {
                console.log('Title or Department Value Compromised');
            }
            else if (duplicateCheck(title)) {
                alert(`There's a log that has already got the same name, ${title}`);
            }
            else {
                const log = new Log(title, dep);
                saveLog(log);
            }
            function duplicateCheck(name) {
                const arrayKey = Object.keys(localStorage);
                return arrayKey.includes(name);
            }
        },
        edit: (log) => {
            log.isBeingEdited = true;
            saveLog(log);
        },
        del: (log) => {
            localStorage.removeItem(log.name);
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
        validCheck: {
            crews: (log, id) => {
                const index = ctrl.crews.getCrewIndex(log, id);
                const crew = log.crews[index];
                if (crew === undefined)
                    throw new Error("no crew for this id");
                return crew;
            },
            diveCrews: (log, id) => {
                const index = ctrl.crews.getCrewIndex(log, id);
                const crew = log.crews[index];
                if (crew === undefined)
                    throw new Error("no crew for this id");
                if (!('dive' in crew))
                    throw new Error("this is not a dive crew");
                return crew;
            }
        },
        getCrewIndex: (log, id) => {
            const crews = log.crews;
            const filteredList = crews.map(crew => crew.id);
            const crewIndex = filteredList.indexOf(id);
            if (crewIndex === -1)
                throw new Error("crewIndex === -1");
            return crewIndex;
        },
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
            const crew = ctrl.crews.validCheck.crews(log, id);
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
            const crew = ctrl.crews.validCheck.crews(log, id);
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
            const crew = ctrl.crews.validCheck.crews(log, id);
            crew.isBeingEdited = true;
            saveLog(log);
        },
        update: (log, id, obj) => {
            const crew = ctrl.crews.validCheck.crews(log, id);
            crew.isBeingEdited = false;
            saveLog(log);
        },
        bin: (log, id) => {
            const index = ctrl.crews.getCrewIndex(log, id);
            const crew = ctrl.crews.validCheck.crews(log, id);
            log.bin.crews.push(crew);
            log.crews.splice(index, 1);
            saveLog(log);
        },
        dive: {
            pdd: {
                start: (log, id) => {
                    const crew = ctrl.crews.validCheck.diveCrews(log, id);
                    if (crew.dive.preDive !== false)
                        throw new Error("preDive is not false with pdd not having started");
                    crew.dive.preDive = true;
                    saveLog(log);
                },
                confirm: (log, id, pdd) => {
                    const crew = ctrl.crews.validCheck.diveCrews(log, id);
                    crew.dive.preDive = pdd;
                    saveLog(log);
                }
            }
        }
    },
    acts: {
        control: {
            validActivityCheck: (log, id) => {
                const index = ctrl.acts.control.getIndex(log, id);
                const targetAct = log.acts[index];
                if (targetAct === undefined) {
                    throw new Error("cannot find the activity that is corresponding to the id");
                }
                return targetAct;
            },
            getIndex: (log, id) => {
                ctrl.acts.deduplicate(log);
                const index = log.acts.map(act => act.id).indexOf(id);
                return index;
            }
        },
        newAct: {
            before: (log, id) => {
                const newAct = new Activity();
                newAct.location = 'TBD';
                const index = ctrl.acts.control.getIndex(log, id);
                if (index - 1 < 0) {
                    alert('Cannot create a new activity before the first log');
                    throw new Error('index value negative- ctrl.acts.newAct');
                }
                log.acts.splice(index, 0, newAct);
                saveLog(log);
            },
            after: (log, id) => {
                const newAct = new Activity();
                const index = ctrl.acts.control.getIndex(log, id);
                log.acts.splice(index + 1, 0, newAct);
                saveLog(log);
            }
        },
        edit: {
            editTime: (log, id) => {
                const index = ctrl.acts.control.getIndex(log, id);
                const target = ctrl.acts.control.validActivityCheck(log, id);
                if (target !== undefined) {
                    target.control.isTimeBeingEdited = true;
                    saveLog(log);
                }
                else {
                    console.error("target is undefined", `index : ${index}, target act : ${target}`);
                }
            },
            updateTime: (log, id, startTime, endTime) => {
                const target = ctrl.acts.control.validActivityCheck(log, id);
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
            },
            edit: (log, id) => {
                const target = ctrl.acts.control.validActivityCheck(log, id);
                target.control.isBeingEdited = true;
                saveLog(log);
            },
            update: (log, id, object) => {
                const target = ctrl.acts.control.validActivityCheck(log, id);
                target.control.isBeingEdited = false;
                saveLog(log);
            }
        },
        diverWorkSheet: {
            validCheck: (log, id) => {
                const target = ctrl.acts.control.validActivityCheck(log, id);
                const targetWorkSheet = target.activityDetail;
                if (targetWorkSheet === undefined)
                    throw new Error("worksheet is undefined");
                if (targetWorkSheet instanceof BoatLog)
                    throw new Error("this act is boatlog");
                return targetWorkSheet;
            },
            mort: {
                check: (log, id) => {
                    const workSheet = ctrl.acts.diverWorkSheet.validCheck(log, id);
                    workSheet.mort = new MortSheet();
                    saveLog(log);
                },
                uncheck: (log, id) => {
                    const workSheet = ctrl.acts.diverWorkSheet.validCheck(log, id);
                    workSheet.mort = false;
                    saveLog(log);
                }
            },
            dive: {
                validCheck: {
                    array: (log, actId) => {
                        const targetWorkSheet = ctrl.acts.diverWorkSheet.validCheck(log, actId);
                        const targetDiveSheets = targetWorkSheet.dive;
                        if (typeof targetDiveSheets === 'boolean')
                            throw new Error("there's no divesheet for this act");
                        if (Array.isArray(targetDiveSheets))
                            return targetDiveSheets;
                        throw new Error(`${targetDiveSheets}`);
                    },
                    diveSheet: (log, actId) => {
                        return new DiveSheet();
                    }
                },
                getDiveSheet: (log, id, diveSheetID) => {
                    const diveArray = ctrl.acts.diverWorkSheet.dive.validCheck.array(log, id);
                    const idArray = diveArray.map(sheet => sheet.diveSheetId);
                    const indexDiveSheet = idArray.indexOf(diveSheetID);
                    const diveSheet = diveArray[indexDiveSheet];
                    if (indexDiveSheet === -1 || diveSheet === undefined)
                        throw Error("No divesheet for this ID");
                    return diveSheet;
                },
                check: (log, id) => {
                    const workSheet = ctrl.acts.diverWorkSheet.validCheck(log, id);
                    workSheet.dive = true;
                    saveLog(log);
                },
                uncheck: (log, id) => {
                    const workSheet = ctrl.acts.diverWorkSheet.validCheck(log, id);
                    workSheet.dive = false;
                    saveLog(log);
                },
                create: (log, id, diver) => {
                    const diverID = parseInt(diver);
                    const workSheet = ctrl.acts.diverWorkSheet.validCheck(log, id);
                    const arrayDiveSheet = workSheet.dive;
                    if (arrayDiveSheet === true) {
                        workSheet.dive = new Array();
                    }
                    if (Array.isArray(arrayDiveSheet)) {
                        const newDiveSheet = new DiveSheet();
                        newDiveSheet.diverId = diverID;
                        const diver = ctrl.crews.validCheck.diveCrews(log, diverID);
                        newDiveSheet.diver = diver.name;
                        arrayDiveSheet.push(newDiveSheet);
                        saveLog(log);
                    }
                    else {
                        throw new Error(`dive is something wrong ${typeof workSheet.dive} = typeof dive`);
                    }
                },
                deleteDiveSheet(log, actId, diveId) {
                    const targetWorkSheet = ctrl.acts.diverWorkSheet.validCheck(log, actId);
                    const targetDiveSheetArray = ctrl.acts.diverWorkSheet.dive.validCheck.array(log, actId);
                    targetWorkSheet.dive = targetDiveSheetArray.filter(divesheet => divesheet.diveSheetId !== diveId);
                },
                timer: {
                    delete: (log, actId, diveId, timeID) => {
                        const ds = ctrl.acts.diverWorkSheet.dive.getDiveSheet(log, actId, diveId);
                        const arr = ds.timer.laps.laps.filter(lap => {
                            return lap.id !== timeID;
                        });
                        ds.timer.laps.laps = arr;
                        saveLog(log);
                    },
                    getLapIndex: (log, actId, diveId, timeID) => {
                        const ds = ctrl.acts.diverWorkSheet.dive.getDiveSheet(log, actId, diveId);
                        const idArray = ds.timer.laps.laps.map(lap => {
                            return lap.id;
                        });
                        return idArray.indexOf(timeID);
                    },
                    start: (log, actId, diveId) => {
                        const diveSheet = ctrl.acts.diverWorkSheet.dive.getDiveSheet(log, actId, diveId);
                    },
                    pause: () => {
                    },
                    reset: () => {
                    },
                    lap: () => {
                    }
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
            const target = ctrl.acts.control.validActivityCheck(log, id);
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
            saveLog(log);
        },
        start: (log, id) => {
            const target = ctrl.acts.control.validActivityCheck(log, id);
            const t = new Date();
            target.start = new Start();
            target.start.time = new Time(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
            saveLog(log);
        },
        isBoatLog: (log, id) => {
            const target = ctrl.acts.control.validActivityCheck(log, id);
            target.activityDetail = new BoatLog();
            saveLog(log);
        },
        boatLogComment: (log, id, comment) => {
            const target = ctrl.acts.control.validActivityCheck(log, id);
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
        getStartTime: (log, id) => {
            const time = ctrl.acts.control.validActivityCheck(log, id).start.time;
            if (time === undefined) {
                return 'TBD';
            }
            return `${time.hrs}:${time.min}:${time.sec}`;
        },
        getEndTime: (log, id) => {
            const time = ctrl.acts.control.validActivityCheck(log, id).end.time;
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
