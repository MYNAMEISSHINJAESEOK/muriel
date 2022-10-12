'use strict'

const saveLog = (log : Log) => {

    if (typeof log === 'object'){
        if (log instanceof Log !== true) {
            throw Error()
        }
        else {
            const json = JSON.stringify(log);
            localStorage.setItem(log.name, json);
        }
    }
    else {
        console.log(log);
        throw Error ('Target is either somehow compromised or wrong.');
    }

  

}

const loadLogLocal = (dep : string) : Array<Log> | void => {

    console.log(dep);
    const ls = localStorage;
    const listLSKeys = Object.keys(ls);

    const savedLogListLocal : Array <Log> = [];

    listLSKeys.forEach( (key : any) => {
        
        if (typeof key !== 'string'){

            console.log(` ${typeof key} : type of Key, ${key} `);
            throw Error( 'Object key is not string');

        } else {

            const json = ls[key];
            const object = JSON.parse(json);

            if (isMuriel(object)) {
                if (dep === object.department){
                const murielLogClass = assignObjectToClass(object)
                savedLogListLocal.push(murielLogClass)
                }
                else {
                    console.log( 'different department file');
                }
            } else {
                console.log('not Muriel File');
                console.log(object);
            }

        }
        
    });

    savedLogListLocal.sort(Log.compare)
 
    return savedLogListLocal

}

const assignObjectToClass = ( o : Log ) : Log => {
   
    if (typeof o.department !== 'string') {

        throw Error (`department value compromised ${o.department}`)

    }

    else {

    const c = new Log(o.name, o.department);
    Object.assign(c, o);
    
    return c
    }
    
}

const isMuriel = ( object : any ) : boolean | undefined | void => {

    const type = (key : any) : string => typeof key

    if ( object.muriel && object.type === "shinjaeseok") {
        console.log("Is Muriel");
        if ( type(object.department) === 'string' ) {
            console.log(`Department type in Javascript is string. ${object.department}`);
            if ( type( object.name) === 'string') {
                console.log(`Name type in Javascript is string ${object.name}`);
                return true
            }
        } else {
            console.log("Department info is compromised");
        }
    }
    else {
        console.log("Isn't muriel");
    }

}