const listOfButtons = ["#red", "#blue", '#green', '#yellow']       //list of buttons
let order = ["#green"]
let orderToBePressed = [...order]
let buttonsDoneFlashing = false;    //boolean that is true when buttons stop flashing in the 'order'
let level = 1;
let gameIsOn = true


//function to animate the button on click
function clickAnimation(button){
    button.addClass('pressed')
    setTimeout(function(){
        button.removeClass('pressed')      
    }, 300)
    
}

//Function to generate a random button
function generateRandomButton(listOfButtons){       
    return listOfButtons[Math.floor(Math.random()*4)]
}

const flash = button =>{
    return new Promise((resolve, reject)=>{
        button.addClass('pressed');
        setTimeout(()=>{
            button.removeClass('pressed');
            setTimeout(()=>{
                resolve()
            }, 300)
        }, 900)
        
    })
}


async function startFlashing(){
    buttonsDoneFlashing = false;
    for(const button of order){
        await flash($(button))
    }
    buttonsDoneFlashing = true
}


function buttonClicked(target){    //taking input from the user using inline event listeners
    
    if(!buttonsDoneFlashing || !gameIsOn){      //wait for the buttons to stop flashing before the user can press them
        return
    }
    else{
        console.log(gameIsOn)
        clickAnimation($(target))
        // console.log($(target))
        const targetID = '#' + target.id
        let buttonToBePressed = orderToBePressed.shift()
        console.log(orderToBePressed)
        // console.log('To be pressed:  ',buttonToBePressed)
        // console.log('Pressed:  ', targetID)
        console.log(orderToBePressed.length)
        if(targetID === buttonToBePressed){
            if(orderToBePressed.length === 0){
                //start again
                document.querySelector('h3').innerText = 'Score: '+level
                level++
                order.push(generateRandomButton(listOfButtons))
                console.log(order)
                orderToBePressed = [...order]
                startFlashing()
                
            }
        }
        else{
            //GAME OVER. START AGAIN
            // console.log('GAME OVER')
            $('h3').text('Game Over. Reload to restart')
            gameIsOn = false
            
        }
    }
}


//Event listener for scrolling to the buttons when monke is clicked
window.addEventListener('load', ()=>{
    $('html, body').animate({
        scrollTop: $("#title").offset().top
    }, 10, 'swing');
})

$('#monke').on('click', function(){
    $('html, body').animate({
        scrollTop: $("#buttonsContainer").offset().top
    }, 10, 'swing');
    startFlashing()
    
})


