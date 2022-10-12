'use strict';
const dom = {
    html: {
        cl: (h) => {
            h.innerHTML = '';
        },
        de: (h) => {
            h.outerHTML = '';
        },
    },
    node: {
        adopt: (parent, ...children) => {
            children.forEach(child => {
                parent.appendChild(child);
            });
        },
        iH: (node, string) => {
            node.innerHTML = string;
        },
        padopt: (...elements) => {
            elements.forEach((element, i) => {
                const child = elements[i + 1];
                if (i % 2 === 0 && child !== undefined) {
                    const parent = element;
                    parent.appendChild(child);
                }
            });
        },
        className: (name, ...elements) => {
            elements.forEach(element => {
                element.className = name;
            });
        }
    },
    cE: {
        d: () => document.createElement('div'),
        s: (iH) => {
            if (typeof iH === 'number') {
                const element = document.createElement('span');
                const string = iH.toString();
                if (string)
                    element.innerHTML = string;
                return element;
            }
            else if (iH === undefined || null) {
                const element = document.createElement('span');
                if (iH)
                    element.innerHTML = 'TBD';
                return element;
            }
            else {
                const element = document.createElement('span');
                if (iH)
                    element.innerHTML = iH;
                return element;
            }
        },
        i: (type, ph) => {
            const element = document.createElement('input');
            switch (type) {
                case 'time':
                    element.type = type;
                    break;
                case 'c':
                    element.type = 'checkbox';
                    break;
                default:
                    if (typeof ph === 'string') {
                        element.placeholder = ph;
                    }
                    break;
            }
            return element;
        },
        b: (iH) => {
            const element = document.createElement('button');
            if (iH)
                element.innerHTML = iH;
            return element;
        },
        ta: (rows, cols) => {
            const element = document.createElement('textarea');
            element.setAttribute('rows', rows.toString());
            element.setAttribute('cols', cols.toString());
            return element;
        },
        select: (id, ...args) => {
            const sel = document.createElement('select');
            sel.id = id;
            let boolIndex;
            let bool = false;
            const optList = args.reduce((acc, cur, i) => {
                if (typeof cur === 'boolean') {
                    boolIndex = i;
                    bool = true;
                    return acc;
                }
                if (bool) { }
                else
                    acc.push(cur);
                return acc;
            }, []);
            optList.forEach((arg, i) => {
                if (typeof boolIndex === 'undefined')
                    throw Error('no boolean');
                if (optList.indexOf(arg) % 2 === 0) {
                    const index = i;
                    const og = document.createElement('optgroup');
                    if (typeof arg === 'string') {
                        og.label = arg;
                    }
                    else {
                        console.error(`label is not string - ${arg}`);
                    }
                    const list = optList[index + 1];
                    const labelList = args[boolIndex + 1 + (index / 2)];
                    if (list === undefined || Array.isArray(list) !== true) {
                        console.error(`no list for optgroup - ${og.label}`);
                    }
                    else if (typeof list === 'string') {
                        console.error(`type of ${list} is string`);
                    }
                    else {
                        list.forEach((o, i) => {
                            const op = document.createElement('option');
                            op.value = o;
                            op.innerHTML = o;
                            if (args[boolIndex] === true) {
                                if (labelList !== undefined) {
                                    if (Array.isArray(labelList)) {
                                        const label = labelList[i];
                                        if (label !== undefined) {
                                            op.value = label;
                                        }
                                        else
                                            throw Error(`${label} = label, ${labelList} = labelList, ${i} = index`);
                                    }
                                }
                            }
                            else {
                                op.label = 'no-label-provided';
                            }
                            og.appendChild(op);
                        });
                        sel.appendChild(og);
                    }
                }
            });
            return sel;
        }
    }
};
