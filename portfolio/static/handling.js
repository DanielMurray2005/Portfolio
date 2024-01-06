window.scrollTo({top: 0, behavior: 'auto'});

var scrollByComputer = false;

function getCurrentPage(){
    let multiple = Math.floor(document.documentElement.scrollTop/window.innerHeight);

    let lowerNum = multiple * window.innerHeight;
    let upperNum = (multiple+1) * window.innerHeight;
    
    let diffLowerNum = document.documentElement.scrollTop - lowerNum;
    let diffUpperNum = upperNum - document.documentElement.scrollTop;

    if (diffLowerNum < diffUpperNum){
        return multiple + 1;
    }
    else{
        return multiple + 2;
    }
}
var recordedCurrPage = 1;

function getycoord(){
    return (getCurrentPage()-1)*window.innerHeight;
}

function handleScroll() {
    window.scrollTo({top: getycoord(), behavior: 'smooth'});
    recordedCurrPage = getCurrentPage();
    setTimeout(300);
}

const onScrollStop = callback => {
    let isScrolling;
    window.addEventListener(
      'scroll',
      e => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback();
        }, 350);
      },
      false
    );
  };
  
  onScrollStop(() => {
    handleScroll();
  });