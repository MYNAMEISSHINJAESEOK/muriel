'use strict';
const homeButton = document.getElementById('home-button');
if (homeButton === null) {
    throw Error("cannot find home button");
}
homeButton.addEventListener('click', () => {
    fetch('/')
        .then((response) => {
        window.open(response.url, "_self");
    })
        .catch((rejected) => {
        console.log(rejected);
    });
});
const departmentsElements = document.querySelectorAll('.dep-name');
const departmentElementList = Array.from(departmentsElements);
departmentElementList.forEach(function (element) {
    const target = element.childNodes;
    target.forEach((child) => {
        if (child.nodeName === 'DIV') {
            child.addEventListener('click', () => {
                console.log(child.TEXT_NODE, 1);
                const innerHTML = child['innerHTML'];
                const depName = ejsInnerHTML(innerHTML);
                callLogRender(depName);
            });
        }
    });
});
const callLogRender = (dep) => {
    const content = document.getElementsByClassName('content-container')[0];
    if (content === undefined) {
        throw new Error('content-container not found');
    }
    savedLogRenderLocal(content, dep);
};
