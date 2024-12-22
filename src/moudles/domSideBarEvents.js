export {sideBarEvents}



//first option

//event delegation through function
// function addGlobalEventListener(type, closest, callback){
//     document.addEventListener(type, e =>{
//         let target = e.target;
//         //even if its child is pressed it will change to the appropriate target through closest.
//         if(target.closest(closest)){
//             target = target.closest(closest);
//             callback(target);
//         }
//     });
// }

// addGlobalEventListener('click','#sideBarTop button', (e) =>{
//     e.parentNode.classList.toggle("rotate");
//     let sideBar = document.querySelector('nav');
//     sideBar.classList.toggle("close");
// });





//

//second option.
//event delegation
//sideBar click events through closest pattern
function sideBarEvents()
{
  const sideBar = document.querySelector("nav");
  sideBar.addEventListener("click", (e) => {
    let target;

    //for closing and opening the sidebar with svg rotation
    target = e.target.closest("#sideBarTop button");
    if (target) {
      target.classList.toggle("rotate");
      sideBar.classList.toggle("close");
    }

    target = e.target.closest("div > .dropDownBtn");
    if (target) {
      target.classList.toggle("rotate");
      let projectsSubMenu = sideBar.querySelector("#projectsSubMenu");
      projectsSubMenu.classList.toggle("show");
    }


    target = e.target.closest('#addTaskButton');
    if(target){
        let dialog = sideBar.querySelector('.addTaskDialog');
        console.log(dialog);
        dialog.showModal();
    }
  });
}
