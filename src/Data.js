import img1 from './assets/imgs/book-1.jpg'
import img2 from './assets/imgs/book-2.jpg'
import img3 from './assets/imgs/book-3.jpg'
import img4 from './assets/imgs/book-4.jpg'
import catImg1 from './assets/imgs/Category-imgs/category-adventure.png'
import catImg2 from './assets/imgs/Category-imgs/category-crime.png'
import catImg3 from './assets/imgs/Category-imgs/category-fantasy.png'
import catImg4 from './assets/imgs/Category-imgs/category-historical.png'
import catImg5 from './assets/imgs/Category-imgs/category-science-fiction.png'
import authorImg1 from './assets/imgs/Author-imgs/Charles Dickens.jpg'
import authorImg2 from './assets/imgs/Author-imgs/george orwell.jpg'
import authorImg3 from './assets/imgs/Author-imgs/Scott Fitzgerald.jpg'
import { APPROVED, AVAILABLE, REQUESTED } from './Redux/Types'

export let Books = [
    {
        BookId:0,
        BookImg:img1,
        BookName:'Oliver Twist',
        BookAuthor:'Charles Dickens',
        BookCategory:'Adventure',
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
        BookAuthor:'george orwell',
        BookCategory:'Historical',
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
        BookCategory:'Fantasy',
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
        BookCategory:'Adventure',
        BookChapters:'0',
        BookPlot:'this is plot for Great Expectations book',
        BookPublicationDate:'2000',
        status:APPROVED,
        pdf:'https://www.globalgreyebooks.com/ebooks1/charles-dickens/great-expectations/great-expectations.pdf'
    }
]

export const cats = [
{
    name:'Adventure',
    img:catImg1
},  
{
    name:'Crime',
    img:catImg2
},
{
    name:'Fantasy',
    img:catImg3
},
{
    name:'Historical',
    img:catImg4
},
{
    name:'Science fiction',
    img:catImg5
},
]

export const colors = [
{
    bg:'bg-amber-300',
    hover:'hover:bg-amber-400'
},
{
    bg:'bg-red-400',
    hover:'hover:bg-red-500'
},
{
    bg:'bg-rose-400',
    hover:'hover:bg-rose-500'
},
{
    bg:'bg-indigo-400',
    hover:'hover:bg-indigo-500'
},
{
    bg:'bg-orange-400',
    hover:'hover:bg-orange-500'
},
{
    bg:'bg-gray-400',
    hover:'hover:bg-gray-500'
},
{
    bg:'bg-yellow-400',
    hover:'hover:bg-yellow-500'
},
{
    bg:'bg-lime-400',
    hover:'hover:bg-lime-500'
},
{
    bg:'bg-emerald-400',
    hover:'hover:bg-emerald-500'
},
{
    bg:'bg-green-400',
    hover:'hover:bg-green-500'
}
]

export const authors = [
    {
        name:'Charles Dickens',
        desc:"Charles John Huffam Dickens was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era",
        img:authorImg1,
        booksNum:2
    },{
        name:'george orwell',
        desc:"George Orwell, was an English novelist, essayist, journalist, and critic. His work is characterised by lucid prose, social criticism, opposition to totalitarianism, and support of democratic socialism",
        img:authorImg2,
        booksNum:1
    },
    {
        name:'Scott Fitzgerald',
        desc:'Francis Scott Key Fitzgerald was an American novelist, essayist, and short story writer. He is best known for his novels depicting the flamboyance and excess of the Jazz Age',
        img:authorImg3,
        booksNum:1
    },
]