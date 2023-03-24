export const ContainerVariants = {
    init:{
      opacity:0
    },
    show:{
      opacity:1,
      transition:{
        staggerChildren:0.3
      }
    }
  }
export const childVariants = {
    init:{
      opacity:0,
      x:-25
    },
    show:{
      opacity:1,
      x:0,
      transition:{
        duration:0.3    
      }
    }
  }
export const cardChildVariants = {
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