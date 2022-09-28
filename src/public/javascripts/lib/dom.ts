'use strict'

const dom = {

    html : {
        cl : (h : HTMLElement) => {
            h.innerHTML = ''
        }
        ,
        de : (h : HTMLElement) => {
            h.outerHTML = ''
        }
        ,
    },
    
    node : {
        adopt : (parent : HTMLElement, ...children : Array<HTMLElement>) => {
        children.forEach( child => {
            parent.appendChild(child);
        });
        }
        ,
        iH : (node : HTMLElement, string : string) => {
            node.innerHTML = string;
        }
        ,
        padopt : (...elements : Array<HTMLElement>) => {

            elements.forEach ( (element, i) => {

                
                
                const child = elements[i+1];
                if ( i % 2 === 0 && child !== undefined) {
                    const parent = element
                    parent.appendChild(child);
                }

            }

            );

        }
        ,
        className : (name: string, ...elements: Array<HTMLElement>) => {
            elements.forEach( element => {
                element.className = name;
            })
        }
    }

    ,
    cE : {
        d : () => document.createElement('div'),
        s : (iH : string | number | null | undefined) : HTMLSpanElement => {

            if ( typeof iH === 'number' ) {
                const element = document.createElement('span');
                const string = iH.toString();
                
                if (string) element.innerHTML = string;
                return element
            } else if ( iH === undefined || null) {
                const element = document.createElement('span');
                if (iH) element.innerHTML = 'TBD';
                return element
            } 
            else {
                const element = document.createElement('span');
                if (iH) element.innerHTML = iH
                return element
            }

        },
        i : (type : string, ph : string) => {

            const element = document.createElement('input');
            switch (type) {

                case 'time':
                    element.type = type;
                    break

                case 'c' :
                    element.type = 'checkbox';
                    break
                
                default :
                    if (typeof ph === 'string'){
                    element.placeholder = ph;
                    }
                    break
            }
            return element

        }
        ,
        b : (iH : string) => {

            const element = document.createElement('button');
            if (iH) element.innerHTML = iH
            return element

        }
        ,
        ta : (rows : number, cols : number) => {
            
            const element = document.createElement('textarea');
            element.setAttribute('rows', rows.toString());
            element.setAttribute('cols', cols.toString());

            return element

        } 
        ,
        select : (id : string, ...args : Array<string | Array<string> >) => {
            const sel = document.createElement('select');
            sel.id = id;
            args.forEach ( arg => {
                if ( args.indexOf(arg) % 2 === 0){
                    const index = args.indexOf(arg);
                    const og = document.createElement('optgroup');
                    if (typeof arg === 'string'){
                        og.label = arg
                    } else {
                        console.error(`label is not string - ${arg}`)
                    }
                    const list = args[index + 1];
                    if (list === undefined || Array.isArray(list) !== true){
                        console.error(`no list for optgroup - ${og.label}`)
                    } else if(typeof list === 'string') {
                        console.error(`type of ${list} is string`)
                    } else {
                        list.forEach ( o => {
                            const op = document.createElement('option');
                            op.value = o;
                            op.innerHTML = o;
                            og.appendChild(op);
                        });
                        sel.appendChild(og);
                    }
                }
            });

            return sel;

        }
    }

}
