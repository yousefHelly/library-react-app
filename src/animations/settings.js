export const settingsNavContainerVariants = {
    init:{
        x:-100,
        rotate:'-15deg'
    },
    show:{
        x:0,
        rotate:0,
        transition:{
            duration:0.3,
            staggerChildren:0.3
        }
    }
}
export const settingsNavVariants = {
    init:{
        x:-25,
        opacity:0
    },
    show:{
        x:0,
        opacity:1,
        transition:{
            duration:0.3,
        }
    }
}