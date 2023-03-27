export const searchCardChildVariants = {
    init:{
      opacity:0,
      scale:0.3
    },
    show:{
      opacity:1,
      scale:1,
      transition:{
        duration:0.5    
      }
    }
  }

export const searchInputVariants = {
    init:{
        rotate:360,
        translateX:'-50%'
    }
    ,show:{
        rotate:0,
        translateX:'-50%',
        transition:{
            duration:0.3,
            type:'spring',
            stiffness:75,
            damping:15
        }
    } 
}

export const searchHistoryVariants = {
    init:{
        y:25,
        opacity:0
    },
    show:{
        y:0,
        opacity:1,
        transition:{
            duration:0.2
        }
    },
    leave:{
        y:25,
        opacity:0,
        transition:{
            duration:0.2
        }
    }
}