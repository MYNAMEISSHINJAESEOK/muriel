'use strict';
const savedLogRenderLocal = (div, dep) => {
    dom.html.cl(div);
    const master = dom.cE.d();
    const title = dom.cE.d();
    const titleName = dom.cE.s(`${dep.toUpperCase()} SAVED LOG LIST - LOCALSTORAGE`);
    const createDiv = dom.cE.d();
    const savedLogListDiv = dom.cE.d();
    dom.node.className('saved-log-create', createDiv);
    const spanCreate = dom.cE.s('Please Create A New Log');
    const inputCreate = dom.cE.i('text', 'Log Name');
    const buttonCreate = dom.cE.b('Create');
    buttonCreate.addEventListener('click', () => {
        const title = inputCreate.value;
        createANewLog(title, dep);
        savedLogRenderLocal(div, dep);
    });
    const frow = dom.cE.d();
    dom.node.className('saved-log-master', master);
    dom.node.className('saved-log-title', title);
    dom.node.className('saved-log-row', frow);
    const index = dom.cE.d();
    const date = dom.cE.d();
    const logName = dom.cE.d();
    const edit = dom.cE.d();
    const indexSpan = dom.cE.s('Index');
    const dateSpan = dom.cE.s('Date');
    const logNameSpan = dom.cE.s('Log Name');
    const editSpan = dom.cE.s('Control');
    dom.node.adopt(div, master);
    dom.node.adopt(master, title, createDiv, savedLogListDiv);
    dom.node.adopt(title, titleName);
    dom.node.adopt(createDiv, spanCreate, inputCreate, buttonCreate);
    dom.node.adopt(savedLogListDiv, frow);
    dom.node.adopt(frow, index, date, logName, edit);
    dom.node.padopt(index, indexSpan, date, dateSpan, logName, logNameSpan, edit, editSpan);
    const list = loadLogLocal(dep);
    if (list === undefined) {
        throw Error("Local storage list returned");
    }
    list.forEach(log => {
        const lDate = log.loggedDate;
        const row = dom.cE.d();
        dom.node.className('saved-log-row', row);
        const index = dom.cE.d();
        const date = dom.cE.d();
        const logName = dom.cE.d();
        const edit = dom.cE.d();
        const indexSpan = dom.cE.s(list.indexOf(log) + 1);
        const dateSpan = dom.cE.s(`${lDate.date}-${lDate.month}-${lDate.year}`);
        const logNameSpan = dom.cE.s(log.name);
        const lbtn = dom.cE.b('LOAD');
        const ebtn = dom.cE.b('EDIT');
        const updbtn = dom.cE.b('UPDATE');
        const delbtn = dom.cE.b('DELETE');
        lbtn.dataset["id"] = log.id.toString();
        delbtn.dataset["id"] = log.id.toString();
        ebtn.dataset["id"] = log.id.toString();
        updbtn.dataset["id"] = log.id.toString();
        lbtn.addEventListener('click', () => {
            logRender(div, log, 'list', 0);
        });
        delbtn.addEventListener('click', () => {
        });
        dom.node.adopt(savedLogListDiv, row);
        dom.node.adopt(row, index, date, logName, edit);
        dom.node.padopt(index, indexSpan, date, dateSpan, logName, logNameSpan);
        dom.node.adopt(edit, lbtn, ebtn, delbtn);
    });
};
