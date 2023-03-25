export const BookViewHeaderVariants = {
    init:{
    },
    show:{
        transition:{
            staggerChildren:0.3,
            when:'beforeChildren'
        }
    }
}
export const BookViewHeaderImgTextVariants = {
    init:{
        x:-25,
        opacity:0
    },
    show:{
        x:0,
        opacity:1,
        transition:{
            duration:0.5
        }
    }
}
export const BookViewContentContainerVariants = {
    init:{
        opacity:0
    },
    show:{
        opacity:1,
        transition:{
            duration:0.5,
            staggerChildren:0.3,
            when:'beforeChildren'
        }
    }
}

export const BookViewContentPlotVariants = {
    init:{
        opacity:0,
    },
    show:{
        opacity:1,
        transition:{
            duration:0.5
        }
    }
}

export const BookViewContentTextVariants = {
    init:{
        opacity:0,
        y:50
    },
    show:{
        opacity:1,
        y:0,
        transition:{
            duration:0.5
        }
    }
}