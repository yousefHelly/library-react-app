import img1 from './assets/imgs/book-1.jpg'
import img2 from './assets/imgs/book-2.jpg'
import img3 from './assets/imgs/book-3.jpg'
import img4 from './assets/imgs/book-4.jpg'
import { APPROVED, AVAILABLE, REQUESTED } from './Redux/Types'

export let Books = [
    {
        BookId:0,
        BookImg:img1,
        BookName:'Oliver Twist',
        BookAuthor:'Charles Dickens',
        BookCategory:'Social Novel',
        BookChapters:'6',
        BookPlot:'this is plot for Oliver Twist book',
        BookPublicationDate:'1838',
        chapters:[
            {
                title:'Chapter 1 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 2 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 3 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 4 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 5 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 6 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            }
        ],
        status:REQUESTED,
        pdf:'https://www.planetebook.com/ebooks/Oliver-Twist.pdf'
    },
    {
        BookId:1,
        BookImg:img2,
        BookName:'Nineteen Eight-Four',
        BookAuthor:'George Orwell',
        BookCategory:'Horror',
        BookChapters:'4',
        BookPlot:'this is plot for Nineteen Eight-Four book',
        BookPublicationDate:'1984',
        chapters:[
            {
                title:'Chapter 1 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 2 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 3 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 4 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            }
        ],
        status:APPROVED,
        pdf:'https://valentux.files.wordpress.com/2010/01/orwell-george-1984-bilingue.pdf'
    },
    {
        BookId:2,
        BookImg:img3,
        BookName:'The Great Gatsby',
        BookAuthor:'Scott Fitzgerald',
        BookCategory:'Short Story',
        BookChapters:'8',
        BookPlot:'this is plot for The Great Gatsby book',
        BookPublicationDate:'2002',
        chapters:[
            {
                title:'Chapter 1 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 2 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 3 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 4 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 5 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 6 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 7 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            },{
                title:'Chapter 8 : Intro to the book',
                description:'this is intro to the book this is intro to the book this is intro to the book this is intro to the book '
            }
        ],
        status:AVAILABLE,
        pdf:'http://www.planetebook.com/ebooks/The-Great-Gatsby.pdf'
    },    
    {
        BookId:3,
        BookImg:img4,
        BookName:'Great Expectations',
        BookAuthor:'Charles Dickens',
        BookCategory:'Depression',
        BookChapters:'0',
        BookPlot:'this is plot for Great Expectations book',
        BookPublicationDate:'2000',
        status:APPROVED,
        pdf:'https://www.globalgreyebooks.com/ebooks1/charles-dickens/great-expectations/great-expectations.pdf'
    }
]