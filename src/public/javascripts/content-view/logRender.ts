'use strict'

const logRender = (div : HTMLElement, log : Log, ...args : Array<string | number>) => {

    const M = div;
    const dn = dom.node;
    const dc = dom.cE;

    const di = () => dc.d();
    const sp = (a : string | number | null | undefined) => dc.s(a);
    const se = (name : string, ...args : Array<string |Array<string> |boolean> ) => dc.select(name, ...args);
    const ip = (type : string, ph: string) => dc.i(type, ph);
    const bt = (a : string) => dc.b(a);
    const ta = (r :number, c : number) => dc.ta(r, c);

    dom.html.cl(div);

    const master = dom.cE.d();

    dn.adopt(div, master);
    dn.className('log-master', master);

    logBasicInfoRender(master, log);

    switch (log.hasStartedYet) {
        case true :
            logInfoRender(master, log, ...args)
            break
        case false :
            console.log("AA");
            startup(master, log)
            break
        default :
            console.log( `log.hasStartedYet = ${log.hasStartedYet}`)
            break
    }

    function logBasicInfoRender (div : HTMLElement, log : Log) {

        const master = di();
        const id = di();
        const date = di();
        const name = di();
    
        dn.className('log-basic-master', master);
        dn.className('log-basic', id, date, name);
    
        const idSpan = sp(`ID : ${log.id}`);
        const dateSpan = sp(`DATE : ${ctrl.log.getLoggedDate(log)}`);
        const nameSpan = sp(`TITLE : ${log.name}`);
    
        dn.adopt(div, master);
        dn.adopt(master, name, id, date, );
        dn.padopt(id, idSpan, date, dateSpan, name, nameSpan);
    
    }
    
    function startup (div : HTMLDivElement, log : Log) {
        
        const master = di();
    
        const selectMasterDiv = di();
        const selectBoatDiv = di();
        const selectBoatSpan = sp('PLEASE SELECT THE BOAT THAT YOU ARE ON TODAY.');
        const selectDiv = di();
        let selectBoat : HTMLSelectElement;
        switch(log.department) {
            
            case 'diver' :
                selectBoat = se('boat', 'south', ['Bondi Ty', 'Outcast', 'Narkosis', 'Peregrine'], 'west', ['Atlas'], 'else', ['else'], true, ['Bondi Ty', 'Outcast', 'Narkosis', 'Peregrine'], ['Atlas'], ['else']);
                dn.adopt(selectDiv, selectBoat)
                break;
    
            default :
                break;
    
        }
    
        const addCrewMasterDiv = di();
        const addCrewPleaseDiv = di();
        const addCrewPleaseSpan = sp('PLEASE TYPE YOUR CREW NAME CORRECTLY.')
        const addCrewDiv = di();
        const addCrewInput = ip('text', 'CREW NAME')
        const addCrewBtn = bt('add crew');
    
        addCrewBtn.addEventListener('click' , () => {
    
            ctrl.crews.addCrew(log, addCrewInput.value);
    
            logRender(M, log, 'list', 0);
    
        })
    
        const crewListMaster = di();
        const crewListFRow = di();
        const crewIndex = di();
        const crewName = di();
        const crewEdit = di();
        const crewIndexSpan = sp('Index');
        const crewNameSpan = sp('Name');
        const crewDelSpan = sp('Delete');
    
        const confirmDiv = di();
        const confirmBtn = bt('Confirm');
    
        confirmBtn.addEventListener('click', () => {
            const bool = confirm(`Are you sure that the info below is all correct?\nBOAT : ${selectBoat.value}\nCREW: ${log.crews.map(crew=>crew.name).join(', ')}`);
            if (bool) {
                ctrl.boat.chooseBoat(log, selectBoat.value);
                console.log(log.hasStartedYet);
                logRender(M, log, 'list', 0);
            }
        }
        );
    
        dn.className('log-start-master', master);
        dn.className('log-start-select-master', selectMasterDiv);
        dn.className('log-start-select-boat', selectBoatDiv, selectDiv);
        
        dn.className('log-start-crew-master', addCrewMasterDiv);
        dn.className('log-start-crew', addCrewDiv, addCrewPleaseDiv);
        dn.className('log-start-crew-list-master', crewListMaster);
    
        dn.className('log-start-crew-list-row', crewListFRow);
    
        dn.className('log-confirm-div', confirmDiv)
    
        dn.adopt(div, master);
        dn.adopt(master, selectMasterDiv, addCrewMasterDiv, confirmDiv);
        dn.adopt(selectMasterDiv, selectBoatDiv, selectDiv);
        dn.padopt(selectBoatDiv, selectBoatSpan);
    
        dn.adopt(addCrewMasterDiv, addCrewPleaseDiv, addCrewDiv, crewListFRow, crewListMaster);
        dn.adopt(addCrewDiv, addCrewInput, addCrewBtn);
        dn.padopt(addCrewPleaseDiv, addCrewPleaseSpan);
    
        dn.adopt(crewListFRow, crewIndex, crewName, crewEdit);
    
        dn.padopt(crewIndex, crewIndexSpan, crewName, crewNameSpan, crewEdit, crewDelSpan);
    
        dn.adopt(confirmDiv, confirmBtn);
    
        log.crews.forEach( crew => {
    
            const crewListRow = di();    
            const crewIndex = di();
            const crewName = di();
            const crewEdit = di();

            const crewIndexSpan = sp(log.crews.indexOf(crew)+1);
            const crewNameSpan = sp(crew.name);
            const crewDelBtn = bt('Delete');

            crewDelBtn.addEventListener( 'click' ,  () => {

                ctrl.crews.delCrew(log, crew.id);

                logRender(M, log, 'list', 0);

            });
    
            dn.className('log-start-crew-list-row', crewListRow);
            dn.adopt(crewListMaster, crewListRow);
            dn.adopt(crewListRow, crewIndex, crewName, crewEdit);
            dn.padopt(crewIndex, crewIndexSpan, crewName, crewNameSpan, crewEdit, crewDelBtn);
    
        });
    
    }
    
    function logInfoRender (div :HTMLDivElement, log : Log, ...args : Array<string | number>) {
    
        const boatCrewDiv = di();
       
        dn.className('log-boat-crew-div', boatCrewDiv);
        dn.adopt(div, boatCrewDiv);

        let type:string, id: number;

        if (args[0] === 'crew-control') {
            const parameterType = args[1];
            const parameterID = args[2];
            if (parameterType===undefined) throw new Error('type is undefined');
            if (typeof parameterType === 'number') throw new Error('type is nubmer');
            if (parameterID===undefined) throw new Error('id is undefined');
            if (typeof parameterID === 'string') throw new Error('id is string');

            type = parameterType;
            id = parameterID;
    
        } else if (args[0] ==='diver') {
            const parameterType = args[2];
            const parameterID = args[3];
            if (parameterType===undefined) throw new Error('type is undefined');
            if (typeof parameterType === 'number') throw new Error('type is nubmer');
            if (parameterID===undefined) throw new Error('id is undefined');
            if (typeof parameterID === 'string') throw new Error('id is string');

            type = parameterType;
            id = parameterID;
    
        } else {
            const parameterType = args[0];
            const parameterID = args[1];
            if (parameterType===undefined) throw new Error('type is undefined');
            if (typeof parameterType === 'number') throw new Error('type is nubmer');
            if (parameterID===undefined) throw new Error('id is undefined');
            if (typeof parameterID === 'string') throw new Error('id is string');

            type = parameterType;
            id = parameterID;
        }

        boatCrewRender(boatCrewDiv, log, type, id);

        if (log.hasTravelledYet)
        {
            switch(args[0]){
                case 'list' :
                    logListRender(div, log);
                    break

                case 'activity' :
                    if(args[1] === undefined){
                        throw new Error('activity id is undefined')
                    } else if (typeof args[1] === 'string') {
                        console.error('id(argument) is string')
                    } else{
                        activityRender(div, log, args[1]);
                    }
                    break

                case 'crew-control' :
                    const travelFrom = args[1];
                    const id = args[2];
                    if (typeof travelFrom === 'number') throw new Error('travel from number');
                    if (travelFrom === undefined) throw new Error('travel from undefined');
                    if (id === undefined) throw new Error('id === undefined')

                    crewControlRender(div, log, travelFrom, id);
                    break

                case 'diver' :

                    const crewId = args[1];
                    const tFrom = args[2];
                    const actId = args[3];


                    if (crewId === undefined) throw new Error('CREW ID = undefined');
                    if (typeof crewId === 'string') throw new Error('Crew ID STRING')
                    if (typeof tFrom === 'number') throw new Error('travel from number');
                    if (tFrom === undefined) throw new Error('travel from undefined');
                    if (actId === undefined) throw new Error('id === undefined')
                    if (typeof actId === 'string') throw new Error('Act Id is string')

                    diverControlRender(div, log, crewId, tFrom, actId)

                    break

                case 'bin' :
                    const tf = args[1];
                    const i = args[2];
                    if (typeof tf === 'number') throw new Error('travel from number');
                    if (tf === undefined) throw new Error('travel from undefined');
                    if (i === undefined) throw new Error('id === undefined')

                    crewBinRender(div, log, tf, i);
                    break

                default :
                    console.error(`${args[0]} - error`);
                    break

            }
        } 
        else {
            startTravel(div, log);
        }         
     

        function boatCrewRender (div : HTMLDivElement, log : Log, type : string, id : number) {

            const boatDiv = di();
            const boatSpan = sp(`BOAT : ${log.boat}`);

            const crewDiv = di();
            const crewSpan = sp(`CREW : ${log.crews.map(crew => crew.name).join(', ')}`);
            const crewControlDiv = di();
            const crewControlButton = bt('Control');
            crewControlButton.id = 'crew-control-button'

            console.log(type);
            crewControlButton.onclick = () => {
                logRender(M, log, 'crew-control', type, id)
            };
            
            dn.adopt(div, boatDiv, crewDiv);
            dn.padopt(boatDiv, boatSpan, crewDiv, crewSpan, crewDiv, crewControlDiv, crewControlDiv, crewControlButton);

        }

        function logListRender(div : HTMLDivElement, log : Log) {
            
            const fRow = di();
            const index = di();
            const type = di();
            const time = di();
            const timeEnd = di();
            const location = di();
            const detail = di();
            const indexSpan = sp('Index');
            const typeSpan = sp('Type');
            const timeSpan = sp('Time Start');
            const timeEndSpan = sp('Time End')
            const locationSpan = sp('Location');
            const detailSpan = sp('Detail');

            dn.className('log-activity-list-row', fRow)
            dn.adopt(div, fRow);
            dn.adopt(fRow, index, type, time, timeEnd, location, detail);
            dn.padopt(index, indexSpan, type, typeSpan, time, timeSpan, location, locationSpan,detail, detailSpan, timeEnd, timeEndSpan);

            log.acts.forEach ( act => {

                const fRow = di();
                const index = di();
                const type = di();
                const time = di();
                const timeEnd = di();
                const location = di();
                const detail = di();
                const indexSpan = sp(log.acts.indexOf(act)+1);
                const typeSpan = sp(act.isBoatLog ? 'B' : act.isWork ? 'W' : 'U');
                const timeInput = ip('time', '');
                const timeSpan = sp(`${ctrl.acts.getStartTime(log, act.id)}`);
                const timeEndInput = ip('time', '');
                const timeEndSpan = sp(`${ctrl.acts.getEndTime(log, act.id)}`);
                                
                let locationSpan : HTMLSpanElement;
                
                if(act.location) {
                    locationSpan = sp(act.location);
                } else {
                    locationSpan = sp('TBD');
                }

                let detailSpan : HTMLSpanElement;
                
                const ad = act.activityDetail
                if (ad === undefined) {
                    detailSpan = sp('-');    
                } else if (!(ad instanceof DiverWorkSheet)) {
                    detailSpan = sp(ad.comment);
                } else {
                    detailSpan = sp(ad.taskDetail);
                }
                
                timeInput.setAttribute('step', '1');
                timeEndInput.setAttribute('step', '1');
                if (act.start.time === undefined) {
                    console.log(`${act}-${act.start}-${act.start.time}`)
                } else {
                    timeInput.setAttribute('value', `${act.start.time.hrs}:${act.start.time.min}:${act.start.time.sec}`);
                }
                if (act.end.time === undefined) {
                    console.log(`${act}-${act.end}-${act.end.time}`)
                } else {
                    timeInput.setAttribute('value', `${act.end.time.hrs}:${act.end.time.min}:${act.end.time.sec}`);
                }

                const sRow = di();
        
                const editBtn = bt('Edit');
                const updateBtn = bt('Update');
                const loadBtn = bt('Load');
                const delBtn = bt('Delete');

                const createBeforeActivityBtn = bt('Create an activity next before this');
                const createAfterActivityBtn = bt('Create an activity next after this');

                createBeforeActivityBtn.addEventListener( 'click', () => {
                    ctrl.acts.newAct.before(log, act.id);
                    logRender(M, log, 'list', 0);
                });

                createAfterActivityBtn.addEventListener( 'click', () => {
                    ctrl.acts.newAct.after(log, act.id);
                    logRender(M, log, 'list', 0);
                });

                if (act.isFirstLog) {

                    createBeforeActivityBtn.style.display = 'none';

                }

                if (!act.control.isEditable) {

                    delBtn.style.display = 'none';

                    if (act.isFirstLog) {

                        loadBtn.style.display = 'none';

                    }

                }

                editBtn.addEventListener( 'click', () => {

                    ctrl.acts.edit.editTime(log, act.id);

                    logRender(M, log, 'list', 0);

                });

                updateBtn.addEventListener( 'click', () => {

                    const timeStart = timeInput.value;
                    const timeEnd = timeEndInput.value;

                    ctrl.acts.edit.updateTime(log, act.id, timeStart, timeEnd);

                    logRender(M, log, 'list', 0);

                });

                loadBtn.addEventListener( 'click',  () => {
                    
                    logRender(M, log, 'activity', act.id);

                });

                delBtn.addEventListener( 'click', () => {

                    ctrl.acts.delAct(log, act.id);

                    logRender(M, log, 'list', 0);

                })

                dn.className('log-activity-list-row', fRow);
                dn.className('log-activity-list-srow', sRow);

                dn.adopt(div, fRow, sRow);
                dn.adopt(fRow, index, type, time, timeEnd, location, detail);

                if (!act.control.isTimeBeingEdited) {

                    dn.adopt(sRow, editBtn, loadBtn, delBtn, createBeforeActivityBtn, createAfterActivityBtn);
                    dn.padopt(time, timeSpan, timeEnd, timeEndSpan);

                } else {

                    dn.adopt(sRow, updateBtn, loadBtn, delBtn, createBeforeActivityBtn, createAfterActivityBtn);
                    dn.padopt(time, timeInput, timeEnd, timeEndInput);

                }

                dn.padopt(index, indexSpan, type, typeSpan, location, locationSpan, detail, detailSpan);

            });

        }

        function startTravel (div : HTMLDivElement, log : Log) {


            const whereDoYouStartFromDiv = di();
            const wdysfSpan = sp('Where does/did this boat start working from today?');
            const selectDiv = di();
            const confirmDiv = di();
            const confirmBtn = bt('Confirm');
            confirmBtn.addEventListener('click', () => {
                const bool = confirm(`Are you sure that the info below is correct ? \n STARTING POINT : ${selectLocation.value}`);
                if (bool) {
                    ctrl.log.start(log, selectLocation.value);
                    logRender(M, log, 'list', 0);
                }
            });

            let selectLocation : HTMLSelectElement;

            switch (log.boat){
                case 'Atlas' :
                    selectLocation = se('location', 'Hub', ['Macquarie Harbour Hub', 'Mooring'], 'Middle Harbour', ['Mooring'], true, ['Macquarie Harbour Hub', 'Mooring'], ['Mooring']);
                    dn.adopt(selectDiv, selectLocation)
                    break
                case 'Bondi Ty': case 'Narkosis' : case 'Peregrine': case 'Outcast':
                    selectLocation = se('location', 'HB', ['Hideaway Bay', 'Mooring'], 'SB', ['Margate Marina'], true, ['Hideaway Bay', 'Mooring'], ['Margate Marina']);
                    dn.adopt(selectDiv, selectLocation)
                    break
                default :
                    break
                   
            }
          
            dn.className('wdysf', whereDoYouStartFromDiv, selectDiv, confirmDiv);
            dn.adopt(div, whereDoYouStartFromDiv, selectDiv, confirmDiv);
            dn.padopt(whereDoYouStartFromDiv, wdysfSpan, confirmDiv, confirmBtn);

        }

        function activityRender(div: HTMLDivElement, log : Log, id : number) {

            const index = ctrl.acts.control.getIndex(log, id);
            const target = log.acts[index]
            
            activityBasicInfoRender();

            if (target === undefined) {
                
                throw new Error('target act is undefined');

            } 
            else
            {
                
                if ( target.isBoatLog )
                {
                    boatLogRender(div, log, id);
                }
                else if ( target.isWork)
                {
                    workSheetRender(div, log, id);
                }
                else
                {
                    chooseType(div, log, id);
                }
            }

            function activityBasicInfoRender() {

                if (target === undefined) throw Error('target activity is undefined')

                const activityBasicMaster = di();
                dn.className('activity-basic-master', activityBasicMaster)
                const activityIdDiv = di();
                const activityLocation = di();
                const activityIdSpan = sp(`Activity Id : ${target.id}`);
                const editDiv = di();
                dn.className('activity-edit-master', editDiv);
                
                const backBtn = bt('Back to List');
                const editBtn = bt('Edit');
                const updateBtn = bt('Update');
                const delBtn = bt('Delete');

                backBtn.addEventListener( 'click', () => {
                    logRender(M, log, 'list', 0);
                })

                editBtn.addEventListener( 'click', () => {
                    ctrl.acts.edit.edit(log, id);
                    logRender(M, log, 'activity', id)
                })

                updateBtn.addEventListener( 'click', () => {
                    ctrl.acts.edit.update(log, id, {});
                    logRender(M, log, 'activity', id);
                })
               
                dn.adopt(div, activityBasicMaster);
                dn.adopt(activityBasicMaster, activityIdDiv, activityLocation, editDiv);

                if (target.control.isBeingEdited){
                    dn.adopt(editDiv, updateBtn);

                    const activityLocationSpan = sp(`Activity Location : `);
                    const activityLocationInput = ip('text', target.location? target.location:'');
                    dn.padopt(activityIdDiv, activityIdSpan, activityLocation, activityLocationSpan, activityLocation, activityLocationInput);    
                } else {
                    dn.adopt(editDiv, backBtn, editBtn, delBtn);

                    const activityLocationSpan = sp(`Activity Location : ${target.location? target.location : 'TBD'}`);
                    dn.padopt(activityIdDiv, activityIdSpan, activityLocation, activityLocationSpan);
                }

            }

            function boatLogRender(div : HTMLDivElement, log : Log, id : number) {

                console.log(div,log,id)

            }

            function workSheetRender(div : HTMLDivElement, log : Log, id : number) {
            

                
                switch (log.department) {

                    case 'diver' :
                        if (target === undefined ) throw new Error('target act is undefined');
                        
                        const workSheet = target.activityDetail;

                        if(workSheet instanceof BoatLog) throw new Error('target worksheet is boatlog - function worksheetrender');

                        diverWorkSheetRender(div, log, id);

                        if(workSheet === undefined) throw new Error('worksheet is undefined');
                        console.log("helloworld1");

                        

                        if (workSheet.mort) {
                            console.log("helloworld2");

                            mortSheetRender(div, log, id);
                            console.log("helloworld3");

                        }

                        if (workSheet.dive) {
                            diveSheetListRender(div, log, id);
                            diveSheetRender(div);
                        }
                        console.log("helloworld4");

                        
                        
                        break

                    default :
                        throw Error(`no department - ${log.department}`);


                }

                function diverWorkSheetRender(div : HTMLDivElement, log : Log, id : number){

                    if ( target === undefined) {
                        throw new Error('target act is undefined');
                    } 

                    else 
                    {
                        const t = target.activityDetail;
                       
                        if (t === undefined) 
                        {
                            throw new Error(`target actitivy Detail is undefined`);
                        }
                        else if (t instanceof BoatLog) 
                        {
                            throw new Error('target activity is BoatLog...');
                        }
                        else {

                            const workSheetMaster = di();
                            workSheetMaster.id = `worksheet-${id}`
                            workSheetMaster.dataset['hidden'] = 'false'
                            
                            const titleDiv = di();
                            const workSheetTitleSpan = sp(`WORK SHEET - ACTIVITY ${id}`);
                            const btnDiv = di();
                            const foldBtn = bt('&#9650;');
                            foldBtn.id = `worksheet-fold-${id}`
                            foldBtn.addEventListener('click', () => {
                                const target = document.getElementById(`worksheet-${id}`);
                                if (target === null) throw new Error('cannot find the worksheet')
                                if (workSheetMaster.dataset['hidden'] === 'false') {
                                    target.style.display = 'none';
                                    workSheetMaster.dataset['hidden'] = 'true';
                                    foldBtn.innerHTML = '&#9660;'
                                } else if (workSheetMaster.dataset['hidden'] === 'true'){
                                    target.style.display = 'flex';
                                    workSheetMaster.dataset['hidden'] = 'false';
                                    foldBtn.innerHTML = '&#9650;'
                                }
                                    
                            });

                            dn.className('sheet-title', titleDiv);
                            dn.adopt(titleDiv, workSheetTitleSpan, btnDiv);
                            dn.adopt(btnDiv, foldBtn);
                            
                            

                            if (target.control.isBeingEdited === true) {
                                const initialDiv = di();
                                const initialDDiv = di();
                                const initialSDiv = di();
                                const initialDSpan = sp(`Diver`);
                                const diverSelectDiv = di();                                
                                const diverSelect = se('diver', 'Diver', log.crews.map(crew => crew.name), true, log.crews.map(crew=>crew.id.toString()));
                                const initialSSpan = sp(`Sup`);
                                const supervisorSelectDiv = di();
                                const supervisorSelect = se('diver', 'Sup', log.crews.map(crew => crew.name), true, log.crews.map(crew=>crew.id.toString()));
                                const timeDiv = di();
                                const timeStartDiv = di();
                                const timeStartSpan = sp(`Start`);
                                const timeStartInputDiv = di();
                                const timeStartInput = ip('time', '');
                                timeStartInput.setAttribute('step', '1');
                                const timeEndDiv = di();
                                const timeEndSpan = sp(`End`);
                                const timeEndInput = ip('time', '');
                                const timeEndInputDiv = di();
                                timeEndInput.setAttribute('step', '1');
                                const taskDetailDiv = di();
                                const taskDetailSpan = sp(`Task Detail`);
                                const taskDetailTA = ta(4, 50);
                                const depth = di();
                                const depthSpan = sp(`Depth\n:`);
                                const depthInputDiv = di();
                                const depthInput = ip('text', 'Depth');

                                const boolDiv = di();

                                const isMortDiv = di();
                                const isMortSpan = sp('Mort?');
                                const isMortCbox = ip('c', '');
                                let mortBool : boolean;
                                mortBool = t.mort ? true : false;
                                isMortCbox.checked = mortBool;

                                const isDiveDiv = di();
                                let diveBool : boolean;
                                diveBool = t.dive ? true : false;
                                const isDiveSpan = sp('Dive?');
                                const isDiveCbox = ip('c', '');
                                isDiveCbox.checked = diveBool;

                                console.log(isMortCbox.checked);
                                isMortCbox.addEventListener( 'click' ,  () => {
                                    console.log(isMortCbox.checked);
                                    switch(isMortCbox.checked) {

                                        case false : 
                                            ctrl.acts.diverWorkSheet.mort.uncheck(log, id);
                                            logRender(M, log, 'activity', id);
                                            break
                                        case true :
                                            ctrl.acts.diverWorkSheet.mort.check(log,id);
                                            logRender(M, log, 'activity', id);
                                            break
                                        default :
                                            throw Error(`${isMortCbox} - error, no checked attribute`);
                                            break

                                    } 

                                });

                

                                isDiveCbox.addEventListener( 'click' ,  () => {
                                    
                                    switch (isDiveCbox.checked) {

                                        case false : 
                                            ctrl.acts.diverWorkSheet.dive.uncheck(log, id);
                                            logRender(M, log, 'activity', id);
                                            break
                                        case true :
                                            ctrl.acts.diverWorkSheet.dive.check(log,id);
                                            logRender(M, log, 'activity', id);
                                            break
                                        default :
                                            throw Error(`${isDiveCbox} - error, no checked attribute`);
                                            break

                                    }
                                    
                                });

                                dn.className('work-sheet-master-edit', workSheetMaster);
                                
                                if(taskDetailTA === undefined) {
                                    throw Error()
                                }


                                dn.adopt(div, titleDiv, workSheetMaster);
                                dn.adopt(workSheetMaster, initialDiv, timeDiv, taskDetailDiv, depth, boolDiv);

                               
                                dn.adopt(initialDiv, initialDDiv, initialSDiv);
                                dn.adopt(timeDiv, timeStartDiv, timeEndDiv);
                                dn.padopt(initialDDiv, initialDSpan, initialSDiv, initialSSpan, timeStartDiv, timeStartSpan, timeEndDiv, timeEndSpan, taskDetailDiv, taskDetailSpan, depth, depthSpan, isMortDiv, isMortSpan, isDiveDiv, isDiveSpan);
                                dn.adopt(boolDiv, isMortDiv, isDiveDiv);


                                dn.padopt(initialDDiv, diverSelectDiv, initialSDiv, supervisorSelectDiv, timeStartDiv, timeStartInputDiv, timeEndDiv, timeEndInputDiv, taskDetailDiv, taskDetailTA, depth, depthInputDiv,isMortDiv, isMortCbox, isDiveDiv, isDiveCbox);
                                dn.padopt(diverSelectDiv, diverSelect, supervisorSelectDiv,supervisorSelect, timeStartInputDiv, timeStartInput, timeEndInputDiv, timeEndInput, depthInputDiv, depthInput);

                            } else {
                                const initialDiv = di();
                                const initialDDiv = di();
                                const initialSDiv = di();
                                const initialDSpan = sp(`Diver : ${t.diverInitial? t.diverInitial : 'TBD'}`);
                                const initialSSpan = sp(`Sup : ${t.supervisorInitial? t.supervisorInitial : 'TBD' }`);
                                const timeDiv = di();
                                const timeStartDiv = di();
                                const timeStartSpan = sp(`Start : ${ctrl.acts.getStartTime(log, id)}`);
                                const timeEndDiv = di();
                                const timeEndSpan = sp(`End : ${ctrl.acts.getEndTime(log, id)}`);
                                const taskDetailDiv = di();
                                const taskDetailSpan = sp(`Task Detail : ${t.taskDetail? t.taskDetail : 'TBD'}`);
                                const depth = di();
                                const depthSpan = sp(`Depth : ${t.depth? t.depth : 'TBD'}`);
                                const boolDiv = di();
                                const isMortDiv = di();
                                const isMortSpan = sp(!t.mort ? 'Mort? : False' : 'True');
                                const isDiveDiv = di();
                                const isDiveSpan = sp(!t.dive ? 'Dive? : False' : 'True');

                                dn.className('work-sheet-master', workSheetMaster);

                                dn.adopt(div, titleDiv, workSheetMaster);
                                dn.adopt(workSheetMaster, initialDiv, timeDiv, taskDetailDiv, depth, boolDiv);
                            
                                dn.adopt(initialDiv, initialDDiv, initialSDiv);
                                dn.adopt(timeDiv, timeStartDiv, timeEndDiv);
                                dn.padopt(initialDDiv, initialDSpan, initialSDiv, initialSSpan, timeStartDiv, timeStartSpan, timeEndDiv, timeEndSpan, taskDetailDiv, taskDetailSpan, depth, depthSpan, isMortDiv, isMortSpan, isDiveDiv, isDiveSpan);
                                dn.adopt(boolDiv, isMortDiv, isDiveDiv);
                            }

                        }
                        
                    }

                }

                function mortSheetRender(div : HTMLDivElement, log : Log, id : number) {

                    console.log("helloworld");

                    const index = ctrl.acts.control.getIndex(log, id)

                    const targetActivity = log.acts[index];
                    if (targetActivity === undefined) throw new Error("target log is undefined");

                    const targetWorkSheet = targetActivity.activityDetail
                    if (targetWorkSheet === undefined || targetWorkSheet instanceof BoatLog) throw new Error(`target log is undefined or Boat Log, ${targetWorkSheet}`);
                    const mortSheetMasterDiv = di();
                    const mortSheetTitleDiv = di();
                    const mortSheetTitleSpan = sp(`MORT SHEET - ACTIVITY ${id}`);

                    const targetMortSheet = targetWorkSheet.mort;
                    
                    const mortInputMaster = di();
                    dn.className('mort-input-master', mortInputMaster);
                    
                    mortInputMaster.id =`mortsheet-${id}`;
                    mortInputMaster.dataset['hidden'] = 'false';

                    const btnDiv = di();
                    const foldBtn = bt('&#9650;');
                    foldBtn.id = `mortsheet-fold-${id}`

                    foldBtn.addEventListener('click', () => {
                        const target = document.getElementById(`mortsheet-${id}`);
                        if (target === null) throw new Error('cannot find the worksheet')
                        if (mortInputMaster.dataset['hidden'] === 'false') {
                            target.style.display = 'none';
                            mortInputMaster.dataset['hidden'] = 'true';
                            foldBtn.innerHTML = '&#9660;'
                        } else if (mortInputMaster.dataset['hidden'] === 'true'){
                            target.style.display = 'flex';
                            mortInputMaster.dataset['hidden'] = 'false';
                            foldBtn.innerHTML = '&#9650;'
                        }
                            
                    });

                    dn.className('sheet-title', mortSheetTitleDiv);

                    dn.adopt(mortSheetTitleDiv, mortSheetTitleSpan, btnDiv);
                    dn.adopt(btnDiv, foldBtn);

                    

                    if (typeof targetMortSheet === 'boolean') throw new Error("target mortsheet hasn't been generated yet");

                    mortSortArray.forEach( (sort) => {
                        const sortDiv = di();
                        const sortTitleDiv = di();
                        const sortInputDiv = di();
                        const sortTitleSpan = sp(sort); 
                        let mortNumber: number = 123 ;
                        eval("mortNumber = targetMortSheet[`${sort}`]");           
                        let sortNumber = (targetActivity.control.isBeingEdited) ? ip('text', mortNumber!==undefined ? `${mortNumber}` : '') :  sp(mortNumber) ;
                        dn.adopt(mortInputMaster, sortDiv)
                        dn.adopt(sortDiv, sortTitleDiv, sortInputDiv); 
                        dn.padopt(sortTitleDiv, sortTitleSpan, sortInputDiv, sortNumber);
                    });

                    dn.adopt(div, mortSheetMasterDiv);
                    dn.adopt(mortSheetMasterDiv, mortSheetTitleDiv, mortInputMaster);

                }

                function diveSheetListRender(div : HTMLDivElement, log : Log, id : number) {

                    const index = ctrl.acts.control.getIndex(log, id);
                    const targetAct = log.acts[index];

                    const diveSheetMasterDiv = di();
                    diveSheetMasterDiv.id = `divesheet-${id}`;
                    diveSheetMasterDiv.dataset['hidden'] = 'false';
                    const diveSheetTitleDiv = di();
                    const diveSheetTitleSpan = sp(`DIVE SHEETS - ACTIVITY ${id}`);

                    dn.className('dive-sheet-master', diveSheetMasterDiv)
                    dn.adopt(div, diveSheetTitleDiv, diveSheetMasterDiv);

                    const btnDiv = di();
                    const foldBtn = bt('&#9650;');
                    foldBtn.id = `divesheet-fold-${id}`

                    foldBtn.addEventListener('click', () => {
                        const target = document.getElementById(`divesheet-${id}`);
                        if (target === null) throw new Error('cannot find the worksheet')
                        if (diveSheetMasterDiv.dataset['hidden'] === 'false') {
                            target.style.display = 'none';
                            diveSheetMasterDiv.dataset['hidden'] = 'true';
                            foldBtn.innerHTML = '&#9660;'
                        } else if (diveSheetMasterDiv.dataset['hidden'] === 'true'){
                            target.style.display = 'flex';
                            diveSheetMasterDiv.dataset['hidden'] = 'false';
                            foldBtn.innerHTML = '&#9650;'
                        }
                            
                    });

                    dn.className('sheet-title', diveSheetTitleDiv);
                    dn.adopt(diveSheetTitleDiv, diveSheetTitleSpan, btnDiv);
                    dn.adopt(btnDiv, foldBtn);

                    if (targetAct === undefined) throw new Error('target act is undefined, diveSheetRender')

                    const targetActWorkSheet = targetAct.activityDetail;

                    if (targetActWorkSheet instanceof BoatLog || targetActWorkSheet === undefined ) throw new Error(`target act is either BoatLog or undefined ${targetActWorkSheet}`);
                    
                    const diveSheetArray = targetActWorkSheet.dive;

                    if (diveSheetArray === false) throw new Error("dive is false");
                        const fRow = di();
                        const seDiv = di();
                        const btDiv = di();
                        const seDiver = se('diver', 'Diver', log.crews.map(crew => crew.name), true, log.crews.map(crew=>crew.id.toString()));

                        const createDiveSheet = bt('CREATE A NEW DIVESHEET');
                        
                        createDiveSheet.addEventListener( 'click' , () => {

                            ctrl.acts.diverWorkSheet.dive.create(log, id, seDiver.value);
                            logRender(M, log, 'activity', id); 

                        });

                        dn.className('dive-sheet-create-div', fRow)
                        dn.padopt(seDiv, seDiver, btDiv, createDiveSheet)
                        dn.adopt(diveSheetMasterDiv, fRow)
                        dn.adopt(fRow, seDiv, btDiv);

                    if (diveSheetArray === true) {

                    } else { 

                        diveSheetArray.forEach ( (dive, i) => {
                            if (!dive.confirm.bool) {
                                const diveSheetRowDiv = di();
                                const diveSheetIndex = di();
                                const diveSheetIndexSpan = sp((i+1).toString());
                                const diveSheetName = di();
                                const diveSheetNameSpan = sp(`${dive.diver}'s UNCOMPLETED DIVESHEET`);
                                const diveSheetBtnDiv = di();
                                const diveSheetLoadBtn = bt('LOAD');
                                const diveSheetDeleteBtn = bt('DELETE');
                                const diveSheet = di();

                                diveSheetLoadBtn.addEventListener('click', () => {
                                    diveSheetLoader(diveSheet, dive);
                                });

                                diveSheetDeleteBtn.addEventListener('click', () => {

                                    ctrl.acts.diverWorkSheet.dive.deleteDiveSheet(log, id, dive.diveSheetId);
                                    logRender(M, log, 'activity', id);

                                });

                                dn.adopt(diveSheetMasterDiv, diveSheetRowDiv, diveSheet);
                                dn.adopt(diveSheetRowDiv, diveSheetIndex, diveSheetName, diveSheetBtnDiv);
                                dn.padopt(diveSheetIndex, diveSheetIndexSpan, diveSheetName, diveSheetNameSpan, diveSheetBtnDiv, diveSheetLoadBtn, diveSheetBtnDiv, diveSheetDeleteBtn);

                            }
                            else {
                                const diveSheetRowDiv = di();
                                const diveSheetIndex = di();
                                const diveSheetIndexSpan = sp((i+1).toString());
                                const diveSheetName = di();
                                const diveSheetNameSpan = sp(`${dive.diver}'s DIVE`);
                                const diveSheetBtnDiv = di();
                                const diveSheetLoadBtn = bt('LOAD');
                                const diveSheet = di();
                                diveSheetLoadBtn.addEventListener('click', () => {
                                    diveSheetLoader(diveSheet, dive)
                                });

                                dn.adopt(diveSheetMasterDiv, diveSheetRowDiv, diveSheet);
                                dn.adopt(diveSheetRowDiv, diveSheetIndex, diveSheetName, diveSheetBtnDiv);
                                dn.padopt(diveSheetIndex, diveSheetIndexSpan, diveSheetName, diveSheetNameSpan, diveSheetBtnDiv, diveSheetLoadBtn);

                            }
                        });

                    }

                    function diveSheetLoader(diveSheet : HTMLDivElement, dive : DiveSheet) {

                        const timerDiv = di();
                        timerRender(timerDiv, log, id, dive.diveSheetId)
                        const diveSheetDiv = di();

                        dn.adopt(diveSheet, timerDiv, diveSheetDiv);

                        function timerRender (div:HTMLDivElement, log:Log, activityID:number, diveSheetID:number) {

                            const dc = dom.cE;
                            const dn = dom.node;
                            const di = () => dc.d();
                            const sp = (a : string) => dc.s(a);
                            const bt = (a : string) => dc.b(a);
                        
                            const timeInterval = 33
                        
                            const timeDiv = di();
                            const span = sp('00:00:00.000');
                        
                        
                            let time = 0;
                            let timerID : number | undefined;
                        
                            const target = ctrl.acts.diverWorkSheet.dive.getDiveSheet(log, activityID, diveSheetID);
                        
                            const timer = target.timer;
                        
                            const laps = timer.laps
                        
                            const startTime = laps.startTime;
                                                    
                            if (typeof startTime === 'number') {
                                                        
                                const d = new Date(startTime).getTime();
                                const nowID = new Date().getTime();
                                const elapsedMSec = nowID-d;
                                const eHrs = parseInt((elapsedMSec/1000/60/60).toString());
                                const eMinutes = parseInt(((elapsedMSec-(eHrs*1000*60*60))/1000/60).toString());
                                const eSecs = parseInt(((elapsedMSec - (eHrs*1000*60*60) - (eMinutes*1000*60))/1000).toString());
                                const eMSs = elapsedMSec % 1000;
                                span.innerHTML = `${eHrs}:${eMinutes}:${eSecs}.${eMSs}`;
                                time = elapsedMSec;
                                startClock();
                        
                            }
                        
                            const controlDiv = di();
                            const startClockBt = bt('START');
                            const pauseClockBt = bt('PAUSE');
                            const resetClockBt = bt('RESET');
                            
                            const lap = bt('LAP');
                        
                            const statusDiv = di();
                            const statusSpan = sp('');
                        
                            startClockBt.onclick = () => {
                        
                                startClock();
                        
                            }
                        
                            pauseClockBt.onclick = () => {
                        
                                pauseClock();
                        
                            }
                        
                            resetClockBt.onclick = () => {
                        
                                resetClock();
                        
                            }
                        
                            lap.onclick = () => {
                        
                                lapClock();
                                lapsRender(lapsDiv);
                        
                            }
                        
                            const lapsDiv = di();
                            dn.adopt(div, timeDiv, controlDiv, statusDiv, lapsDiv);
                        
                            lapsRender(lapsDiv)
                        
                            function lapsRender(div : HTMLDivElement) {
                        
                                dom.html.cl(div);
                                const indexDiv = di();
                                const indexSpan = sp('INDEX');
                                const tDiv = di();
                                const tSpan = sp('TIME');
                                const btDiv = di();
                                const btSpan = sp('CONTROL')
                        
                                const row = di();
                        
                                dn.adopt( row, indexDiv, tDiv, btDiv);
                                dn.padopt(indexDiv, indexSpan, tDiv, tSpan, btDiv, btSpan);
                                dn.adopt(div, row);
                        
                                laps.laps.forEach( (lap, i) => {
                                    const row = di();
                            
                                    const indexDiv = di();
                                    const indexSpan = sp(`${i+1}`);
                            
                                    const tDiv = di();
                                    const tSpan = sp(`${lap.hrs}:${lap.min}:${lap.sec}.${lap.ms}`);
                            
                                    const btDiv = di();
                                    const ls = bt('LEFT SURFACE');
                                    const lb = bt('LEFT BOTTOM');
                                    const as = bt('ARRIVED SURFACE');
                                    const de = bt('DELETE');
                        
                                    de.onclick = () => {
                                        if (target=== undefined) throw Error('dive sheet is undefined');
                                        ctrl.acts.diverWorkSheet.dive.timer.delete(log, activityID, target.diveSheetId, lap.id);
                                        lapsRender(div);
                                    }
                                
                                    dn.adopt(btDiv, ls, lb, as, de);
                                    dn.padopt(indexDiv, indexSpan, tDiv, tSpan);
                                    dn.adopt(row, indexDiv, tDiv, btDiv);
                                    dn.adopt(div, row);
                                });
                        
                            }
                            
                        
                            dn.padopt(timeDiv, span);
                            dn.adopt(controlDiv, startClockBt, pauseClockBt, resetClockBt, lap)
                            dn.adopt(statusDiv, statusSpan);
                        
                            function startClock() {
                        
                                ctrl.acts.diverWorkSheet.dive.timer.start(log, activityID, diveSheetID)
                                if (timer.hasStartedAlready === false) {
                                    timer.hasStartedAlready = true;
                                }
                                elapsedTime();
                                printTime();
                                clearClock();
                                timerID = window.setInterval(startClock, timeInterval);
                                statusSpan.innerHTML ="Stopwatch hasn't stopped watch"
                        
                            }
                        
                            function clearClock() {
                        
                                if (timerID !== undefined) clearTimeout(timerID);
                        
                            }
                        
                            function pauseClock() {
                        
                                if (timerID !== undefined) {
                                    clearTimeout(timerID);
                                    timer.isPaused = true;
                                    statusSpan.innerHTML = 'Stopwatch has paused watch'
                                }
                        
                            }
                        
                            function lapForReset() {
                        
                                elapsedTime();
                                clearClock();
                                timerID = window.setInterval(lapForReset, timeInterval);
                        
                            }
                        
                            function restartClock() {
                        
                                startClock();
                                statusSpan.innerHTML = 'Stopwatch has not stopped watch'
                        
                            }
                        
                            function resetClock() {
                        
                                if (timerID !== undefined) {
                                    switch (statusSpan.innerHTML) {
                                        case `Stopwatch hasn't stopped yet.\nReset button used for the temporary lap.`:
                                            restartClock();
                                            break
                                        case 'Stopwatch has not stopped watch':
                                            break
                                        case "Stopwatch has been resetted" :
                                            statusSpan.innerHTML = `It has already been resetted`;
                                            break
                                        case `It has already been resetted` :
                                            statusSpan.innerHTML = `It had already been resetted`;
                                            break
                                        case `It had already been resetted` :
                                            alert("???");
                                            break
                                        case "Stopwatch hasn't stopped watch" :
                                            lapForReset();
                                            statusSpan.innerHTML = `Stopwatch hasn't stopped yet.\nReset button used for the temporary lap.`;
                                            break
                                        case 'Stopwatch has paused watch' :
                                            clearTimeout(timerID);
                                            time = 0;
                                            statusSpan.innerHTML = `Stopwatch has been resetted`;
                                            printTime();
                                            break
                                        default :
                                            console.log(statusSpan.innerHTML);
                                            throw Error("!@#!@#");
                                            break
                                    }
                                }
                        
                            }
                        
                            const lapClock = () => {
                        
                                const hrs = parseInt((time/(60*60*1000)).toString());
                                const min = parseInt(((time - hrs*3600000) / 60000).toString());
                                const sec = parseInt(((time - (hrs * 3600000) - (min * 60000)) / 1000).toString());
                                const ms = time % 1000;
                                const o = new Lap(hrs, min, sec, ms);
                        
                                laps.laps.push(o);
                        
                            }
                        
                            function elapsedTime() {
                        
                                console.log(time);
                                time += 33;
                        
                            }
                        
                            function printTime() {
                                
                                span.innerHTML = getTimeFormatString();
                        
                            }
                        
                            function getTimeFormatString() {
                        
                                const hrs = parseInt((time/(60*60*1000)).toString());
                                const min = parseInt(((time - hrs*3600000) / 60000).toString());
                                const sec = parseInt(((time - (hrs * 3600000) - (min * 60000)) / 1000).toString());
                                const ms = time % 1000;
                        
                                return padStart(2, '0', hrs.toString()) + ":" + padStart(2, '0', min.toString()) + ":" + padStart(2, '0', sec.toString()) + "." + padStart(3, '0', ms.toString());
                        
                            }
                        
                        }

                    }

                }

                function diveSheetRender(div : HTMLDivElement) {
                    const diveSheetMaster = di();
                    const dive1 = di();
                    const dive2 = di();
                    dive1.dataset['id'] = '-Infinity';
                    dive2.dataset['id'] = '-Infinity';
                    dn.className('dive-sheet-master-container');
                    dn.adopt(div, diveSheetMaster);
                    dn.adopt(diveSheetMaster, dive1, dive2);
                }

                function refreshActivity() {
                            
                    const workSheet = document.getElementById(`worksheet-${id}`);
                    const diveSheet = document.getElementById(`divesheet-${id}`);
                    const mortSheet = document.getElementById(`mortsheet-${id}`);
    
                    let boolWS = '';
                    let boolDS = '';
                    let boolMS = '';
    
                    if(workSheet !== null) {
                        if (workSheet.dataset['hidden'] !== undefined){
                            boolWS = workSheet.dataset['hidden'];
                            
    
                        }
                    }
                    if(diveSheet !== null) {
                        if (diveSheet.dataset['hidden'] !== undefined){
                            boolDS = diveSheet.dataset['hidden'];
                            
    
                        }
                    }
                    if(mortSheet !== null) {
                        if (mortSheet.dataset['hidden'] !== undefined){
                            boolMS = mortSheet.dataset['hidden'];
                            
                        }
                    }
    
                    logRender(M, log, 'activity', id);
                    
                    const workSheetR = document.getElementById(`worksheet-${id}`);
                    const diveSheetR = document.getElementById(`divesheet-${id}`);
                    const mortSheetR = document.getElementById(`mortsheet-${id}`);
    
                    if(workSheetR !== null) {
                        if (workSheetR.dataset['hidden'] !== undefined){
                            if (boolWS ==='false'){
                                boolWS = 'true'
                            } else if (boolWS==='true') {
                                boolWS = 'false'
                            } else {
                                throw new Error('dataset value Error')
                            }
                            workSheetR.dataset['hidden'] = boolWS
                            const foldBtn = document.getElementById(`worksheet-fold-${id}`);
                            if(foldBtn === null) throw new Error('fold Btn missing - worksheet')
    
                            foldBtn.click();
                        }
                    }
                    if(diveSheetR !== null) {
                        if (diveSheetR.dataset['hidden'] !== undefined){
                            if (boolDS ==='false'){
                                boolDS = 'true'
                            } else if (boolDS==='true') {
                                boolDS = 'false'
                            } else {
                                throw new Error('dataset value Error')
                            }
                            diveSheetR.dataset['hidden'] = boolDS;
                            const foldBtn = document.getElementById(`divesheet-fold-${id}`);
                            if(foldBtn === null) throw new Error('fold Btn missing - divesheet')
                            foldBtn.click();
                        }
                    }
                    if(mortSheetR !== null) {
                        if (mortSheetR.dataset['hidden'] !== undefined){
                            if (boolMS ==='false'){
                                boolMS = 'true'
                            } else if (boolMS==='true') {
                                boolMS = 'false'
                            } else {
                                throw new Error('dataset value Error')
                            }
                            mortSheetR.dataset['hidden'] = boolMS;
                            const foldBtn = document.getElementById(`mortsheet-fold-${id}`);
                            if(foldBtn === null) throw new Error('fold Btn missing - mortsheet')
                            foldBtn.click();
                        }
                    }
                }

            }

            function chooseType(div : HTMLDivElement, log : Log, id : number) {

                const questionDiv = di();
                const questionSpan = sp('Please choose the type of this activity.');
                const selDiv = di();
                const sel = se('type', 'type', ['Work Sheet', 'Boat Log'], true, ['Work Sheet', 'Boat Log']);
                const confirmDiv = di();
                const btn = bt('CONFIRM');
                btn.addEventListener( 'click', () => {
                    const bool  = confirm (`Please confirm that this activity is ${sel.value}.`)
                    if (bool) {
                    ctrl.acts.chooseType(log, id, sel.value);
                    logRender(M, log, 'activity', id);
                    }
                })

                dn.className('choosetype', questionDiv, selDiv, confirmDiv);
                dn.adopt(div,questionDiv, selDiv, confirmDiv);
                dn.padopt(questionDiv, questionSpan, selDiv, sel, confirmDiv, btn);

            }

        
        }

        function crewControlRender (div: HTMLDivElement, log: Log, travelFrom : string, id : number | string)
        {

            const ccb = document.getElementById('crew-control-button');
            
            if(ccb === null) throw new Error(' crew-control-button not defined')
            
            ccb.innerHTML = `Back to ${travelFrom === 'activity' ? "Activity" : 'List'}`
            ccb.onclick = () => {
                logRender(M, log, travelFrom, id);
            }
            
            const crewEditMaster =di();

            const titleDiv = di();
            const titleSpan = sp(`log ${log.id} Crew Control`);

            const addNewCrewDiv = di();
            const addinput = ip('text', 'Crew Name');
            const addBtn = bt('Add A Crew');
            
            addBtn.addEventListener('click', () => {
                ctrl.crews.addCrew(log, addinput.value);
                logRender(M, log, 'crew-control', travelFrom, id);
            });

            const fRow = di();
            const nameDiv = di();
            const idDiv = di();
            const timeOnBoardDiv = di();
            const timeOffBoardDiv = di();
            const diverDiv = di();
            const editDiv = di();

            const nameSpan = sp('Name');
            const idSpan = sp('ID');
            const timeOnBoardSpan = sp('On\nBoard');
            const timeOffBoardSpan = sp('Off\nBoard');
            const diverSpan = sp('Diver\nMenu');
            const editSpan = sp('Crew\nControl')

            dn.className('crew-control-master', crewEditMaster);
            dn.className('crew-add-div', addNewCrewDiv);
            dn.adopt(div, addNewCrewDiv, crewEditMaster);
            dn.adopt(addNewCrewDiv, addinput, addBtn);
            dn.adopt(crewEditMaster, fRow);
            dn.padopt(titleDiv, titleSpan, nameDiv, nameSpan, idDiv, idSpan, timeOnBoardDiv, timeOnBoardSpan, timeOffBoardDiv, timeOffBoardSpan, diverDiv, diverSpan, editDiv, editSpan);


            if(log.department === 'diver') {
                dn.adopt(fRow, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, diverDiv, editDiv);

            } else {
                dn.adopt(fRow, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, editDiv);
            }
            // const 

            log.crews.forEach( crew => {
                
                const row = di();

                const nameDiv = di();
                const idDiv = di();
                const timeOnBoardDiv = di();
                const timeOffBoardDiv = di();
                const diverDiv = di();
                const editDiv = di();
                
                const nameSpan = sp(crew.name);
                const idSpan = sp(crew.id);
                const timeOnBoardSpan = sp(ctrl.crews.getTimeOn(log, crew.id));
                const timeOffBoardSpan = sp(ctrl.crews.getTimeOff(log, crew.id));
    
                const timeOnBoardInput = ip('time', ctrl.crews.getTimeOn(log, crew.id));
                timeOnBoardInput.setAttribute('step', '1');
                const timeOffBoardInput = ip('time', ctrl.crews.getTimeOff(log, crew.id));
                timeOffBoardInput.setAttribute('step', '1');


                const diverBt = bt('Diver');
                const editBt = bt('Edit');
                const updateBt = bt('Update');
                const delBt = bt('Delete');

                diverBt.addEventListener('click', () => {
                    logRender(M, log, 'diver', crew.id, travelFrom, id);
                })

                editBt.addEventListener('click' , () => {
                    ctrl.crews.edit(log, crew.id);
                    logRender(M, log, 'crew-control', travelFrom, id);
                });

                updateBt.addEventListener('click', () => {
                    ctrl.crews.update(log, crew.id, {});
                    logRender(M, log, 'crew-control', travelFrom, id);
                });

                delBt.addEventListener('click', ()=> {
                    ctrl.crews.bin(log, crew.id);
                    logRender(M, log, 'crew-control', travelFrom, id);
                })

                dn.adopt(crewEditMaster, row);
    
                if (crew.isBeingEdited) {

                    dn.padopt(titleDiv, titleSpan, nameDiv, nameSpan, idDiv, idSpan, timeOnBoardDiv, timeOnBoardInput, timeOffBoardDiv, timeOffBoardInput, diverDiv, diverBt, editDiv, updateBt);


                    if (log.department === 'diver') {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, diverDiv, editDiv);
        
                    } else {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, editDiv);
                    }

                } else {

                    dn.padopt(titleDiv, titleSpan, nameDiv, nameSpan, idDiv, idSpan, timeOnBoardDiv, timeOnBoardSpan, timeOffBoardDiv, timeOffBoardSpan, diverDiv, diverBt, editDiv, editBt, editDiv, delBt);


                    if(log.department === 'diver') {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, diverDiv, editDiv);
        
                    } else {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, editDiv);
                    }

                }

            });


            
        }

        function crewBinRender (div: HTMLDivElement, log: Log, travelFrom:string, id:string|number)
        {
            const crewEditMaster =di();

            const titleDiv = di();
            const titleSpan = sp(`log ${log.id} Crew Control(BIN)`);

            const addNewCrewDiv = di();
            const addinput = ip('text', 'Crew Name');
            const addBtn = bt('Add A Crew');
            
            addBtn.addEventListener('click', () => {
                ctrl.crews.addCrew(log, addinput.value);
                logRender(M, log, 'bin', travelFrom, id);
            })

            const fRow = di();
            const nameDiv = di();
            const idDiv = di();
            const timeOnBoardDiv = di();
            const timeOffBoardDiv = di();
            const diverDiv = di();
            const editDiv = di();

            const nameSpan = sp('Name');
            const idSpan = sp('ID');
            const timeOnBoardSpan = sp('On\nBoard');
            const timeOffBoardSpan = sp('Off\nBoard');
            const diverSpan = sp('Diver\nMenu');
            const editSpan = sp('Crew\nControl')

            dn.className('crew-control-master', crewEditMaster);
            dn.className('crew-add-div', addNewCrewDiv);
            dn.adopt(div, addNewCrewDiv, crewEditMaster);
            dn.adopt(addNewCrewDiv, addinput, addBtn);
            dn.adopt(crewEditMaster, fRow);
            dn.padopt(titleDiv, titleSpan, nameDiv, nameSpan, idDiv, idSpan, timeOnBoardDiv, timeOnBoardSpan, timeOffBoardDiv, timeOffBoardSpan, diverDiv, diverSpan, editDiv, editSpan);


            if(log.department === 'diver') {
                dn.adopt(fRow, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, diverDiv, editDiv);

            } else {
                dn.adopt(fRow, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, editDiv);
            }
            // const 

            log.crews.forEach( crew => {
                
                const row = di();

                const nameDiv = di();
                const idDiv = di();
                const timeOnBoardDiv = di();
                const timeOffBoardDiv = di();
                const diverDiv = di();
                const editDiv = di();
                
                const nameSpan = sp(crew.name);
                const idSpan = sp(crew.id);
                const timeOnBoardSpan = sp(ctrl.crews.getTimeOn(log, crew.id));
                const timeOffBoardSpan = sp(ctrl.crews.getTimeOff(log, crew.id));
    
                const timeOnBoardInput = ip('time', ctrl.crews.getTimeOn(log, crew.id));
                timeOnBoardInput.setAttribute('step', '1');
                const timeOffBoardInput = ip('time', ctrl.crews.getTimeOff(log, crew.id));
                timeOffBoardInput.setAttribute('step', '1');

                const diverBt = bt('Diver');
                const editBt = bt('Edit');
                const updateBt = bt('Update');
                const delBt = bt('Delete');

                diverBt.addEventListener('click', () => {
                    logRender(M, log, 'diver', crew.id, travelFrom, id);
                });

                editBt.addEventListener('click' , () => {
                    ctrl.crews.edit(log, crew.id);
                    logRender(M, log, 'crew-control', travelFrom, id);
                });

                updateBt.addEventListener('click', () => {
                    ctrl.crews.update(log, crew.id, {});
                    logRender(M, log, 'crew-control', travelFrom, id);
                });

                delBt.addEventListener('click', ()=> {
                    ctrl.crews.bin(log, crew.id);
                    logRender(M, log, 'crew-control', travelFrom, id);
                })

                dn.adopt(crewEditMaster, row);
    
                if (crew.isBeingEdited) {

                    dn.padopt(titleDiv, titleSpan, nameDiv, nameSpan, idDiv, idSpan, timeOnBoardDiv, timeOnBoardInput, timeOffBoardDiv, timeOffBoardInput, diverDiv, diverBt, editDiv, updateBt);


                    if(log.department === 'diver') {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, diverDiv, editDiv);
        
                    } else {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, editDiv);
                    }

                } else {

                    dn.padopt(titleDiv, titleSpan, nameDiv, nameSpan, idDiv, idSpan, timeOnBoardDiv, timeOnBoardSpan, timeOffBoardDiv, timeOffBoardSpan, diverDiv, diverBt, editDiv, editBt, editDiv, delBt);


                    if(log.department === 'diver') {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, diverDiv, editDiv);
        
                    } else {
                        dn.adopt(row, nameDiv, idDiv, timeOnBoardDiv, timeOffBoardDiv, editDiv);
                    }

                }

            });
        }

        function diverControlRender(div : HTMLDivElement, log:Log, crewID:number, travelFrom:string, id:number) {
            
            const ccb = document.getElementById('crew-control-button');
            
            if(ccb === null) throw new Error(' crew-control-button not defined')
            
            ccb.innerHTML = `Back to crew control`
            ccb.onclick = () => {
                logRender(M, log, 'crew-control', travelFrom, id);
            }

            const index = log.crews.map(crew => crew.id).indexOf(crewID);
            const crew = <DiveCrew> log.crews[index];

            if (crew === undefined) throw Error("Crew undefined");
            
            const masterDiv = di();
            
            const titleDiv = di();
            const titleSpan = sp(`Crew name : ${crew.name} / Diver Detail`);

            const pddTitleDiv = di();
            const pddTitleSpan = sp(`Pre Dive Declaration`);
            
            dn.className('diver-control-master', masterDiv);
            dn.adopt(div, masterDiv);
            dn.adopt(masterDiv, titleDiv, pddTitleDiv);

            if (crew.dive.preDive === false) {

                const preDiveStartDiv = di();
                const preDiveStartBtn = bt('Start');

                preDiveStartBtn.addEventListener('click', () => {
                    ctrl.crews.dive.pdd.start(log, crewID)
                    logRender(M, log, 'diver', crewID, travelFrom, id);
                })

                dn.adopt(preDiveStartDiv, preDiveStartBtn);

                dn.adopt(masterDiv, preDiveStartDiv);

            } else if (crew.dive.preDive === true) {

                const rfDiv = di();
                const rfSpanDiv = di();
                const rfSpan = sp('RF = ?');
                const rfSelDiv = di();
                const rfSel = se('rf', 'RF', ["?",'1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0'], true,  ["?",'1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0']);
                rfSel.value = "?"
                const drugAlcoholDiv = di();
                const drugAlcoholSpanDiv = di();
                const drugAlcoholCboxDiv = di();
                const drugAlcoholSpan = sp('No Drug or Alcohol?');
                const drugAlcoholCbox = ip('c', '');
                drugAlcoholCbox.checked = false;
                const decongestantDiv = di();
                const decongestantSpanDiv = di();
                const decongestantCboxDiv = di();
                const decongestantSpan = sp('No decongestant?');
                const decongestantCbox = ip('c', '');
                decongestantCbox.checked = false;
                const fitToDiveDiv = di();
                const fitToDiveSpanDiv = di();
                const fitToDiveCboxDiv = di();
                const fitToDiveSpan = sp('Fit To Dive?');
                const fitToDiveCbox = ip('c', '');
                fitToDiveCbox.checked = false;
                const hydratedDiv = di();
                const hydratedSpanDiv = di();
                const hydratedCboxDiv = di();
                const hydratedSpan = sp('Hydrated?') 
                const hydratedCbox = ip('c', '');
                hydratedCbox.checked = false;
                const anyRemarkableDiv = di();
                const anyRemarkableSpanDiv = di();
                const anyRemarkableSpan = sp('Anything remarkable?');
                const anyRemarkableInputDiv = di();
                const anyRemarkableInput = ta(4,50);
                anyRemarkableInput.placeholder = "Please input anything remarkable";
                const doneByDiv = di();
                const doneBySpanDiv = di();
                const doneBySpan = sp('Done By Supervisor,');
                const doneByInputDiv = di();
                const doneByInput = ip('text', 'Sup Name');


                const confirmDiv = di();
                const confirmBtn = bt('CONFIRM');
                confirmBtn.addEventListener( 'click', () => {

                    const bool = confirm("Once pre-dive-declaration is confirmed, it's not going to be editable.");

                    if (bool) {
                        console.log(doneByInput.value);
                        ctrl.crews.dive.pdd.confirm(log, crewID, new PDD(rfSel.value, drugAlcoholCbox.checked, decongestantCbox.checked, fitToDiveCbox.checked, hydratedCbox.checked, anyRemarkableInput.value, doneByInput.value));
                        logRender(M, log, 'diver', crewID, travelFrom, id);
                    }

                })

                const pddDiv = di();
                dn.className('pdd-master-div', pddDiv);

                dn.adopt(masterDiv, pddDiv);
                dn.adopt(pddDiv, rfDiv, drugAlcoholDiv, decongestantDiv, fitToDiveDiv, hydratedDiv, anyRemarkableDiv, doneByDiv, confirmDiv);
                dn.adopt(confirmDiv, confirmBtn);
                dn.padopt(rfDiv, rfSpanDiv, drugAlcoholDiv, drugAlcoholSpanDiv, decongestantDiv, decongestantSpanDiv, fitToDiveDiv, fitToDiveSpanDiv, hydratedDiv, hydratedSpanDiv, anyRemarkableDiv, anyRemarkableSpanDiv, doneByDiv, doneBySpanDiv);
                dn.padopt(rfDiv, rfSelDiv, drugAlcoholDiv, drugAlcoholCboxDiv, decongestantDiv, decongestantCboxDiv, fitToDiveDiv, fitToDiveCboxDiv, hydratedDiv, hydratedCboxDiv, anyRemarkableDiv, anyRemarkableInputDiv, doneByDiv, doneByInputDiv)
                dn.padopt(rfSpanDiv, rfSpan, drugAlcoholSpanDiv, drugAlcoholSpan, decongestantSpanDiv, decongestantSpan, fitToDiveSpanDiv, fitToDiveSpan, hydratedSpanDiv, hydratedSpan, anyRemarkableSpanDiv, anyRemarkableSpan, doneBySpanDiv, doneBySpan);
                dn.padopt(rfSelDiv, rfSel, drugAlcoholCboxDiv, drugAlcoholCbox, decongestantCboxDiv, decongestantCbox, fitToDiveCboxDiv, fitToDiveCbox, hydratedCboxDiv, hydratedCbox, anyRemarkableInputDiv, anyRemarkableInput, doneByInputDiv, doneByInput)

            } else {

                const tru : string = '&#10003;';
                const fls : string = '&#10006;';
                const rfDiv = di();
                const rfSpanDiv = di();
                const rfSpan = sp('RF = ?');
                const rfValueDiv = di();
                const rfValueSpan = sp(crew.dive.preDive.rf);
                const drugAlcoholDiv = di();
                const drugAlcoholSpanDiv = di();
                const drugAlcoholValueDiv = di();
                const drugAlcoholSpan = sp('No Drug or Alcohol?');
                const drugAlcoholValueSpan = sp(crew.dive.preDive.drugAlcohol ? tru: fls);
                const decongestantDiv = di();
                const decongestantSpanDiv = di();
                const decongestantValueDiv = di();
                const decongestantSpan = sp('No decongestant?');
                const decongestantValueSpan = sp(crew.dive.preDive.decongestant ? tru:fls);
                const fitToDiveDiv = di();
                const fitToDiveSpanDiv = di();
                const fitToDiveValueDiv = di();
                const fitToDiveSpan = sp('Fit To Dive?');
                const fitToDiveValueSpan = sp(crew.dive.preDive.fitToDive ? tru:fls);
                const hydratedDiv = di();
                const hydratedSpanDiv = di();
                const hydratedValueDiv = di();
                const hydratedSpan = sp('Hydrated?') 
                const hydratedValueSpan = sp(crew.dive.preDive.hydrated ? tru:fls);
                const anyRemarkableDiv = di();
                const anyRemarkableSpanDiv = di();
                const anyRemarkableSpan = sp('Anything remarkable?');
                const anyRemarkableValueDiv = di();
                const anyRemarkableValueSpan = sp(crew.dive.preDive.anyRemarkable? tru:fls);
                const doneByDiv = di();
                const doneBySpanDiv = di();
                const doneBySpan = sp('Done By Supervisor,');
                const doneByValueDiv = di();
                const doneByValue = sp(crew.dive.preDive.doneBySupervisor);
                const loadSheetDiv = di();
                const diveSheetDiv = di();
                const diveSheetRender = bt('LOAD THE DIVESHEETS TODAY');
                const supervisorSheetDiv = di();
                const supervisorSheetRender= bt('LOAD THE SUPERVISOR SHEETS TODAY');

                diveSheetRender.addEventListener( 'click' , () => {
                    diveSheetToday();
                })
                supervisorSheetRender.addEventListener('click', () => {
                    supervisorSheetToday();
                })

                const pddDiv = di();
                dn.className('pdd-master-div', pddDiv);

                dn.adopt(masterDiv, pddDiv);
                dn.adopt(pddDiv, rfDiv, drugAlcoholDiv, decongestantDiv, fitToDiveDiv, hydratedDiv, anyRemarkableDiv, doneByDiv, loadSheetDiv);
                dn.padopt(rfDiv, rfSpanDiv, drugAlcoholDiv, drugAlcoholSpanDiv, decongestantDiv, decongestantSpanDiv, fitToDiveDiv, fitToDiveSpanDiv, hydratedDiv, hydratedSpanDiv, anyRemarkableDiv, anyRemarkableSpanDiv, doneByDiv, doneBySpanDiv, loadSheetDiv, supervisorSheetDiv);
                dn.padopt(rfDiv, rfValueDiv, drugAlcoholDiv, drugAlcoholValueDiv, decongestantDiv, decongestantValueDiv, fitToDiveDiv, fitToDiveValueDiv, hydratedDiv, hydratedValueDiv, anyRemarkableDiv, anyRemarkableValueDiv, doneByDiv, doneByValueDiv, loadSheetDiv, diveSheetDiv)
                dn.padopt(rfSpanDiv, rfSpan, drugAlcoholSpanDiv, drugAlcoholSpan, decongestantSpanDiv, decongestantSpan, fitToDiveSpanDiv, fitToDiveSpan, hydratedSpanDiv, hydratedSpan, anyRemarkableSpanDiv, anyRemarkableSpan, doneBySpanDiv, doneBySpan, supervisorSheetDiv,supervisorSheetRender);
                dn.padopt(rfValueDiv, rfValueSpan, drugAlcoholValueDiv, drugAlcoholValueSpan, decongestantValueDiv, decongestantValueSpan, fitToDiveValueDiv, fitToDiveValueSpan, hydratedValueDiv, hydratedValueSpan, anyRemarkableValueDiv, anyRemarkableValueSpan, doneByValueDiv, doneByValue, diveSheetDiv, diveSheetRender)

                function diveSheetToday() {

                }

                function supervisorSheetToday() {

                }
            }

            dn.padopt(titleDiv, titleSpan, pddTitleDiv, pddTitleSpan);

        }

        function diveInfoRender(log: Log, id:number, diveSheetId:number) {

        }
    }
}